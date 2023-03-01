import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem("TOKEN", token);
  } catch (error) {
    console.log("setToken", error);
  }
};
export const getToken = async () => {
  return await AsyncStorage.getItem("TOKEN");
};

export const getLanguage = async () => {
  return await AsyncStorage.getItem("Language");
};

export const setUser = async (token) => {
  try {
    await AsyncStorage.setItem("USER", token);
  } catch (error) {
    console.log("setUser", error);
  }
};
export const getUser = async () => {
  return await AsyncStorage.getItem("USER");
};

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.removeItem("TOKEN");
    await AsyncStorage.removeItem("USER");
  } catch (error) {}
};
