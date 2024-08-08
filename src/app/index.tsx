import { useEffect, useState } from "react";
import { Link, Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Text, StyleSheet, FlatList, Alert } from "react-native";

import { supabase } from "../lib/Supabase";

type PollsRes = {
  created_at: string;
  id: number;
  options: string[];
  question: string;
};

export default function HomeScreen() {
  const [polls, setPolls] = useState<PollsRes[]>([]);

  useEffect(() => {
    const fetchPolls = async () => {
      let { data, error } = await supabase.from("polls").select("*");
      console.log("🚀 ~ fetchPolls ~ data:", data);

      if (error) {
        Alert.alert("Error fetching data...");
      }

      setPolls(data as PollsRes[]);
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

