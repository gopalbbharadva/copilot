import './App.css'
import { Question } from './components/Question'
import { HiOutlineCodeBracket } from 'react-icons/hi2'
import { LuSendHorizonal } from 'react-icons/lu'
import { QuestionWithAvatar } from './components/QuestionWithAvatar'
import Astuto from '../public/Astuto.png'
import Avatar from '../public/Avatar.jpg'
import { useEffect, useRef, useState } from 'react'
import { useSqlQuery } from './hooks/useSqlQuery'
import { Chart } from 'react-google-charts'
import { AnimatePresence } from 'framer-motion'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'
import { SlLike } from 'react-icons/sl'
import { SlDislike } from 'react-icons/sl'
import { PiMinus } from 'react-icons/pi'
import { BsPlusLg } from 'react-icons/bs'

import {
  ANSWERS,
  COSTS_EXPENSE_CHART_OPTIONS,
  COST_EXPENSE_DATA,
  OPTIONS,
  QUESTIONS_LIST,
  DATA_STORES,
} from './constants'
import { Answer } from './components/static/Answer'
import { useSecondQuestion } from './hooks/useSecondQuestion'
import { useThirdQuestion } from './hooks/useThirdQuestion'
import { handleZoomIn, handleZoomOut, toggleVisibility } from './utils'
import { MotionWrapper } from './components/MotionWrapper'
import { CodeSnippet } from './components/static/CodeSnippet'
import { SubHeader } from './components/SubHeader'

