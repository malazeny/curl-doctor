import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
    StyleSheet,
    Alert,
    Modal,
    ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function Journal() {
    const [entries, setEntries] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [pendingUri, setPendingUri] = useState(null);
    const [caption, setCaption] = useState("");

    useEffect(() => {
        const load = async () => {
            const saved = await AsyncStorage.getItem("journalEntries");
            if (saved) setEntries(JSON.parse(saved));
        };
        load();
    }, []);

    const saveEntries = async (updated) => {
        setEntries(updated);
        await AsyncStorage.setItem("journalEntries", JSON.stringify(updated));
    };

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permission needed", "Please allow access to your photo library.");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });
        if (!result.canceled) {
            setPendingUri(result.assets[0].uri);
            setModalVisible(true);
        }
    };

    const takePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permission needed", "Please allow camera access.");
            return;
        }
        const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
        if (!result.canceled) {
            setPendingUri(result.assets[0].uri);
            setModalVisible(true);
        }
    };

    const saveEntry = async () => {
        const newEntry = {
            id: Date.now().toString(),
            uri: pendingUri,
            caption: caption.trim(),
            date: new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            }),
        };
        const updated = [newEntry, ...entries];
        await saveEntries(updated);
        setModalVisible(false);
        setCaption("");
        setPendingUri(null);
    };

    const deleteEntry = (id) => {
        Alert.alert("Delete photo?", "This can't be undone.", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    const updated = entries.filter((e) => e.id !== id);
                    await saveEntries(updated);
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Curl Journal</Text>
                    <Text style={styles.subtitle}>Track your hair's progress over time.</Text>
                </View>
            </View>

            <View style={styles.addButtons}>
                <TouchableOpacity style={styles.addButton} onPress={takePhoto}>
                    <Text style={styles.addButtonText}> Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.addButton, styles.addButtonSecondary]} onPress={pickImage}>
                    <Text style={styles.addButtonTextSecondary}> Choose from Library</Text>
                </TouchableOpacity>
            </View>

            {entries.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={styles.emptyTitle}>No photos yet</Text>
                    <Text style={styles.emptyText}>
                        Log your first wash day photo to start tracking your curl journey.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={entries}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.grid}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.photoCard}
                            onLongPress={() => deleteEntry(item.id)}
                        >
                            <Image source={{ uri: item.uri }} style={styles.photo} />
                            <View style={styles.photoInfo}>
                                <Text style={styles.photoDate}>{item.date}</Text>
                                {item.caption ? (
                                    <Text style={styles.photoCaption} numberOfLines={2}>
                                        {item.caption}
                                    </Text>
                                ) : null}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* Add photo modal */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Add to Journal</Text>
                        {pendingUri && (
                            <Image source={{ uri: pendingUri }} style={styles.previewImage} />
                        )}
                        <TextInput
                            style={styles.captionInput}
                            placeholder="Add a note (optional)... how did your curls feel?"
                            placeholderTextColor="#999"
                            value={caption}
                            onChangeText={setCaption}
                            multiline
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={saveEntry}>
                            <Text style={styles.saveButtonText}>Save to Journal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => {
                                setModalVisible(false);
                                setPendingUri(null);
                                setCaption("");
                            }}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 80,
        paddingHorizontal: 24,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: "#111",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 15,
        color: "#555",
    },
    addButtons: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 24,
    },
    addButton: {
        flex: 1,
        backgroundColor: "#111",
        paddingVertical: 14,
        borderRadius: 999,
        alignItems: "center",
    },
    addButtonSecondary: {
        backgroundColor: "#F5F5F5",
    },
    addButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    },
    addButtonTextSecondary: {
        color: "#111",
        fontSize: 14,
        fontWeight: "600",
    },
    empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 80,
    },
    emptyEmoji: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111",
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 15,
        color: "#777",
        textAlign: "center",
        lineHeight: 22,
    },
    grid: {
        paddingBottom: 40,
    },
    row: {
        justifyContent: "space-between",
        marginBottom: 12,
    },
    photoCard: {
        width: "48%",
        backgroundColor: "#FFF9F0",
        borderRadius: 18,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#EFE2D1",
    },
    photo: {
        width: "100%",
        height: 160,
        resizeMode: "cover",
    },
    photoInfo: {
        padding: 10,
    },
    photoDate: {
        fontSize: 11,
        color: "#888",
        fontWeight: "600",
        marginBottom: 3,
    },
    photoCaption: {
        fontSize: 13,
        color: "#333",
        lineHeight: 18,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    modal: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 28,
        paddingBottom: 50,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#111",
        marginBottom: 16,
    },
    previewImage: {
        width: "100%",
        height: 200,
        borderRadius: 16,
        marginBottom: 16,
        resizeMode: "cover",
    },
    captionInput: {
        backgroundColor: "#F5F5F5",
        borderRadius: 16,
        padding: 16,
        fontSize: 15,
        color: "#111",
        minHeight: 80,
        textAlignVertical: "top",
        marginBottom: 16,
    },
    saveButton: {
        backgroundColor: "#111",
        paddingVertical: 16,
        borderRadius: 999,
        alignItems: "center",
        marginBottom: 12,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    cancelButton: {
        alignItems: "center",
        paddingVertical: 12,
    },
    cancelButtonText: {
        color: "#666",
        fontSize: 15,
    },
});