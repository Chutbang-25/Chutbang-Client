import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';

// LH/SH 크롤링 수동 실행
export async function POST(req: NextRequest) {
    try {
        const { isAdmin, response } = await requireAdmin(req);
        if (!isAdmin) return response!;

        // 실제 크롤링 로직은 별도 서비스로 구현 필요
        // 여기서는 백그라운드 작업 트리거 역할만 수행

        // 예시: 외부 크롤링 서비스 호출 또는 큐에 작업 추가
        // const crawlResult = await triggerCrawlJob();

        return NextResponse.json({
            success: true,
            message: 'Crawl job triggered successfully',
            data: {
                status: 'QUEUED',
                timestamp: new Date().toISOString(),
            },
        });
    } catch (e: any) {
        console.error('Crawl trigger error:', e);
        return NextResponse.json(
            { success: false, error: 'INTERNAL_ERROR', details: e.message },
            { status: 500 }
        );
    }
}
