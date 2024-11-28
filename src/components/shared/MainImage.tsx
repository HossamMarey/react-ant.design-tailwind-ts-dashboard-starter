import { Image, ImageProps } from "antd"
import React, { FC } from 'react'

import noImage from '@/assets/images/no-image.jpg'

const MainImage: FC<ImageProps> = (props) => {
  return <Image
    fallback={noImage}
    {...props}
  />
}

export default MainImage