import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { supabase } from "@/src/lib/Supabase";
import { useAuth } from "@/src/providers/AuthProvider";

const Profile = () => {
  const { user } = useAuth();

  return (
    <View>
      <Text>User id: {user?.id}</Text>

      <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Profile;

