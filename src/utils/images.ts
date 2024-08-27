import * as ImagePicker from "expo-image-picker";
import { Alert, Linking } from "react-native";
import { CameraPictureOptions } from "expo-camera";

export const cameraOptions: CameraPictureOptions = {
  quality: 0.4,
};

export const imageOptions: ImagePicker.ImagePickerOptions = {
  quality: 0.4,
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  base64: false,
};

const showImagesPermissionAlert = () => {
  Alert.alert(
    "Permission not granted",
    "Please grant permission from settings",
    [
      {
        onPress: () => {},
        text: "Cancel",
        style: "cancel",
      },
      {
        onPress: Linking.openSettings,
        text: "Open settings",
      },
    ]
  );
};

export const getPictureFromCamera = async () => {
  try {
    const { granted, canAskAgain } =
      await ImagePicker.getCameraPermissionsAsync();

    if (!granted && canAskAgain) {
      await ImagePicker.requestCameraPermissionsAsync();
    }

    const imagePickerResult = await ImagePicker.launchCameraAsync(imageOptions);

    if (imagePickerResult.canceled) {
      return null;
    }

    return imagePickerResult.assets[0].uri;
  } catch (error: any) {
    showImagesPermissionAlert();
  }
};

export const getPictureFromGallery = async () => {
  try {
    const { granted, canAskAgain } =
      await ImagePicker.getMediaLibraryPermissionsAsync();

    if (!granted && canAskAgain) {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    }

    const imagePickerResult = await ImagePicker.launchImageLibraryAsync(
      imageOptions
    );

    if (imagePickerResult.canceled) {
      return null;
    }

    return imagePickerResult.assets[0].uri;
  } catch (error: any) {
    showImagesPermissionAlert();
  }
};
