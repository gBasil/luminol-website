/* eslint-disable @next/next/no-img-element */
"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import styles from "@/styles/home.module.scss";
import Link from "next/link";

type Contributor = {
  id: number;
  login: string;
  avatar_url: string;
  type: "User" | "Bot";
  contributions: number;
};

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>();
  const [contributors, setContributors] = useState<Contributor[] | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/Astrabit-ST/Luminol/contributors")
      .then((res) => res.json())
      .then((data) => setContributors(data))
      .catch((err) => console.error("Failed to load contributors:", err));
  }, []);

  return (
    <div className="main" ref={containerRef as any}>
      <Header containerRef={containerRef} />

      <section className="intro">
        <img src="/wordmark.png" alt="Luminol" />
        <span>Luminol is a work in progress remake of the RGSS RPG Maker editors in Rust with love ❤️</span>

        <div className={styles.buttonRow} role="listbox">
          <Link href="/web-build">
            <Button variant="primary">Try it out</Button>
          </Link>

          <Button variant="secondary">Documentation</Button>
        </div>
      </section>

      <section className={styles.feature}>
        <img src="/screenshots/1.png" alt="A screenshot of Luminol's map editor, with a map picker window to the side." />
        <div>
          <b>Maps</b>
          <span>Luminol features a fluid, GPU-Accelerated map editor! You can even edit multiple maps at the same time!</span>
        </div>
      </section>

      <section className={styles.feature} data-reverse>
        <img src="/screenshots/2.png" alt="A screenshot of three windows from the event editor on Luminol." />
        <div>
          <b>
            Events
            <small aria-label="Work in progress">WIP</small>
          </b>
          <span>Luminol has a customizable event editor! You can define your own fully custom commands, and even modify build in event commands!</span>
        </div>
      </section>

      <section className={styles.feature}>
        <img src="/screenshots/3.png" alt="A screenshot of Luminol's script editor, showing a list of scripts and a text area with code." />
        <div>
          <b>Scripts</b>
          <span>Luminol has a script editor with up-to-date syntax highlighting, and a tab view allowing you to edit multiple scripts at the same time!</span>
        </div>
      </section>

      <section className={styles.feature} data-reverse>
        <img
          src="/screenshots/4.png"
          alt="A screenshot of two windows, displaying an item editor and a weapon editor respectively, demonstrating database editing capabilities."
        />
        <div>
          <b>Databases</b>
          <span>Luminol&apos;s database editors have no arbitrary limits. You can have more than 999 items!</span>
        </div>
      </section>

      <section className={styles.feature}>
        <img src="/screenshots/5.png" alt="A screenshot of a debugging terminal, integrated to a window running OneShot: Fading Memory to the side." />
        <div>
          <b>Terminal</b>
          <span>
            Luminol has an integrated terminal that allows you to debug your game right from the editor<sup>1</sup>!
          </span>
        </div>
      </section>

      <div className={styles.footnotes} aria-label="Footnotes">
        <small>
          <sup>1</sup> Games will currently need to integrate with ruby-debug to make full use of this feature.
        </small>

        <a href="https://github.com/Astrabit-ST/Luminol/blob/dev/FUNCTIONALITY.md" target="_blank" rel="noreferrer">
          <Button variant="primary">See roadmap</Button>
        </a>
      </div>

      <hr />

      <section className={styles.contributors}>
        <b>Contributors</b>

        {contributors ? (
          <div className={styles.list}>
            {contributors
              .filter((user) => user.contributions >= 5 && user.type !== "Bot")
              .map((user) => (
                <a aria-label={user.login} key={user.id} href={`https://github.com/${user.login}`} target="_blank" rel="noreferrer">
                  <img src={user.avatar_url} alt={`Avatar of ${user.login}`} />
                </a>
              ))}
          </div>
        ) : (
          <span>Loading...</span>
        )}

        <a href="https://github.com/Astrabit-ST/Luminol" target="_blank" rel="noreferrer">
          <Button variant="primary">
            <img src="/brands/github.svg" style={{ width: "1.25rem", height: "1.25rem", aspectRatio: 1 }} alt="GitHub" />
            View repository
          </Button>
        </a>
      </section>
    </div>
  );
}
