import { resources as componentsResources } from "~/i18n";
import { default as en } from "./en";
import { default as da } from "./da";
import merge from "lodash/merge";

export const resources = {
  en: {
    translation: merge(en, componentsResources.en),
  },
  da: {
    translation: merge(da, componentsResources.da),
  },
};

export const supportedLanguageCodes = ["da", "en"];
