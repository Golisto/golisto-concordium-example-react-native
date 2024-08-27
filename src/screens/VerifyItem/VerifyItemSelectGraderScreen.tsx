import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DsButton, DsButtonSize, dsColor, DsColorName } from "~/designSystem";
import { defaultMargin } from "~/styles/sizes";
import { AddItemHeader, ListSelectItem } from "../AddItem/Components";
import { useRoute } from "@react-navigation/native";
import { MainParams } from "~/types/navigation.types";
import { useState } from "react";
import { useMainNavigation } from "~/hooks";

const graders = [
  "Beckett",
  "GMA",
  "HGA",
  "PSA",
  "ISA",
  "SGC",
  "CGC",
  "CBCS",
  "AFA",
  "VGA",
  "WATA",
  "Other",
];

export default function VerifyItemSelectGraderScreen() {
  const { bottom } = useSafeAreaInsets();

  const { params } = useRoute<MainParams<"VerifyItemSelectGraderScreen">>();
  const navigation = useMainNavigation();

  const [grader, setGrader] = useState(params.selectedGrader);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <AddItemHeader title={"Grader"} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 24,
          flexGrow: 1,
          paddingTop: 48,
        }}
      >
        {graders.map((value) => (
          <ListSelectItem
            key={value}
            selected={grader === value}
            category={value}
            onPress={() => {
              setGrader(value);
            }}
          />
        ))}
      </ScrollView>
      <View
        style={{
          padding: defaultMargin,
          paddingBottom: Math.max(bottom, defaultMargin),
          borderTopColor: dsColor.GRAY_30,
          borderTopWidth: 1,
        }}
      >
        <DsButton
          onPress={() => {
            params.onSelect(grader);

            navigation.goBack();
          }}
          colorName={DsColorName.PRIMARY}
          text={"Update grader"}
          size={DsButtonSize.LARGE}
        />
      </View>
    </View>
  );
}
