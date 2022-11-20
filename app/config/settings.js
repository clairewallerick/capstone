import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "https://api.fivespot.org",
  },
  staging: {
    apiUrl: "https://api.fivespot.org",
  },
  prod: {
    apiUrl: "https://api.fivespot.org",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
