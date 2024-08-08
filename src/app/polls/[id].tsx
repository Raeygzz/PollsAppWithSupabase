import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Pressable, Button } from "react-native";

const poll = {
  question: "React Native vs Flutter?",
  options: ["React Native FTM", "Flutter", "SwiftUI"],
};

const PollDetails = () => {
  const [selected, setSelected] = useState("React Native FTM");

  const { id } = useLocalSearchParams<{ id: string }>();

  const vote = () => {};

  const optionsRender = poll.options.map((option, index) => (
    <Pressable
      onPress={() => setSelected(option)}
      key={index}
      style={styles.optionContainer}
    >
      <Feather
        name={option === selected ? "check-circle" : "circle"}
        size={18}
        color={option === selected ? "green" : "gray"}
      />

      <Text>{option}</Text>
    </Pressable>
  ));

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Poll Voting" }} />

      <Text style={styles.question}>{poll.question}</Text>

      <View style={{ gap: 5 }}>{optionsRender}</View>

      <Button title="Vote" onPress={vote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: "600",
  },
  optionContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default PollDetails;
