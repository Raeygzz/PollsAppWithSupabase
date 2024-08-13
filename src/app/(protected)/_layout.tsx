import React from "react";
import { Redirect, Slot } from "expo-router";

import { useAuth } from "@/src/providers/AuthProvider";

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <Slot />;
};

export default ProtectedLayout;

