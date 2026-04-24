import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { createAdminClient } from '@/lib/supabaseServer';

// 공공데이터포털 LH 임대주택 공고 API
// 환경변수 설정 필요: PUBLIC_DATA_API_KEY (data.go.kr 서비스키, URL인코딩된 값)
const LH_API_BASE = 'https://apis.data.go.kr/B090041/openapi/service/LH_OpenapiService';
const PAGE_SIZE = 100;

interface LHApiItem {
    UNQ_NO?: string;
    AIS_TP_CD_NM?: string;   // 임대주택 유형명
    LCL_CTY_NM?: string;     // 시도명
    CCR_CNNT_SYS_DS_CD?: string;
    SPL_INF_TP_CD?: string;
    SUBSCRPT_AREA_CODE_NM?: string; // 공급지역명
    SUBSCRPT_AREA_CODE?: string;
    RCRIT_PBLANC_DE?: string;       // 모집공고일
    PRZWNER_PRESNATN_DE?: string;   // 당첨자발표일
    BSNS_MBY_NM?: string;           // 사업주체명
    HOUSE_MANAGE_NO?: string;       // 주택관리번호
    PBLANC_NO?: string;             // 공고번호
    HOUSE_NM?: string;              // 주택명
    HSSPLY_ADRES?: string;          // 공급위치
    TOT_SUPLY_HSHLDCO?: string;     // 공급세대수
    RCEPT_BGNDE?: string;           // 청약시작일
    RCEPT_ENDDE?: string;           // 청약종료일
    MVNIN_PREARNGE_YM?: string;     // 입주예정년월
    CNTRCT_CNCLS_BGNDE?: string;
    CNTRCT_CNCLS_ENDDE?: string;
    HMPG_ADRES?: string;            // 홈페이지 주소
    PBLANC_URL?: string;            // 공고 URL
}

function mapLhItemToHousing(item: LHApiItem) {
    const city = item.LCL_CTY_NM ?? '';
    const address = item.HSSPLY_ADRES ?? '';
    const district = address.split(' ')[1] ?? '';

    return {
        name: item.HOUSE_NM ?? '(이름없음)',
        type: item.AIS_TP_CD_NM ?? '공공임대',
        city,
        district,
        address,
        household_count: item.TOT_SUPLY_HSHLDCO ? parseInt(item.TOT_SUPLY_HSHLDCO) : null,
        application_start: item.RCEPT_BGNDE
            ? `${item.RCEPT_BGNDE.slice(0, 4)}-${item.RCEPT_BGNDE.slice(4, 6)}-${item.RCEPT_BGNDE.slice(6, 8)}`
            : null,
        application_end: item.RCEPT_ENDDE
            ? `${item.RCEPT_ENDDE.slice(0, 4)}-${item.RCEPT_ENDDE.slice(4, 6)}-${item.RCEPT_ENDDE.slice(6, 8)}`
            : null,
        move_in_date: item.MVNIN_PREARNGE_YM
            ? `${item.MVNIN_PREARNGE_YM.slice(0, 4)}-${item.MVNIN_PREARNGE_YM.slice(4, 6)}-01`
            : null,
        url: item.PBLANC_URL ?? item.HMPG_ADRES ?? null,
        external_id: item.PBLANC_NO ?? item.HOUSE_MANAGE_NO ?? null,
    };
}

async function fetchLhPage(serviceKey: string, pageNo: number): Promise<{ items: LHApiItem[]; totalCount: number }> {
    const url = new URL(`${LH_API_BASE}/getRentHouseList`);
    url.searchParams.set('serviceKey', serviceKey);
    url.searchParams.set('pageNo', String(pageNo));
    url.searchParams.set('numOfRows', String(PAGE_SIZE));
    url.searchParams.set('_type', 'json');

    const res = await fetch(url.toString(), { next: { revalidate: 0 } });
    if (!res.ok) throw new Error(`LH API HTTP ${res.status}`);

    const json = await res.json();
    const body = json?.response?.body;

    if (!body) throw new Error('LH API 응답 형식 오류');

    const items: LHApiItem[] = Array.isArray(body.items?.item)
        ? body.items.item
        : body.items?.item
          ? [body.items.item]
          : [];

    return { items, totalCount: Number(body.totalCount ?? 0) };
}

export async function POST(req: NextRequest) {
    try {
        const { isAdmin, response } = await requireAdmin(req);
        if (!isAdmin) return response!;

        const serviceKey = process.env.PUBLIC_DATA_API_KEY;
        if (!serviceKey) {
            return NextResponse.json(
                { success: false, error: 'PUBLIC_DATA_API_KEY 환경변수가 설정되지 않았습니다.' },
                { status: 500 }
            );
        }

        const supabase = createAdminClient();

        // 1페이지로 전체 건수 파악 후 전 페이지 수집
        const firstPage = await fetchLhPage(serviceKey, 1);
        const totalPages = Math.ceil(firstPage.totalCount / PAGE_SIZE);

        const allItems: LHApiItem[] = [...firstPage.items];

        const remaining = Array.from({ length: totalPages - 1 }, (_, i) => fetchLhPage(serviceKey, i + 2));
        const pages = await Promise.all(remaining);
        pages.forEach((p) => allItems.push(...p.items));

        const rows = allItems.map(mapLhItemToHousing);

        // external_id 기준으로 upsert (중복 방지)
        const { error } = await supabase
            .from('public_housing')
            .upsert(rows, { onConflict: 'external_id', ignoreDuplicates: false });

        if (error) {
            console.error('[Sync] Supabase upsert error:', error);
            return NextResponse.json(
                { success: false, error: 'DB_ERROR', details: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: `${rows.length}건 동기화 완료`,
            data: { synced: rows.length, timestamp: new Date().toISOString() },
        });
    } catch (e: any) {
        console.error('[Sync] error:', e);
        return NextResponse.json(
            { success: false, error: 'INTERNAL_ERROR', details: e.message },
            { status: 500 }
        );
    }
}
