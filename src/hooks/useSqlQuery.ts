import { useState } from 'react'

export const useSqlQuery = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState('')
  const [chart, setChart] = useState('')
  const [nextQuestion, setNextQuestion] = useState('')

  const fetchData = () => {
    setIsLoading(true)
    try {
      const res = new Promise<string>((res) =>
        setTimeout(() => res('done'), 2000)
      )
      res
        .then((result) => {
          console.log(result, 'result')
          setData(result)
          return 'green signal for chart'
        })
        .then((chartData) => {
          const timer = setTimeout(() => {
            setChart(chartData)
          }, 2000)
          return timer
        })
        .then((nextQuestion) =>
          setTimeout(() => {
            setNextQuestion(nextQuestion ? 'green' : '')
          }, 3000)
        )
        .finally(() => {
          setIsLoading(false)
        })
    } catch (error) {
      console.log('err')
      setIsLoading(false)
    }
  }
  return { isLoading, data, fetchData, chart, nextQuestion }
}
