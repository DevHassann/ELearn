import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ProvidersProps } from "@/properties/functions.properties";

export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}
