import { Alert } from "react-native";
import { AppStrings } from "./AppStrings";

export const AppAlert = (title: string, message: string, onPositivePress?: () => void, onNegativePress?: () => void) => {
    Alert.alert(
        title,
        message,
        [
            {
                text: AppStrings.ok,
                onPress: () => onPositivePress?.()
            },
            {
                text: AppStrings.cancel,
                onPress: () => onNegativePress?.()
            },
        ])
};
