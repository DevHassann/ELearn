import React, { FC, ReactNode } from "react";
import { useLoadUserQuery } from "../redux/features/apis/api-slice";
import Loader from "../components/includes/loader";

const LoaderCondition: FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});

  return <>{isLoading ? <Loader /> : <>{children}</>}</>;
};

export default LoaderCondition;
