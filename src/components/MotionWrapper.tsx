import { ReactNode } from 'react'
import { motion } from 'framer-motion'

type MotionWrapperPropsType = {
  className?: string
  children: ReactNode
  clickHandler?: () => void
}

export const MotionWrapper = ({
  children,
  className,
  clickHandler,
}: MotionWrapperPropsType) => {
  return (
    <motion.div
      onClick={clickHandler}
      initial={{
        opacity: 0,
        scale: 1,
      }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'easeIn',
        stiffness: 400,
        damping: 40,
        delay: 0.5,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
