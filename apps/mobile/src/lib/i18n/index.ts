import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import koCommon from "./ko/common.json";
import koAuth from "./ko/auth.json";
import koTracker from "./ko/tracker.json";

const resources = {
  ko: {
    common: koCommon,
    auth: koAuth,
    tracker: koTracker,
  },
};

void i18n.use(initReactI18next).init({
  resources,
  lng: "ko",
  fallbackLng: "ko",
  defaultNS: "common",
  ns: ["common", "auth", "tracker"],
  interpolation: {
    escapeValue: false,
  },
});

export { i18n as default };
