import { useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  async function takePicture() {
    if (!cameraRef.current) return;
    const result = await cameraRef.current.takePictureAsync({ quality: 0.7 });
    setPhoto(result.uri);
  }
  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />;
      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        ;<Text style={styles.captureButtonText}>Capture</Text>;
      </TouchableOpacity>
    </View>
  );
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
