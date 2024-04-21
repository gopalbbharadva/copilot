import './App.css'
import { Question } from './components/Question'
import { HiOutlineCodeBracket } from 'react-icons/hi2'
import { LuSendHorizonal } from 'react-icons/lu'
import { QuestionWithAvatar } from './components/QuestionWithAvatar'
import Astuto from '../public/Astuto.png'
import Avatar from '../public/Avatar.jpg'
import { useEffect, useState } from 'react'
import { useSqlQuery } from './hooks/useSqlQuery'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'

const questions = [
  'Top cloud costs by services in production account (#24542)',
  'Which application cost are increasing the fastest?',
  'How much money are we losing by not moving to graviton instances?',
  'Which are the largest s3 buckets by size?',
]

function App() {
  const [showFirstQuestion, setShowFirstQuestion] = useState(false)
  const [showQuery, setShowQuery] = useState(true)
  const { fetchData, data, chart } = useSqlQuery()

  const toggleVisibility = () => {
    setShowFirstQuestion((prev) => !prev)
    fetchData()
  }

  const toggleShowQuery = () => {
    setShowQuery((prev) => !prev)
  }

  useEffect(() => {
    toggleShowQuery()
  }, [chart])

  return (
    <>
      <div className='border h-screen border-black flex justify-center items-start bg-slate-100'>
        {/* <div className='w-full self-end'> */}
        {!showFirstQuestion && (
          <div className='grid grid-cols-2 gap-4 mb-24 px-12 self-end w-full'>
            {questions.map((question) => (
              <Question
                clickHandler={toggleVisibility}
                key={question}
                text={question}
              />
            ))}
          </div>
        )}
        {showFirstQuestion && (
          <div className='w-full px-4 flex justify-start items-start flex-col gap-2'>
            <QuestionWithAvatar
              avatarUrl={Avatar}
              containerStyle='flex justify-start items-center w-full border py-4 border-none rounded-lg text-sm'
              text='Top cloud costs by services in production account(#24542)'
            />

            {!data && (
              <QuestionWithAvatar
                className={`
                ${!data ? 'opacity-100' : 'opacity-0'} 
                transition delay-500 duration-700`}
                avatarUrl={Astuto}
                containerStyle='flex justify-start items-center w-full border py-4 bg-white border-none rounded-lg text-sm'
                text='Generating SQL Query...'
              />
            )}
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
                    transition delay-1000 duration-1000 ${
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
            {!chart && (
              <QuestionWithAvatar
                className={`
                ${!chart && data ? 'opacity-100' : 'opacity-0'} 
                transition delay-500 duration-700`}
                avatarUrl={Astuto}
                containerStyle='flex justify-start items-center w-full border py-4 bg-white border-none rounded-lg text-sm'
                text='Compiling data...'
              />
            )}
            {/* change it with the chart */}
            <p
              className={`${
                chart.length === 0 ? 'opacity-0' : 'opacity-100'
              } transition delay-500 duration-700`}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              aliquam unde modi reiciendis magnam, quidem cumque sapiente
              repellat porro? Ab veniam culpa, assumenda sint nemo dolor
              molestiae aperiam provident accusamus quas ipsum, necessitatibus,
              eveniet magnam quo sunt blanditiis incidunt ducimus aut nisi totam
              dolorum beatae delectus tenetur, unde dolor aut maxime a
              asperiores suscipit doloremque modi obcaecati fugiat sapiente, nam
              dolores odit ducimus molestiae error reiciendis temporibus
              dolorem.
            </p>
          </div>
        )}
        <div
          className='flex fixed bottom-10 left-44 justify-between p-3 border shadow-lg
          w-[74rem] text-gray-400 border-gray-500 rounded-xl text-sm mt-6 '
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
