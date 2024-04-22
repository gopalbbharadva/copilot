import { QuestionWithAvatarPropsType } from '../types'

export const QuestionWithAvatar = ({
  text,
  containerStyle,
  avatarUrl,
  className,
}: QuestionWithAvatarPropsType) => {
  const finalClassName = `w-full flex justify-start items-center gap-4 
  bg-slate-200 p-4 rounded-br-lg rounded-bl-lg ${containerStyle} ${className}`
  return (
    <div className={finalClassName}>
      <img src={avatarUrl} className='w-8 h-8 rounded-md' />
      {text}
    </div>
  )
}
