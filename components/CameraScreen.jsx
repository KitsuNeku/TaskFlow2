import { useCameraPermissions } from "expo-camera";
import { Text, TouchableOpacity, View } from "react-native";
export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  if (!permission) {
    // Permission status is still loading
    return <View style={styles.container} />;
  }
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to use the camera
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return <View style={styles.container} />;
}
