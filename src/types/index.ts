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
