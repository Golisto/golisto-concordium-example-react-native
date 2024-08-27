import "expo-dev-client";
import "react-native-gesture-handler";
import "./concordiumPolifills";
import "@walletconnect/react-native-compat";
// used for i18n
import "@formatjs/intl-getcanonicallocales/polyfill";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-pluralrules/polyfill";

import "~/utils/i18n";

import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from "~/Navigation";

function App() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ActionSheetProvider>
          <SafeAreaProvider><Navigation /></SafeAreaProvider>
      </ActionSheetProvider>
    </GestureHandlerRootView>
  );
}

export default App;
