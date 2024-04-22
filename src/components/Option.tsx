import { QuestionPropsType } from '../types'

export const Option = ({
  text,
  clickHandler,
  className,
  disabled,
}: QuestionPropsType) => {
  const finalClassName = `font-normal text-start px-4 hover:cursor-pointer hover:bg-slate-200 
  disabled:opacity-40 disabled:cursor-not-allowed text-gray-600
    py-4 border border-gray-300 rounded-xl text-sm ${className}`
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
