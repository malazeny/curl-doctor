import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { router } from "expo-router";
import { questions } from "./Data/questions";

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id];

  const handleAnswer = (option) => {
    if (currentQuestion.multiSelect) {
      const currentAnswers = currentAnswer || [];

      const updatedAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter((item) => item !== option)
        : [...currentAnswers, option];

      setAnswers({
        ...answers,
        [currentQuestion.id]: updatedAnswers,
      });

      return;
    }

    setAnswers({
      ...answers,
      [currentQuestion.id]: option,
    });

    handleContinue();
  };

  const handleContinue = () => {
    if (currentQuestion.type === "text" && !currentAnswer?.trim()) {
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      router.push("/results");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>
        Question {currentQuestionIndex + 1} of {questions.length}
      </Text>

      <Text style={styles.question}>{currentQuestion.question}</Text>

      {currentQuestion.type === "text" ? (
        <>
          <TextInput
            style={styles.input}
            placeholder={currentQuestion.placeholder}
            placeholderTextColor="#B8B8B8"
            value={currentAnswer || ""}
            onChangeText={(text) =>
              setAnswers({
                ...answers,
                [currentQuestion.id]: text,
              })
            }
            autoFocus
          />

          <Text style={styles.helperText}>
            {currentQuestion.helperText}
          </Text>

          <TouchableOpacity
            style={[
              styles.nextButton,
              !currentAnswer?.trim() && styles.buttonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!currentAnswer?.trim()}
          >
            <Text style={styles.nextButtonText}>›</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option) => {
              const isSelected = currentQuestion.multiSelect
                ? currentAnswer?.includes(option)
                : currentAnswer === option;

              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    isSelected && styles.selectedOption,
                  ]}
                  onPress={() => handleAnswer(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {currentQuestion.multiSelect && (
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleContinue}
            >
              <Text style={styles.primaryButtonText}>Continue</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {currentQuestionIndex > 0 && (
        <TouchableOpacity
          onPress={() =>
            setCurrentQuestionIndex(currentQuestionIndex - 1)
          }
        >
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F1E8",
    paddingHorizontal: 24,
    paddingTop: 90,
  },

  progress: {
    fontSize: 16,
    color: "#555",
    marginBottom: 40,
  },

  question: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 40,
    color: "#111",
    lineHeight: 40,
  },

  input: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
    borderBottomWidth: 1.5,
    borderBottomColor: "#111",
    paddingBottom: 10,
    marginBottom: 16,
  },

  helperText: {
    fontSize: 13,
    color: "#777",
    lineHeight: 18,
    marginBottom: 32,
  },

  nextButton: {
    backgroundColor: "#111",
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginTop: 10,
  },

  nextButtonText: {
    color: "#fff",
    fontSize: 34,
    marginTop: -4,
  },

  buttonDisabled: {
    opacity: 0.35,
  },

  optionsContainer: {
    width: "100%",
  },

  optionButton: {
    borderWidth: 1,
    borderColor: "#111",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 999,
    marginBottom: 16,
  },

  selectedOption: {
    backgroundColor: "#111",
  },

  optionText: {
    color: "#111",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },

  selectedOptionText: {
    color: "#fff",
  },

  primaryButton: {
    backgroundColor: "#111",
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 20,
  },

  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  backText: {
    fontSize: 16,
    color: "#444",
    marginTop: 24,
    textAlign: "center",
  },
});