export const Answer = ({
  firstLine,
  secondLine,
}: {
  firstLine: JSX.Element
  secondLine: JSX.Element
}) => {
  return (
    <div className='w-full flex flex-col justify-start items-start gap-2 border-2 border-green-500 p-4 bg-white rounded-lg'>
      {firstLine}
      {secondLine}
    </div>
  )
}
