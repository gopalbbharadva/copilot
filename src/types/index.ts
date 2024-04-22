import { ReactElement } from 'react'

export type QuestionPropsType = {
  text: string
  clickHandler: () => void
  className?: string
  disabled: boolean
}

export type QuestionWithAvatarPropsType = {
  text: ReactElement
  containerStyle?: string
  avatarUrl?: string
  className?: string
}

export type SubHeaderPropsType = {
  text: string
}

export type toggleVisibilityArgType = {
  id: number
  setShowCurrentQuestionId: React.Dispatch<React.SetStateAction<number>>
  fetchData: () => void
  fetchSecondQuestionData: () => void
  fetchThirdQuestionData: () => void
}

export type ThirdQuestionPropsType = {
  currentQuestionId: number
  isAnswerLoading: boolean
  sankeyChart: string
  zoomLevel: number
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>
  handleZoomIn: (
    setZoomLevel: React.Dispatch<React.SetStateAction<number>>
  ) => void
  handleZoomOut: (
    setZoomLevel: React.Dispatch<React.SetStateAction<number>>
  ) => void
  feedback: string
}

export type QuestionType = {
  id: number
  question: string
  isCurrent: boolean
}

export type SecondQuestionPropsType = {
  currentQuestionId: number
  briefData: string
  currentButtonHandler: (isCurrent: boolean, currenQuestionId: number) => void
  thirdQuestion: string
  description: string
  questions: QuestionType[]
  toggleSecondAnswerRetrieve: (
    briefData: string,
    currenQuestionId: number
  ) => void
}

export type FirstQuestionPropsType = {
  isLoading: boolean
  toggleShowQuery: () => void
  showQuery: boolean
  chart: string
  data: string
  nextQuestion: string
  currentQuestionId: number
  currentButtonHandler: (isCurrent: boolean, id: number) => void
  questions: QuestionType[]
}
