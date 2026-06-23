import type { ResultType } from "../types";

const buildReflection = (name: string, strength: string) =>
  `${name}인 당신은 카나의 잔치에서 ${strength}을 통해 봉사합니다. 지금 내가 살레시오 공동체 안에서 하고 있는 활동을 떠올려 보세요. 나는 어디에서 이런 모습으로 '봉사하는 자유인'이 되고 있나요?`;

export const commonReflectionQuestions = [
  "나는 카나의 잔치에서 어떤 자리에 서 있었나요? 지금 내 봉사의 자리와 닮았나요?",
  '"그가 시키는 대로 하여라"는 말씀을, 내 활동 안에서 어떻게 살고 있나요?',
  "내 유형의 강점이 공동체에 기쁨이 된 순간이 있었나요?",
];

export const results: ResultType[] = [
  {
    code: "ESTP",
    name: "번쩍해결꾼",
    summary: "위기가 오면 누구보다 빠르게 움직이는 현장 해결형 일꾼",
    emoji: "⚡",
    reflection: buildReflection("번쩍해결꾼", "필요한 순간 바로 움직이는 실행력"),
    reflectionQuestion: "내가 가장 빠르게 손을 보탰던 봉사의 순간은 언제였나요?",
  },
  {
    code: "ISTP",
    name: "잠잠해결꾼",
    summary: "말은 적지만 필요한 순간 조용히 문제를 고치는 실속형 일꾼",
    emoji: "🛠️",
    reflection: buildReflection("잠잠해결꾼", "조용히 문제를 살피고 고치는 섬세함"),
    reflectionQuestion: "드러나지 않았지만 공동체를 지탱한 내 수고는 무엇이었나요?",
  },
  {
    code: "ESFP",
    name: "흥잔치꾼",
    summary: "잔치의 분위기를 살리고 모두를 웃게 만드는 에너지형 일꾼",
    emoji: "🎉",
    reflection: buildReflection("흥잔치꾼", "사람들의 마음을 밝히는 생기"),
    reflectionQuestion: "내 밝은 에너지가 누군가에게 힘이 된 순간은 언제였나요?",
  },
  {
    code: "ISFP",
    name: "몽글위로꾼",
    summary: "말 한마디와 따뜻한 마음으로 곁을 지켜주는 감성형 일꾼",
    emoji: "💛",
    reflection: buildReflection("몽글위로꾼", "따뜻한 마음으로 곁을 지키는 위로"),
    reflectionQuestion: "내가 조용히 곁을 지켜주고 싶은 사람은 누구인가요?",
  },
  {
    code: "ENFP",
    name: "두근상상꾼",
    summary: "작은 변화 속에서도 기적의 가능성을 먼저 떠올리는 기대형 일꾼",
    emoji: "✨",
    reflection: buildReflection("두근상상꾼", "새 가능성을 먼저 발견하는 기대"),
    reflectionQuestion: "요즘 내 봉사 안에서 새롭게 기대하게 되는 일은 무엇인가요?",
  },
  {
    code: "INFP",
    name: "묵상지킴꾼",
    summary: "놀라운 순간을 마음 깊이 담아 오래 간직하는 신비형 일꾼",
    emoji: "🕯️",
    reflection: buildReflection("묵상지킴꾼", "마음 깊이 의미를 간직하는 묵상"),
    reflectionQuestion: "내 봉사 안에서 오래 마음에 남은 은총의 장면은 무엇인가요?",
  },
  {
    code: "ENTP",
    name: "잔치발명꾼",
    summary: "예상 밖의 상황도 재밌게 받아들이고 새 길을 찾는 아이디어형 일꾼",
    emoji: "💡",
    reflection: buildReflection("잔치발명꾼", "예상 밖의 상황에서 새 길을 찾는 상상력"),
    reflectionQuestion: "공동체에 새 바람을 불어넣고 싶은 아이디어가 있나요?",
  },
  {
    code: "INTP",
    name: "물독탐구꾼",
    summary: "기적의 흐름과 원리를 조용히 분석해보는 탐구형 일꾼",
    emoji: "🔎",
    reflection: buildReflection("물독탐구꾼", "상황의 흐름과 의미를 차분히 살피는 탐구심"),
    reflectionQuestion: "내가 더 깊이 이해하고 싶은 봉사의 의미는 무엇인가요?",
  },
  {
    code: "ESTJ",
    name: "척척총무꾼",
    summary: "식순과 역할을 빠르게 정리해 잔치를 안정시키는 운영형 일꾼",
    emoji: "📋",
    reflection: buildReflection("척척총무꾼", "역할과 순서를 정리해 공동체를 안정시키는 힘"),
    reflectionQuestion: "내 정리와 책임감이 공동체를 편안하게 만든 적이 있나요?",
  },
  {
    code: "ISTJ",
    name: "꼼꼼채움꾼",
    summary: "맡은 일을 끝까지 정확하게 채워내는 성실형 일꾼",
    emoji: "🏺",
    reflection: buildReflection("꼼꼼채움꾼", "맡은 일을 끝까지 채워내는 성실함"),
    reflectionQuestion: "끝까지 해낸 작은 충실함이 열매가 된 경험은 무엇인가요?",
  },
  {
    code: "ESFJ",
    name: "다정챙김꾼",
    summary: "사람들의 표정과 마음을 살피며 모두를 챙기는 배려형 일꾼",
    emoji: "🤲",
    reflection: buildReflection("다정챙김꾼", "사람들의 마음을 살피고 챙기는 배려"),
    reflectionQuestion: "내가 먼저 알아차리고 챙겨주고 싶은 필요는 무엇인가요?",
  },
  {
    code: "ISFJ",
    name: "순명살림꾼",
    summary: "드러나지 않아도 묵묵히 자리를 지키며 섬기는 헌신형 일꾼",
    emoji: "🌿",
    reflection: buildReflection("순명살림꾼", "묵묵히 자리를 지키며 살리는 헌신"),
    reflectionQuestion: "보이지 않는 자리에서 내가 지키고 있는 소중한 몫은 무엇인가요?",
  },
  {
    code: "ENFJ",
    name: "기쁜파견꾼",
    summary: "받은 은총을 사람들과 나누고 함께 기뻐하는 나눔형 일꾼",
    emoji: "🍷",
    reflection: buildReflection("기쁜파견꾼", "받은 기쁨을 사람들과 나누는 파견의 마음"),
    reflectionQuestion: "내가 공동체와 함께 나누고 싶은 기쁨은 무엇인가요?",
  },
  {
    code: "INFJ",
    name: "은총알아챔꾼",
    summary: "보이지 않는 뜻과 흐름을 먼저 알아차리는 통찰형 일꾼",
    emoji: "🌟",
    reflection: buildReflection("은총알아챔꾼", "보이지 않는 뜻을 알아차리는 통찰"),
    reflectionQuestion: "최근 내 마음이 먼저 알아차린 공동체의 필요는 무엇인가요?",
  },
  {
    code: "ENTJ",
    name: "포도작전꾼",
    summary: "위기 앞에서 대책을 세우고 사람들을 이끄는 지휘형 일꾼",
    emoji: "🧭",
    reflection: buildReflection("포도작전꾼", "위기 앞에서 대책을 세우고 이끄는 추진력"),
    reflectionQuestion: "내가 책임 있게 방향을 잡아야 할 봉사의 자리는 어디인가요?",
  },
  {
    code: "INTJ",
    name: "카나설계꾼",
    summary: "눈앞의 사건 너머 큰 그림과 의미를 읽어내는 전략형 일꾼",
    emoji: "🗺️",
    reflection: buildReflection("카나설계꾼", "큰 그림과 의미를 읽어내는 전략적 시선"),
    reflectionQuestion: "내 봉사가 더 큰 여정 안에서 어디로 이어진다고 느끼나요?",
  },
];

export const resultMap = Object.fromEntries(
  results.map((result) => [result.code, result]),
) as Record<ResultType["code"], ResultType>;
