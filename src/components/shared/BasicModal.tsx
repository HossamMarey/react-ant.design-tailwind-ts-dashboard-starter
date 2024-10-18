import { Modal } from "antd"
import { CloseSquare } from "iconsax-react"
import React, { FC, ReactNode } from 'react'


interface Props {
  open: boolean
  title: string
  close: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
  children: ReactNode
  className?: string
  width?: number | string
  scrollable?: boolean
  top?: string
}

const BasicModal: FC<Props> = ({ open, close, title, children, className, width, scrollable = true, top }) => {
  return (
    <Modal
      open={open}
      destroyOnClose
      closeIcon={<span onClick={close}>
        <CloseSquare variant="Bulk" />
      </span>}
      closable
      footer={null}
      className=" modal__basic"
      onCancel={close}
      width={width}
      style={{ top }}
    >
      <div className="card">
        {!!title && (

          <div className="p-5  ">
            <h3 className="text-xl xl:text-2xl text-primary capitalize">
              {title}
            </h3>
          </div>
        )}
        <div className={` ${className || ''} ${scrollable ? `modal-scrollable scroll-smooth max-h-[${top ? '80' : '70'}vh] overflow-y-auto` : ''} `}>

          {children}
        </div>
      </div>
    </Modal>
  )
}

export default BasicModal