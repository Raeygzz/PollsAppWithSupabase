import React from "react";
import { Redirect, Slot } from "expo-router";

import { useAuth } from "@/src/providers/AuthProvider";

const AuthLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Redirect href="/profile" />;
  }

  return <Slot />;
};

export default AuthLayout;

