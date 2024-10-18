import { MAIN_COLORS, useColorsContext } from "@/services/theme"
import { Button, ColorPicker, Divider, Popover } from "antd"
import { Setting2 } from "iconsax-react"
import React, { useEffect, useState } from 'react'



const MainColorPicker = ({ defaultValue, colorName, mode }: { defaultValue: string, colorName: string, mode: 'light' | 'dark' }) => {
  const { handleChangeColor } = useColorsContext()
  const [color, setColor] = useState(defaultValue)


  useEffect(() => {
    setColor(defaultValue)
  }, [defaultValue])


  return (<ColorPicker
    size="small"
    value={color}
    onChange={c => setColor(c.toHexString())}
    onChangeComplete={(value) => {
      handleChangeColor({ key: colorName, value: value.toHexString(), mode })
    }}
  />)
}

const ColorChanger = () => {

  const { computedColors, handleChangeColor, handleResetColors } = useColorsContext()

  return (
    <div className=" max-h-[80vh] max-w-[90vw] w-[30rem] overflow-auto px-2 ">
      <Divider dashed   >
        <h3 className=" text-lg"> Light Theme </h3>
      </Divider>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

        {Object.entries(computedColors.light).map(([key, color], index) => (
          <div key={index} className="flex items-center justify-between border border-border p-2 rounded-md">
            <strong className="capitalize">

              {key}
            </strong>
            <MainColorPicker defaultValue={color} mode="light" colorName={key} />
          </div>
        )

        )}

      </div>

      <Divider dashed    >
        <h3 className=" text-lg"> Dark Theme </h3>
      </Divider>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

        {Object.entries(computedColors.dark).map(([key, color], index) => (
          <div key={index} className="flex items-center justify-between border border-border p-2 rounded-md">
            <strong className="capitalize">

              {key}
            </strong>
            <MainColorPicker defaultValue={color} mode="dark" colorName={key} />
          </div>
        )

        )}

      </div>

      <div className="py-2 mt-5">

        <Button block type="primary" size="large"
          onClick={() => { handleResetColors() }}
        > Reset Default </Button>
      </div>

    </div>
  )
}


const ThemeChanger = () => {
  return (
    <div className="fixed end-0 top-1/2 z-40 pe-4 ">

      <Popover placement="right" content={<ColorChanger />} trigger="click" destroyTooltipOnHide >
        <Button type="primary" className="px-1 shadow-lg" >
          <Setting2 variant="Bold" className=" " />
        </Button>
      </Popover>
    </div>
  )
}

export default ThemeChanger