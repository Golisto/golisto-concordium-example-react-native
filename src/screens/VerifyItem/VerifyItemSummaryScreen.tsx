import { useRoute } from "@react-navigation/native";
import React from "react";
import { Alert, Image, ScrollView, View } from "react-native";
import { BackButton } from "~/components/NavigationComponents";
import { DsButton, DsColorName, DsTypoName, dsColor } from "~/designSystem";
import { DsText } from "~/designSystem/02-atoms/DsText/DsText";
import { MainParams } from "~/types/navigation.types";
import { wp } from "~/utils/helpers";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { defaultMargin } from "~/styles/sizes";
import { processImageForUpload } from "~/utils/api";

export default function VerifyItemSummaryScreen() {
  const { params } = useRoute<MainParams<"VerifyItemSummaryScreen">>();

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

        <View
          style={{
            marginTop: 24,
            borderRadius: 16,
            backgroundColor: "rgb(250, 248, 244)",
            paddingHorizontal: 16,
            paddingVertical: 24,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <DsText bold variant={DsTypoName.HEADING_5}>
              Summary
            </DsText>
          </View>

          <DsText variant={DsTypoName.BODY} style={{ marginTop: 8 }} gray>
            You can now claim the ownership of this item. You will receive a
            digital token as proof of ownership which will be shown to potential
            buyers.
          </DsText>

          <DsText style={{ marginTop: 32 }} variant={DsTypoName.LABEL}>
            Item
          </DsText>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <Image
              source={{ uri: params.item.avatarUrls[0] }}
              style={{
                width: 56,
                height: 56,
                marginRight: 16,
                borderRadius: 4,
              }}
            />
            <DsText style={{ flex: 1 }} variant={DsTypoName.LABEL}>
              {params.item.name}
            </DsText>
          </View>

          <DsText style={{ marginTop: 32 }} variant={DsTypoName.LABEL}>
            Owner
          </DsText>

          {(params.documents.barcode ||
            params.documents.gradingInfo ||
            params.documents.others ||
            params.documents.proofOfPurchase ||
            params.documents.serialNumber ||
            params.documents.stamps) && (
            <>
              <DsText style={{ marginTop: 32 }} variant={DsTypoName.LABEL}>
                Item documentation
              </DsText>

              {params.documents.proofOfPurchase && (
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {params.documents.proofOfPurchase?.map((img, i) => (
                    <Image
                      key={i}
                      source={{ uri: img }}
                      style={{
                        marginTop: 8,
                        width: 92,
                        height: 92,
                        borderRadius: 5,
                        marginRight: (i + 1) % 3 === 0 ? 0 : 8,
                      }}
                    />
                  ))}
                </View>
              )}

              {params.documents.barcode && (
                <Image
                  source={{
                    uri: params.documents.barcode,
                  }}
                  style={{
                    marginTop: 8,
                    width: 92,
                    height: 92,
                    borderRadius: 5,
                  }}
                />
              )}

              {params.documents.serialNumber && (
                <DsText>{params.documents.serialNumber}</DsText>
              )}

              {params.documents.stamps && (
                <View>
                  <DsText>{params.documents.stamps.text}</DsText>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {params.documents.stamps.images?.map((img, i) => (
                      <Image
                        key={i}
                        source={{ uri: img }}
                        style={{
                          marginTop: 8,
                          width: 92,
                          height: 92,
                          borderRadius: 5,
                          marginRight: (i + 1) % 3 === 0 ? 0 : 8,
                        }}
                      />
                    ))}
                  </View>
                </View>
              )}

              {params.documents.gradingInfo && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <DsText style={{ marginRight: 8 }}>
                    {params.documents.gradingInfo.grader}
                  </DsText>
                  <DsText>{params.documents.gradingInfo.grade}</DsText>
                </View>
              )}

              {params.documents.others && (
                <View>
                  <DsText>{params.documents.others.text}</DsText>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {params.documents.others.images?.map((img, i) => (
                      <Image
                        key={i}
                        source={{ uri: img }}
                        style={{
                          marginTop: 8,
                          width: 92,
                          height: 92,
                          borderRadius: 5,
                          marginRight: (i + 1) % 3 === 0 ? 0 : 8,
                        }}
                      />
                    ))}
                  </View>
                </View>
              )}
            </>
          )}

          {params.identifiers.length > 0 && (
            <>
              <DsText style={{ marginTop: 32 }} variant={DsTypoName.LABEL}>
                Item identifiers
              </DsText>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {params.identifiers?.map((img, i) => (
                  <Image
                    key={i}
                    source={{ uri: img }}
                    style={{
                      marginTop: 8,
                      width: wp(100 / 3) - 32,
                      height: wp(100 / 3) - 32,
                      borderRadius: 5,
                      marginRight: (i + 1) % 3 === 0 ? 0 : 8,
                    }}
                  />
                ))}
              </View>
            </>
          )}
        </View>
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
        <DsButton
          text="Verify Ownership"
          style={{
            marginHorizontal: 20,
          }}
          onPress={async () => {
            try {
              const mintObj = {
                variables: {
                  id: params.item.id,
                  input: {
                    barcode: undefined,
                    gradingInfo: params.documents.gradingInfo,
                    proofOfPurchase: params.documents.proofOfPurchase,
                    serialNumber: params.documents.serialNumber,
                    stamps: {
                      text: params.documents.stamps?.text || "",
                      images: params.documents.stamps?.images
                    },
                    others: {
                      text: params.documents.others?.text || "",
                      images: params.documents.others?.images
                    },
                    idetifiers: params.identifiers,
                    taggedPhoto: params.taggedPhoto,
                  },
                },
              }

              Alert.alert("This is where you would call your API to mint the token, with the user's chosen metadata");
              console.log('mint token with data', mintObj);
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}
