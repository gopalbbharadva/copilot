import { Question } from './Question'
import {
  COMPILE_LOAD,
  COSTS_EXPENSE_CHART_OPTIONS,
  COST_EXPENSE_DATA,
  FEEDBACK_LINE,
  THIRD_QUESTION,
  THIRD_QUESTION_DESCRIPTION,
} from '../constants'
import { MotionWrapper, SubHeader } from '../components/index'
import Chart from 'react-google-charts'
import { BsPlusLg } from 'react-icons/bs'
import { PiMinus } from 'react-icons/pi'
import { SlDislike, SlLike } from 'react-icons/sl'
import Astuto from '../../public/Astuto.png'
import Avatar from '../../public/Avatar.jpg'
import { ThirdQuestionPropsType } from '../types'

export const ThirdQuestion = ({
  currentQuestionId,
  feedback,
  handleZoomIn,
  handleZoomOut,
  sankeyChart,
  setZoomLevel,
  toggleThirdAnswerCompile,
  zoomLevel,
  answer,
}: ThirdQuestionPropsType) => {
  return (
    <div className='w-full'>
      {currentQuestionId === 3 && (
        <Question
          avatarUrl={Avatar}
          containerStyle='flex justify-start items-center w-full border py-4 border-none rounded-lg text-sm'
          text={<p>{THIRD_QUESTION}</p>}
        />
      )}
      {!toggleThirdAnswerCompile(answer, currentQuestionId) && (
        <Question
          className={`
                ${!toggleThirdAnswerCompile(answer, currentQuestionId)} 
                transition delay-500 duration-700`}
          avatarUrl={Astuto}
          containerStyle='flex justify-start items-center w-full border py-4 bg-white border-none rounded-lg text-sm my-2'
          text={<p>{COMPILE_LOAD}</p>}
        />
      )}
      {toggleThirdAnswerCompile(answer, currentQuestionId) && (
        <Question
          className={`
                ${toggleThirdAnswerCompile(answer, currentQuestionId)} 
                transition delay-500 duration-700`}
          avatarUrl={Astuto}
          containerStyle='flex justify-start items-center w-full border py-4 bg-white border-none rounded-lg text-sm my-2'
          text={<p>{THIRD_QUESTION_DESCRIPTION}</p>}
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
          <p className='text-gray-500 font-light mt-2'>{FEEDBACK_LINE}</p>
          <SlLike className='hover:text-green-500 cursor-pointer' />
          <SlDislike className='hover:text-red-500 cursor-pointer' />
        </div>
      )}
      {feedback.length !== 0 && <div className='h-28'></div>}
    </div>
  )
}
