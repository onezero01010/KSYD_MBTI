# 일꾼 TEST 구현 계획서

> 기준 자료  
> - 레퍼런스 페이지: `https://kongbiti.netlify.app/result`  
> - 사용자 제공 레퍼런스 이미지: 결과 상세 페이지 + 모든 유형 모아보기 화면  
> - 이전 생성 콘텐츠: 16개 MBTI별 일꾼 유형 분석 문구  
> - 테스트 콘셉트: **IV. Q카드 3. - 일꾼 TEST(QR코드)**  
> - 서사 구조: **카나의 혼인잔치 / 예상치 못한 위기 → 순명과 실천 → 기적의 발견과 파견**

---

## 1. 프로젝트 목표

QR코드를 통해 접속하는 모바일 중심의 **일꾼 TEST** 웹 페이지를 구현한다.

사용자는 12개의 A/B 문항에 응답하고, 응답 결과에 따라 MBTI 기반 16개 일꾼 유형 중 하나를 받는다. 결과 페이지는 레퍼런스 페이지처럼 다음 구조를 가진다.

1. 상단 성향 키워드와 MBTI 표기
2. 유형명
3. 캐릭터 일러스트
4. 짧은 소개 박스
5. 유형 분석 bullet
6. 결과 저장/공유/다시하기 CTA
7. 모든 유형 모아보기 그리드

---

## 2. 권장 기술 스택

### 2.1 프론트엔드

- **React + Vite + TypeScript**
- 스타일링: CSS Modules 또는 Tailwind CSS
- 배포: Netlify 또는 Vercel
- 정적 데이터 기반 구현

### 2.2 주요 라이브러리 후보

| 목적 | 후보 |
|---|---|
| 라우팅 | `react-router-dom` |
| 결과 이미지 저장 | `html-to-image` 또는 `dom-to-image-more` |
| QR 코드 생성 | `qrcode` 또는 배포 후 외부 QR 생성 |
| 공유 | Web Share API + Clipboard API |
| 상태 저장 | `localStorage` |

> MVP에서는 별도 백엔드 없이 정적 데이터와 클라이언트 계산만으로 구현한다.

---

## 3. 전체 사용자 플로우

```text
QR코드 스캔
  ↓
/worker-test
  ↓
인트로 화면
  ↓
12문항 테스트 진행
  ↓
결과 계산
  ↓
/worker-test/result/:mbti
  ↓
결과 상세 페이지
  ↓
다시하기 / 모든 유형 보기 / 결과 공유 / 이미지 저장
```

---

## 4. URL 설계

| 경로 | 용도 |
|---|---|
| `/worker-test` | 테스트 인트로 |
| `/worker-test/questions` | 문항 진행 화면 |
| `/worker-test/result/:mbti` | 특정 MBTI 결과 상세 |
| `/worker-test/result` | 모든 유형 모아보기 |
| `/worker-test/share/:mbti` | 선택 사항. 공유 전용 랜딩 |

### 4.1 QR코드 연결 주소

QR코드는 최종 배포 주소의 테스트 인트로로 연결한다.

```text
https://{배포도메인}/worker-test
```

예시:

```text
https://example.netlify.app/worker-test
```

---

## 5. 화면 구성 계획

## 5.1 인트로 화면

### 목적

사용자가 QR코드로 접속했을 때 테스트의 맥락을 이해하고 시작하도록 한다.

### 주요 요소

- 타이틀: `일꾼 TEST`
- 서브타이틀: `카나의 혼인잔치에서 나는 어떤 일꾼일까?`
- 설명 문구:
  - `예상치 못한 위기 앞에서, 나는 어떻게 알아차리고 움직이고 기뻐할까요?`
- CTA:
  - `테스트 시작하기`
- 보조 버튼:
  - `모든 유형 먼저 보기`

### 레이아웃

```text
[캐릭터 또는 물독/포도주 일러스트]
일꾼 TEST
카나의 혼인잔치에서 나는 어떤 일꾼일까?
[테스트 시작하기]
[모든 유형 보기]
```

---

## 5.2 문항 화면

### 목적

12개의 A/B 문항을 단계별로 보여주고, 사용자가 자연스럽게 응답하도록 한다.

### 화면 요소

- 현재 진행률: `1 / 12`
- Phase 라벨
- 문항 텍스트
- A 선택지 카드
- B 선택지 카드
- 이전/다음 버튼
- 진행 바

### Phase 구성

| Phase | 제목 | 문항 수 |
|---|---|---:|
| Phase 1 | 예상치 못한 위기와 성모님의 알아챔 | 6 |
| Phase 2 | “그가 시키는 대로 하여라” | 3 |
| Phase 3 | 기적의 발견과 기쁜 파견 | 3 |

### UX 정책

- 선택지를 누르면 자동으로 다음 문항으로 이동해도 된다.
- 단, 사용자가 실수했을 때 돌아갈 수 있도록 `이전` 버튼을 둔다.
- 마지막 문항 응답 후 `결과 보기` 버튼을 노출한다.
- 모든 문항 응답 전에는 결과 계산을 막는다.

---

## 5.3 결과 상세 화면

레퍼런스 결과 화면의 구조를 따른다.

### 화면 구조

