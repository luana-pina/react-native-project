import Toast from "react-native-root-toast";
import { Colors } from "../constants/colors";

export const showToast = (message: string, type: "success" | "error") => {
  let colors: { background: string; text: string };
  if (type === "error") {
    colors = { background: Colors.error100, text: Colors.error400 };
  } else {
    colors = { background: Colors.success100, text: Colors.success400 };
  }

  let toast = Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: 60,
    animation: true,
    backgroundColor: colors.background,
    textColor: colors.text,
    textStyle: { fontWeight: "bold" },
  });
  setTimeout(() => {
    Toast.hide(toast);
  }, 5000);
};