function App() {
  const [questions, setQuestions] = useState(QUESTIONS_LIST)
  const [currentQuestionId, setShowCurrentQuestionId] = useState<number>(0)
  const [showQuery, setShowQuery] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(1.2)
  const { isLoading, fetchData, data, chart, nextQuestion } = useSqlQuery()
  const { briefData, description, fetchSecondQuestionData, thirdQuestion } =
    useSecondQuestion()

  const { answer, feedback, fetchThirdQuestionData, sankeyChart } =
    useThirdQuestion()

  const toggleShowQuery = () => {
    setShowQuery((prev) => !prev)
  }

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
        {/* <div className='w-full self-end'> */}
        {currentQuestionId === 0 && (
          <div className='grid grid-cols-2 gap-4 mb-24 px-12 mt-auto pb-6 w-full'>
            {questions.map(({ id, isCurrent, question }) => (
              <Question
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
            {/* *********************** 
            FIRST QUESTION AND ANSWER 
            *************************
            */}
            <QuestionWithAvatar
              avatarUrl={Avatar}
              containerStyle='flex justify-start items-center w-full border py-4 border-none rounded-lg text-sm'
              text={
                <p>Top cloud costs by services in production account(#24542)</p>
              }
            />
            <AnimatePresence>
              {isLoading && (
                <MotionWrapper className='w-full'>
                  <QuestionWithAvatar
                    avatarUrl={Astuto}
                    containerStyle='flex justify-start items-center w-full border py-4 bg-white border-none rounded-lg text-sm'
                    text={<p>Generating SQL Query...</p>}
                  />
                </MotionWrapper>
              )}
            </AnimatePresence>
            {/* SQL CODE SNIPPET */}
            {/* {data && ( */}
            <AnimatePresence>
              {!isLoading && (
                <MotionWrapper
                  className='w-full flex justify-center items-center flex-col'
                  clickHandler={toggleShowQuery}
                >
                  <div className='flex justify-center items-center w-full'>
                    <span className='font-sm'>Query</span>
                    <div className='border border-gray-400 w-full mx-4'> </div>
                    <button className='hover:cursor-pointer'>
                      {showQuery ? <SlArrowUp /> : <SlArrowDown />}
                    </button>
                  </div>

                  {showQuery && <CodeSnippet />}
                </MotionWrapper>
              )}
            </AnimatePresence>
            {/* )} */}
            {/* PIE CHART STARTS */}
            {!chart && data && (
              <MotionWrapper className='w-full'>
                <QuestionWithAvatar
                  avatarUrl={Astuto}
                  containerStyle='flex justify-start items-center w-full border py-4 bg-white border-none rounded-lg text-sm'
                  text={<p>Compiling data...</p>}
                />
              </MotionWrapper>
            )}
            {chart && (
              <MotionWrapper className='w-full'>
                <QuestionWithAvatar
                  avatarUrl={Astuto}
                  containerStyle='flex justify-start items-center w-full border py-4 bg-white border-none rounded-lg text-sm'
                  text={
                    <p>
                      You production account (#24542) has accumulated costs of
                      $100,000 over the past month, here is spread of cloud
                      costs of services;
                    </p>
                  }
                />
              </MotionWrapper>
            )}
            {chart.length !== 0 && (
              <MotionWrapper className='w-full bg-white'>
                <SubHeader text='Pie Chart' />
                <Chart
                  chartType='PieChart'
                  width='100%'
                  height='400px'
                  data={DATA_STORES}
                  options={OPTIONS}
                />
              </MotionWrapper>
            )}
            {/* PIE CHART ENDS */}

            {/* NEXT QUESTIONS STARTS*/}
            {nextQuestion.length !== 0 && currentQuestionId === 1 && (
              <MotionWrapper className='flex justify-center items-center w-full p-2 bg-white rounded-lg'>
                <SubHeader text='You might also want to know' />
              </MotionWrapper>
            )}
            {nextQuestion.length !== 0 && currentQuestionId === 1 && (
              <MotionWrapper className='grid grid-cols-2 gap-4 px-12 self-end w-full bg-white p-6 rounded-lg'>
                {questions.map(({ id, isCurrent, question }) => (
                  <Question
                    disabled={!isCurrent}
                    clickHandler={() => currentButtonHandler(isCurrent, id)}
                    key={id}
                    text={question}
                  />
                ))}
              </MotionWrapper>
            )}
            {/* NEXT QUESTIONS ENDS */}

            {/* feedback  */}
            {currentQuestionId === 1 && nextQuestion.length !== 0 && (
              <MotionWrapper className='m-auto flex justify-center items-center gap-4 '>
                <p className='text-gray-500 font-light'>
                  Have the answers been satisfactory so far?
                </p>
                <SlLike className='hover:text-green-500 cursor-pointer' />
                <SlDislike className='hover:text-red-500 cursor-pointer' />
              </MotionWrapper>
            )}
            {nextQuestion.length !== 0 && currentQuestionId === 1 && (
              <div className='h-28'></div>
            )}
            {/* 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 */}
            {/* 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222 */}

            {/* SECOND Question */}
            {currentQuestionId > 1 && (
              <QuestionWithAvatar
                avatarUrl={Avatar}
                containerStyle='flex justify-start items-center w-full border py-4 border-none rounded-lg text-sm'
                text={<p>How can I reduce my EC2 costs?</p>}
              />
            )}
            {!briefData && currentQuestionId > 1 && (
              <QuestionWithAvatar
                className={`
                ${
                  !briefData && currentQuestionId > 1
                    ? 'opacity-100'
                    : 'opacity-0'
                } 
                transition delay-500 duration-700`}
                avatarUrl={Astuto}
                containerStyle='flex justify-start items-center w-full border py-4 bg-white border-none rounded-lg text-sm'
                text={<p>Retrieving Data...</p>}
              />
            )}
            {briefData && currentQuestionId > 1 && (
              <MotionWrapper className='w-full'>
                <QuestionWithAvatar
                  avatarUrl={Astuto}
                  containerStyle='flex justify-start items-center w-full border bg-white py-4 border-none rounded-lg text-sm'
                  text={
                    <div className='flex flex-col justify-start items-start gap-2'>
                      <p>
                        You can save $2500 per month overall in EC2 costs.{' '}
                        <a className='text-green-500 underline' href='/'>
                          Click here
                        </a>{' '}
                        to access a detailed report.
                      </p>
                      <p>Here are your top 2 savings area:</p>
                    </div>
                  }
                />
              </MotionWrapper>
            )}

            {description && currentQuestionId > 1 && (
              <MotionWrapper className='flex justify-center items-center flex-col gap-4 transition delay-500 duration-700 bg-white p-2 rounded-md'>
                <SubHeader text='Top two saving areas' />
                {ANSWERS.map((answer) => (
                  <Answer
                    firstLine={answer.firsLine}
                    secondLine={answer.secondLine}
                  />
                ))}
              </MotionWrapper>
            )}

            {/* THIRD QUESTION */}

            {thirdQuestion.length !== 0 && currentQuestionId === 2 && (
              <MotionWrapper className='flex justify-center items-center w-full p-2 bg-white rounded-lg'>
                <SubHeader text='You might also want to know' />
              </MotionWrapper>
            )}
            {thirdQuestion.length !== 0 && currentQuestionId === 2 && (
              <MotionWrapper className='grid grid-cols-2 gap-4 px-12 self-end w-full transition delay-500 duration-700 bg-white p-6 rounded-lg'>
                {questions.map(({ id, isCurrent, question }) => (
                  <Question
                    disabled={!isCurrent}
                    clickHandler={() => currentButtonHandler(isCurrent, id)}
                    key={id}
                    text={question}
                  />
                ))}
              </MotionWrapper>
            )}
            {/* feedback  */}
            {thirdQuestion.length !== 0 && currentQuestionId === 2 && (
              <MotionWrapper className='m-auto flex justify-center items-center gap-4 transition delay-500 duration-700'>
                <p className='text-gray-500 font-light'>
                  Have the answers been satisfactory so far?
                </p>
                <SlLike className='hover:text-green-500 cursor-pointer' />
                <SlDislike className='hover:text-red-500 cursor-pointer' />
              </MotionWrapper>
            )}
            {thirdQuestion.length !== 0 && currentQuestionId === 2 && (
              <div className='h-28'></div>
            )}
            {/* THIRD Question */}

            {currentQuestionId === 3 && (
              <QuestionWithAvatar
                avatarUrl={Avatar}
                containerStyle='flex justify-start items-center w-full border py-4 border-none rounded-lg text-sm'
                text={<p>Why are EC2 costs increasing so much?</p>}
              />
            )}
            {!answer && currentQuestionId === 3 && (
              <QuestionWithAvatar
                className={`
                    ${
                      !answer && currentQuestionId === 3
                        ? 'opacity-100'
                        : 'opacity-0'
                    } 
                transition delay-500 duration-700`}
                avatarUrl={Astuto}
                containerStyle='flex justify-start items-center w-full border py-4 bg-white border-none rounded-lg text-sm'
                text={<p>Compiling data...</p>}
              />
            )}
            {answer && currentQuestionId === 3 && (
              <QuestionWithAvatar
                className={`${
                  answer && currentQuestionId === 3
                    ? 'opacity-100'
                    : 'opacity-0'
                }
                transition delay-500 duration-700`}
                avatarUrl={Astuto}
                containerStyle='flex justify-start items-center w-full border py-4 bg-white border-none rounded-lg text-sm'
                text={
                  <p>
                    You production account (#24542) has accumulated costs of
                    $100,000 over the past month, here is spread of cloud costs
                    of services;
                  </p>
                }
              />
            )}
            {sankeyChart && (
              <MotionWrapper className='relative w-full'>
                <div className='rounded-lg bg-white'>
                  <SubHeader text='Dashboard' />
                </div>
                <div
                  className={`transition delay-500 duration-700  
                  h-fit w-full overflow-auto border-2 border-gray-400 rounded-xl scrollbar-hidden mt-4`}
                >
                  <div
                    style={{
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: 'top left',
                    }}
                  >
                    <Chart
                      chartType='Sankey'
                      width='100%'
                      height='500px'
                      data={COST_EXPENSE_DATA}
                      options={COSTS_EXPENSE_CHART_OPTIONS}
                    />
                  </div>
                </div>
                <div className='absolute bottom-5 right-10'>
                  <button
                    disabled={zoomLevel === 1.728}
                    className='text-3xl border border-gray-300 rounded-md bg-white disabled:opacity-30 disabled:cursor-pointer'
                    onClick={() => handleZoomIn(setZoomLevel)}
                  >
                    <BsPlusLg />
                  </button>
                  <button
                    disabled={zoomLevel === 0.833}
                    className='text-3xl border border-gray-300 ml-2 rounded-md bg-white disabled:opacity-30 disabled:cursor-pointer'
                    onClick={() => handleZoomOut(setZoomLevel)}
                  >
                    <PiMinus />
                  </button>
                </div>
              </MotionWrapper>
            )}
            {feedback.length !== 0 && (
              <div className='m-auto flex justify-center items-center gap-4 '>
                <p className='text-gray-500 font-light'>
                  Have the answers been satisfactory so far?
                </p>
                <SlLike className='hover:text-green-500 cursor-pointer' />
                <SlDislike className='hover:text-red-500 cursor-pointer' />
              </div>
            )}
            {feedback.length !== 0 && <div className='h-28'></div>}
          </div>
        )}
        <div
          className='flex absolute bottom-10 justify-between p-3 border shadow-lg 
          w-[74rem] max-w-full text-gray-400 border-gray-500 rounded-xl text-sm mt-6 bg-white'
        >
          Start typing your query here...
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
