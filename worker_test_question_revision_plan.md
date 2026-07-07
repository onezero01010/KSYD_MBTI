# 일꾼 TEST 문항 수정 및 상황 설명 페이지 추가 구현 계획서

> 목적: 기존 `일꾼 TEST` 구현 계획에서 **문항 흐름을 카나 혼인잔치 서사 중심으로 재정렬**하고, 시작 페이지와 첫 질문 페이지 사이에 **상황 설명 페이지**를 추가한다.  
> 기준: 기존 결과 페이지 톤은 레퍼런스처럼 귀엽고 단순한 모바일 카드형 UI를 유지한다.

---

## 1. 이번 수정의 핵심 범위

이번 작업은 결과 콘텐츠나 MBTI 결과 계산 방식 전체를 바꾸는 작업이 아니라, **테스트 진입 경험과 질문 데이터**를 수정하는 작업이다.

### 변경할 것

1. 기존 질문 12개를 아래의 신규 질문 12개로 교체한다.
2. 기존 Phase 구성을 `6 / 3 / 3`에서 `4 / 4 / 4`로 수정한다.
3. 시작 페이지와 질문 페이지 사이에 `상황 설명 페이지`를 추가한다.
4. 시작 CTA의 이동 경로를 `질문 페이지`가 아니라 `상황 설명 페이지`로 변경한다.
5. 상황 설명 페이지의 CTA를 누르면 첫 질문으로 이동한다.
6. 질문 진행 화면의 Phase 라벨과 진행률 표시를 신규 Phase 기준으로 업데이트한다.

### 유지할 것

1. 결과 계산 방식은 그대로 유지한다.
2. 각 MBTI 축별 문항 수는 기존처럼 3개씩 유지한다.
3. 결과 페이지의 16개 유형명과 분석 콘텐츠는 유지한다.
4. 결과 페이지 디자인 방향은 기존 레퍼런스 구조를 유지한다.

---

## 2. 변경 후 전체 사용자 플로우

```text
QR코드 접속
  ↓
/worker-test
  ↓
시작 페이지
  ↓
/worker-test/situation
  ↓
상황 설명 페이지
  ↓
/worker-test/questions
  ↓
12문항 테스트
  ↓
결과 계산
  ↓
/worker-test/result/:mbti
  ↓
결과 상세 페이지
```

---

## 3. 라우팅 수정 계획

기존 라우팅이 아래와 같다면,

```text
/worker-test
/worker-test/questions
/worker-test/result/:mbti
/worker-test/result
```

다음 라우트를 추가한다.

| 경로 | 화면 | 변경 내용 |
|---|---|---|
| `/worker-test` | 시작 페이지 | CTA 클릭 시 `/worker-test/situation`으로 이동 |
| `/worker-test/situation` | 상황 설명 페이지 | 신규 추가 |
| `/worker-test/questions` | 질문 페이지 | 신규 질문 12개 반영 |
| `/worker-test/result/:mbti` | 결과 상세 페이지 | 유지 |
| `/worker-test/result` | 모든 유형 보기 | 유지 |

### 라우팅 동작 정책

- 시작 페이지의 메인 버튼 문구는 `테스트 시작하기` 또는 `잔치에 초대받기` 중 하나를 사용한다.
- 시작 페이지 CTA 클릭 시 바로 질문으로 가지 않고 반드시 상황 설명 페이지로 이동한다.
- 상황 설명 페이지 CTA 클릭 시 첫 질문으로 이동한다.
- 질문 1번 화면에서 `이전` 버튼이 있다면 `/worker-test/situation`으로 이동하도록 처리한다.
- 사용자가 `/worker-test/questions`로 직접 접근하는 경우에는 바로 1번 문항부터 시작해도 된다.

---

## 4. 신규 상황 설명 페이지 구성

### 4.1 화면 목적

상황 설명 페이지는 사용자가 단순한 MBTI 테스트를 하는 것이 아니라, **카나의 혼인잔치 속 일꾼으로 초대받았다**는 몰입감을 주는 페이지다.