```text
[상단 키워드 · MBTI]
[유형명]

[캐릭터 일러스트]

[요약 박스]
유형명은
한두 문장 소개

[유형 분석 bullet 4~5개]

[관계 유형 카드 2개 - 선택 구현]
[결과 저장 안내]
[다시하기 버튼]
[모든 유형 보기 버튼]

[광고 또는 여백 - 선택]
[모든 유형 모아보기 섹션]
```

### 결과 페이지 필수 요소

| 요소 | 구현 여부 |
|---|---|
| MBTI 표기 | 필수 |
| 유형명 | 필수 |
| 캐릭터 이미지 | 필수 |
| 요약 박스 | 필수 |
| 유형 분석 bullet | 필수 |
| 한 줄 요약 | 권장 |
| 다시하기 CTA | 필수 |
| 모든 유형 보기 CTA | 필수 |
| URL 공유 | 권장 |
| 결과 이미지 저장 | 권장 |
| 광고 영역 | 선택 |

---

## 5.4 모든 유형 모아보기 화면

레퍼런스 페이지의 `모든 유형 모아보기` 구조를 반영한다.

### 화면 구조

```text
[상단 캐릭터]
콩비티아이 / 일꾼 TEST
모든 유형 모아보기

[2열 카드 그리드]
- 이미지
- 성향 키워드 · MBTI
- 유형명
- 화살표 또는 더보기 표시

[아직 테스트 전이라면?]
[테스트 하러가기]
```

### 카드 클릭 동작

각 카드 클릭 시 해당 결과 상세 페이지로 이동한다.

```text
/worker-test/result/estp
/worker-test/result/istp
...
```

---

## 6. 디자인 가이드

## 6.1 전체 톤

- 귀엽고 단순한 캐릭터 중심
- 흰 배경
- 중앙 정렬
- 모바일 우선
- 둥근 카드
- 짧고 읽기 쉬운 문장
- 레퍼런스처럼 유형별 결과를 “가볍지만 따뜻한 성격 분석” 톤으로 표현

## 6.2 레이아웃 기준

| 항목 | 값 |
|---|---|
| 최대 콘텐츠 폭 | `390px ~ 430px` |
| 기본 배경 | `#FFFFFF` |
| 카드 배경 | `#F8F8F8` |
| 본문 글자색 | `#333333` |
| 제목 글자색 | `#111111` |
| 보조 글자색 | `#777777` |
| 강조 빨강 | `#E74C3C` |
| CTA 초록 | `#25C96A` |
| 카드 radius | `12px ~ 20px` |
| 버튼 radius | `8px ~ 12px` |

## 6.3 타이포그래피

시스템 폰트를 사용한다.

```css
font-family:
  -apple-system,
  BlinkMacSystemFont,
  "Apple SD Gothic Neo",
  "Pretendard",
  "Noto Sans KR",
  "Segoe UI",
  sans-serif;
```

## 6.4 결과 화면 디자인 규칙

- 상단 키워드는 작고 연한 회색
- 유형명은 크고 진하게
- 캐릭터 이미지는 중앙 배치
- 요약 박스는 연회색 배경
- bullet의 점은 빨강 계열
- CTA는 회색 버튼 + 초록 버튼 조합
- 모든 유형 카드 그리드는 2열

---

## 7. 데이터 설계

## 7.1 질문 데이터 타입

```ts
type Dimension = "EI" | "SN" | "TF" | "JP";
type Letter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

interface QuestionOption {
  label: "A" | "B";
  text: string;
  value: Letter;
}

interface Question {
  id: string;
  phase: 1 | 2 | 3;
  phaseTitle: string;
  dimension: Dimension;
  prompt: string;
  options: [QuestionOption, QuestionOption];
}
```

---

## 7.2 질문 데이터

