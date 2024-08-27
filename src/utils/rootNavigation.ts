import { createNavigationContainerRef } from "@react-navigation/native";
import { MainStackScreens } from "~/types/navigation.types";

const navigationRef = createNavigationContainerRef<MainStackScreens>();

function navigate<RouteName extends keyof MainStackScreens>(
  ...args: RouteName extends unknown
    ? undefined extends MainStackScreens[RouteName]
      ?
          | [screen: RouteName]
          | [screen: RouteName, params: MainStackScreens[RouteName]]
      : [screen: RouteName, params: MainStackScreens[RouteName]]
    : never
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...args);
  }
}

function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export const rootNavigation = {
  navigationRef,
  goBack,
  navigate,
};
