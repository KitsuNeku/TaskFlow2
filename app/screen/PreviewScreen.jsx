import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { imageToBase64 } from "../../lib/gemini.js";

export default function PreviewScreen() {
  const { uri: photoUri } = useLocalSearchParams();
  const router = useRouter();

  async function handleAnalyze() {
    const base64Image = await imageToBase64(photoUri);
    router.push({
      pathname: "/screen/ResultScreen",
      params: { base64Image },
    });
  }

  async function handleAnalyzePersona(personaKey) {
    const base64Image = await imageToBase64(photoUri);
    router.push({
      pathname: "/screen/ResultScreen",
      params: { base64Image, promptKey: personaKey },
    });
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Image
        source={{ uri: photoUri }}
        style={styles.preview}
        resizeMode="contain"
      />
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.retakeButton}
          onPress={() => router.back()}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  preview: { flex: 1 },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  retakeButton: { backgroundColor: "#5A6472", padding: 14, borderRadius: 8 },
  analyzeButton: { backgroundColor: "#5B3FA3", padding: 14, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  personaRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    paddingBottom: 16,
  },
  personaLabel: { color: "#fff", fontSize: 12 },
});
