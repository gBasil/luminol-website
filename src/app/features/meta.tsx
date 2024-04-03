import { ReactNode } from "react";

type FeatureImage = {
  src: string;
  alt: string;
};

type Feature = {
  title: string;
  content: ReactNode;
  images?: FeatureImage[];
};

export default [
  {
    title: "Feature test",
    content: (
      <>
        <p>This feature has embedded images!</p>
        <p>
          <i>taken from a random stock image database: picsum.photos</i>
        </p>
      </>
    ),
    images: [
      {
        src: "https://picsum.photos/1280/720",
        alt: "Testing",
      },
      {
        src: "https://picsum.photos/1366/768",
        alt: "Testing",
      },
      {
        src: "https://picsum.photos/1920/1080",
        alt: "Testing",
      },
    ],
  },
  {
    title: "Feature test",
    content: (
      <>
        <p>This is my paragraph, wowie zowie!</p>
        <p>And another one, less goooo</p>
      </>
    ),
  },
] as Feature[];
