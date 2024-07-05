/* eslint-disable @next/next/no-img-element */
"use client";

import { Fragment, useRef } from "react";

import Collapsible from "@/components/Collapsible";
import Header from "@/components/Header";

import styles from "@/styles/features.module.scss";

import features from "./meta";

export default function Features() {
  const containerRef = useRef<HTMLDivElement>();

  return (
    <div className="main" ref={containerRef as any}>
      <Header containerRef={containerRef} />

      <section className="intro">
        <b>Features</b>
      </section>

      {features.map((feat, i) => (
        <Fragment key={`feat-${i}`}>
          <hr />

          <Collapsible title={feat.title} label={feat.label}>
            {feat.content}
            {feat.images && (
              <section className={styles.images}>
                {feat.images.map((image, j) => (
                  <img src={image.src} alt={image.alt} key={`feat-${i}-img-${j}`} />
                ))}
              </section>
            )}
          </Collapsible>
        </Fragment>
      ))}
    </div>
  );
}
