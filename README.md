# 첫방 (Cheotbang)

사회초년생을 위한 첫 독립 주거 플랫폼입니다. 예산·직장 위치·라이프스타일을 분석해 맞춤 주거 형태를 추천하고, 공공임대 매칭부터 계약 가이드까지 독립의 모든 과정을 도와드립니다.

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| **주거 진단** | 소득·저축·직장 위치·라이프스타일 기반 맞춤 주거 유형 추천 |
| **공공임대 검색** | 행복주택·청년주택 등 공공데이터 기반 안심 매물 탐색 |
| **지역 분석** | TMAP·카카오맵으로 직장 기준 최적 거주 지역 분석 |
| **예산 계산기** | 전세/월세 가능 여부, 추천 보증금·월세 산출 |
| **AI 주거 상담** | Claude 기반 챗봇으로 계약·전세·월세 등 궁금증 즉시 해결 |
| **계약 가이드** | 처음 계약하는 사람을 위한 단계별 체크리스트 |
| **진단·상담 이력** | 이전 주거 진단 결과 및 채팅 세션 저장·조회 |

---

## 기술 스택

**Frontend**
- Next.js 16 (App Router), React 19
- Tailwind CSS v4
- react-hook-form + Zod

**Backend**
- Next.js API Routes
- Supabase (Auth, Database)

**AI / 지도**
- Anthropic Claude API (`@anthropic-ai/sdk`)
- Kakao Maps SDK

**개발 도구**
- Storybook 10, Vitest, Playwright
- Prettier, ESLint

**배포**
- Vercel

---

## 시작하기

### 사전 요구사항

- Node.js 18.0.0 이상
- Bun 1.0.0 이상

### 설치 및 실행

```bash
# 의존성 설치
bun install

# 개발 서버 실행
bun dev
```

브라우저에서 `http://localhost:3000`을 열어 확인하세요.

---

## 환경 변수 설정

`.env.local` 파일을 생성하고 아래 값을 채워주세요.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ANTHROPIC_API_KEY=your_anthropic_api_key
NEXT_PUBLIC_KAKAO_APP_KEY=your_kakao_app_key
```

Supabase 설정은 [SUPABASE_SETUP.md](SUPABASE_SETUP.md), 관리자 계정 생성은 [ADMIN_SETUP.md](ADMIN_SETUP.md)를 참고하세요.

---

## 스크립트

```bash
bun dev          # 개발 서버 실행
bun build        # 프로덕션 빌드
bun start        # 프로덕션 서버 실행
bun lint         # ESLint 실행
bun format       # Prettier 포맷팅
bun storybook    # Storybook 실행 (localhost:6006)
bun create-admin # 관리자 계정 생성
```

---

## 페이지 구조

```
/                   랜딩 페이지
/search             주거 검색
/housing/plan       주거 진단 (단계별 폼)
/housing/history    진단 이력
/public-housing     공공임대 목록
/public-housing/[id] 공공임대 상세
/chat               AI 주거 상담 챗봇
/chat/history       상담 이력
/guides             계약 가이드
/tools/budget       예산 계산기
/profile            내 프로필
/admin              관리자 페이지
```

---

## 배포

GitHub에 푸시하면 Vercel을 통해 자동 배포됩니다.

---

## 라이선스

이 프로젝트는 Proprietary License 하에 있습니다. 모든 권리는 보유되어 있으며, 무단 복사·수정·배포·사용이 금지됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.
