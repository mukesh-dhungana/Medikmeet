import { fontFamilyType } from 'helpers/constants'
import * as React from 'react'
import { StyleSheet, Text } from 'react-native'

interface IMyTextProps {
  children: string
  style?: Object
  fontStyle?: string
  numberOfLines?: number
  onTextLayout?: (e: any) => void
}
const defaultProps = {
  fontSize: undefined,
  style: {},
  fontStyle: 'regular',
  numberOfLines: 0,
  onTextLayout: () => {},
}
// do not use default Text component directly use MyText component instead
const MyText: React.FunctionComponent<IMyTextProps> = (props) => {
  const { children, style, fontStyle, numberOfLines, onTextLayout } = props

  return (
    <Text
      style={{ ...style, fontFamily: fontFamilyType[fontStyle || 'regular'] }}
      numberOfLines={numberOfLines}
      onTextLayout={onTextLayout}
    >
      {children}
    </Text>
  )
}
MyText.defaultProps = defaultProps

const textStyle = StyleSheet.create({})
export default MyText
