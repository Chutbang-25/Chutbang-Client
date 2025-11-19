Chutbang
집사 (Jipsa) 팀의 프로젝트입니다.

📋 프로젝트 개요
Chutbang 프로젝트입니다.

🚀 시작하기
사전 요구사항
Node.js 18.0.0 이상
Bun 1.0.0 이상 (또는 npm/yarn)
설치 및 실행
# 의존성 설치
bun install

# 개발 서버 실행
bun dev
브라우저에서 http://localhost:3000을 열어 확인하세요.

🛠️ 기술 스택
Frontend: Next.js 14, Emotion-CSS, Framer Motion
Backend: Next.js API Routes, Supabase
AI: Gemini API
배포: Vercel
자세한 내용은 기술 스택 문서를 참고하세요.

📚 문서
개발 가이드 - 개발 환경 설정 및 시작하기
코드 컨벤션 - 코딩 스타일 가이드
브랜치 전략 - Git Flow 전략
기술 스택 - 사용 기술 및 라이브러리
📝 스크립트
# 개발 서버 실행
bun dev

# 프로덕션 빌드
bun build

# 프로덕션 서버 실행
bun start

# ESLint 실행
bun lint

# ESLint 자동 수정
bun lint:fix

# Prettier 포맷팅
bun format

# Prettier 체크
bun format:check

# TypeScript 타입 체크
bun type-check
🔧 개발 환경 설정
환경 변수 설정을 위해 .env.local 파일을 생성하세요:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GEMINI_API_KEY=your_gemini_api_key
자세한 설정 방법은 개발 가이드를 참고하세요.

🚢 배포
Vercel을 통해 자동 배포됩니다. GitHub에 푸시하면 자동으로 배포됩니다.

📄 라이선스
이 프로젝트는 Proprietary License 하에 있습니다. 모든 권리는 보유되어 있으며, 무단 복사, 수정, 배포 또는 사용이 금지됩니다.

자세한 내용은 LICENSE 파일을 참고하세요.