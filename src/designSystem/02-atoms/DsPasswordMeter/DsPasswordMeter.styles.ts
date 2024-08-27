import { StyleSheet, ViewStyle } from 'react-native'
import { dsColor, DsColorName } from '../../01-quarks'

export type DsPasswordMeterStyles = typeof dsPasswordMeterStyles
export const dsPasswordMeterStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  } as ViewStyle,

  passedContainer: {} as ViewStyle,

  level: {
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 2,
    height: 4,
    backgroundColor: dsColor[DsColorName.PRIMARY_40],
  } as ViewStyle,

  levelActive: {
    backgroundColor: dsColor[DsColorName.PRIMARY_70],
  } as ViewStyle,

  passedLevel: {} as ViewStyle,

  passedLevelActive: {
    backgroundColor: dsColor[DsColorName.PRIMARY],
  } as ViewStyle,
})
