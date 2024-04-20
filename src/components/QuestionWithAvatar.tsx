type QuestionPropsType = {
  text: string
}

export const Question = ({ text }: QuestionPropsType) => {
  return (
    <div>
      <img />
      <p
        className='font-normal text-start px-4 hover:cursor-pointer hover:bg-slate-200 
            py-2 border border-gray-500 rounded-xl text-sm'
      >
        {text}
      </p>
    </div>
  )
}
