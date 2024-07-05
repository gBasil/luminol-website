import { ReactNode } from "react";

type FeatureImage = {
  src: string;
  alt: string;
};

type Feature = {
  title: string;
  label?: string;
  content: ReactNode;
  images?: FeatureImage[];
};

export default [] as Feature[];
