# Supabase 설정 가이드

## ⚠️ 현재 문제

현재 `.env.local`에 설정된 Supabase URL이 유효하지 않습니다:
```
ruufnnrykhnftnnvnssk.supabase.co - Unknown host
```

## 🚀 해결 방법

### 1. 새 Supabase 프로젝트 생성

#### Step 1: Supabase 대시보드 접속
1. https://supabase.com/dashboard 방문
2. GitHub 계정으로 로그인

#### Step 2: 새 프로젝트 생성
1. "New Project" 버튼 클릭
2. 다음 정보 입력:
   - **Organization**: 기존 조직 선택 또는 새로 생성
   - **Project Name**: `chutbang` (또는 원하는 이름)
   - **Database Password**: 강력한 비밀번호 생성 (꼭 저장!)
   - **Region**: `Northeast Asia (Seoul)` 선택
   - **Pricing Plan**: Free 선택
3. "Create new project" 클릭
4. 프로젝트 생성 완료까지 1-2분 대기

#### Step 3: API 키 복사
1. 프로젝트 대시보드에서 `Settings` > `API` 메뉴 이동
2. 다음 정보 복사:

   **Project URL**:
   ```
   예: https://abcdefghijklmnop.supabase.co
   ```

   **API Keys**:
   - `anon public` - 공개 키
   - `service_role` - 서비스 롤 키 (Reveal 버튼 클릭하여 확인)

#### Step 4: .env.local 업데이트
`.env.local` 파일을 열고 다음 값을 업데이트:

```env
# ==== SUPABASE ====
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# ==== ADMIN ====
ADMIN_EMAIL=admin@chutbang.com
ADMIN_PASSWORD=admin123!@#
```

#### Step 5: 개발 서버 재시작
```bash
# Ctrl+C로 서버 중지 후
bun run dev
```

### 2. 데이터베이스 테이블 생성

Supabase SQL Editor에서 다음 SQL 실행:

#### user_profiles 테이블
```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  age INTEGER,
  income INTEGER NOT NULL,
  savings INTEGER NOT NULL,
  work_address TEXT,
  work_lat DOUBLE PRECISION,
  work_lng DOUBLE PRECISION,
  commute_max_minutes INTEGER,
  commute_transport TEXT CHECK (commute_transport IN ('PUBLIC', 'CAR', 'MIXED')),
  household_type TEXT CHECK (household_type IN ('ALONE', 'ROOMMATE')),
  has_pet BOOLEAN DEFAULT false,
  priority_safety INTEGER,
  priority_commute INTEGER,
  priority_price INTEGER,
  priority_comfort INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- RLS 활성화
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 프로필만 조회/수정 가능
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

#### housing_sessions 테이블
```sql
CREATE TABLE housing_sessions (
  session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  result JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE housing_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions"
  ON housing_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
  ON housing_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

#### public_housing 테이블
```sql
CREATE TABLE public_housing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  city TEXT NOT NULL,
  district TEXT NOT NULL,
  address TEXT NOT NULL,
  scale TEXT,
  household_count INTEGER,
  application_start DATE NOT NULL,
  application_end DATE NOT NULL,
  move_in_date DATE,
  price_range TEXT,
  qualification TEXT,
  url TEXT,
  contact TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화 (모든 사용자가 읽기 가능)
ALTER TABLE public_housing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public housing is viewable by everyone"
  ON public_housing FOR SELECT
  USING (true);

-- 관리자만 CRUD 가능 (서비스 롤 키 사용)
```

#### chat_sessions 테이블
```sql
CREATE TABLE chat_sessions (
  session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  messages JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chat sessions"
  ON chat_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat sessions"
  ON chat_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chat sessions"
  ON chat_sessions FOR UPDATE
  USING (auth.uid() = user_id);
```

#### contract_checklists 테이블
```sql
CREATE TABLE contract_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stage TEXT NOT NULL CHECK (stage IN ('PRE_CONTRACT', 'CONTRACT', 'POST_CONTRACT')),
  "order" INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  is_critical BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화 (모든 사용자가 읽기 가능)
ALTER TABLE contract_checklists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Checklists are viewable by everyone"
  ON contract_checklists FOR SELECT
  USING (true);

-- 샘플 데이터 삽입
INSERT INTO contract_checklists (stage, "order", title, description, is_critical) VALUES
('PRE_CONTRACT', 1, '등기부등본 확인', '소유권, 근저당권, 전세권 등을 확인하세요', true),
('PRE_CONTRACT', 2, '건축물대장 확인', '실제 사용 가능한 면적과 용도를 확인하세요', true),
('PRE_CONTRACT', 3, '실제 방문 확인', '낮과 밤, 평일과 주말에 방문하여 환경을 확인하세요', false),
('CONTRACT', 1, '계약서 꼼꼼히 읽기', '특약사항을 반드시 확인하고 이해하세요', true),
('CONTRACT', 2, '중개수수료 확인', '법정 중개수수료를 초과하지 않는지 확인하세요', true),
('CONTRACT', 3, '계약금 지급', '현금보다는 계좌이체를 이용하고 영수증을 보관하세요', true),
('POST_CONTRACT', 1, '전입신고', '계약 후 14일 이내에 전입신고를 하세요', true),
('POST_CONTRACT', 2, '확정일자 받기', '전월세 계약서에 확정일자를 받으세요', true),
('POST_CONTRACT', 3, '잔금 지급 및 입주', '열쇠 수령 전에 집 상태를 다시 확인하세요', false);
```

### 3. Authentication 설정

Supabase Dashboard > Authentication > Settings:

1. **Email Auth 활성화**:
   - `Enable Email Signup` 체크
   - `Enable Email Confirmations` 체크 해제 (개발 중)

2. **Site URL 설정**:
   - `http://localhost:3000`

3. **Redirect URLs 추가**:
   - `http://localhost:3000/login`
   - `http://localhost:3000/signup`

### 4. 환경 변수 추가

Claude API를 사용하려면:

```env
# ==== ANTHROPIC ====
ANTHROPIC_API_KEY=your-anthropic-api-key-here
```

Anthropic Console에서 API 키 발급:
- https://console.anthropic.com/

## ✅ 완료 체크리스트

- [ ] Supabase 프로젝트 생성
- [ ] .env.local 업데이트
- [ ] 모든 테이블 생성
- [ ] RLS 정책 설정
- [ ] Authentication 설정
- [ ] 개발 서버 재시작
- [ ] 관리자 계정 생성
- [ ] Claude API 키 설정 (선택사항)

## 🧪 테스트

1. 회원가입: http://localhost:3000/signup
2. 로그인: http://localhost:3000/login
3. 프로필: http://localhost:3000/profile
4. 공공임대: http://localhost:3000/public-housing
5. 관리자: http://localhost:3000/admin

## ❓ 문제 해결

### "fetch failed" 에러
- .env.local의 Supabase URL 확인
- 개발 서버 재시작

### "UNAUTHORIZED" 에러
- 로그인 되어있는지 확인
- localStorage에 토큰이 있는지 확인 (개발자 도구 > Application > Local Storage)

### 테이블 없음 에러
- SQL Editor에서 테이블 생성 SQL 실행 확인
- Table Editor에서 테이블 목록 확인
