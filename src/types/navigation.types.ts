import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VerificationObject } from "./data.types";

export type BottomTabScreens = {
  Explore: undefined;
};

export type BottomTabParams<RouteName extends keyof BottomTabScreens> =
  NativeStackScreenProps<BottomTabScreens, RouteName>["route"];

export type MainStackScreens = {
  Root: NavigatorScreenParams<BottomTabScreens>;
  VerifyItemStartScreen: undefined;
  VerifyItemSelectScreen: undefined;
  VerifyItemTaggedPhotoScreen: Pick<VerificationObject, "item">;
  VerifyItemDocumentsScreen: Pick<VerificationObject, "item" | "taggedPhoto">;
  VerifyItemIdentifiersScreen: Pick<
    VerificationObject,
    "item" | "taggedPhoto" | "documents"
  >;
  VerifyItemSelectGraderScreen: {
    selectedGrader: string | undefined;
    onSelect: (grader: string | undefined) => void;
  };
  VerifyItemSummaryScreen: VerificationObject;
  VerifyItemVerifiedScreen: VerificationObject & { token: string };
  VerificationInfoScreen: undefined;
  VerifyItemAfterAddScreen: {
    itemId: string;
    avatar: string;
  };
};

export type MainParams<RouteName extends keyof MainStackScreens> =
  NativeStackScreenProps<MainStackScreens, RouteName>["route"];