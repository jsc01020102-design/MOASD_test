# ⚡ (주)MOASD Portfolio & Enterprise B2B Partnership Suite

(주)모아에스디(MOASD)의 정밀 하이브리드 전력망 분산 제어 솔루션, 지능형 에너지 그리드 연계 시뮬레이터, 그리고 엔터프라이즈 제어 도면 및 SAM 연구사 기술 분석서 열람·다운로드를 지원하는 전문적인 B2B 이니셔티브 포트폴리오 플랫폼입니다.

본 플랫폼은 고해상도 다크 모드 테마, 다국어(한국어 & 영어)의 매끄러운 토글 기능, 실시간 전력 데이터 공급 대시보드, 그리고 파트너 등급별 체계적인 보안 권한 컨트롤 시스템을 구비하고 있습니다.

---

## 🚀 주요 탑재 기능

1. **지능형 하이브리드 전력 시뮬레이터 (B2B Dashboard)**
   - 대단위 풍력, 신재생 태양광, 마이크로그리드 ESS 계통의 시시각각 변하는 복합 전력 출력 및 주파수, 전압 역량 실시간 시각적 그래프 구동.
   - 피크 부하 제어 알고리즘 및 예측 모델 시뮬레이션 인터페이스.

2. **철저한 등급별 멤버십 & 로그인 포탈 웹 콘솔**
   - **B2B 파트너 포탈**: 코드번호 형식(`M-[숫자]`)으로 고속 인증 및 전력 도면 다이렉트 무제한 다운로드 승인.
   - **일반 회원 포탈**: 이메일 아이디를 통하여 로그인 완료 후, 상세 제어 수치 열람 및 대시보드 접근 활성화 (다운로드 요청 필요).
   - **관제 마스터 / 마스터 관리자**: 전력 관제 콘솔에서 권한 코드번호 입력 또는 로그인 완료 시, 지식재산 보호 수칙에 따른 열람 및 다운로드 등급이 최고등급 파트너 권한으로 자동 연계 및 동기화 처리.

3. **고급 지식재산권(IP) 보호 & 다운로드 권한 제어**
   - 로그인되지 않은 비회원 상태의 경우 중요 도면, SAM 분석 라이선스 파일 등 기밀 정보의 보안 열람 및 다운로드가 엄격하게 차단됩니다.
   - 관리자(마스터 포함)가 관리자 단락에서 정상적으로 로그인한 상태인 경우, 별도의 일반 회원가입 없이도 일반 사용자 뷰에서 도면 정보와 다운로드를 영구 프리패스할 수 있도록 전력 데이터 실시간 동기화가 반영되어 있습니다.
   - 로그아웃하는 경우, 시스템 세션과 LocalStorage에서 인증 정보가 남지 않고 완전 회수되어 보안 기밀 상태로 즉시 유지 및 초기화됩니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Library & Framework**: React 19, TypeScript
- **Bundler & Build System**: Vite 6, `tsconfig`
- **Utility Styling**: Tailwind CSS v4 (고출력 현대화 클래스 및 가변 커스텀 유틸리티 테마 엔진)
- **Animation Suite**: Motion (`motion/react` 기반의 부드러운 상태 전환 및 모달 팝업 페이드인)
- **Icon Set**: Lucide-React
- **Hosting Config**: Netlify Zero-Config 통합 (`netlify.toml` 기반)

---

## 💻 로컬 개발 환경 실행 방법

실행하기 위해 로컬 컴퓨터에 Node.js 가 설치되어 있는지 사전에 체크해 주십시오.

1. **패키지 설치**
   ```bash
   npm install
   ```

2. **로컬 개발 서버 기동 (Vite Dev Server)**
   ```bash
   npm run dev
   ```
   실행 완료 후, 브라우저에서 `http://localhost:3000` 접속 환경으로 원활한 시뮬레이션 및 테스트가 진행됩니다.

3. **프로젝트 빌드 테스트**
   ```bash
   npm run build
   ```
   컴파일 에러 혹은 빌드 누수가 없는지 검증합니다. 결과물은 `/dist` 폴더 안에 완벽한 정적 빌드 파일로 저장됩니다.

---

## 🌐 GitHub 연동 & Netlify 배포 가이드

깃허브(GitHub)에 업로드하여 넷리파이(Netlify)로 아주 손쉽게 완전 무중단 배포를 달성할 수 있습니다. 이미 프로젝트 루트에 설정되어 있는 **`netlify.toml`** 설정이 모든 빌드 환경 구성을 알아서 처리해 드립니다.

### 1단계: GitHub에 소스코드 푸시하기
로컬 PC의 터미널(Command Prompt 또는 Bash)에서 아래의 명령을 차례대로 작성하여 새로운 GitHub 레포지토리에 소스코드를 연동합니다.

```bash
# 1. git 저장소 초기화
git init

# 2. 변경된 파일 전체 추가
git add .

# 3. 최초 배포용 커밋 생성
git commit -m "feat: init MOASD clean static framework for netlify"

# 4. 깃허브 기본 브랜치를 main으로 설정
git branch -M main

# 5. 본인의 GitHub 신규 원격 레포지토리 연결 (사용자의 레포지토리 주소로 변경하여 입력)
git remote add origin https://github.com/사용자이름/레포지토리이름.git

# 6. 원격 레포지토리에 소스 푸시하기
git push -u origin main
```

---

### 2단계: Netlify에 초고속 배포하기
1. [Netlify Web Console (netlify.com)](https://www.netlify.com) 에 방문하여 로그인/가입합니다.
2. 대시보드에서 **"Add new site"** 버튼을 누른 후 **"Import an existing project"**를 선택합니다.
3. 소스코드 저장소인 **"GitHub"** 서비스 연동에 동의를 진행한 다음, 위에서 생성한 `레포지토리`를 클릭해 지정합니다.
4. **Build settings** 항목은 프로젝트 루트에 자동 생성되어 탑재된 `netlify.toml` 설정 파일 덕분에 **환경 변수나 컴파일 명령어를 따로 수동 설정할 필요가 전혀 없습니다!**
   - *자동 주입 내역*:
     - **Build Command**: `npm run build`
     - **Publish Directory**: `dist`
     - **Redirects**: SPAs 라우팅 유지를 위한 200 Fallback `/index.html` 설정
5. 최하단의 **"Deploy <사이트명>"** 버튼을 클릭하면 약 1분 이내에 글로벌 라이브 URL로 완전 무중단 자동 배포가 완료됩니다!
6. 이후, GitHub 레포지토리로 `git push`가 새롭게 발생할 때마다 Netlify에서 자동으로 변경사항 빌드를 감지하고 최상위 갱신 배포를 지속 수행합니다.

---

## 🔒 라이선스 및 지식재산권 수칙
본 소프트웨어와 포함된 하이브리드 설계 도면 및 특허SAM 연구 분석서는 **(주)MOASD**의 중요 지식재산권 보호 구문에 의해 보호되고 있습니다. 비인가적인 전송, 디컴파일 및 제3자 배포는 엄격히 엄금됩니다.
