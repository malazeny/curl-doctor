import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { productCatalog } from "../Data/productCatalog";

export default function Products() {
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const load = async () => {
            const saved = await AsyncStorage.getItem("quizAnswers");
            if (saved) setAnswers(JSON.parse(saved));
        };
        load();
    }, []);

    const concerns = Array.isArray(answers[5]) ? answers[5] : [answers[5]];
    const goals = Array.isArray(answers[10]) ? answers[10] : [answers[10]];
    const curlType = answers[1];
    const userTags = [...concerns, ...goals].filter(Boolean);

    const getMatchCount = (product) => {
        const tagMatches = product.tags.filter((t) => userTags.includes(t)).length;
        const curlMatch = curlType && product.curlTypes.includes(curlType) ? 1 : 0;
        return tagMatches + curlMatch;
    };

    const recommended = productCatalog
        .filter((p) => getMatchCount(p) > 0)
        .sort((a, b) => getMatchCount(b) - getMatchCount(a));

    const others = productCatalog.filter((p) => getMatchCount(p) === 0);

    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Your Products</Text>
            <Text style={styles.subtitle}>
                Picked for your curl type, concerns, and goals.
            </Text>

            {recommended.length > 0 && (
                <>
                    <Text style={styles.sectionLabel}>Recommended for You</Text>
                    {recommended.map((product) => (
                        <ProductCard key={product.id} product={product} highlighted />
                    ))}
                </>
            )}

            {others.length > 0 && (
                <>
                    <Text style={styles.sectionLabel}>Other Products</Text>
                    {others.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </>
            )}
        </ScrollView>
    );
}

function ProductCard({ product, highlighted }) {
    return (
        <View style={[styles.card, highlighted && styles.cardHighlighted]}>
            <Image source={product.image} style={styles.productImage} />
            <View style={styles.cardContent}>
                <Text style={[styles.brand, highlighted && styles.textLight]}>{product.brand}</Text>
                <Text style={[styles.productName, highlighted && styles.textWhite]}>{product.name}</Text>
                <Text style={[styles.description, highlighted && styles.textLight]}>{product.description}</Text>
                <Text style={[styles.price, highlighted && styles.textWhite]}>{product.price}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        paddingHorizontal: 24,
        paddingTop: 80,
        paddingBottom: 40,
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: "#111",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: "#555",
        lineHeight: 22,
        marginBottom: 28,
    },
    sectionLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#888",
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 14,
    },
    card: {
        backgroundColor: "#FFF9F0",
        borderRadius: 24,
        marginBottom: 16,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#EFE2D1",
    },
    cardHighlighted: {
        backgroundColor: "#111",
        borderColor: "#111",
    },
    productImage: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
    },
    cardContent: {
        padding: 18,
    },
    brand: {
        fontSize: 12,
        fontWeight: "700",
        color: "#888",
        textTransform: "uppercase",
        letterSpacing: 0.8,
        marginBottom: 4,
    },
    productName: {
        fontSize: 17,
        fontWeight: "700",
        color: "#111",
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: "#555",
        lineHeight: 21,
        marginBottom: 12,
    },
    price: {
        fontSize: 15,
        fontWeight: "600",
        color: "#111",
    },
    textWhite: {
        color: "#fff",
    },
    textLight: {
        color: "#aaa",
    },
});