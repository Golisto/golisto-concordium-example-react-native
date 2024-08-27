import React, { useRef } from 'react'
import { Animated, Easing, StyleSheet, View, ViewStyle } from 'react-native'

interface DsButtonLoadingIndicatorProps {
  color: string
}
export const DsButtonLoadingIndicator: React.VFC<DsButtonLoadingIndicatorProps> = ({ color }) => {
  const aLoadingValue = useRef(new Animated.Value(0)).current
  const loadingAnimation = useRef(
    Animated.timing(aLoadingValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.inOut(Easing.ease),
      isInteraction: false,
      useNativeDriver: true,
    })
  ).current

  React.useEffect(() => {
    let stopAnimation = false
    runAnimation()

    function runAnimation(o?: Animated.EndResult) {
      if (stopAnimation) return

      if (o == null || o.finished) {
        aLoadingValue.setValue(0)
        loadingAnimation.start(runAnimation)
      }
    }

    return () => {
      stopAnimation = true
    }
  }, [aLoadingValue])

  return (
    <View style={cStyles.indicatorWrapper} pointerEvents="none">
      <Animated.View
        style={[
          cStyles.indicator,
          {
            backgroundColor: color,
          },
          {
            transform: [{ scale: aLoadingValue.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 0.25, 1] }) }],
            opacity: aLoadingValue.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 0, 1] }),
          },
        ]}
      />
    </View>
  )
}

const cStyles = StyleSheet.create({
  indicatorWrapper: {
    ...StyleSheet.absoluteFillObject,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,

  indicator: {
    aspectRatio: 1 / 1,
    borderRadius: Number.MAX_SAFE_INTEGER,
    width: 24,
    height: 24,
  } as ViewStyle,
})