```ts
export const questions: Question[] = [
  {
    id: "p1-q1",
    phase: 1,
    phaseTitle: "예상치 못한 위기와 성모님의 알아챔",
    dimension: "SN",
    prompt: "예식 중 테이블이 조금 기울어진 것 같다. 당신은?",
    options: [
      { label: "A", text: "헉 테이블 약간 기울어졌는데 여기에 뭘 받치면 되겠다!", value: "S" },
      { label: "B", text: "테이블? 테이블이 기울어졌었어? 나는 몰랐네…", value: "N" }
    ]
  },
  {
    id: "p1-q2",
    phase: 1,
    phaseTitle: "예상치 못한 위기와 성모님의 알아챔",
    dimension: "TF",
    prompt: "예식 중 작은 실수가 발생한 것을 보았을 때 당신은?",
    options: [
      { label: "A", text: "이렇게 해야 효율적이지 않나? 대처가 좀 아쉽다.", value: "T" },
      { label: "B", text: "신랑 신부 당황하는 거 아냐? 내가 다 걱정되네.", value: "F" }
    ]
  },
  {
    id: "p1-q3",
    phase: 1,
    phaseTitle: "예상치 못한 위기와 성모님의 알아챔",
    dimension: "JP",
    prompt: "잔치 식순이 갑자기 바뀌어야 하는 상황이 온다면?",
    options: [
      { label: "A", text: "원래 식사부터 하는 거 아냐? 이유가 있어서 순서가 바뀌었나보네", value: "J" },
      { label: "B", text: "오 이거부터 하는구나~ 오히려 좋아~ 재밌겠다!", value: "P" }
    ]
  },
  {
    id: "p1-q4",
    phase: 1,
    phaseTitle: "예상치 못한 위기와 성모님의 알아챔",
    dimension: "TF",
    prompt: "포도주가 바닥난 위기 상황을 알게 되었을 때 당신의 반응은?",
    options: [
      { label: "A", text: "헉 큰일이다! 나라도 어디 가서 포도주라도 사와야 하나?", value: "T" },
      { label: "B", text: "혼주들 준비 열심히 했을텐데… 가서 위로라도 해줘야겠다.", value: "F" }
    ]
  },
  {
    id: "p1-q5",
    phase: 1,
    phaseTitle: "예상치 못한 위기와 성모님의 알아챔",
    dimension: "EI",
    prompt: "위기 상황에서 동료 일꾼들과 소통할 때 당신은?",
    options: [
      { label: "A", text: "“여러분 포도주가 없대요!” 즉시 상황을 알리고 대책을 논의한다.", value: "E" },
      { label: "B", text: "일이 해결될 거라고 믿고 상황을 지켜보며 지시를 기다린다.", value: "I" }
    ]
  },
  {
    id: "p1-q6",
    phase: 1,
    phaseTitle: "예상치 못한 위기와 성모님의 알아챔",
    dimension: "SN",
    prompt: "“포도주가 없구나” 하시는 성모님의 말씀을 들었을 때 당신은?",
    options: [
      { label: "A", text: "“포도주가 없다고? 그럼 이제 잔치 끝인가?” 걱정이 든다.", value: "S" },
      { label: "B", text: "“성모님이 나서신 거 보니 뭔가 대단한 일이 일어날 것 같아!”", value: "N" }
    ]
  },
  {
    id: "p2-q1",
    phase: 2,
    phaseTitle: "그가 시키는 대로 하여라",
    dimension: "SN",
    prompt: "예수님이 “물독에 물을 채워라”고 하셨다. 나의 머릿속은?",
    options: [
      { label: "A", text: "흘리지 말고 정확히 채워야지!", value: "S" },
      { label: "B", text: "이 물이 어떻게 변할까?", value: "N" }
    ]
  },
  {
    id: "p2-q2",
    phase: 2,
    phaseTitle: "그가 시키는 대로 하여라",
    dimension: "JP",
    prompt: "이제 우물가로 물을 뜨러 가야 한다. 나의 이동 스타일은?",
    options: [
      { label: "A", text: "최단 동선으로 가자!", value: "J" },
      { label: "B", text: "보이는 것부터 하자!", value: "P" }
    ]
  },
  {
    id: "p2-q3",
    phase: 2,
    phaseTitle: "그가 시키는 대로 하여라",
    dimension: "EI",
    prompt: "무거운 물독을 채우는 지루한 노동 중이다. 나는 지금?",
    options: [
      { label: "A", text: "여러분, 조금만 더 힘내요!", value: "E" },
      { label: "B", text: "말없이 내 몫에 집중한다.", value: "I" }
    ]
  },
  {
    id: "p3-q1",
    phase: 3,
    phaseTitle: "기적의 발견과 기쁜 파견",
    dimension: "EI",
    prompt: "헐 대박! 물이 포도주로 변했다! 나의 첫 행동은?",
    options: [
      { label: "A", text: "대박! 이것 좀 보세요!", value: "E" },
      { label: "B", text: "와… 진짜 일어났네.", value: "I" }
    ]
  },
  {
    id: "p3-q2",
    phase: 3,
    phaseTitle: "기적의 발견과 기쁜 파견",
    dimension: "TF",
    prompt: "과방장이 “포도주 맛 실화냐? 최고다!”라고 칭찬한다. 이때 드는 생각은?",
    options: [
      { label: "A", text: "말씀대로 하니까 됐네!", value: "T" },
      { label: "B", text: "우리를 써주시다니 감사하다.", value: "F" }
    ]
  },
  {
    id: "p3-q3",
    phase: 3,
    phaseTitle: "기적의 발견과 기쁜 파견",
    dimension: "JP",
    prompt: "잔치가 끝나고 드디어 뒷정리 시간! 지친 나는?",
    options: [
      { label: "A", text: "정해진 순서대로 빨리 치우자!", value: "J" },
      { label: "B", text: "오늘 진짜 대박이었죠?", value: "P" }
    ]
  }
];
```

---

## 8. 결과 계산 로직

## 8.1 차원별 문항 수

각 차원은 3문항씩 배치되어 있다.

| 차원 | 문항 수 |
|---|---:|
| E/I | 3 |
| S/N | 3 |
| T/F | 3 |
| J/P | 3 |

문항 수가 홀수이므로 동점이 발생하지 않는다.

## 8.2 계산 방식

```ts
type Scores = {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
};

function calculateResult(answers: Record<string, Letter>): string {
  const scores: Scores = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0
  };

  Object.values(answers).forEach((letter) => {
    scores[letter] += 1;
  });

  const ei = scores.E > scores.I ? "E" : "I";
  const sn = scores.S > scores.N ? "S" : "N";
  const tf = scores.T > scores.F ? "T" : "F";
  const jp = scores.J > scores.P ? "J" : "P";

  return `${ei}${sn}${tf}${jp}`;
}
```

