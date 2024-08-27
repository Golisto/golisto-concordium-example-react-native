import { useRoute } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { BackButton } from "~/components/NavigationComponents";
import { DsTypoName, DsColorName, DsButton, dsColor } from "~/designSystem";
import { DsText, Header5 } from "~/designSystem/02-atoms/DsText/DsText";
import { MainParams } from "~/types/navigation.types";
import { useMainNavigation } from "~/hooks";
import { wp } from "~/utils/helpers";
import ArrowRight from "~/assets/svg/icn_arrowright.svg";
import { AntDesign } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { getPictureFromCamera, getPictureFromGallery } from "~/utils/images";
import useMForm from "~/utils/useMForm";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { defaultMargin } from "~/styles/sizes";

export default function VerifyItemIdentifiersScreen() {
  const { navigate } = useMainNavigation();
  const { params } = useRoute<MainParams<"VerifyItemIdentifiersScreen">>();

  const { showActionSheetWithOptions } = useActionSheet();

  const form = useMForm<{ images: string[] }>({
    defaultValues: {
      images: [],
    },
  });

  const images = form.watch("images");

  function selectImage(cb: (value: string) => void) {
    showActionSheetWithOptions(
      {
        title: "",
        showSeparators: true,
        options: ["Camera", "Gallery", "Cancel"],
        cancelButtonIndex: 2,
      },
      async (buttonIndex?: number) => {
        if (buttonIndex === 0 || buttonIndex === 1) {
          const imagePickerResult = await (buttonIndex === 0
            ? getPictureFromCamera()
            : getPictureFromGallery());

          if (!imagePickerResult) {
            return;
          }

          cb(imagePickerResult);
        }
      }
    );
  }

  const { bottom } = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: defaultMargin,
          paddingBottom: 32,
        }}
      >
        <BackButton />
        <Header5 bold style={{ marginBottom: 18, marginTop: 24 }}>
          Add item identifiers
        </Header5>
        <DsText gray style={{ marginBottom: 10 }}>
          Add images of uniquely identifiable item characteristics such as
          scratches, dents, paint application or other unique details.
        </DsText>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
          onPress={() => {
            navigate("VerificationInfoScreen");
          }}
        >
          <DsText
            variant={DsTypoName.LABEL}
            colorName={DsColorName.PRIMARY}
            style={{ marginRight: 8 }}
          >
            Read more
          </DsText>

          <ArrowRight width={16} height={14} />
        </TouchableOpacity>

        {form.render("images", ({ field: { value, onChange } }) => (
          <View
            style={{
              flexDirection: value.length === 0 ? undefined : "row",
              flexWrap: "wrap",
            }}
          >
            {value.map((img, i) => (
              <View
                key={i}
                style={{
                  marginRight: (i + 1) % 3 === 0 ? 0 : 16,
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    borderRadius: 100,
                    backgroundColor: "rgb(245, 245, 245)",
                    width: 24,
                    height: 24,
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    right: -12,
                    top: -12,
                    zIndex: 10,
                  }}
                  onPress={() => {
                    onChange([...value.slice(0, i), ...value.slice(i + 1)]);
                  }}
                >
                  <AntDesign name="close" size={12} color="rgb(42, 42, 42)" />
                </TouchableOpacity>
                <Image
                  style={{
                    width: wp(100 / 3) - 27,
                    height: wp(100 / 3) - 27,
                    borderRadius: 8,
                  }}
                  source={{ uri: img }}
                />
              </View>
            ))}

            <TouchableOpacity
              onPress={() => {
                selectImage((imagePickerResult) => {
                  onChange([...(value || []), imagePickerResult]);
                });
              }}
              style={{
                marginTop: 20,
                width: value.length === 0 ? wp(100) - 48 : wp(100 / 3) - 27,
                height: value.length === 0 ? wp(100) - 48 : wp(100 / 3) - 27,
                borderRadius: 8,
                borderStyle: "dashed",
                borderWidth: 1,
                borderColor: "rgb(205, 205, 205)",
                paddingVertical: 12,
                paddingHorizontal: 16,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name="plussquareo" size={24} color="black" />
              {value.length === 0 && (
                <DsText style={{ marginTop: 8 }}>Tap to upload images</DsText>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View
        style={{
          backgroundColor: "white",
          padding: 15,
          paddingBottom: Math.max(bottom, 15),
          borderTopColor: dsColor[DsColorName.GRAY_40],
          borderTopWidth: 1,
        }}
      >
        <Pressable
          style={{ alignSelf: "center" }}
          onPress={() => {
            navigate("VerifyItemSummaryScreen", {
              taggedPhoto: params.taggedPhoto,
              item: params.item,
              documents: params.documents,
              identifiers: [],
            });
          }}
        >
          <DsText
            style={{
              textDecorationLine: "underline",
            }}
            colorName={DsColorName.GRAY}
            variant={DsTypoName.LABEL}
          >
            Skip
          </DsText>
        </Pressable>

        <DsButton
          text="Done"
          disabled={images.length === 0}
          style={{
            marginHorizontal: 20,
            marginTop: 16,
          }}
          onPress={() => {
            navigate("VerifyItemSummaryScreen", {
              taggedPhoto: params.taggedPhoto,
              item: params.item,
              documents: params.documents,
              identifiers: images,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
}
