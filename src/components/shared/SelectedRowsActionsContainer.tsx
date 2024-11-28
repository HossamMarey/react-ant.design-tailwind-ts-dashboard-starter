import { FC, ReactNode } from 'react'
import { FiMove, FiX } from "react-icons/fi"
import Draggable from 'react-draggable';

interface Props {
  className?: string
  children?: ReactNode
  close?: () => void
}

const SelectedRowsActionsContainer: FC<Props> = ({ className = '', children, close }) => {
  return (
    <Draggable >
      <div className={`relative border-2 border-border rounded-xl bg-neutral-100 dark:bg-neutral-950 backdrop-blur-lg lg:!bg-opacity-50 shadow-lg  p-4 md:p-6 lg:p-8 flex items-center justify-center flex-wrap md:justify-between  gap-4 ${className}`}>
        {!!close && (
          <span className={`bg-bg-light absolute z-10 -top-3 -right-2 w-8 h-8 flex items-center justify-center rounded-full border border-text-lighter cursor-pointer
        transition duration-300 hover:scale-125  `}
            onClick={close}
          >
            <FiX />
          </span>
        )}

        <span className={`bg-bg-light absolute z-10 -top-3  right-10 w-8 h-8 flex items-center justify-center rounded-full border border-text-lighter cursor-pointer
        transition duration-300 hover:scale-105  `}
        >
          <FiMove />
        </span>
        {children}
      </div>
    </Draggable>
  )
}




export default SelectedRowsActionsContainer


// <div className={`border-2 border-border rounded-xl bg-neutral-100 dark:bg-neutral-950 backdrop-blur-lg lg:!bg-opacity-50 shadow-lg  p-4 md:p-6 lg:p-8 flex items-center justify-center flex-wrap md:justify-between  gap-4 ${className}`}>
//       {children}
//     </div>