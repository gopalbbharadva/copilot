import { useState } from 'react'

export const useFirstQuestion = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState('')
  const [chart, setChart] = useState('')
  const [nextQuestion, setNextQuestion] = useState('')

  const fetchData = () => {
    setIsLoading(true)
    try {
      const res = new Promise<string>((res) =>
        setTimeout(() => res('show sql query'), 2000)
      )
      res
        .then((result) => {
          setData(result)
          return 'chart to show'
        })
        .then((chartData) => {
          const timer = setTimeout(() => {
            setChart(chartData)
          }, 2000)
          return timer
        })
        .then((nextQuestion) =>
          setTimeout(() => {
            setNextQuestion(nextQuestion ? 'show next question' : '')
          }, 3000)
        )
        .finally(() => {
          setIsLoading(false)
        })
    } catch (error) {
      setIsLoading(false)
    }
  }
  return { isLoading, data, fetchData, chart, nextQuestion }
}
