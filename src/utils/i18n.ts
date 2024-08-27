import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n, { LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { resources, supportedLanguageCodes } from "~/translations";

const languageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: async (callback) => {
    const savedLng = await AsyncStorage.getItem("USER_LANGUAGE");
    if (savedLng) {
      callback(savedLng);
      return savedLng;
    }
    const bestLang = Localization.getLocales().find((l) =>
      supportedLanguageCodes.includes(l.languageCode || "null")
    );
    callback(bestLang?.languageCode || "en");
    return bestLang?.languageCode || "en";
  },
  init: () => {},
  cacheUserLanguage: async (lng) => {
    await AsyncStorage.setItem("USER_LANGUAGE", lng);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    returnNull: false,
    fallbackLng: "en",
    resources,
    ns: ["translation"],
    defaultNS: "translation",
    supportedLngs: supportedLanguageCodes,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
