import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { DsTypoName, DsColorName, DsButton, dsColor } from "~/designSystem";
import { DsText, Header5 } from "~/designSystem/02-atoms/DsText/DsText";
import { useMainNavigation } from "~/hooks";
import { wp } from "~/utils/helpers";
import ArrowRight from "~/assets/svg/icn_arrowright.svg";
import { Camera, CameraType } from "expo-camera";
import { ImageRotateCounterClockwiseSvg } from "~/assets/svg";
import { defaultMargin } from "~/styles/sizes";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { format } from "date-fns";

export default function VerifyItemTaggedPhotoScreen() {
  const { navigate } = useMainNavigation();
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const item = {    
    "rawId": "1",
    "id": "1",
    "name": "Golisto example item",
    "currency":"EUR",
    "avatarUrls": ["https://golisto.com/icons/logo.svg"],
    "price": 100
  }


  useEffect(() => {
    if (!permission?.granted && permission?.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  const cameraRef = useRef<Camera | null>(null);

  const [taggedPhoto, setTaggedPhoto] = useState<string | null>(null);
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
        <Header5 bold style={{ marginBottom: 18, marginTop: 24 }}>
          Add tagged photo
        </Header5>
        <DsText gray style={{ marginBottom: 10 }}>
          Write{" "}
          <DsText gray bold>
            User
          </DsText>
          ,{" "}
          <DsText gray bold>
            {format(new Date(), "dd/MM/yy")}
          </DsText>{" "}
          and the word{" "}
          <DsText gray bold>
            “Golisto”
          </DsText>{" "}
          on a piece of paper, take a photo of it alongside the item as proof of
          ownership.
        </DsText>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
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

        {taggedPhoto === null && (
          <Camera
            ref={cameraRef}
            style={{
              width: wp(100) - 48,
              height: wp(100) - 48,
              marginBottom: 51,
              borderRadius: 8,
              marginTop: 40,
            }}
            type={CameraType.back}
          />
        )}

        {taggedPhoto && (
          <Image
            source={{ uri: taggedPhoto }}
            style={{
              width: wp(100) - 48,
              height: wp(100) - 48,
              marginBottom: 51,
              borderRadius: 8,
              marginTop: 40,
            }}
          />
        )}
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
        {taggedPhoto && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: 56,
                height: 56,
                backgroundColor: "black",
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setTaggedPhoto(null);
              }}
            >
              <ImageRotateCounterClockwiseSvg
                width={32}
                height={32}
                fill="white"
              />
            </TouchableOpacity>
            <DsButton
              text="Continue"
              style={{
                flex: 1,
                marginHorizontal: 11,
              }}
              onPress={() => {
                navigate("VerifyItemDocumentsScreen", {
                  taggedPhoto: taggedPhoto,
                  item: item,
                });
              }}
            />

            <View
              style={{
                width: 56,
                height: 56,
              }}
            />
          </View>
        )}

        {taggedPhoto === null && (
          <DsButton
            text="Take Photo"
            colorName={DsColorName.BLACK}
            onPress={() => {
              cameraRef.current
                ?.takePictureAsync({
                  base64: true,
                })
                .then((res) => {
                  if (res.uri) {
                    setTaggedPhoto(res.uri);
                  }
                });
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
