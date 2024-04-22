import { SlArrowUp } from 'react-icons/sl'
import { SubHeaderPropsType } from '../types'

export const SubHeader = ({ text }: SubHeaderPropsType) => {
  return (
    <div className='flex justify-center items-center w-full p-2'>
      <span className='text-xs text-center min-w-fit text-gray-400'>{text}</span>
      <div className='border border-gray-200 w-full mx-4'> </div>
      <button className='hover:cursor-pointer'>
        <SlArrowUp />
      </button>
    </div>
  )
}
