import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { imageToBase64 } from "../../lib/gemini.js";

const { uri } = useLocalSearchParams();
export default function PreviewScreen({ route, navigation }) {
  const { photoUri } = route.params;

  async function handleAnalyze() {
    const base64Image = await imageToBase64(photoUri);
    navigation.navigate("Result", { base64Image });
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUri }} style={styles.preview} />
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.retakeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.analyzeButton} onPress={handleAnalyze}>
          <Text style={styles.buttonText}>Analyze</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.personaRow}>
        <TouchableOpacity onPress={() => handleAnalyzePersona("academic")}>
          <Text style={styles.personaLabel}>Academic Analysis</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAnalyzePersona("safety")}>
          <Text style={styles.personaLabel}>Safety Analysis</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAnalyzePersona("inventory")}>
          <Text style={styles.personaLabel}>Inventory Analysis</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  async function handleAnalyzePersona(personaKey) {
    const base64Image = await imageToBase64(photoUri);
    navigation.navigate("Result", { base64Image, promptKey: personaKey });
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  preview: { flex: 1, resizeMode: "contain" },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  retakeButton: { backgroundColor: "#5A6472", padding: 14, borderRadius: 8 },
  analyzeButton: { backgroundColor: "#5B3FA3", padding: 14, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
