import { useState } from 'react'

export const useThirdQuestion = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [answer, setAnswer] = useState('')
  const [sankeyChart, setSankeyChart] = useState('')
  const [feedback, setFeedback] = useState('')

  const fetchThirdQuestionData = () => {
    setIsLoading(true)
    try {
      const res = new Promise<string>((res) =>
        setTimeout(() => res('description'), 2000)
      )
      res
        .then((result) => {
          setAnswer(result)
          return 'sankey chart'
        })
        .then((answers) => {
          const timer = setTimeout(() => {
            setSankeyChart(answers)
          }, 2000)
          return timer
        })
        .then((nextQuestion) =>
          setTimeout(() => {
            setFeedback(nextQuestion ? 'show suggestion' : '')
          }, 3000)
        )
        .finally(() => {
          setIsLoading(false)
        })
    } catch (error) {
      console.log('err')
    }
  }
  return { isLoading, answer, fetchThirdQuestionData, sankeyChart, feedback }
}
