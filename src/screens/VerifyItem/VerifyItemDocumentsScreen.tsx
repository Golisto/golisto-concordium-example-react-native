import { useActionSheet } from "@expo/react-native-action-sheet";
import { useRoute } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BackButton } from "~/components/NavigationComponents";
import { DsButton, DsColorName, DsTypoName, dsColor } from "~/designSystem";
import { DsText, Header5 } from "~/designSystem/02-atoms/DsText/DsText";
import { VerificationObject } from "~/types/data.types";
import { useMainNavigation } from "~/hooks";
import { MainParams } from "~/types/navigation.types";
import { getPictureFromCamera, getPictureFromGallery } from "~/utils/images";
import useMForm, { UseMFormReturn } from "~/utils/useMForm";
import { AntDesign } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { CheckmarkSvg } from "~/assets/svg";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { defaultMargin } from "~/styles/sizes";

export default function VerifyItemDocumentsScreen() {
  const { navigate } = useMainNavigation();
  const { params } = useRoute<MainParams<"VerifyItemDocumentsScreen">>();

  const { showActionSheetWithOptions } = useActionSheet();

  const form = useMForm<
    VerificationObject["documents"] & {
      proofOfPurchaseEnabled: boolean;
      barcodeEnabled: boolean;
      serialNumberEnabled: boolean;
      stampsEnabled: boolean;
      gradingInfoEnabled: boolean;
      othersEnabled: boolean;
    }
  >({
    defaultValues: {
      barcodeEnabled: false,
      othersEnabled: false,
      stampsEnabled: false,
      gradingInfoEnabled: false,
      serialNumberEnabled: false,
      proofOfPurchaseEnabled: false,
    },
  });

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
          Add item documents
        </Header5>
        <DsText gray style={{ marginBottom: 26 }}>
          Add relevant documentation of authenticity such as proof of purchase,
          provenance tag, serial number or stamp.
        </DsText>

        {form.render(
          "proofOfPurchaseEnabled",
          ({ field: { value: selected, onChange: select } }) => (
            <DocumentSelector
              label="Proof of purchase"
              select={select}
              selected={selected}
              content={form.render(
                "proofOfPurchase",
                ({ field: { value, onChange } }) => (
                  <SelectImages value={value} onChange={onChange} />
                )
              )}
            />
          )
        )}

        {form.render(
          "barcodeEnabled",
          ({ field: { value: selected, onChange: select } }) => (
            <DocumentSelector
              label="Barcode"
              select={select}
              selected={selected}
              content={form.render(
                "barcode",
                ({ field: { value, onChange } }) =>
                  (value?.length || 0) === 0 ? (
                    <TouchableOpacity
                      onPress={() => {
                        selectImage(onChange);
                      }}
                      style={{
                        borderRadius: 8,
                        borderStyle: "dashed",
                        borderWidth: 1,
                        marginTop: 12,
                        borderColor: "rgb(205, 205, 205)",
                        paddingVertical: (value?.length || 0) === 0 ? 12 : 0,
                        paddingHorizontal: (value?.length || 0) === 0 ? 16 : 0,
                        flexDirection: "row",
                        alignItems: "center",
                        flex: (value?.length || 0) === 0 ? 1 : undefined,
                        width: (value?.length || 0) === 0 ? undefined : 64,
                        height: (value?.length || 0) === 0 ? undefined : 64,
                      }}
                    >
                      <AntDesign
                        name="plussquareo"
                        style={{ marginRight: 8 }}
                        size={24}
                        color="black"
                      />

                      <DsText>Tap to upload images</DsText>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={{
                        width: 64,
                        height: 64,
                        marginTop: 12,
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
                          onChange(undefined);
                        }}
                      >
                        <AntDesign
                          name="close"
                          size={12}
                          color="rgb(42, 42, 42)"
                        />
                      </TouchableOpacity>

                      <Image
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: 8,
                        }}
                        source={{ uri: value }}
                      />
                    </View>
                  )
              )}
            />
          )
        )}

        {form.render(
          "serialNumberEnabled",
          ({ field: { value: selected, onChange: select } }) => (
            <DocumentSelector
              label="Serial number"
              select={select}
              selected={selected}
              content={form.render(
                "serialNumber",
                ({ field: { value, onChange } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Enter Serial Number"
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: "rgb(221, 221, 221)",
                      marginTop: 16,
                      marginBottom: 5,
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      borderRadius: 4,
                    }}
                  />
                )
              )}
            />
          )
        )}

        {form.render(
          "stampsEnabled",
          ({ field: { value: selected, onChange: select } }) => (
            <DocumentSelector
              label="Stamps"
              select={select}
              selected={selected}
              content={form.render(
                "stamps",
                ({ field: { value, onChange } }) => (
                  <View>
                    <TextInput
                      value={value?.text || ""}
                      onChangeText={(text) => {
                        onChange({
                          ...(value || {
                            images: [],
                            text: "",
                          }),
                          text,
                        });
                      }}
                      placeholder="Enter Stamps"
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "rgb(221, 221, 221)",
                        marginTop: 16,
                        marginBottom: 5,
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        borderRadius: 4,
                      }}
                    />
                    <SelectImages
                      value={value?.images}
                      onChange={(images) => {
                        onChange({
                          ...(value || {
                            images: [],
                            text: "",
                          }),
                          images,
                        });
                      }}
                    />
                  </View>
                )
              )}
            />
          )
        )}

        {form.render(
          "gradingInfoEnabled",
          ({ field: { value: selected, onChange: select } }) => (
            <DocumentSelector
              label="Grading info"
              select={select}
              selected={selected}
              content={form.render(
                "gradingInfo",
                ({ field: { onChange, value } }) => (
                  <View>
                    <RectButton
                      onPress={() => {
                        navigate("VerifyItemSelectGraderScreen", {
                          selectedGrader: value?.grader,
                          onSelect: (grader) =>
                            grader
                              ? onChange({
                                  ...(value || {
                                    grader: "",
                                    grade: "",
                                  }),
                                  grader,
                                })
                              : undefined,
                        });
                      }}
                      style={{
                        borderColor: dsColor.GRAY_70,
                        borderWidth: 1,
                        borderRadius: 4,
                        height: 40,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 12,
                        marginTop: 16,
                      }}
                    >
                      <DsText variant={DsTypoName.LABEL} gray={!value?.grader}>
                        {value?.grader || "Choose grader"}
                      </DsText>
                      <Ionicons
                        name="chevron-forward"
                        size={24}
                        color={dsColor.GRAY}
                      ></Ionicons>
                    </RectButton>

                    <TextInput
                      value={value?.grade || ""}
                      onChangeText={(grade) => {
                        onChange({
                          ...(value || {
                            grader: "",
                            grade: "",
                          }),
                          grade,
                        });
                      }}
                      placeholder="Enter grade"
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "rgb(221, 221, 221)",
                        marginTop: 16,
                        marginBottom: 5,
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        borderRadius: 4,
                      }}
                    />
                  </View>
                )
              )}
            />
          )
        )}

        {form.render(
          "othersEnabled",
          ({ field: { value: selected, onChange: select } }) => (
            <DocumentSelector
              label="Others"
              select={select}
              selected={selected}
              content={form.render(
                "others",
                ({ field: { value, onChange } }) => (
                  <View style={{}}>
                    <TextInput
                      value={value?.text || ""}
                      onChangeText={(text) => {
                        onChange({
                          ...(value || {
                            images: [],
                            text: "",
                          }),
                          text,
                        });
                      }}
                      placeholder="Enter text"
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: "rgb(221, 221, 221)",
                        marginTop: 8,
                        marginBottom: 5,
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        borderRadius: 4,
                      }}
                    />
                    <SelectImages
                      value={value?.images}
                      onChange={(images) => {
                        onChange({
                          ...(value || {
                            images: [],
                            text: "",
                          }),
                          images,
                        });
                      }}
                    />
                  </View>
                )
              )}
            />
          )
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
        <Pressable
          style={{ alignSelf: "center" }}
          onPress={() => {
            navigate("VerifyItemIdentifiersScreen", {
              taggedPhoto: params.taggedPhoto,
              item: params.item,
              documents: {},
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

        <ContinueButton form={form} />
      </View>
    </SafeAreaView>
  );
}

function ContinueButton({
  form,
}: {
  form: UseMFormReturn<
    VerificationObject["documents"] & {
      proofOfPurchaseEnabled: boolean;
      barcodeEnabled: boolean;
      serialNumberEnabled: boolean;
      stampsEnabled: boolean;
      gradingInfoEnabled: boolean;
      othersEnabled: boolean;
    }
  >;
}) {
  const { navigate } = useMainNavigation();
  const { params } = useRoute<MainParams<"VerifyItemDocumentsScreen">>();

  const formData = form.watch();

  return (
    <DsButton
      text="Continue"
      disabled={
        !(
          (formData.barcodeEnabled && !!formData.barcode) ||
          (formData.gradingInfoEnabled && !!formData.gradingInfo?.grader) ||
          (formData.othersEnabled &&
            ((formData.others?.images.length || 0) > 0 ||
              !!formData.others?.text)) ||
          (formData.proofOfPurchaseEnabled &&
            (formData.proofOfPurchase?.length || 0) > 0) ||
          (formData.serialNumberEnabled && !!formData.serialNumber) ||
          (formData.stampsEnabled &&
            ((formData.stamps?.images.length || 0) > 0 ||
              !!formData.stamps?.text))
        )
      }
      style={{
        marginHorizontal: 20,
        marginTop: 16,
      }}
      onPress={form.handleSubmit((data) => {
        navigate("VerifyItemIdentifiersScreen", {
          taggedPhoto: params.taggedPhoto,
          item: params.item,
          documents: {
            barcode: data.barcode,
            gradingInfo: data.gradingInfo,
            others: data.others,
            proofOfPurchase: data.proofOfPurchase,
            serialNumber: data.serialNumber,
            stamps: data.stamps,
          },
        });
      })}
    />
  );
}

function DocumentSelector({
  selected,
  select,
  label,
  content,
}: {
  selected: boolean;
  select: (val: boolean) => void;
  label: string;
  content: React.ReactNode;
}) {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: "#eff0f0",
        paddingVertical: 20,
        marginRight: -24,
        paddingRight: 24,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          select(!selected);
        }}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DsText variant={DsTypoName.LABEL}>{label}</DsText>

        <View
          style={{
            width: 16,
            height: 16,
            borderRadius: 2,
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            borderColor: selected ? dsColor.PRIMARY : "rgb(221, 221, 221)",
            backgroundColor: selected ? dsColor.PRIMARY : undefined,
          }}
        >
          <CheckmarkSvg width={10} height={10} fill="white" />
        </View>
      </TouchableOpacity>

      {selected && content}
    </View>
  );
}

function SelectImages({
  value,
  onChange,
}: {
  value?: string[];
  onChange: (val: string[]) => void;
}) {
  const { showActionSheetWithOptions } = useActionSheet();

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

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 5,
      }}
    >
      {value?.map((img, i) => (
        <View
          key={i}
          style={{
            marginRight: 12,
            marginTop: 12,
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
              width: 64,
              height: 64,
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
          borderRadius: 8,
          borderStyle: "dashed",
          borderWidth: 1,
          marginTop: 12,
          borderColor: "rgb(205, 205, 205)",
          paddingVertical: 12,
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: (value?.length || 0) === 0 ? undefined : "center",
          flex: (value?.length || 0) === 0 ? 1 : undefined,
          width: (value?.length || 0) === 0 ? undefined : 64,
          height: (value?.length || 0) === 0 ? undefined : 64,
        }}
      >
        <AntDesign
          name="plussquareo"
          size={24}
          color="black"
          style={{
            marginRight: (value?.length || 0) === 0 ? 8 : 0,
          }}
        />
        {(value?.length || 0) === 0 && <DsText>Tap to upload images</DsText>}
      </TouchableOpacity>
    </View>
  );
}
