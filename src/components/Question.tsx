type QuestionPropsType = {
  text: string
  clickHandler: () => void
  className?: string
}

export const Question = ({
  text,
  clickHandler,
  className,
}: QuestionPropsType) => {
  const finalClassName = `font-normal text-start px-4 hover:cursor-pointer hover:bg-slate-200 
    py-2 border border-gray-500 rounded-xl text-sm ${className}`
  return (
    <p onClick={clickHandler} className={finalClassName}>
      {text}
    </p>
  )
}
