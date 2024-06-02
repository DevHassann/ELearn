import React, { FC } from "react";
import { MetaDataProps } from "@/properties/functions.properties";

const MetaData: FC<MetaDataProps> = ({ title, description, keywords }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </>
  );
};

export default MetaData;
