import { SlDislike, SlLike } from 'react-icons/sl'
import {
  ANSWERS,
  FEEDBACK_LINE,
  RETRIEVING,
  SECOND_QUESTION,
  SECOND_QUESTION_DESCRIPTION,
} from '../constants'
import {
  MotionWrapper,
  Option,
  SubHeader,
  Answer,
  Question,
} from '../components/index'

import Avatar from '../../public/Avatar.jpg'
import Astuto from '../../public/Astuto.png'
import { SecondQuestionPropsType } from '../types'

export const SecondQuestion = ({
  briefData,
  currentButtonHandler,
  currentQuestionId,
  thirdQuestion,
  description,
  toggleSecondAnswerRetrieve,
  questions,
}: SecondQuestionPropsType) => {
  return (
    <div className='w-full'>
      {currentQuestionId > 1 && (
        <Question
          avatarUrl={Avatar}
          containerStyle='flex justify-start items-center w-full border py-4 border-none rounded-lg text-sm'
          text={<p>{SECOND_QUESTION}</p>}
        />
      )}
      {!briefData && currentQuestionId > 1 && (
        <Question
          className={`
          ${toggleSecondAnswerRetrieve(briefData, currentQuestionId)} 
          transition delay-500 duration-700`}
          avatarUrl={Astuto}
          containerStyle='flex justify-start items-center w-full border py-4 bg-white border-none rounded-lg text-sm my-2'
          text={<p>{RETRIEVING}</p>}
        />
      )}
      {briefData && currentQuestionId > 1 && (
        <MotionWrapper className='w-full'>
          <Question
            avatarUrl={Astuto}
            containerStyle='flex justify-start items-center w-full border bg-white py-4 border-none rounded-lg text-sm my-2'
            text={
              <div className='flex flex-col justify-start items-start gap-2'>
                {SECOND_QUESTION_DESCRIPTION}
              </div>
            }
          />
        </MotionWrapper>
      )}

      {description && currentQuestionId > 1 && (
        <MotionWrapper
          className='flex justify-center items-center flex-col gap-4 
         bg-white p-2 rounded-md rounded-br-none rounded-bl-none'
        >
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
        <MotionWrapper
          className='flex justify-center items-center w-full p-2 bg-white 
            rounded-lg rounded-br-none rounded-bl-none'
        >
          <SubHeader text='You might also want to know' />
        </MotionWrapper>
      )}
      {thirdQuestion.length !== 0 && currentQuestionId === 2 && (
        <MotionWrapper
          className='grid grid-cols-2 gap-4 px-12 self-end w-full
         bg-white p-6 rounded-lg rounded-tr-none rounded-tl-none'
        >
          {questions.map(({ id, isCurrent, question }) => (
            <Option
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
        <MotionWrapper className='m-auto flex justify-center items-center gap-4 transition delay-500 duration-700 mt-2'>
          <p className='text-gray-500 font-light'>{FEEDBACK_LINE}</p>
          <SlLike className='hover:text-green-500 cursor-pointer' />
          <SlDislike className='hover:text-red-500 cursor-pointer' />
        </MotionWrapper>
      )}
      {thirdQuestion.length !== 0 && currentQuestionId === 2 && (
        <div className='h-28'></div>
      )}
    </div>
  )
}