---

## 9. 결과 콘텐츠 데이터 구조

## 9.1 결과 타입

```ts
interface ResultBullet {
  title: string;
  body: string;
}

interface WorkerResult {
  mbti: string;
  typeName: string;
  topKeyword: string;
  shortDescription: string;
  summary: string;
  bullets: ResultBullet[];
  oneLine: string;
  image: string;
  tags?: string[];
  related?: {
    label: string;
    mbti: string;
  }[];
}
```

---

## 9.2 결과 타입 전체 목록

| MBTI | 유형명 | 상단 키워드 | 한 줄 분석 |
|---|---|---|---|
| ESTP | 번쩍해결꾼 | 위기순발 | 위기가 오면 가장 먼저 뛰어나가는 현장 해결형 |
| ISTP | 잠잠해결꾼 | 조용수습 | 말없이 문제의 핵심을 고치는 조용한 실속형 |
| ESFP | 흥잔치꾼 | 잔치활력 | 긴장된 잔치도 웃음으로 살리는 분위기형 |
| ISFP | 몽글위로꾼 | 따뜻동행 | 당황한 마음을 부드럽게 감싸주는 위로형 |
| ENFP | 두근상상꾼 | 기대충만 | 위기 속에서도 기적의 가능성을 보는 기대형 |
| INFP | 묵상지킴꾼 | 깊은감동 | 놀라운 순간을 마음 깊이 간직하는 신비형 |
| ENTP | 잔치발명꾼 | 기발전환 | 예상 밖의 상황을 새 길로 바꾸는 아이디어형 |
| INTP | 물독탐구꾼 | 조용분석 | 기적의 흐름과 원리를 조용히 파고드는 탐구형 |
| ESTJ | 척척총무꾼 | 질서정리 | 역할과 순서를 정리해 잔치를 안정시키는 운영형 |
| ISTJ | 꼼꼼채움꾼 | 성실정확 | 맡은 일을 정확히 끝까지 채워내는 성실형 |
| ESFJ | 다정챙김꾼 | 마음살핌 | 사람들의 마음과 표정을 살피는 배려형 |
| ISFJ | 순명살림꾼 | 묵묵헌신 | 드러나지 않아도 묵묵히 섬기는 헌신형 |
| ENFJ | 기쁜파견꾼 | 은총나눔 | 받은 은총을 함께 나누고 기뻐하는 나눔형 |
| INFJ | 은총알아챔꾼 | 깊은통찰 | 보이지 않는 뜻과 흐름을 먼저 읽는 통찰형 |
| ENTJ | 포도작전꾼 | 위기지휘 | 위기 앞에서 전략과 지휘로 길을 여는 리더형 |
| INTJ | 카나설계꾼 | 큰그림전략 | 사건 너머의 큰 그림과 의미를 설계하는 전략형 |

---

## 10. 타입별 결과 콘텐츠 반영 방식

결과 상세 페이지는 이전에 생성한 분석 문구를 다음 필드로 나누어 입력한다.

```ts
{
  mbti: "ESTJ",
  typeName: "척척총무꾼",
  topKeyword: "질서정리",
  shortDescription: "식순과 역할을 빠르게 정리해 잔치를 안정시키는 운영형 일꾼",
  summary: "척척총무꾼은 식순과 역할을 빠르게 정리해 잔치를 안정시키는 운영형 일꾼이에요. 위기가 생기면 감정에 휩쓸리기보다 “누가, 무엇을, 언제까지”를 정리합니다.",
  bullets: [
    {
      title: "바로 역할을 나누는 운영력",
      body: "포도주가 없다는 말을 들으면 즉시 상황을 파악하고 사람들을 배치해요."
    },
    {
      title: "효율과 질서를 중요하게 여김",
      body: "잔치 식순이 바뀌면 이유와 흐름을 확인하고 안정적으로 재정리합니다."
    }
  ],
  oneLine: "좋아요. 지금부터 역할 나눕니다. 잔치 살립시다.",
  image: "/assets/results/estj.png"
}
```

### 입력 원칙

- `summary`는 2~3문장
- `bullets`는 4개 권장, 최대 5개
- `oneLine`은 결과 하단 또는 공유 이미지에 활용
- `shortDescription`은 모든 유형 보기 카드에 활용
- `topKeyword`는 결과 상단에 `질서정리 · ESTJ`처럼 표시

---

## 11. 타입별 결과 페이지 copy 요약

아래 내용은 실제 결과 데이터 입력의 기준이 된다.

## 11.1 ESTP · 번쩍해결꾼

- 상단 키워드: `위기순발`
- 소개: 위기가 생기면 고민보다 몸이 먼저 움직이는 현장 해결형 일꾼
- bullet:
  - 위기 앞에서 반응 속도 최고
  - 분위기를 살리는 현장형 에너지
  - 복잡한 설명보다 실행이 먼저
  - 조심할 점은 성급함
- 한 줄 요약: `큰일 났다고요? 알겠어요. 제가 지금 바로 움직일게요!`

## 11.2 ISTP · 잠잠해결꾼

