import { QuestionPropsType } from '../types'

export const Question = ({
  text,
  clickHandler,
  className,
  disabled,
}: QuestionPropsType) => {
  const finalClassName = `font-normal text-start px-4 hover:cursor-pointer hover:bg-slate-200 
  disabled:opacity-40 disabled:cursor-not-allowed
    py-4 border border-gray-500 rounded-xl text-sm ${className}`
  return (
    <button
      disabled={disabled}
      onClick={clickHandler}
      className={finalClassName}
    >
      {text}
    </button>
  )
}
