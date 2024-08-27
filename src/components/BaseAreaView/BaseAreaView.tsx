import React from "react";
import {
  Platform,
  ScrollView,
  ScrollViewProps,
  StatusBar,
  View,
  ViewStyle,
} from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { commonStyles } from "~/styles";

import { dsColor } from "~/designSystem";
import { defaultMargin } from "~/styles/sizes";

interface BaseAreaViewProps {
  background?: "black" | "white" | "sand";
  edges?: Edge[];
  children: React.ReactNode;
}

const BaseAreaView: React.FC<BaseAreaViewProps> = ({
  children,
  background = "white",
  edges = ["top", "left", "right"],
}) => {
  switch (background) {
    case "black":
      return (
        <SafeAreaView style={commonStyles.containerBlack} edges={edges}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={dsColor.BLACK_TRUE}
          />
          {children}
        </SafeAreaView>
      );
    case "sand":
      return (
        <SafeAreaView style={commonStyles.containerSand} edges={edges}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={dsColor.WHITE_DIRTY}
          />
          {children}
        </SafeAreaView>
      );
    default:
      return (
        <SafeAreaView style={commonStyles.containerWhite} edges={edges}>
          <StatusBar barStyle="dark-content" backgroundColor={dsColor.WHITE} />
          {children}
        </SafeAreaView>
      );
  }
};

export const ContentAreaView: React.FC<
  BaseAreaViewProps & {
    containerStyle?: ViewStyle;
    isModal?: boolean;
    scrollViewProps?: ScrollViewProps;
  }
> = ({ children, containerStyle, isModal, scrollViewProps, ...props }) => {
  return (
    <BaseAreaView edges={isModal ? ["top", "bottom"] : undefined} {...props}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: defaultMargin,
          ...containerStyle,
        }}
        {...scrollViewProps}
      >
        {isModal && Platform.OS === "ios" ? (
          <StatusBar barStyle="light-content" />
        ) : null}
        {children}
      </ScrollView>
    </BaseAreaView>
  );
};

export const Row = ({
  children,
  center = true,
  middle = true,
  between,
  style,
}: {
  children: React.ReactNode;
  center?: boolean;
  middle?: boolean;
  style?: ViewStyle;
  between?: boolean;
}) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: between
            ? "space-between"
            : center
            ? "center"
            : undefined,
          alignItems: middle ? "center" : undefined,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default BaseAreaView;
