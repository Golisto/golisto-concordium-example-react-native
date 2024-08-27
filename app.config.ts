import packageJSON from "./package.json";
const IS_DEV = process.env.EXPO_PUBLIC_APP_VARIANT === "development";

export default {
  name: IS_DEV ? "Golisto DEV" : "Golisto",
  slug: "pluuto",
  owner: "golisto",
  version: packageJSON.version,
  orientation: "portrait",
  icon: IS_DEV
    ? "./assets/images/app-icon-dev.png"
    : "./assets/images/app-icon.png",
  scheme: "com.golisto.pluuto",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
    enabled: false,
  },
  ios: {
    bundleIdentifier: "golisto-concordium-example-react-native"
  },
  assetBundlePatterns: ["**/*"],
  androidStatusBar: {
    backgroundColor: "#ffffff",
    barStyle: "dark-content",
    translucent: false,
    hidden: false,
  },
  web: {},
  plugins: [
  ],
  extra: {
    eas: {
      projectId: "***",
    },
  },
};
