import { useState } from 'react'

export const useThirdQuestion = () => {
  const [answer, setAnswer] = useState('')
  const [sankeyChart, setSankeyChart] = useState('')
  const [feedback, setFeedback] = useState('')

  const fetchThirdQuestionData = () => {
    // setIsLoading(true)
    console.log('called')
    try {
      const res = new Promise<string>((res) =>
        setTimeout(() => res('brief data'), 2000)
      )
      res
        .then((result) => {
          setAnswer(result)
          return 'green signal for description'
        })
        .then((answers) => {
          const timer = setTimeout(() => {
            setSankeyChart(answers)
          }, 2000)
          return timer
        })
        .then((nextQuestion) =>
          setTimeout(() => {
            setFeedback(nextQuestion ? 'green' : '')
          }, 3000)
        )
      //   setIsLoading(false)
    } catch (error) {
      console.log('err')
      //   setIsLoading(false)
    }
  }
  return { answer, fetchThirdQuestionData, sankeyChart, feedback }
}
