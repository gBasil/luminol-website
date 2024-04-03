/* eslint-disable @next/next/no-img-element */
"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import styles from "@/styles/web-build.module.scss";
import Link from "next/link";

import { useRef } from "react";

export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>();

  return (
    <div className="main" ref={containerRef as any}>
      <Header containerRef={containerRef} />

      <section className={styles.container}>
        <b>Try Luminol</b>

        <span>Luminol can be compiled to run in browsers, and you can try it out right now from the website!</span>

        <span>
          It essentially has the same experience as the native version. Although, you are advised to pay attention to a few caveats and limitations of the web
          version.
        </span>

        <span>
          Learn more in the <Link href="/faq">FAQ</Link>.
        </span>

        <Link href="/luminol-build/index.html">
          <Button variant="primary">Continue</Button>
        </Link>
      </section>
    </div>
  );
}
