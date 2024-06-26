import { QuestionType, toggleVisibilityArgType } from '../types'

export const toggleVisibility = ({
  id,
  setShowCurrentQuestionId,
  fetchData,
  fetchSecondQuestionData,
  fetchThirdQuestionData,
}: toggleVisibilityArgType) => {
  setShowCurrentQuestionId(id)
  switch (id) {
    case 1:
      fetchData()
      break
    case 2:
      fetchSecondQuestionData()
      break
    case 3:
      fetchThirdQuestionData()
      break
    default:
      break
  }
}

export const handleZoomIn = (
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>
) => {
  setZoomLevel((prevZoomLevel) =>
    prevZoomLevel < 1.728 ? +(prevZoomLevel * 1.2).toFixed(3) : prevZoomLevel
  )
}

export const handleZoomOut = (
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>
) => {
  setZoomLevel((prevZoomLevel) =>
    prevZoomLevel > 0.833 ? +(prevZoomLevel / 1.2).toFixed(3) : prevZoomLevel
  )
}

export const toggleSecondAnswerRetrieve = (
  briefData: string,
  currentQuestionId: number
) => {
  return !briefData && currentQuestionId > 1 ? 'opacity-100' : 'opacity-0'
}

export const gotThirdAnswerDescription = (
  answer: string,
  currentQuestionId: number
) => {
  return answer && currentQuestionId === 3
}
export const toggleThirdAnswerCompile = (
  answer: string,
  currentQuestionId: number
) => {
  return gotThirdAnswerDescription(answer, currentQuestionId)
    ? 'opacity-100'
    : 'opacity-0'
}

export const changeSecondQuestion = (
  setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>
) => {
  setQuestions((prev) =>
    prev.map((q) =>
      q.id === 2
        ? {
            ...q,
            isCurrent: true,
            question: 'How can I reduce my EC2 costs?',
          }
        : { ...q, isCurrent: false }
    )
  )
}

export const changeThirdQuestion = (
  setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>
) => {
  setQuestions((prev) =>
    prev.map((q) =>
      q.id === 3
        ? {
            ...q,
            isCurrent: true,
            question: 'Why are EC2 costs increasing so much?',
          }
        : { ...q, isCurrent: false }
    )
  )
}
