import './App.css'
import { Question } from './components/Question'
import { HiOutlineCodeBracket } from 'react-icons/hi2'
import { LuSendHorizonal } from 'react-icons/lu'

const questions = [
  'Top cloud costs by services in production account (#24542)',
  'Which application cost are increasing the fastest?',
  'How much money are we losing by not moving to graviton instances?',
  'Which are the largest s3 buckets by size?',
]

function App() {
  return (
    <div className='border h-screen py-4 border-black flex justify-center items-end'>
      <div>
        <div className='grid grid-cols-2 gap-4'>
          {questions.map((question) => (
            <Question key={question} text={question} />
          ))}
        </div>
        <div className='flex justify-between p-3 border text-gray-400 border-gray-500 rounded-xl text-sm mt-6'>
          Start typing your query here...
          <div className='flex justify-center items-center gap-4'>
            <HiOutlineCodeBracket className='text-gray-400' />
            <LuSendHorizonal className='text-gray-400' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
