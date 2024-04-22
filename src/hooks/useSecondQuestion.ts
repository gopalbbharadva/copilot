import { useState } from 'react'

export const useSecondQuestion = () => {
  //   const [isLoading, setIsLoading] = useState(false)
  const [briefData, setBriefData] = useState('')
  const [description, setDescription] = useState('')
  const [thirdQuestion, setThirdQuestion] = useState('')

  const fetchSecondQuestionData = () => {
    // setIsLoading(true)
    console.log('called')
    try {
      const res = new Promise<string>((res) =>
        // 2000
        setTimeout(() => res('brief data'), 2000)
      )
      res
        .then((result) => {
          setBriefData(result)
          return 'green signal for description'
        })
        .then((answers) => {
          const timer = setTimeout(() => {
            setDescription(answers)
          }, 2000)
          return timer
        })
        .then((nextQuestion) =>
          setTimeout(() => {
            setThirdQuestion(nextQuestion ? 'green' : '')
          }, 3000)
        )
      //   setIsLoading(false)
    } catch (error) {
      console.log('err')
      //   setIsLoading(false)
    }
  }
  return { briefData, fetchSecondQuestionData, description, thirdQuestion }
}
