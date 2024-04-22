import './App.css'
import { Question } from './components/Question'
import { HiOutlineCodeBracket } from 'react-icons/hi2'
import { LuSendHorizonal } from 'react-icons/lu'
import { QuestionWithAvatar } from './components/QuestionWithAvatar'
import Astuto from '../public/Astuto.png'
import Avatar from '../public/Avatar.jpg'
import { useEffect, useState } from 'react'
import { useSqlQuery } from './hooks/useSqlQuery'
import { Chart } from 'react-google-charts'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'
import { SlLike } from 'react-icons/sl'
import { SlDislike } from 'react-icons/sl'
import { PiMinus } from 'react-icons/pi'
import { BsPlusLg } from 'react-icons/bs'

import {
  Answers,
  costExpenseChartOptions,
  costExpenseData,
  questionsList,
  tasks,
} from './constants'
import { Answer } from './components/static/Answer'
import { useSecondQuestion } from './hooks/useSecondQuestion'
import { useThirdQuestion } from './hooks/useThirdQuestion'

const options = {
  pieHole: 0.8,
  is3D: false,
  pieSliceTextStyle: {
    color: 'black',
  },
}

function App() {
  // const [isFirstQuestionStarted, setIsFirstQuestionStarted] = useState(false)
  const [questions, setQuestions] = useState(questionsList)
  const [currentQuestionId, setShowCurrentQuestionId] = useState<number>(0)
  const [showQuery, setShowQuery] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(1.2)
  const { fetchData, data, chart, nextQuestion } = useSqlQuery()
  const { briefData, description, fetchSecondQuestionData, thirdQuestion } =
    useSecondQuestion()

  const { answer, feedback, fetchThirdQuestionData, sankeyChart } =
    useThirdQuestion()
  console.log(briefData, 'briefData')

  const toggleVisibility = (id: number) => {
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
    // if (id === 1) fetchData()
  }

  console.log(answer, 'answer')
  // console.log(currentQuestionId, 'questionId')

  const toggleShowQuery = () => {
    setShowQuery((prev) => !prev)
  }

  useEffect(() => {
    toggleShowQuery()
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
  }, [chart, description, data])

  const handleZoomIn = () => {
    setZoomLevel((prevZoomLevel) =>
      prevZoomLevel < 1.728 ? +(prevZoomLevel * 1.2).toFixed(3) : prevZoomLevel
    )
  }

  const handleZoomOut = () => {
    setZoomLevel((prevZoomLevel) =>
      prevZoomLevel > 0.833 ? +(prevZoomLevel / 1.2).toFixed(3) : prevZoomLevel
    )
  }

  return (
    <>
      <div className='border h-screen border-black flex overflow-y-auto justify-center items-start bg-slate-100 pb-32'>
        {/* <div className='w-full self-end'> */}
        {currentQuestionId === 0 && (
          <div className='grid grid-cols-2 gap-4 mb-24 px-12 self-end w-full'>
            {questions.map(({ id, isCurrent, question }) => (
              <Question
                disabled={!isCurrent}
                clickHandler={isCurrent ? () => toggleVisibility(id) : () => {}}
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
            {!data && (
              <QuestionWithAvatar
                className={`
                ${!data ? 'opacity-100' : 'opacity-0'} 
                transition delay-500 duration-700`}
                avatarUrl={Astuto}
                containerStyle='flex justify-start items-center w-full border py-4 bg-white border-none rounded-lg text-sm'
                text={<p>Generating SQL Query...</p>}
              />
            )}
            {/* SQL CODE SNIPPET */}
            {data && (
              <div
                className='w-full flex justify-center items-center flex-col'
                onClick={toggleShowQuery}
              >
                <div className='flex justify-center items-center w-full'>
                  <span className='font-sm'>Query</span>
                  <div className='border border-gray-400 w-full mx-4'> </div>
                  <button className='hover:cursor-pointer'>
                    {showQuery ? <SlArrowUp /> : <SlArrowDown />}
                  </button>
                </div>
                {showQuery && (
                  <div
                    className={`w-full flex justify-start items-start bg-gray-700 text-white rounded-lg p-4 
                    transition delay-1000 duration-1000  ${
                      showQuery ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <iframe
                      src='https://carbon.now.sh/embed?bg=rgba%2855%2C65%2C81%2C1%29&t=seti&wt=none&l=sql&width=680&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=56px&ph=56px&ln=true&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=SELECT%250A%2509service%252C%250A%2520%2520%2520%2520SUM%28cost%29%2520AS%2520total_cost%250AFROM%250A%2509cloud_costs%250AWHERE%250A%2509account_type%253D%27production%2520%28%252324542%29%27%250AGROUP%2520BY%250A%2509service%250AORDER%2520BY%250A%2509total_cost%2520DESC%253B'
                      style={{
                        width: '100%',
                        height: '391px',
                        border: 0,
                        overflow: 'hidden',
                      }}
                      sandbox='allow-scripts allow-same-origin'
                    ></iframe>
                  </div>
                )}
              </div>
            )}
            {/* PIE CHART STARTS */}
            {!chart && (
              <QuestionWithAvatar
                className={`
                ${!chart && data ? 'opacity-100' : 'opacity-0'} 
                transition delay-500 duration-700`}
                avatarUrl={Astuto}
                containerStyle='flex justify-start items-center w-full border py-4 bg-white border-none rounded-lg text-sm'
                text={<p>Compiling data...</p>}
              />
            )}
            <QuestionWithAvatar
              className={`
                ${chart.length === 0 ? 'opacity-0' : 'opacity-100'} 
                transition delay-500 duration-700`}
              avatarUrl={Astuto}
              containerStyle='flex justify-start items-center w-full border py-4 bg-white border-none rounded-lg text-sm'
              text={
                <p>
                  You production account (#24542) has accumulated costs of
                  $100,000 over the past month, here is spread of cloud costs of
                  services;
                </p>
              }
            />
            <div
              className={` w-full
                ${chart.length !== 0 ? 'opacity-100' : 'opacity-0'} 
                transition delay-500 duration-700`}
            >
              <Chart
                chartType='PieChart'
                width='100%'
                height='400px'
                data={tasks}
                options={options}
              />
            </div>
            {/* PIE CHART ENDS */}

            {/* NEXT QUESTIONS ENDS*/}
            {nextQuestion.length !== 0 && currentQuestionId === 1 && (
              <div className='grid grid-cols-2 gap-4 px-12 self-end w-full bg-white p-6 rounded-lg'>
                {questions.map(({ id, isCurrent, question }) => (
                  <Question
                    disabled={!isCurrent}
                    clickHandler={
                      isCurrent ? () => toggleVisibility(id) : () => {}
                    }
                    key={id}
                    text={question}
                  />
                ))}
              </div>
            )}

            {/* NEXT QUESTIONS ENDS */}
            {/* feedback  */}
            {currentQuestionId === 1 && nextQuestion.length !== 0 && (
              <div className='m-auto flex justify-center items-center gap-4 '>
                <p className='text-gray-500 font-ight'>
                  Have the answers been satisfactory so far?
                </p>
                <SlLike className='hover:text-green-500 cursor-pointer' />
                <SlDislike className='hover:text-red-500 cursor-pointer' />
              </div>
            )}
            {/* 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 */}
            {/* 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222 */}

            {/* SECOND Question */}
            {currentQuestionId === 2 && (
              <QuestionWithAvatar
                avatarUrl={Avatar}
                containerStyle='flex justify-start items-center w-full border py-4 border-none rounded-lg text-sm'
                text={<p>How can I reduce my EC2 costs?</p>}
              />
            )}
            {!briefData && currentQuestionId === 2 && (
              <QuestionWithAvatar
                className={`
                ${
                  !briefData && currentQuestionId === 2
                    ? 'opacity-100'
                    : 'opacity-0'
                } 
                transition delay-500 duration-700`}
                avatarUrl={Astuto}
                containerStyle='flex justify-start items-center w-full border py-4 bg-white border-none rounded-lg text-sm'
                text={<p>Retrieving Data...</p>}
              />
            )}
            <QuestionWithAvatar
              className={`
                ${
                  briefData && currentQuestionId === 2
                    ? 'opacity-100'
                    : 'opacity-0'
                } 
                transition delay-500 duration-700`}
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
            <div
              className={`flex justify-center items-center flex-col gap-4 transition delay-500 duration-700  ${
                description && currentQuestionId === 2
                  ? 'opacity-100'
                  : 'opacity-0'
              } `}
            >
              {Answers.map((answer) => (
                <Answer
                  firstLine={answer.firsLine}
                  secondLine={answer.secondLine}
                />
              ))}
            </div>
            <div
              className={`grid grid-cols-2 gap-4 px-12 self-end w-full transition delay-500 duration-700 bg-white p-6 rounded-lg ${
                thirdQuestion.length !== 0 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {questions.map(({ id, isCurrent, question }) => (
                <Question
                  disabled={!isCurrent}
                  clickHandler={
                    isCurrent ? () => toggleVisibility(id) : () => {}
                  }
                  key={id}
                  text={question}
                />
              ))}
            </div>
            {/* feedback  */}
            <div
              className={`m-auto flex justify-center items-center gap-4 transition delay-500 duration-700 ${
                thirdQuestion.length !== 0 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <p className='text-gray-500 font-ight'>
                Have the answers been satisfactory so far?
              </p>
              <SlLike className='hover:text-red-500 cursor-pointer' />
              <SlDislike className='hover:text-red-50- cursor-pointer' />
            </div>

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
            {/* {chart.length === 0 ? 'opacity-0' : 'opacity-100'} */}
            <QuestionWithAvatar
              className={`${
                answer && currentQuestionId === 3 ? 'opacity-100' : 'opacity-0'
              }
                transition delay-500 duration-700`}
              avatarUrl={Astuto}
              containerStyle='flex justify-start items-center w-full border py-4 bg-white border-none rounded-lg text-sm'
              text={
                <p>
                  You production account (#24542) has accumulated costs of
                  $100,000 over the past month, here is spread of cloud costs of
                  services;
                </p>
              }
            />
            <div className='relative w-full'>
              <div
                className={`transition delay-500 duration-700 ${
                  sankeyChart.length !== 0 ? 'opacity-100' : 'opacity-0'
                } 
              } h-full w-full overflow-auto border-2 border-gray-400 rounded-xl scrollbar-hidden`}
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
                    data={costExpenseData}
                    options={costExpenseChartOptions}
                  />
                </div>
              </div>
              <div className='absolute bottom-5 right-10'>
                <button
                  disabled={zoomLevel === 1.728}
                  className='text-3xl border border-gray-300 rounded-md bg-white disabled:opacity-30 disabled:cursor-pointer'
                  onClick={handleZoomIn}
                >
                  <BsPlusLg />
                </button>
                <button
                  disabled={zoomLevel === 0.833}
                  className='text-3xl border border-gray-300 ml-2 rounded-md bg-white disabled:opacity-30 disabled:cursor-pointer'
                  onClick={handleZoomOut}
                >
                  <PiMinus />
                </button>
              </div>
            </div>
            {feedback.length !== 0 && (
              <div className='m-auto flex justify-center items-center gap-4 '>
                <p className='text-gray-500 font-ight'>
                  Have the answers been satisfactory so far?
                </p>
                <SlLike className='hover:text-red-500 cursor-pointer' />
                <SlDislike className='hover:text-red-50- cursor-pointer' />
              </div>
            )}
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
      </div>
    </>
  )
}

export default App
