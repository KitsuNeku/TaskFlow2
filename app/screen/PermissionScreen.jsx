import { useCallback } from "react";
import {
    Linking,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PermissionScreen({ permission, requestPermission }) {
  const insets = useSafeAreaInsets();

  const openSettings = useCallback(() => {
    Linking.openSettings();
  }, []);

  if (!permission?.granted) {
    const canAskAgain = permission?.canAskAgain ?? true;

    return (
      <View
        style={[
          styles.permissionContainer,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <Text style={styles.permissionText}>
          {canAskAgain
            ? Platform.OS === "ios"
              ? 'TaskFlow needs camera access. Tap below, then choose "Allow" in the dialog.'
              : "TaskFlow needs camera access. Tap below to grant the permission."
            : Platform.OS === "ios"
              ? "Camera access was denied. Please enable it in Settings to continue."
              : "Camera access was permanently denied. Please enable it in Settings to continue."}
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={canAskAgain ? requestPermission : openSettings}
        >
          <Text style={styles.permissionButtonText}>
            {canAskAgain ? "Grant Permission" : "Open Settings"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  permissionText: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 16,
  },
  permissionButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
