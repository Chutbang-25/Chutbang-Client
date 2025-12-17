# 관리자 계정 설정 가이드

## 📋 관리자 이메일 및 비밀번호

환경 변수(.env.local)에 설정된 관리자 정보:
- **이메일**: `admin@chutbang.com`
- **비밀번호**: `admin123!@#`

## 🚀 관리자 계정 생성 방법

### 방법 1: 회원가입 페이지에서 생성 (권장)

1. 앱 실행:
   ```bash
   bun run dev
   ```

2. 회원가입 페이지로 이동:
   - http://localhost:3000/signup

3. 관리자 정보로 회원가입:
   - 이메일: `admin@chutbang.com`
   - 닉네임: `Admin`
   - 비밀번호: `admin123!@#`

4. 로그인:
   - http://localhost:3000/login
   - 위 정보로 로그인

5. 관리자 페이지 접속:
   - http://localhost:3000/admin

### 방법 2: Supabase 대시보드에서 권한 부여

만약 이미 다른 이메일로 회원가입했고 그 계정을 관리자로 만들고 싶다면:

1. Supabase 대시보드 접속:
   - https://supabase.com/dashboard/project/ruufnnrykhnftnnvnssk

2. Authentication > Users 메뉴로 이동

3. 관리자로 지정할 사용자 찾기

4. 사용자 클릭 > User Metadata 수정:
   ```json
   {
     "role": "admin",
     "nickname": "Admin"
   }
   ```

5. Save 클릭

## 🔐 관리자 인증 방식

관리자 페이지(/admin)는 다음 두 가지 방법으로 인증합니다:

1. **이메일 기반**:
   - 로그인한 사용자의 이메일이 `ADMIN_EMAIL` 환경 변수와 일치
   - `.env.local`의 `ADMIN_EMAIL=admin@chutbang.com`

2. **메타데이터 기반**:
   - 사용자의 `user_metadata.role`이 `'admin'`

둘 중 하나만 만족하면 관리자로 인정됩니다.

## 📂 관리자 기능

관리자 페이지에서 사용 가능한 기능:

### 1. 공공임대 관리
- **추가**: 새로운 공공임대 정보 등록
- **삭제**: 기존 공공임대 정보 삭제
- **조회**: 모든 공공임대 목록 확인

### 2. 크롤링
- **수동 실행**: LH/SH 크롤링 작업 트리거

## 🔧 API 엔드포인트

관리자 전용 API:

```
POST   /api/admin/public-housing          # 공공임대 등록
DELETE /api/admin/public-housing/{id}     # 공공임대 삭제
POST   /api/admin/public-housing/sync     # 크롤링 실행
```

모든 요청에 `Authorization: Bearer {token}` 헤더 필요

## ⚠️ 주의사항

1. **환경 변수 보안**
   - `.env.local` 파일은 절대 Git에 커밋하지 마세요
   - 프로덕션 환경에서는 강력한 비밀번호 사용

2. **권한 확인**
   - 관리자 권한이 제대로 부여되었는지 확인
   - 일반 사용자가 관리자 페이지에 접근할 수 없는지 테스트

3. **로그 모니터링**
   - 관리자 작업은 서버 로그로 기록됨
   - 의심스러운 활동 모니터링

## 🧪 테스트

관리자 기능 테스트:

1. 로그인 후 `/admin` 접속
2. 공공임대 추가 버튼 클릭
3. 테스트 데이터 입력 후 등록
4. 목록에서 데이터 확인
5. 삭제 기능 테스트

## 📞 문제 해결

### 403 Forbidden 에러
- 관리자 권한이 제대로 부여되었는지 확인
- `.env.local`의 `ADMIN_EMAIL`이 올바른지 확인
- 로그인한 계정이 관리자 계정인지 확인

### 401 Unauthorized 에러
- localStorage에 토큰이 저장되어 있는지 확인
- 토큰이 만료되지 않았는지 확인
- 다시 로그인 시도

### 크롤링 실행 안됨
- 크롤링 서비스가 구현되어 있는지 확인
- 현재는 작업 트리거만 구현됨
- 실제 크롤링 로직은 별도 구현 필요