시작 페이지가 테스트의 제목과 CTA를 보여주는 역할이라면, 상황 설명 페이지는 다음을 담당한다.

1. 테스트 배경 설명
2. 사용자를 이야기 속 인물로 초대
3. 앞으로의 질문 흐름 안내
4. 첫 질문으로 부드럽게 진입시키기

---

### 4.2 상황 설명 페이지 최종 카피

아래 문구를 그대로 사용해도 된다.

```text
카나의 혼인잔치에 오신 것을 환영합니다

성모님이 당신을
잔치의 일꾼으로 부르셨어요

오늘은 기쁜 혼인잔치가 열리는 날.
손님들은 웃고, 잔은 채워지고,
집 안은 축하로 가득합니다.

그런데 잔치 한가운데에서
작은 위기가 조용히 다가오고 있어요.

그때 성모님은 당신을 바라보시며
잔치의 일꾼으로 초대하십니다.

이제부터 당신은 카나의 혼인잔치 속 일꾼입니다.
무엇을 먼저 보고,
누구와 함께 움직이고,
말씀 앞에서 어떻게 반응하는지 따라가 보세요.

정답은 없습니다.
당신답게 선택하면 됩니다.
```

### CTA 문구

```text
일꾼으로 들어가기
```

### 보조 버튼 문구

```text
처음으로 돌아가기
```

---

## 5. 상황 설명 페이지 디자인 가이드

### 5.1 전체 톤

- 레퍼런스 결과 페이지처럼 흰 배경, 중앙 정렬, 귀여운 카드형 UI를 유지한다.
- 종교적 배경은 따뜻하고 부드럽게 표현하되, 너무 무겁거나 엄숙하지 않게 한다.
- `초대`, `잔치`, `말씀`, `기적`의 흐름이 작은 스토리 카드처럼 보이게 한다.

### 5.2 권장 레이아웃

```text
[상단 작은 라벨]
카나의 혼인잔치에 오신 것을 환영합니다

[일러스트]
물독 / 포도주 / 작은 잔치 테이블 / 성모님의 초대 분위기

[메인 타이틀]
성모님이 당신을
잔치의 일꾼으로 부르셨어요

[본문 카드]
오늘은 기쁜 혼인잔치가 열리는 날...

[스토리 단계 카드 4개]
01 초대받다
02 알아차리다
03 순명하다
04 발견하다

[안내 문구]
정답은 없습니다. 당신답게 선택하면 됩니다.

[초록 CTA]
일꾼으로 들어가기

[회색 보조 버튼]
처음으로 돌아가기
```

### 5.3 스토리 단계 카드 카피

| 단계 | 제목 | 설명 |
|---:|---|---|
| 01 | 초대받다 | 성모님이 나를 잔치의 일꾼으로 부르셨어요. |
| 02 | 알아차리다 | 잔치의 빈틈과 사람들의 마음을 살펴봅니다. |
| 03 | 순명하다 | “그가 시키는 대로 하여라”는 말씀을 듣습니다. |
| 04 | 발견하다 | 물이 포도주로 변하는 기적을 마주합니다. |

### 5.4 스타일 토큰 권장값

| 요소 | 권장값 |
|---|---|
| 페이지 배경 | `#FFFFFF` |
| 본문 카드 배경 | `#F8F8F8` |
| 스토리 카드 배경 | `#FFFDF8` 또는 `#F9F7F2` |
| 메인 텍스트 | `#111111` |
| 본문 텍스트 | `#444444` |
| 보조 텍스트 | `#777777` |
| 강조 텍스트 | `#D94B3D` |
| CTA 초록 | `#25C96A` |
| 최대 폭 | `390px ~ 430px` |
| 카드 radius | `16px ~ 20px` |
| 버튼 radius | `10px ~ 14px` |

### 5.5 컴포넌트 예시 구조

