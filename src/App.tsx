import './App.css'
import { Option } from './components/Option'
import { HiOutlineCodeBracket } from 'react-icons/hi2'
import { LuSendHorizonal } from 'react-icons/lu'
import { useEffect, useRef, useState } from 'react'
import { useFirstQuestion } from './hooks/useFirstQuestion'

import { QUESTIONS_LIST, START_TYPING } from './constants'
import { useSecondQuestion } from './hooks/useSecondQuestion'
import { useThirdQuestion } from './hooks/useThirdQuestion'
import {
  handleZoomIn,
  handleZoomOut,
  toggleSecondAnswerRetrieve,
  toggleThirdAnswerCompile,
  toggleVisibility,
} from './utils'
import {
  FirstQuestion,
  SecondQuestion,
  ThirdQuestion,
} from '../src/components/index'

function App() {
  const [questions, setQuestions] = useState(QUESTIONS_LIST)
  const [currentQuestionId, setShowCurrentQuestionId] = useState<number>(0)
  const [zoomLevel, setZoomLevel] = useState(1.2)
  const [showQuery, setShowQuery] = useState(true)

  const { isLoading, fetchData, data, chart, nextQuestion } = useFirstQuestion()
  const toggleShowQuery = () => {
    setShowQuery((prev) => !prev)
  }
  const { briefData, description, fetchSecondQuestionData, thirdQuestion } =
    useSecondQuestion()

  const { answer, feedback, fetchThirdQuestionData, sankeyChart } =
    useThirdQuestion()

  useEffect(() => {
    if (chart.length !== 0 && currentQuestionId == 1) {
      toggleShowQuery()
    }
    if (chart.length !== 0) {
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
    if (description.length !== 0) {
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
  }, [chart, description, data, currentQuestionId])

  const currentButtonHandler = (isCurrent: boolean, id: number) => {
    return isCurrent
      ? toggleVisibility({
          id,
          fetchData,
          fetchSecondQuestionData,
          fetchThirdQuestionData,
          setShowCurrentQuestionId,
        })
      : () => {}
  }

  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [
    chart,
    description,
    data,
    sankeyChart,
    feedback,
    briefData,
    nextQuestion,
    answer,
    thirdQuestion,
  ])

  return (
    <>
      <div
        className={`border h-screen border-black flex overflow-y-auto justify-start items-center bg-slate-100 flex-col`}
      >
        {currentQuestionId === 0 && (
          <div className='grid grid-cols-2 gap-4 mb-24 px-12 mt-auto pb-6 w-full'>
            {questions.map(({ id, isCurrent, question }) => (
              <Option
                disabled={!isCurrent}
                clickHandler={() => currentButtonHandler(isCurrent, id)}
                key={id}
                text={question}
              />
            ))}
          </div>
        )}

        {currentQuestionId !== 0 && (
          <div className='w-full px-4 flex justify-start items-start flex-col gap-2'>
            {/* FIRST QUESTION */}
            <FirstQuestion
              chart={chart}
              currentButtonHandler={currentButtonHandler}
              data={data}
              currentQuestionId={currentQuestionId}
              isLoading={isLoading}
              nextQuestion={nextQuestion}
              questions={questions}
              showQuery={showQuery}
              toggleShowQuery={toggleShowQuery}
            />

            {/* SECOND Question */}

            <SecondQuestion
              briefData={briefData}
              currentButtonHandler={currentButtonHandler}
              description={description}
              currentQuestionId={currentQuestionId}
              questions={questions}
              thirdQuestion={thirdQuestion}
              toggleSecondAnswerRetrieve={toggleSecondAnswerRetrieve}
            />

            {/* THIRD Question */}
            <ThirdQuestion
              answer={answer}
              currentQuestionId={currentQuestionId}
              feedback={feedback}
              handleZoomIn={handleZoomIn}
              handleZoomOut={handleZoomOut}
              sankeyChart={sankeyChart}
              setZoomLevel={setZoomLevel}
              toggleThirdAnswerCompile={toggleThirdAnswerCompile}
              zoomLevel={zoomLevel}
            />
          </div>
        )}
        <div
          className='flex absolute bottom-10 justify-between p-3 border shadow-lg 
          w-[74rem] max-w-full text-gray-400 border-gray-500 rounded-xl text-sm mt-6 bg-white'
        >
          {START_TYPING}
          <div className='flex justify-center items-center gap-4'>
            <HiOutlineCodeBracket className='text-gray-400' />
            <LuSendHorizonal className='text-gray-400' />
          </div>
        </div>
        <div ref={ref}></div>
      </div>
    </>
  )
}

export default App
