import { useState } from 'react'

export const useSecondQuestion = () => {
  const [briefData, setBriefData] = useState('')
  const [description, setDescription] = useState('')
  const [thirdQuestion, setThirdQuestion] = useState('')

  const fetchSecondQuestionData = () => {
    try {
      const res = new Promise<string>((res) =>
        setTimeout(() => res('show description'), 2000)
      )
      res
        .then((result) => {
          setBriefData(result)
          return 'answer'
        })
        .then((answers) => {
          const timer = setTimeout(() => {
            setDescription(answers)
          }, 2000)
          return timer
        })
        .then((nextQuestion) =>
          setTimeout(() => {
            setThirdQuestion(nextQuestion ? 'show next question' : '')
          }, 3000)
        )
    } catch (error) {
      console.log('err')
    }
  }
  return { briefData, fetchSecondQuestionData, description, thirdQuestion }
}
