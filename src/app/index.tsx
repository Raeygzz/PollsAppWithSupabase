import { useEffect, useState } from "react";
import { Link, Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Text, StyleSheet, FlatList, Alert } from "react-native";

import { Poll } from "../types/db";
import { supabase } from "../lib/Supabase";

export default function HomeScreen() {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    const fetchPolls = async () => {
      let { data, error } = await supabase.from("polls").select("*");

      if (error) {
        Alert.alert("Error fetching data...");
      }

      setPolls(data ?? []);
    };

    fetchPolls();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Polls",
          headerRight: () => (
            <Link href={"/polls/new"}>
              <AntDesign name="plus" size={20} color={"gray"} />
            </Link>
          ),
          headerLeft: () => (
            <Link href={"/profile"}>
              <AntDesign name="user" size={20} color={"gray"} />
            </Link>
          ),
        }}
      />

      <FlatList
        data={polls}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <Link style={styles.pollContainer} href={`/polls/${item?.id}`}>
            <Text style={styles.pollTitle}>
              {item?.id}: {item?.question}
            </Text>
          </Link>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 5,
  },
  pollContainer: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
  },
  pollTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

