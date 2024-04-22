import { AnimatePresence } from 'framer-motion'
import { QuestionWithAvatar } from './QuestionWithAvatar'
import Astuto from '../../public/Astuto.png'
import Avatar from '../../public/Avatar.jpg'
import {
  COMPILE_LOAD,
  DATA_STORES,
  FEEDBACK_LINE,
  FIRST_QUESTION,
  FIRST_QUESTION_ANSWER_DESCRIPTION,
  LOADING_SQL,
  OPTIONS,
} from '../constants'
import {
  MotionWrapper,
  SubHeader,
  Question,
  CodeSnippet,
} from '../components/index'
import { SlArrowDown, SlArrowUp, SlDislike, SlLike } from 'react-icons/sl'
import Chart from 'react-google-charts'
import { FirstQuestionPropsType } from '../types'

export const FirstQuestion = ({
  chart,
  currentButtonHandler,
  currentQuestionId,
  data,
  isLoading,
  nextQuestion,
  toggleShowQuery,
  showQuery,
  questions,
}: FirstQuestionPropsType) => {
  return (
    <div className='w-full'>
      <QuestionWithAvatar
        avatarUrl={Avatar}
        containerStyle='flex justify-start items-center w-full border py-4 border-none rounded-lg text-sm'
        text={<p>{FIRST_QUESTION}</p>}
      />
      <AnimatePresence>
        {isLoading && (
          <MotionWrapper className='w-full'>
            <QuestionWithAvatar
              avatarUrl={Astuto}
              containerStyle='flex justify-start items-center w-full border py-4 bg-white border-none rounded-lg text-sm'
              text={<p>{LOADING_SQL}</p>}
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
            text={<p>{COMPILE_LOAD}</p>}
          />
        </MotionWrapper>
      )}
      {chart && (
        <MotionWrapper className='w-full'>
          <QuestionWithAvatar
            avatarUrl={Astuto}
            containerStyle='flex justify-start items-center w-full border py-4 bg-white border-none rounded-lg text-sm'
            text={<p>{FIRST_QUESTION_ANSWER_DESCRIPTION}</p>}
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
          <p className='text-gray-500 font-light'>{FEEDBACK_LINE}</p>
          <SlLike className='hover:text-green-500 cursor-pointer' />
          <SlDislike className='hover:text-red-500 cursor-pointer' />
        </MotionWrapper>
      )}
      {nextQuestion.length !== 0 && currentQuestionId === 1 && (
        <div className='h-28'></div>
      )}
    </div>
  )
}
