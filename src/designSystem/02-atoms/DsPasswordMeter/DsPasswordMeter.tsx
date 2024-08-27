import React from 'react'
import { StyleProp, TextProps, View } from 'react-native'
import { DsPasswordMeterStyles, dsPasswordMeterStyles } from './DsPasswordMeter.styles'

interface DsPasswordMeterStylesPropType {
  /** Component container */
  container: StyleProp<DsPasswordMeterStyles['container']>
  /** Component container, when the threshold has been passed */
  passedContainer: StyleProp<DsPasswordMeterStyles['passedContainer']>
  /** Single level element */
  level: StyleProp<DsPasswordMeterStyles['level']>
  /** Single level element, when the current level is at or above the level the element is representing */
  levelActive: StyleProp<DsPasswordMeterStyles['levelActive']>
  /** Single level element, when the threshold has been passed */
  passedLevel: StyleProp<DsPasswordMeterStyles['passedLevel']>
  /** Single level element, when the current level is at or above the level the element is representing and the threshold has been passed */
  passedLevelActive: StyleProp<DsPasswordMeterStyles['passedLevelActive']>
}
interface DsPasswordMeterPropsType extends Omit<TextProps, 'style'> {
  /** The number of levels of password strength the meter should display. */
  levels: number
  /** The current level of password strength */
  currentLevel: number
  /** The threshold for the password strength level to be deemed acceptable. */
  threshold: number
  /** Use this prop to override any of the default styles. */
  styles?: DsPasswordMeterStylesPropType
}

/** Component to visually show a strength estimation score on a meter. */
export const DsPasswordMeter: React.FC<DsPasswordMeterPropsType> = ({ levels, currentLevel, threshold, styles, ...otherProps }) => {
  const isThresholdPassed = currentLevel >= threshold

  const levelElements = new Array(levels).fill(undefined).map((_, i) => {
    const isLevelActive = i <= currentLevel
    return (
      <View
        style={[
          dsPasswordMeterStyles.level,
          styles?.level,
          isThresholdPassed ? dsPasswordMeterStyles.passedLevel : null,
          isThresholdPassed ? styles?.passedLevel : null,
          isLevelActive ? dsPasswordMeterStyles.levelActive : null,
          isLevelActive ? styles?.levelActive : null,
          isLevelActive && isThresholdPassed ? dsPasswordMeterStyles.passedLevelActive : null,
          isLevelActive && isThresholdPassed ? styles?.passedLevelActive : null,
        ]}
        key={`PASS_METER_LEVEL:${i}`}
      />
    )
  })

  return (
    <View
      {...otherProps}
      style={[
        dsPasswordMeterStyles.container,
        styles?.container,
        isThresholdPassed ? dsPasswordMeterStyles.passedContainer : null,
        isThresholdPassed ? styles?.passedContainer : null,
      ]}
    >
      {levelElements}
    </View>
  )
}