```tsx
function SituationPage() {
  return (
    <main className="situation-page">
      <p className="eyebrow">카나의 혼인잔치에 오신 것을 환영합니다</p>

      <section className="hero">
        <img src="/assets/worker-test/cana-hero.png" alt="카나 혼인잔치 일러스트" />
        <h1>
          성모님이 당신을<br />
          잔치의 일꾼으로 부르셨어요
        </h1>
      </section>

      <section className="story-card">
        <p>오늘은 기쁜 혼인잔치가 열리는 날.</p>
        <p>손님들은 웃고, 잔은 채워지고, 집 안은 축하로 가득합니다.</p>
        <p>그런데 잔치 한가운데에서 작은 위기가 조용히 다가오고 있어요.</p>
        <p>그때 성모님은 당신을 바라보시며 잔치의 일꾼으로 초대하십니다.</p>
      </section>

      <section className="story-steps" aria-label="테스트 진행 흐름">
        {storySteps.map((step) => (
          <article key={step.id} className="step-card">
            <span>{step.id}</span>
            <strong>{step.title}</strong>
            <p>{step.description}</p>
          </article>
        ))}
      </section>

      <p className="guide-text">정답은 없습니다. 당신답게 선택하면 됩니다.</p>

      <button onClick={() => navigate('/worker-test/questions')}>
        일꾼으로 들어가기
      </button>
      <button className="secondary" onClick={() => navigate('/worker-test')}>
        처음으로 돌아가기
      </button>
    </main>
  );
}
```

---

## 6. Phase 구성 수정

기존 Phase 구성을 아래와 같이 변경한다.

| Phase | 제목 | 부제 | 문항 번호 | 문항 수 |
|---:|---|---|---|---:|
| 1 | 성모님의 초대와 위기의 알아챔 | 예상치 못한 위기 앞에서 나는 무엇을 먼저 보고, 어떻게 반응하는가? | 1~4 | 4 |
| 2 | “그가 시키는 대로 하여라” | 말씀 앞에서 나는 어떻게 받아들이고, 어떻게 실천하는가? | 5~8 | 4 |
| 3 | 기적의 발견과 기쁜 파견 | 기적을 본 나는 어떻게 이해하고, 어떻게 나누는가? | 9~12 | 4 |

### 질문 화면 표시 예시

```text
Phase 1. 성모님의 초대와 위기의 알아챔
1 / 12
성모님이 나를 혼인잔치의 일꾼으로 초대하셨습니다. 성모님이 나를 초대한 이유는?

[A] 사람들과 금방 어울리고...
[B] 조용히 내 자리를 지키며...
```

---

## 7. 신규 질문 데이터

아래 데이터로 기존 `questions` 배열을 교체한다.  
A 선택지는 각 축의 앞 글자, B 선택지는 각 축의 뒤 글자로 매핑한다.

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
  phaseSubtitle: string;
  dimension: Dimension;
  prompt: string;
  options: [QuestionOption, QuestionOption];
}

