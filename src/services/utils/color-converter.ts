import convert from 'color-convert'

export const convertColorFromHexToHsl = (hex: string) => {
  const vals = convert.hex.hsl(hex)
  return `${vals[0]}, ${vals[1]}%, ${vals[2]}%`

}