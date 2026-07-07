import type { Question } from "../types";

const phases = {
  1: {
    title: "성모님의 초대와 분위기 알아채기",
    subtitle:
      "예상치 못한 자리 앞에서 무엇을 먼저 보고, 어떻게 반응하는가?",
  },
  2: {
    title: "그가 시키는 대로 하여라",
    subtitle: "말씀 앞에서 어떻게 받아들이고, 어떻게 실천하는가?",
  },
  3: {
    title: "기적의 발견과 기쁜 나눔",
    subtitle: "기적의 변화를 어떻게 이해하고, 어떻게 나누는가?",
  },
} as const;

export const questions: Question[] = [
  {
    id: 1,
    phase: 1,
    phaseTitle: phases[1].title,
    phaseSubtitle: phases[1].subtitle,
    dimension: "EI",
    prompt:
      "성모님이 당신을 카나 혼인잔치의 일꾼으로 초대하셨습니다. 성모님이 나를 초대한 이유는?",
    optionA: {
      label: "A",
      text: "사람들과 금방 어울리고, 필요한 순간 분위기를 살리며 함께 움직일 수 있어서",
      pole: "E",
    },
    optionB: {
      label: "B",
      text: "조용히 흐름을 지켜보며, 맡겨진 일을 끝까지 책임질 수 있어서",
      pole: "I",
    },
  },
  {
    id: 2,
    phase: 1,
    phaseTitle: phases[1].title,
    phaseSubtitle: phases[1].subtitle,
    dimension: "SN",
    prompt: "잔치가 시작되었습니다. 당신의 시선이 가장 먼저 머무는 곳은 어디입니까?",
    optionA: {
      label: "A",
      text: "비어 가는 잔, 흔들리는 테이블, 부족한 음식처럼 눈에 보이는 준비 상태",
      pole: "S",
    },
    optionB: {
      label: "B",
      text: "사람들의 표정, 잔치의 분위기, 오늘 이 자리에서 일어날 것 같은 묘한 흐름",
      pole: "N",
    },
  },
  {
    id: 3,
    phase: 1,
    phaseTitle: phases[1].title,
    phaseSubtitle: phases[1].subtitle,
    dimension: "EI",
    prompt: "일꾼으로 움직이기 시작했습니다. 내가 일하는 스타일은?",
    optionA: {
      label: "A",
      text: "함께 일하는 사람들을 먼저 찾고, 서로 무리하지 않도록 자연스럽게 말을 맞춘다",
      pole: "E",
    },
    optionB: {
      label: "B",
      text: "내가 맡아야 할 일을 먼저 파악하고, 말없이 차근차근 처리한다",
      pole: "I",
    },
  },
  {
    id: 4,
    phase: 1,
    phaseTitle: phases[1].title,
    phaseSubtitle: phases[1].subtitle,
    dimension: "SN",
    prompt:
      "성모님과 예수님이 포도주가 없구나라고 이야기하시는 것을 듣게 되었습니다. 이때 당신의 반응은?",
    optionA: {
      label: "A",
      text: "정말 포도주가 부족한지, 항아리나 잔은 얼마나 남았는지 상황을 확인하러 간다",
      pole: "S",
    },
    optionB: {
      label: "B",
      text: "무언가 중요한 일이 시작되려는 것 같다고 느끼며 흐름을 지켜본다",
      pole: "N",
    },
  },
  {
    id: 5,
    phase: 2,
    phaseTitle: phases[2].title,
    phaseSubtitle: phases[2].subtitle,
    dimension: "TF",
    prompt:
      "성모님이 일꾼들에게 그가 시키는 대로 하여라 하고 말씀하셨습니다. 당신의 첫 생각은?",
    optionA: {
      label: "A",
      text: "그가 누구시기에? 왜 그분의 말을 따라야 하지? 하며 이유와 상황을 먼저 이해하려 한다",
      pole: "T",
    },
    optionB: {
      label: "B",
      text: "성모님이 그렇게 말씀하셨다면 믿고 따르겠다고 마음으로 받아들인다",
      pole: "F",
    },
  },
  {
    id: 6,
    phase: 2,
    phaseTitle: phases[2].title,
    phaseSubtitle: phases[2].subtitle,
    dimension: "JP",
    prompt: "아직 예수님이 구체적인 지시를 하지 않으셨습니다. 당신은 어떻게 행동합니까?",
    optionA: {
      label: "A",
      text: "지금 내가 무엇을 하면 좋을지 먼저 생각하며 할 일을 분명히 하려 한다",
      pole: "J",
    },
    optionB: {
      label: "B",
      text: "지금은 기다릴 때라고 생각하고, 그분이 시키실 때까지 상황을 지켜본다",
      pole: "P",
    },
  },
  {
    id: 7,
    phase: 2,
    phaseTitle: phases[2].title,
    phaseSubtitle: phases[2].subtitle,
    dimension: "SN",
    prompt: "예수님이 항아리에 물을 채워라 하고 말씀하셨습니다. 그 말을 들은 당신의 머릿속은?",
    optionA: {
      label: "A",
      text: "항아리가 몇 개지? 어디까지 채워야 하지? 정확히 확인한다",
      pole: "S",
    },
    optionB: {
      label: "B",
      text: "평범한 물이 왜 필요할까? 이 일이 어떻게 이어질까? 하고 생각한다",
      pole: "N",
    },
  },
  {
    id: 8,
    phase: 2,
    phaseTitle: phases[2].title,
    phaseSubtitle: phases[2].subtitle,
    dimension: "JP",
    prompt: "이제 실제로 항아리에 물을 채워야 합니다. 당신의 행동 반응은?",
    optionA: {
      label: "A",
      text: "어느 항아리부터, 어떤 순서로 채우면 좋을지 기준을 확인하고 움직인다",
      pole: "J",
    },
    optionB: {
      label: "B",
      text: "일단 물을 길어 오고, 채우면서 필요한 만큼 맞춰 간다",
      pole: "P",
    },
  },
  {
    id: 9,
    phase: 3,
    phaseTitle: phases[3].title,
    phaseSubtitle: phases[3].subtitle,
    dimension: "TF",
    prompt:
      "과방장이 신기하게 맛있는 포도주를 지금까지 아껴 두었다고 감탄합니다. 당신의 응답은?",
    optionA: {
      label: "A",
      text: "정말 말씀하신 대로 되었네요. 과정이 뜻깊습니다.",
      pole: "T",
    },
    optionB: {
      label: "B",
      text: "모두가 기쁘게 잔치를 이어 갈 수 있어서 정말 행복해요.",
      pole: "F",
    },
  },
  {
    id: 10,
    phase: 3,
    phaseTitle: phases[3].title,
    phaseSubtitle: phases[3].subtitle,
    dimension: "EI",
    prompt: "물이 포도주로 변한 기적을 직접 보았습니다. 당신의 첫 반응은?",
    optionA: {
      label: "A",
      text: "여러분, 이것 좀 보세요! 진짜 기적이 일어났어요! 하고 사람들과 나눈다",
      pole: "E",
    },
    optionB: {
      label: "B",
      text: "이게 정말 일어났구나 하고 마음속에 조용히 담아 둔다",
      pole: "I",
    },
  },
  {
    id: 11,
    phase: 3,
    phaseTitle: phases[3].title,
    phaseSubtitle: phases[3].subtitle,
    dimension: "TF",
    prompt: "이 모든 일을 겪고 난 뒤, 당신의 마음에 가장 크게 남는 것은?",
    optionA: {
      label: "A",
      text: "말씀대로 따랐더니 실제로 일이 이루어졌다는 분명한 깨달음",
      pole: "T",
    },
    optionB: {
      label: "B",
      text: "부족한 나를 일꾼으로 불러 주시고 기쁘게 하신 감사함",
      pole: "F",
    },
  },
  {
    id: 12,
    phase: 3,
    phaseTitle: phases[3].title,
    phaseSubtitle: phases[3].subtitle,
    dimension: "JP",
    prompt: "잔치가 끝난 뒤, 오늘의 일을 돌아보는 당신의 모습은?",
    optionA: {
      label: "A",
      text: "처음엔 긴장했지만 결국 이렇게 정리되었구나 하며 과정과 역할을 차분히 되짚는다",
      pole: "J",
    },
    optionB: {
      label: "B",
      text: "오늘 정말 예상 못 한 일이 계속되었네 하며 떨림과 여운을 자유롭게 즐긴다",
      pole: "P",
    },
  },
];
