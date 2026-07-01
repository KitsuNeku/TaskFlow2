import { Platform } from "react-native";
console.log(Platform.OS); // 'ios' or 'android'
const cardShadow = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  android: {
    elevation: 4,
  },
});

export default cardShadow;
