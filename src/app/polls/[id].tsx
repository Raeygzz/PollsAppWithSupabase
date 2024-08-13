import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Alert,
  Button,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { Poll } from "@/src/types/db";
import { supabase } from "@/src/lib/Supabase";

const PollDetails = () => {
  const [poll, setPoll] = useState<Poll>();
  const [selected, setSelected] = useState("");

  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    const fetchPolls = async () => {
      let { data, error } = await supabase
        .from("polls")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) {
        Alert.alert("Error fetching data...");
      }

      if (data) {
        setPoll(data);
      }
    };

    fetchPolls();
  }, []);

  const vote = () => {};

  if (!poll) {
    return <ActivityIndicator />;
  }

  const optionsRender = poll?.options?.map((option, index) => (
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

      <Text style={styles.question}>{poll?.question}</Text>

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