export const questions: Question[] = [
  {
    id: "q01",
    phase: 1,
    phaseTitle: "성모님의 초대와 위기의 알아챔",
    phaseSubtitle: "예상치 못한 위기 앞에서 나는 무엇을 먼저 보고, 어떻게 반응하는가?",
    dimension: "EI",
    prompt: "성모님이 나를 혼인잔치의 일꾼으로 초대하셨습니다. 성모님이 나를 초대한 이유는?",
    options: [
      {
        label: "A",
        text: "사람들과 금방 어울리고, 필요한 순간 분위기를 살리며 함께 움직일 수 있어서.",
        value: "E"
      },
      {
        label: "B",
        text: "조용히 내 자리를 지키며, 맡겨진 일을 끝까지 책임질 수 있어서.",
        value: "I"
      }
    ]
  },
  {
    id: "q02",
    phase: 1,
    phaseTitle: "성모님의 초대와 위기의 알아챔",
    phaseSubtitle: "예상치 못한 위기 앞에서 나는 무엇을 먼저 보고, 어떻게 반응하는가?",
    dimension: "SN",
    prompt: "잔치가 시작되었습니다. 나의 시선이 가장 먼저 머무는 곳은 어디입니까?",
    options: [
      {
        label: "A",
        text: "비어가는 잔, 흔들리는 테이블, 부족한 음식처럼 눈에 보이는 준비 상태.",
        value: "S"
      },
      {
        label: "B",
        text: "사람들의 표정, 잔치의 분위기, 오늘 이 자리에서 일어날 것 같은 특별한 흐름.",
        value: "N"
      }
    ]
  },
  {
    id: "q03",
    phase: 1,
    phaseTitle: "성모님의 초대와 위기의 알아챔",
    phaseSubtitle: "예상치 못한 위기 앞에서 나는 무엇을 먼저 보고, 어떻게 반응하는가?",
    dimension: "EI",
    prompt: "일꾼으로 움직이기 시작했습니다. 내가 일하는 스타일은?",
    options: [
      {
        label: "A",
        text: "함께 일하는 사람들을 먼저 찾고, “우리 뭐부터 할까요?” 하며 손발을 맞춘다.",
        value: "E"
      },
      {
        label: "B",
        text: "내가 맡아야 할 일을 먼저 파악하고, 말없이 차근차근 처리한다.",
        value: "I"
      }
    ]
  },
  {
    id: "q04",
    phase: 1,
    phaseTitle: "성모님의 초대와 위기의 알아챔",
    phaseSubtitle: "예상치 못한 위기 앞에서 나는 무엇을 먼저 보고, 어떻게 반응하는가?",
    dimension: "SN",
    prompt: "성모님과 예수님이 “포도주가 없구나”라는 이야기를 나누고 계십니다. 이때 나의 반응은?",
    options: [
      {
        label: "A",
        text: "“무슨 일이지? 포도주가 진짜 떨어졌나?” 하고 상황을 확인하러 간다.",
        value: "S"
      },
      {
        label: "B",
        text: "“대화 중이시네. 뭔가 중요한 일이 시작되려는 건가?” 하고 흐름을 지켜본다.",
        value: "N"
      }
    ]
  },
  {
    id: "q05",
    phase: 2,
    phaseTitle: "그가 시키는 대로 하여라",
    phaseSubtitle: "말씀 앞에서 나는 어떻게 받아들이고, 어떻게 실천하는가?",
    dimension: "TF",
    prompt: "성모님이 일꾼들에게 “그가 시키는 대로 하여라”라고 말씀하셨습니다. 나의 첫 생각은?",
    options: [
      {
        label: "A",
        text: "“그가 누구시길래? 왜 그분의 말을 따라야 하지?” 하고 이유와 상황을 먼저 이해하려 한다.",
        value: "T"
      },
      {
        label: "B",
        text: "“성모님이 그렇게 말씀하셨다면 믿고 따라야겠다” 하고 마음으로 받아들인다.",
        value: "F"
      }
    ]
  },
  {
    id: "q06",
    phase: 2,
    phaseTitle: "그가 시키는 대로 하여라",
    phaseSubtitle: "말씀 앞에서 나는 어떻게 받아들이고, 어떻게 실천하는가?",
    dimension: "JP",
    prompt: "아직 예수님이 구체적인 지시를 하지 않으셨습니다. 나는 어떻게 행동합니까?",
    options: [
      {
        label: "A",
        text: "“제가 무엇을 하면 될까요?” 하고 먼저 여쭤보며 역할을 분명히 하려 한다.",
        value: "J"
      },
      {
        label: "B",
        text: "지금은 기다릴 때라고 생각하고, 그분이 시키실 때까지 상황을 지켜본다.",
        value: "P"
      }
    ]
  },
  {
    id: "q07",
    phase: 2,
    phaseTitle: "그가 시키는 대로 하여라",
    phaseSubtitle: "말씀 앞에서 나는 어떻게 받아들이고, 어떻게 실천하는가?",
    dimension: "SN",
    prompt: "예수님이 “물독에 물을 채워라”라고 말씀하셨습니다. 그 말을 들은 나의 머릿속은?",
    options: [
      {
        label: "A",
        text: "“흘리지 말고 정확히 채워야겠다. 물독이 몇 개였지?”",
        value: "S"
      },
      {
        label: "B",
        text: "“왜 하필 물일까? 이 일이 어떻게 이어질까?”",
        value: "N"
      }
    ]
  },
  {
    id: "q08",
    phase: 2,
    phaseTitle: "그가 시키는 대로 하여라",
    phaseSubtitle: "말씀 앞에서 나는 어떻게 받아들이고, 어떻게 실천하는가?",
    dimension: "JP",
    prompt: "이제 실제로 물독에 물을 채워야 합니다. 나의 행동 반응은?",
    options: [
      {
        label: "A",
        text: "“어느 정도까지, 어떤 순서로 채우면 될까요?” 하고 기준을 확인한 뒤 움직인다.",
        value: "J"
      },
      {
        label: "B",
        text: "일단 물을 뜨러 가고, 채우면서 필요한 만큼 맞춰간다.",
        value: "P"
      }
    ]
  },
  {
    id: "q09",
    phase: 3,
    phaseTitle: "기적의 발견과 기쁜 파견",
    phaseSubtitle: "기적을 본 나는 어떻게 이해하고, 어떻게 나누는가?",
    dimension: "TF",
    prompt: "과방장이 “이렇게 맛있는 포도주를 지금까지 남겨두다니!” 하고 감탄합니다. 나의 응답은?",
    options: [
      {
        label: "A",
        text: "“말씀하신 대로 했더니 정말 이렇게 되었네요. 과정이 놀랍습니다.”",
        value: "T"
      },
      {
        label: "B",
        text: "“모두가 기쁘게 잔치를 이어갈 수 있어서 정말 다행이에요.”",
        value: "F"
      }
    ]
  },
  {
    id: "q10",
    phase: 3,
    phaseTitle: "기적의 발견과 기쁜 파견",
    phaseSubtitle: "기적을 본 나는 어떻게 이해하고, 어떻게 나누는가?",
    dimension: "EI",
    prompt: "물이 포도주로 변한 기적을 직접 보았습니다. 나의 첫 반응은?",
    options: [
      {
        label: "A",
        text: "“여러분, 이것 좀 보세요! 진짜 기적이 일어났어요!” 하고 사람들과 나눈다.",
        value: "E"
      },
      {
        label: "B",
        text: "“와… 정말 일어났구나.” 하고 마음속에 조용히 새긴다.",
        value: "I"
      }
    ]
  },
  {
    id: "q11",
    phase: 3,
    phaseTitle: "기적의 발견과 기쁜 파견",
    phaseSubtitle: "기적을 본 나는 어떻게 이해하고, 어떻게 나누는가?",
    dimension: "TF",
    prompt: "이 모든 일을 겪고 난 뒤, 내 마음에 가장 크게 남는 것은?",
    options: [
      {
        label: "A",
        text: "말씀대로 따랐을 때 실제로 일이 이루어졌다는 분명한 깨달음.",
        value: "T"
      },
      {
        label: "B",
        text: "부족한 나를 일꾼으로 불러주시고 기쁨에 함께하게 하신 감사함.",
        value: "F"
      }
    ]
  },
  {
    id: "q12",
    phase: 3,
    phaseTitle: "기적의 발견과 기쁜 파견",
    phaseSubtitle: "기적을 본 나는 어떻게 이해하고, 어떻게 나누는가?",
    dimension: "JP",
    prompt: "잔치가 끝난 뒤, 오늘의 일을 돌아보는 나의 모습은?",
    options: [
      {
        label: "A",
        text: "“처음엔 위기였지만 결국 이렇게 정리되었구나” 하며 과정과 역할을 차분히 되짚는다.",
        value: "J"
      },
      {
        label: "B",
        text: "“오늘 진짜 예상 못 한 일의 연속이었다!” 하며 놀라움과 여운을 자유롭게 즐긴다.",
        value: "P"
      }
    ]
  }
];
```

---

## 8. 문항별 매핑 검수표

| 번호 | 축 | A 선택 | B 선택 | Phase |
|---:|---|---|---|---:|
| 1 | E/I | E | I | 1 |
| 2 | S/N | S | N | 1 |
| 3 | E/I | E | I | 1 |
| 4 | S/N | S | N | 1 |
| 5 | T/F | T | F | 2 |
| 6 | J/P | J | P | 2 |
| 7 | S/N | S | N | 2 |
| 8 | J/P | J | P | 2 |
| 9 | T/F | T | F | 3 |
| 10 | E/I | E | I | 3 |
| 11 | T/F | T | F | 3 |
| 12 | J/P | J | P | 3 |

### 축별 문항 수

| 축 | 문항 수 | 해당 문항 |
|---|---:|---|
| E/I | 3 | 1, 3, 10 |
| S/N | 3 | 2, 4, 7 |
| T/F | 3 | 5, 9, 11 |
| J/P | 3 | 6, 8, 12 |

각 축이 3문항이므로 동점이 발생하지 않는다. 기존 결과 계산 함수는 그대로 사용할 수 있다.

---

## 9. 결과 계산 로직 확인

기존 계산 로직을 유지한다.

```ts
function calculateResult(answers: Record<string, Letter>): string {
  const scores = {
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

### 주의사항

- 질문 ID가 기존 `p1-q1` 형식에서 `q01` 형식으로 바뀌어도 계산은 정상 동작해야 한다.
- 답변 저장 구조가 `answers[question.id] = letter` 형태라면 ID 변경에 따른 문제는 없다.
- localStorage에 이전 버전 답변이 남아 있을 수 있으므로 테스트 시작 시 기존 답변을 초기화하는 처리가 필요하다.

---

## 10. 파일별 수정 지시사항

실제 프로젝트 구조가 다를 수 있으므로, 아래 파일명은 권장 기준이다. 현재 프로젝트의 실제 경로에 맞춰 적용한다.

### 10.1 질문 데이터 파일

예상 파일:

```text
src/data/questions.ts
src/constants/questions.ts
src/features/worker-test/questions.ts
```

수정 내용:

- 기존 `questions` 배열을 신규 데이터로 교체한다.
- `phaseSubtitle` 필드가 없다면 타입과 UI에 추가한다.
- 질문 수가 12개인지 확인한다.
- 모든 `value`가 올바른 MBTI 글자로 들어갔는지 확인한다.

---

### 10.2 라우터 파일

예상 파일:

```text
src/App.tsx
src/routes.tsx
src/router/index.tsx
```

수정 내용:

- `/worker-test/situation` 라우트를 추가한다.
- 시작 페이지 CTA의 이동 경로를 `/worker-test/questions`에서 `/worker-test/situation`으로 변경한다.
- 상황 설명 페이지 CTA의 이동 경로를 `/worker-test/questions`로 연결한다.

예시:

```tsx
<Route path="/worker-test" element={<WorkerTestIntroPage />} />
<Route path="/worker-test/situation" element={<WorkerTestSituationPage />} />
<Route path="/worker-test/questions" element={<WorkerTestQuestionPage />} />
<Route path="/worker-test/result" element={<WorkerTestAllResultsPage />} />
<Route path="/worker-test/result/:mbti" element={<WorkerTestResultPage />} />
```

---

### 10.3 시작 페이지

예상 파일:

```text
src/pages/WorkerTestIntroPage.tsx
src/features/worker-test/pages/IntroPage.tsx
```

수정 내용:

- 메인 CTA 클릭 시 `/worker-test/situation`으로 이동한다.
- 시작 페이지는 너무 많은 설명을 담지 말고, 테스트 제목과 기대감을 주는 역할만 한다.

권장 시작 페이지 카피:

```text
일꾼 TEST
카나의 혼인잔치에서 나는 어떤 일꾼일까?

예상치 못한 위기 앞에서,
나는 무엇을 알아차리고 어떻게 움직일까요?

[테스트 시작하기]
[모든 유형 보기]
```

---

### 10.4 상황 설명 페이지

예상 파일:

```text
src/pages/WorkerTestSituationPage.tsx
src/features/worker-test/pages/SituationPage.tsx
```

구현 내용:

- 신규 페이지 컴포넌트를 만든다.
- 4.2의 최종 카피를 반영한다.
- 5.3의 스토리 단계 카드 4개를 반영한다.
- CTA 클릭 시 질문 페이지로 이동한다.
- 보조 버튼 클릭 시 시작 페이지로 이동한다.

권장 데이터:

```ts
export const storySteps = [
  {
    id: "01",
    title: "초대받다",
    description: "성모님이 나를 잔치의 일꾼으로 부르셨어요."
  },
  {
    id: "02",
    title: "알아차리다",
    description: "잔치의 빈틈과 사람들의 마음을 살펴봅니다."
  },
  {
    id: "03",
    title: "순명하다",
    description: "“그가 시키는 대로 하여라”는 말씀을 듣습니다."
  },
  {
    id: "04",
    title: "발견하다",
    description: "물이 포도주로 변하는 기적을 마주합니다."
  }
];
```

---

### 10.5 질문 페이지

예상 파일:

```text
src/pages/WorkerTestQuestionPage.tsx
src/features/worker-test/pages/QuestionPage.tsx
src/components/QuestionCard.tsx
```

수정 내용:

- 질문 데이터의 `phaseTitle`, `phaseSubtitle`을 화면에 표시한다.
- 기존 Phase 문항 수가 6/3/3으로 하드코딩되어 있다면 제거한다.
- `currentIndex` 기준으로 현재 질문의 Phase 정보를 표시한다.
- 진행률은 `현재 문항 번호 / 12`로 표시한다.
- 1번 문항의 이전 버튼은 상황 설명 페이지로 이동하도록 처리한다.

권장 표시 구조:

```text
Phase 1
성모님의 초대와 위기의 알아챔
예상치 못한 위기 앞에서 나는 무엇을 먼저 보고, 어떻게 반응하는가?

1 / 12
[progress bar]

질문
A 카드
B 카드
```

---

## 11. 질문 화면 UX 세부 정책

### 선택 방식

- A/B 카드 클릭 즉시 해당 답변을 저장한다.
- 선택 후 200~400ms 정도의 짧은 딜레이 후 다음 문항으로 이동하면 반응이 자연스럽다.
- 마지막 문항에서는 자동 이동 대신 `결과 보기` 버튼을 보여주어도 된다.

### 이전 이동

- 2번 이후 문항에서 이전 버튼을 누르면 직전 문항으로 이동한다.
- 1번 문항에서 이전 버튼을 누르면 `/worker-test/situation`으로 이동한다.
- 이전 문항으로 돌아갔을 때 기존 선택 상태를 유지한다.

### 재시작 정책

- 시작 페이지에서 테스트를 새로 시작하면 기존 답변을 초기화한다.
- 결과 페이지의 `다시하기` 버튼도 기존 답변을 초기화하고 `/worker-test/situation`으로 이동하게 한다.

---

## 12. 이미지 및 에셋 권장사항

### 상황 설명 페이지용 이미지

아직 전용 일러스트가 없다면 다음 중 하나로 임시 처리한다.

1. 기존 캐릭터 중 일꾼 대표 캐릭터 1개 사용
2. 물독과 포도주잔 아이콘 조합 사용
3. 단순한 emoji 또는 SVG 아이콘 사용

권장 파일명:

```text
public/assets/worker-test/cana-hero.png
public/assets/worker-test/water-jar.png
public/assets/worker-test/wine-cup.png
```

### 이미지 톤

- 귀여운 둥근 캐릭터 스타일
- 진한 종교화 느낌보다는 말랑하고 가벼운 테스트 페이지 톤
- 물독, 포도주, 잔치 테이블, 포도송이 같은 소재 활용

---

## 13. QA 체크리스트

### 라우팅

- [ ] `/worker-test` 접속 시 시작 페이지가 보인다.
- [ ] 시작 페이지 CTA 클릭 시 `/worker-test/situation`으로 이동한다.
- [ ] 상황 설명 페이지 CTA 클릭 시 `/worker-test/questions`로 이동한다.
- [ ] 질문 1번에서 이전 버튼 클릭 시 상황 설명 페이지로 이동한다.
- [ ] 12번 응답 후 결과 페이지로 이동한다.

### 질문 데이터

- [ ] 질문이 총 12개다.
- [ ] Phase 1은 1~4번이다.
- [ ] Phase 2는 5~8번이다.
- [ ] Phase 3은 9~12번이다.
- [ ] E/I 문항은 1, 3, 10번이다.
- [ ] S/N 문항은 2, 4, 7번이다.
- [ ] T/F 문항은 5, 9, 11번이다.
- [ ] J/P 문항은 6, 8, 12번이다.
- [ ] 모든 A/B 선택지가 올바른 글자로 매핑되어 있다.

### 결과 계산

- [ ] 모든 A 선택 시 결과는 `ESTJ`가 나온다.
- [ ] 모든 B 선택 시 결과는 `INFP`가 나온다.
- [ ] E/I, S/N, T/F, J/P 각 축이 3문항씩이라 동점이 발생하지 않는다.
- [ ] 질문 ID 변경 후에도 결과 계산이 정상 동작한다.

### UI

- [ ] 상황 설명 페이지가 모바일에서 중앙 정렬로 보인다.
- [ ] 본문 카드와 스토리 단계 카드가 너무 길게 보이지 않는다.
- [ ] CTA 버튼은 초록색 메인 버튼으로 보인다.
- [ ] 보조 버튼은 회색 또는 텍스트 버튼으로 보인다.
- [ ] 질문 페이지의 Phase 라벨이 신규 Phase명으로 표시된다.
- [ ] 진행률이 `1 / 12`부터 `12 / 12`까지 정상 표시된다.

---

## 14. 구현 순서

1. `SituationPage` 컴포넌트를 먼저 만든다.
2. 라우터에 `/worker-test/situation`을 추가한다.
3. 시작 페이지 CTA 이동 경로를 `/worker-test/situation`으로 변경한다.
4. 상황 설명 페이지 CTA 이동 경로를 `/worker-test/questions`로 연결한다.
5. 기존 질문 데이터를 신규 12문항 데이터로 교체한다.
6. 질문 타입에 `phaseSubtitle`이 없다면 추가한다.
7. 질문 페이지의 Phase 표시 로직을 신규 데이터 기반으로 수정한다.
8. 1번 문항의 이전 버튼 이동 경로를 상황 설명 페이지로 변경한다.
9. 결과 계산이 정상인지 테스트한다.
10. 전체 모바일 화면에서 여백, 줄바꿈, 버튼 위치를 점검한다.

---

## 15. 완료 기준

이번 수정은 아래 조건을 모두 만족하면 완료로 본다.

1. 시작 페이지와 첫 질문 사이에 상황 설명 페이지가 추가되어 있다.
2. 상황 설명 페이지가 카나 혼인잔치의 서사를 자연스럽게 설명한다.
3. 질문이 신규 12문항으로 모두 교체되어 있다.
4. 각 MBTI 축별 문항 수가 3개씩 유지된다.
5. 결과 계산 로직이 정상적으로 작동한다.
6. 모든 A 선택 시 `ESTJ`, 모든 B 선택 시 `INFP`가 나온다.
7. 레퍼런스 페이지처럼 모바일 중심의 귀엽고 단순한 카드형 톤이 유지된다.

