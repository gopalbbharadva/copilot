import { useState } from 'react'

export const useThirdQuestion = () => {
  const [answer, setAnswer] = useState('')
  const [sankeyChart, setSankeyChart] = useState('')
  const [feedback, setFeedback] = useState('')

  const fetchThirdQuestionData = () => {
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
    } catch (error) {
      console.log('err')
    }
  }
  return { answer, fetchThirdQuestionData, sankeyChart, feedback }
}