- 상단 키워드: `조용수습`
- 소개: 말은 많지 않지만 필요한 순간 정확히 손을 보태는 실속형 일꾼
- bullet:
  - 말보다 손이 빠른 타입
  - 정확하고 실용적인 판단력
  - 혼자 집중할 때 능률이 올라감
  - 조심할 점은 표현 부족
- 한 줄 요약: `괜찮아요. 이미 보고 있었고, 지금 고치는 중이에요.`

## 11.3 ESFP · 흥잔치꾼

- 상단 키워드: `잔치활력`
- 소개: 잔치의 공기를 살리고 사람들의 긴장을 풀어주는 에너지형 일꾼
- bullet:
  - 잔치 분위기 담당
  - 함께할 때 힘이 나는 타입
  - 현재의 즐거움을 잘 발견함
  - 조심할 점은 깊은 걱정을 가볍게 넘기는 것
- 한 줄 요약: `힘들어도 우리 같이 하면 괜찮아요. 잔치는 계속되어야죠!`

## 11.4 ISFP · 몽글위로꾼

- 상단 키워드: `따뜻동행`
- 소개: 말 한마디와 조용한 배려로 곁을 지켜주는 감성형 일꾼
- bullet:
  - 사람의 표정을 먼저 봄
  - 조용하지만 진심이 깊음
  - 아름다운 순간을 잘 느끼는 타입
  - 조심할 점은 스스로를 뒤로 미루는 것
- 한 줄 요약: `괜찮아요. 제가 옆에 있을게요.`

## 11.5 ENFP · 두근상상꾼

- 상단 키워드: `기대충만`
- 소개: 작은 변화 속에서도 기적의 가능성을 먼저 떠올리는 기대형 일꾼
- bullet:
  - 위기 속에서 가능성을 봄
  - 사람들과 아이디어를 나누며 힘을 얻음
  - 갑작스러운 변화에 강함
  - 조심할 점은 마무리 부족
- 한 줄 요약: `잠깐만요, 이거 분명 엄청난 일이 될 것 같은데요?`

## 11.6 INFP · 묵상지킴꾼

- 상단 키워드: `깊은감동`
- 소개: 놀라운 순간을 마음 깊이 담아 오래 간직하는 신비형 일꾼
- bullet:
  - 사건보다 의미를 먼저 느낌
  - 사람의 마음에 민감함
  - 조용한 순명에 강함
  - 조심할 점은 마음속에만 머무는 것
- 한 줄 요약: `이 순간, 오래 기억하게 될 것 같아요.`

## 11.7 ENTP · 잔치발명꾼

- 상단 키워드: `기발전환`
- 소개: 예상 밖의 상황도 재밌게 받아들이고 새 길을 찾는 아이디어형 일꾼
- bullet:
  - 변수를 즐기는 타입
  - 아이디어가 빠르게 튀어나옴
  - 토론하며 답을 찾음
  - 조심할 점은 장난처럼 보이는 태도
- 한 줄 요약: `잠깐, 이 상황 오히려 더 멋지게 바꿀 수 있겠는데요?`

## 11.8 INTP · 물독탐구꾼

- 상단 키워드: `조용분석`
- 소개: 기적의 흐름과 원리를 조용히 분석해보는 탐구형 일꾼
- bullet:
  - 상황을 구조적으로 이해하려 함
  - 조용히 관찰하며 배움
  - 혼자 집중할 때 깊이가 생김
  - 조심할 점은 행동 타이밍을 놓치는 것
- 한 줄 요약: `잠깐만요. 이 기적의 흐름, 생각보다 훨씬 깊은데요?`

## 11.9 ESTJ · 척척총무꾼

- 상단 키워드: `질서정리`
- 소개: 식순과 역할을 빠르게 정리해 잔치를 안정시키는 운영형 일꾼
- bullet:
  - 바로 역할을 나누는 운영력
  - 효율과 질서를 중요하게 여김
  - 맡은 일을 끝까지 밀어붙임
  - 조심할 점은 잔소리처럼 들리는 말투
- 한 줄 요약: `좋아요. 지금부터 역할 나눕니다. 잔치 살립시다.`

## 11.10 ISTJ · 꼼꼼채움꾼

- 상단 키워드: `성실정확`
- 소개: 맡은 일을 끝까지 정확하게 채워내는 성실형 일꾼
- bullet:
  - 정확함이 곧 사랑인 타입
  - 안정적인 절차를 선호함
  - 조용히 신뢰를 쌓음
  - 조심할 점은 변화에 대한 긴장
- 한 줄 요약: `시키신 일이면 정확히, 끝까지 채우겠습니다.`

## 11.11 ESFJ · 다정챙김꾼

- 상단 키워드: `마음살핌`
- 소개: 사람들의 표정과 마음을 살피며 모두를 챙기는 배려형 일꾼
- bullet:
  - 사람 중심의 상황 판단
  - 함께 움직이게 만드는 따뜻한 힘
  - 칭찬과 감사에 민감함
  - 조심할 점은 과한 책임감
- 한 줄 요약: `다들 괜찮죠? 제가 필요한 사람부터 챙길게요.`

## 11.12 ISFJ · 순명살림꾼

