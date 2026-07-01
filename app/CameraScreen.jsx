import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PermissionScreen from "./screen/PermissionScreen";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const router = useRouter();

  async function takePicture() {
    if (!cameraRef.current) return;
    const result = await cameraRef.current.takePictureAsync({ quality: 0.7 });
    router.push({
      pathname: "/screen/PreviewScreen",
      params: { uri: result.uri },
    });
  }

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <PermissionScreen
        permission={permission}
        requestPermission={requestPermission}
      />
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />
      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        <Text style={styles.captureButtonText}>Capture</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  captureButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#2E5BBA",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
  },
  captureButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
