import type { Question } from "../types";

const phaseTitles = {
  1: "예상치 못한 위기와 성모님의 알아챔",
  2: '"그가 시키는 대로 하여라"',
  3: "기적의 발견과 기쁜 파견",
} as const;

export const questions: Question[] = [
  {
    id: 1,
    phase: 1,
    phaseTitle: phaseTitles[1],
    dimension: "SN",
    prompt: "예식 중 테이블이 조금 기울어진 것 같다. 당신은?",
    optionA: {
      label: "A",
      text: "헉 테이블 약간 기울어졌는데 여기에 뭘 받치면 되겠다!",
      pole: "S",
    },
    optionB: {
      label: "B",
      text: "테이블? 테이블이 기울어졌었어? 나는 몰랐네...",
      pole: "N",
    },
  },
  {
    id: 2,
    phase: 1,
    phaseTitle: phaseTitles[1],
    dimension: "TF",
    prompt: "예식 중 작은 실수가 발생한 것을 보았을 때 당신은?",
    optionA: {
      label: "A",
      text: "이렇게 해야 효율적이지 않나? 대처가 좀 아쉽다.",
      pole: "T",
    },
    optionB: {
      label: "B",
      text: "신랑 신부 당황하는 거 아냐? 내가 다 걱정되네.",
      pole: "F",
    },
  },
  {
    id: 3,
    phase: 1,
    phaseTitle: phaseTitles[1],
    dimension: "JP",
    prompt: "잔치 식순이 갑자기 바뀌어야 하는 상황이 온다면?",
    optionA: {
      label: "A",
      text: "원래 식사부터 하는 거 아냐? 이유가 있어서 순서가 바뀌었나보네.",
      pole: "J",
    },
    optionB: {
      label: "B",
      text: "오 이거부터 하는구나~ 오히려 좋아~ 재밌겠다!",
      pole: "P",
    },
  },
  {
    id: 4,
    phase: 1,
    phaseTitle: phaseTitles[1],
    dimension: "TF",
    prompt: "포도주가 바닥난 위기 상황을 알게 되었을 때 당신의 반응은?",
    optionA: {
      label: "A",
      text: "헉 큰일이다! 나라도 어디 가서 포도주라도 사와야 하나?",
      pole: "T",
    },
    optionB: {
      label: "B",
      text: "혼주들 준비 열심히 했을텐데... 가서 위로라도 해줘야겠다.",
      pole: "F",
    },
  },
  {
    id: 5,
    phase: 1,
    phaseTitle: phaseTitles[1],
    dimension: "EI",
    prompt: "위기 상황에서 동료 일꾼들과 소통할 때 당신은?",
    optionA: {
      label: "A",
      text: '"여러분 포도주가 없대요!" 즉시 상황을 알리고 대책을 논의한다.',
      pole: "E",
    },
    optionB: {
      label: "B",
      text: "일이 해결될 거라고 믿고 상황을 지켜보며 지시를 기다린다.",
      pole: "I",
    },
  },
  {
    id: 6,
    phase: 1,
    phaseTitle: phaseTitles[1],
    dimension: "SN",
    prompt: '"포도주가 없구나" 하시는 성모님의 말씀을 들었을 때 당신은?',
    optionA: {
      label: "A",
      text: '"포도주가 없다고? 그럼 이제 잔치 끝인가?" 걱정이 든다.',
      pole: "S",
    },
    optionB: {
      label: "B",
      text: '"성모님이 나서신 거 보니 뭔가 대단한 일이 일어날 것 같아!"',
      pole: "N",
    },
  },
  {
    id: 7,
    phase: 2,
    phaseTitle: phaseTitles[2],
    dimension: "SN",
    prompt: '예수님이 "물독에 물을 채워라"고 하셨다. 나의 머릿속은?',
    optionA: {
      label: "A",
      text: "흘리지 말고 정확히 채워야지!",
      pole: "S",
    },
    optionB: {
      label: "B",
      text: "이 물이 어떻게 변할까?",
      pole: "N",
    },
  },
  {
    id: 8,
    phase: 2,
    phaseTitle: phaseTitles[2],
    dimension: "JP",
    prompt: "이제 우물가로 물을 뜨러 가야 한다. 나의 이동 스타일은?",
    optionA: {
      label: "A",
      text: "최단 동선으로 가자!",
      pole: "J",
    },
    optionB: {
      label: "B",
      text: "보이는 것부터 하자!",
      pole: "P",
    },
  },
  {
    id: 9,
    phase: 2,
    phaseTitle: phaseTitles[2],
    dimension: "EI",
    prompt: "무거운 물독을 채우는 지루한 노동 중이다. 나는 지금?",
    optionA: {
      label: "A",
      text: '"여러분, 조금만 더 힘내요!"',
      pole: "E",
    },
    optionB: {
      label: "B",
      text: "말없이 내 몫에 집중한다.",
      pole: "I",
    },
  },
  {
    id: 10,
    phase: 3,
    phaseTitle: phaseTitles[3],
    dimension: "EI",
    prompt: "헐 대박! 물이 포도주로 변했다! 나의 첫 행동은?",
    optionA: {
      label: "A",
      text: '"대박! 이것 좀 보세요!"',
      pole: "E",
    },
    optionB: {
      label: "B",
      text: "와... 진짜 일어났네.",
      pole: "I",
    },
  },
  {
    id: 11,
    phase: 3,
    phaseTitle: phaseTitles[3],
    dimension: "TF",
    prompt: '과방장이 "포도주 맛 실화냐? 최고다!"라고 칭찬한다. 이때 드는 생각은?',
    optionA: {
      label: "A",
      text: "말씀대로 하니까 됐네!",
      pole: "T",
    },
    optionB: {
      label: "B",
      text: "우리를 써주시다니 감사하다.",
      pole: "F",
    },
  },
  {
    id: 12,
    phase: 3,
    phaseTitle: phaseTitles[3],
    dimension: "JP",
    prompt: "잔치가 끝나고 드디어 뒷정리 시간! 지친 나는?",
    optionA: {
      label: "A",
      text: "정해진 순서대로 빨리 치우자!",
      pole: "J",
    },
    optionB: {
      label: "B",
      text: '"오늘 진짜 대박이었죠?"',
      pole: "P",
    },
  },
];