- 상단 키워드: `묵묵헌신`
- 소개: 드러나지 않아도 묵묵히 자리를 지키며 섬기는 헌신형 일꾼
- bullet:
  - 조용한 순명에 강함
  - 세심한 살림 감각
  - 누군가의 부담을 대신 덜어줌
  - 조심할 점은 너무 참고 버티는 것
- 한 줄 요약: `제가 조용히 해둘게요. 걱정하지 마세요.`

## 11.13 ENFJ · 기쁜파견꾼

- 상단 키워드: `은총나눔`
- 소개: 받은 은총을 사람들과 나누고 함께 기뻐하는 나눔형 일꾼
- bullet:
  - 사람들을 하나로 모으는 힘
  - 기쁨을 나누고 싶어함
  - 칭찬을 공동체의 감사로 바꿈
  - 조심할 점은 너무 많은 사람을 이끌려는 부담
- 한 줄 요약: `우리 이 기쁨을 같이 나눠요. 분명 누군가에게 힘이 될 거예요.`

## 11.14 INFJ · 은총알아챔꾼

- 상단 키워드: `깊은통찰`
- 소개: 보이지 않는 뜻과 흐름을 먼저 알아차리는 통찰형 일꾼
- bullet:
  - 보이지 않는 분위기를 잘 읽음
  - 사건 너머의 뜻을 묵상함
  - 조용하지만 깊은 영향력
  - 조심할 점은 혼자 너무 깊이 들어가는 것
- 한 줄 요약: `이 일은 그냥 우연이 아닌 것 같아요.`

## 11.15 ENTJ · 포도작전꾼

- 상단 키워드: `위기지휘`
- 소개: 위기 앞에서 대책을 세우고 사람들을 이끄는 지휘형 일꾼
- bullet:
  - 위기에서 리더십이 켜짐
  - 큰 그림과 실행을 동시에 봄
  - 말씀이 주어지면 바로 작전으로 전환
  - 조심할 점은 속도가 너무 빠른 것
- 한 줄 요약: `목표는 잔치 정상화. 지금 바로 움직입니다.`

## 11.16 INTJ · 카나설계꾼

- 상단 키워드: `큰그림전략`
- 소개: 눈앞의 사건 너머 큰 그림과 의미를 읽어내는 전략형 일꾼
- bullet:
  - 사건의 구조를 먼저 파악함
  - 의미와 전략을 함께 봄
  - 혼자 정리한 뒤 정확히 움직임
  - 조심할 점은 거리감
- 한 줄 요약: `이 위기는 끝이 아니라, 더 큰 흐름의 시작일 수 있어요.`

---

## 12. 이미지 및 에셋 계획

## 12.1 필요한 이미지

| 에셋 | 개수 | 설명 |
|---|---:|---|
| 결과 캐릭터 이미지 | 16 | MBTI별 일꾼 캐릭터 |
| 인트로 대표 이미지 | 1 | 물독/포도주/일꾼 콘셉트 |
| 모든 유형 상단 이미지 | 1 | 전체 캐릭터 또는 대표 마스코트 |
| 공유용 OG 이미지 | 16 또는 1 | 결과 공유 시 썸네일 |

## 12.2 파일명 규칙

```text
/public/assets/results/estp.png
/public/assets/results/istp.png
/public/assets/results/esfp.png
/public/assets/results/isfp.png
/public/assets/results/enfp.png
/public/assets/results/infp.png
/public/assets/results/entp.png
/public/assets/results/intp.png
/public/assets/results/estj.png
/public/assets/results/istj.png
/public/assets/results/esfj.png
/public/assets/results/isfj.png
/public/assets/results/enfj.png
/public/assets/results/infj.png
/public/assets/results/entj.png
/public/assets/results/intj.png
```

## 12.3 이미지 스타일

- 단순한 선과 둥근 형태
- 포도주, 물독, 잔치, 앞치마, 수건, 포도송이 등 카나 혼인잔치 상징 활용
- 유형별 역할이 보이도록 소품 차별화
  - ESTJ: 체크리스트, 진행표
  - ISTJ: 물독, 계량컵
  - ENFJ: 포도주 잔을 나누는 모습
  - INFJ: 빛, 별, 작은 포도송이
  - ENTJ: 작전판, 지휘봉
  - INTJ: 설계도, 큰 그림 지도

---

## 13. 컴포넌트 설계

```text
src/
  app/
  components/
    Layout/
      MobileFrame.tsx
    Intro/
      IntroPage.tsx
    Quiz/
      QuestionPage.tsx
      QuestionCard.tsx
      OptionButton.tsx
      ProgressBar.tsx
    Result/
      ResultPage.tsx
      ResultHero.tsx
      SummaryBox.tsx
      ResultBulletList.tsx
      ResultActionButtons.tsx
      RelatedTypeCards.tsx
    AllTypes/
      AllTypesPage.tsx
      TypeGrid.tsx
      TypeCard.tsx
  data/
    questions.ts
    results.ts
  utils/
    calculateResult.ts
    share.ts
    saveResultImage.ts
  styles/
    tokens.css
```

---

## 14. 상태 관리 계획

## 14.1 응답 저장

```ts
type Answers = Record<Question["id"], Letter>;
```

- 사용자가 문항을 선택할 때 `answers` 상태에 저장한다.
- 새로고침 대비 `localStorage`에 저장한다.

```text
localStorage key: worker-test-answers
```

