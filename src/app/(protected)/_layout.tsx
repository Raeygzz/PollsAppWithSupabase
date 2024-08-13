import React from "react";
import { Redirect, Slot } from "expo-router";

import { useAuth } from "@/src/providers/AuthProvider";

const ProtectedLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <Slot />;
};

export default ProtectedLayout;

