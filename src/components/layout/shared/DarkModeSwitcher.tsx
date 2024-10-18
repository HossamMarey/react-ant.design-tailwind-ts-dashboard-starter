import { useDarkMode } from "@/services/theme"
import { Segmented } from "antd"
import { useMemo } from "react"
import { FiMoon, FiSun } from "react-icons/fi"

const DarkModeSwitcher = ({ size = 'large' }: {
  size?: 'large' | 'small' | 'middle'
}) => {


  const { isDark, setDarkMode } = useDarkMode()


  const iconSize = useMemo(() => {
    return size === 'small' ? 18 : size === 'middle' ? 20 : 22
  }, [size])


  return (
    <div className="flex gap-4">

      <Segmented
        value={isDark ? 'dark' : 'light'}
        size={size}
        className="[&_.ant-segmented-item-label]:flex [&_.ant-segmented-item-label]:items-center !p-0.5"
        // onChange={(value) => setAlignValue(value as Align)}
        onChange={(v) => setDarkMode(v === 'dark')}
        options={[{
          value: 'light',
          label: <FiSun size={iconSize} />,


        }, {
          value: 'dark',
          label: <FiMoon size={iconSize} />,
        }]}
      />

    </div>
  )
}

export default DarkModeSwitcher