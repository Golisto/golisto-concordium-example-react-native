import React from "react";

import { MainStackScreens } from "./types/navigation.types";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Platform, View } from "react-native";
import FastImage from "react-native-fast-image";

import {
  DsButton,
  DsButtonVariant,
  DsText,
  DsTypoName,
} from "./designSystem";

import VerifyItemSummaryScreen from "./screens/VerifyItem/VerifyItemSummaryScreen";
import VerifyItemIdentifiersScreen from "./screens/VerifyItem/VerifyItemIdentifiersScreen";
import VerifyItemDocumentsScreen from "./screens/VerifyItem/VerifyItemDocumentsScreen";
import VerifyItemTaggedPhotoScreen from "./screens/VerifyItem/VerifyItemTaggedPhotoScreen";
import VerifyItemSelectGraderScreen from "./screens/VerifyItem/VerifyItemSelectGraderScreen";
import VerificationInfoScreen from "./screens/VerifyItem/VerificationInfoScreen";
import { rootNavigation } from "./utils/rootNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const MainStack =
  Platform.OS === "ios"
    ? createNativeStackNavigator<MainStackScreens>()
    : createStackNavigator<MainStackScreens>();

const MainStackNav: React.FC = () => {
  return (
    <ErrorBoundary>
      <MainStack.Navigator
        initialRouteName={"VerifyItemTaggedPhotoScreen"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <MainStack.Screen
          name="VerifyItemTaggedPhotoScreen"
          component={VerifyItemTaggedPhotoScreen}
          options={{
            presentation: "modal",
          }}
        />

        <MainStack.Screen
          name="VerifyItemDocumentsScreen"
          component={VerifyItemDocumentsScreen}
          options={{
            presentation: "modal",
          }}
        />

        <MainStack.Screen
          name="VerificationInfoScreen"
          component={VerificationInfoScreen}
          options={{
            presentation: "modal",
          }}
        />
        <MainStack.Screen
          name="VerifyItemSelectGraderScreen"
          component={VerifyItemSelectGraderScreen}
          options={{
            presentation: "modal",
          }}
        />

        <MainStack.Screen
          name="VerifyItemIdentifiersScreen"
          component={VerifyItemIdentifiersScreen}
          options={{
            presentation: "modal",
          }}
        />

        <MainStack.Screen
          name="VerifyItemSummaryScreen"
          component={VerifyItemSummaryScreen}
          options={{
            presentation: "modal",
          }}
        />
      </MainStack.Navigator>
    </ErrorBoundary>
  );
};

const Navigation: React.FC = () => {

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: "white",
        },
      }}
      ref={rootNavigation.navigationRef}
    >
    <Root />
    </NavigationContainer>
  );
};

function Root() {
  return <MainStackNav />;
}

const ErrorScreen = () => {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FastImage
        source={require("./assets/images/onboarding-1.png")}
        resizeMode={"contain"}
        style={{
          width: 300,
          height: 300,
        }}
      />
      <DsText center variant={DsTypoName.LABEL}>
        {t("global.unknownError.title")}
      </DsText>
      <DsText center>{t("global.unknownError.text")}</DsText>
      <DsButton
        style={{ marginTop: 24 }}
        variant={DsButtonVariant.ROUNDED}
        onPress={() => {}} // insert reload function 
        text={t("reload")}
      />
    </View>
  );
};

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // sentryCaptureException({ error, errorInfo });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorScreen />;
    }

    return this.props.children;
  }
}

export default Navigation;