## 14.2 결과 저장

계산된 결과도 저장해 재방문 시 바로 보여줄 수 있다.

```text
localStorage key: worker-test-result
```

## 14.3 다시하기

다시하기 버튼 클릭 시:

1. `worker-test-answers` 삭제
2. `worker-test-result` 삭제
3. `/worker-test`로 이동

---

## 15. 공유 및 저장 기능

## 15.1 URL 공유

결과 URL은 다음 형태로 공유한다.

```text
https://{도메인}/worker-test/result/estj
```

### 공유 버튼 정책

1. Web Share API 지원 시 네이티브 공유창 호출
2. 미지원 시 클립보드 복사
3. 복사 성공 토스트 표시

```ts
async function shareResult(mbti: string) {
  const url = `${window.location.origin}/worker-test/result/${mbti.toLowerCase()}`;

  if (navigator.share) {
    await navigator.share({
      title: "나의 일꾼 TEST 결과",
      text: "카나의 혼인잔치에서 나는 어떤 일꾼일까?",
      url
    });
    return;
  }

  await navigator.clipboard.writeText(url);
}
```

## 15.2 결과 이미지 저장

레퍼런스처럼 “이미지 꾹 눌러 결과 저장하기” 문구를 둘 수 있다.

MVP 구현 방식:

- 결과 카드 영역을 이미지로 변환
- `결과 이미지 저장하기` 버튼 클릭 시 다운로드

```ts
import { toPng } from "html-to-image";

async function saveResultImage(node: HTMLElement, fileName: string) {
  const dataUrl = await toPng(node, { cacheBust: true });
  const link = document.createElement("a");
  link.download = fileName;
  link.href = dataUrl;
  link.click();
}
```

---

## 16. 관계 유형 카드 구현 여부

레퍼런스 결과 페이지에는 하단에 2개의 관련 유형 카드가 있다.

### MVP 권장

- 1차 배포에서는 관계 유형 카드를 숨기거나 `함께 보면 좋은 일꾼` 정도로 단순화한다.
- 관계성 규칙이 확정되면 `related` 데이터를 추가한다.

### 확장안

```ts
related: [
  { label: "찰떡동료", mbti: "ISFJ" },
  { label: "함께하면 좋아요", mbti: "ENFP" }
]
```

관계 유형 카드는 반드시 의미 검토 후 확정한다. 임의 매칭은 사용자가 결과를 덜 신뢰하게 만들 수 있다.

---

## 17. 광고 영역

레퍼런스 페이지에는 광고 영역이 포함되어 있다.

### 권장 정책

- 실제 운영에서 광고가 필요하지 않다면 생략한다.
- 광고를 넣을 경우 결과 CTA 아래와 모든 유형 섹션 사이에 배치한다.
- 광고 미노출 환경에서는 높이가 무너지지 않도록 placeholder 처리한다.

```tsx
{showAd && <AdSlot placement="result-middle" />}
```

---

## 18. 접근성 체크리스트

- 선택지는 반드시 `<button>`으로 구현한다.
- 선택지 선택 상태를 시각적으로 표시한다.
- 키보드로 선택 가능해야 한다.
- 이미지에는 `alt`를 넣는다.
- 색만으로 상태를 구분하지 않는다.
- 진행률은 텍스트로도 표시한다.
- CTA 버튼의 터치 영역은 최소 44px 이상으로 한다.

---

## 19. SEO 및 공유 메타데이터

## 19.1 기본 메타

```html
<title>일꾼 TEST | 카나의 혼인잔치에서 나는 어떤 일꾼일까?</title>
<meta
  name="description"
  content="카나의 혼인잔치 상황 속에서 나의 일꾼 유형을 알아보는 12문항 테스트"
/>
```

## 19.2 Open Graph

정적 호스팅 환경에서는 모든 결과별 OG 이미지를 동적으로 처리하기 어렵다. MVP에서는 공통 OG 이미지를 사용한다.

```html
<meta property="og:title" content="일꾼 TEST" />
<meta property="og:description" content="카나의 혼인잔치에서 나는 어떤 일꾼일까?" />
<meta property="og:image" content="/assets/og/worker-test-og.png" />
```

확장 구현 시 MBTI별 OG 이미지를 별도로 생성한다.

```text
/assets/og/estp.png
/assets/og/istp.png
...
```

---

## 20. 테스트 케이스

## 20.1 결과 계산 테스트

| 케이스 | 응답 패턴 | 기대 결과 |
|---|---|---|
| 모두 A | A 12개 | ESTJ |
| 모두 B | B 12개 | INFP |
| E/S/T/P 우세 | EI=A, SN=A, TF=A, JP=B 중심 | ESTP |
| I/N/F/J 우세 | EI=B, SN=B, TF=B, JP=A 중심 | INFJ |

## 20.2 페이지 테스트

| 테스트 | 기대 결과 |
|---|---|
| `/worker-test/result/estj` 직접 접속 | ESTJ 결과 노출 |
| 존재하지 않는 MBTI 접속 | 모든 유형 페이지 또는 404로 이동 |
| 문항 미응답 상태에서 결과 보기 클릭 | 결과 계산 불가 |
| 다시하기 클릭 | 저장된 응답 삭제 후 인트로 이동 |
| 모든 유형 카드 클릭 | 해당 상세 결과 이동 |
| 모바일 360px 화면 | 레이아웃 깨짐 없음 |
| 공유 버튼 클릭 | URL 공유 또는 복사 |
| 이미지 저장 클릭 | 결과 이미지 다운로드 |

---

## 21. 구현 일정안

## 21.1 1단계: 기획/데이터 정리

- 문항 12개 최종 검수
- A/B 선택지의 MBTI 매핑 검수
- 16개 결과 콘텐츠 최종 교정
- 캐릭터 이미지 제작 범위 확정
- 관계 유형 카드 구현 여부 결정

산출물:

- `questions.ts`
- `results.ts`
- 이미지 에셋 목록

## 21.2 2단계: 기본 화면 개발

- 프로젝트 세팅
- 모바일 레이아웃 구현
- 인트로 화면 구현
- 문항 화면 구현
- 진행률/이전/다음 기능 구현

산출물:

- `/worker-test`
- `/worker-test/questions`

## 21.3 3단계: 결과 로직 및 결과 페이지

- 점수 계산 로직 구현
- 결과 라우팅 구현
- 결과 상세 페이지 구현
- 모든 유형 페이지 구현
- 결과 직접 접근 처리

산출물:

- `/worker-test/result/:mbti`
- `/worker-test/result`

## 21.4 4단계: 공유/저장/QR

- URL 공유 기능 구현
- 결과 이미지 저장 기능 구현
- QR코드 생성
- 배포 도메인 연결
- 실제 QR 스캔 테스트

산출물:

- QR 이미지
- 공유 가능한 결과 URL

## 21.5 5단계: QA 및 배포

- 모바일 기기 테스트
- iOS Safari 테스트
- Android Chrome 테스트
- 카카오톡 인앱 브라우저 테스트
- 결과 문구 오탈자 확인
- Netlify/Vercel 배포

산출물:

- 최종 배포 URL
- QR코드 최종본

---

## 22. 우선순위

## 22.1 MVP 필수

- 인트로 페이지
- 12문항 테스트
- 결과 계산
- 16개 결과 상세
- 모든 유형 모아보기
- 다시하기
- 모바일 반응형
- QR코드 연결

## 22.2 1차 배포 후 개선

- 결과 이미지 저장
- Web Share API
- MBTI별 OG 이미지
- 관련 유형 카드
- 애니메이션
- 광고 영역
- 통계/분석 이벤트

---

## 23. 개발자용 체크리스트

- [ ] `questions.ts`에 12문항 입력
- [ ] 각 문항 A/B 값 매핑 검수
- [ ] `calculateResult` 유닛 테스트 작성
- [ ] `results.ts`에 16개 결과 입력
- [ ] 모든 결과 이미지 경로 연결
- [ ] 인트로 페이지 구현
- [ ] 문항 페이지 구현
- [ ] 결과 상세 페이지 구현
- [ ] 모든 유형 페이지 구현
- [ ] 다시하기 기능 구현
- [ ] URL 공유 기능 구현
- [ ] 결과 이미지 저장 기능 구현
- [ ] 모바일 360px/390px/430px 테스트
- [ ] 카카오톡 인앱 브라우저 테스트
- [ ] 배포 URL로 QR코드 생성
- [ ] QR코드 실제 스캔 테스트

---

## 24. 최종 완료 기준

다음 조건을 모두 만족하면 1차 구현 완료로 본다.

1. QR코드 스캔 시 테스트 인트로로 정상 접속된다.
2. 사용자는 12문항을 모두 응답할 수 있다.
3. 결과 계산이 MBTI 4글자로 정확히 산출된다.
4. 16개 결과 상세 페이지가 모두 직접 URL로 접근 가능하다.
5. 모든 유형 모아보기에서 16개 카드가 2열로 표시된다.
6. 결과 페이지의 구조가 레퍼런스처럼 `키워드 → 유형명 → 이미지 → 요약 → 분석 → CTA` 순서로 구성된다.
7. 모바일 화면에서 가로 스크롤이 발생하지 않는다.
8. 다시하기 버튼이 정상 동작한다.
9. 공유 URL이 정상 복사 또는 공유된다.
10. QR코드가 실제 모바일 기기에서 정상 인식된다.

---

## 25. 후속 확장 아이디어

- 참여자 결과 통계 페이지
- 공동체별 결과 분포 보기
- 결과별 추천 봉사 역할
- 결과별 성경 구절 또는 묵상 질문 추가
- 조별 나눔 질문 자동 생성
- 관리자용 결과 문구 수정 JSON 분리
- 이미지 없는 경우에도 운영 가능한 텍스트 전용 모드

---

## 26. 구현 시 주의사항

- MBTI는 실제 심리검사가 아니라 이벤트형 성향 테스트로 안내한다.
- 결과는 판단이나 낙인이 아니라 “재미와 묵상용” 톤을 유지한다.
- 신앙적 표현은 따뜻하고 부담 없는 문장으로 작성한다.
- 특정 유형을 우월하게 보이게 하지 않는다.
- 모든 결과는 긍정적인 강점과 가벼운 조심 포인트를 함께 제공한다.
- 문항 수가 짧으므로 결과 정확성을 과장하지 않는다.
