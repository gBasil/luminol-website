/* eslint-disable @next/next/no-img-element */
"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import styles from "@/styles/faq.module.scss";

import { useRef } from "react";

export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>();

  return (
    <div className="main" ref={containerRef as any}>
      <Header containerRef={containerRef} />

      <section className="intro">
        <b>Frequently asked questions</b>
      </section>

      <ul className={styles.questions}>
        <li>
          <b>&quot;Browser support?&quot;</b>

          <span>
            For the foreseeable future, Luminol can&apos;t support Firefox due to{" "}
            <a href="https://mozilla.github.io/standards-positions/" target="_blank">
              Mozilla&apos;s stance on the Filesystem Access API
            </a>
            . There&apos;s a handful of extensions out there that do implement the Filesystem Access API in Firefox, Luminol should be compatible with those!
          </span>

          <span>Aside from Firefox, any recent chromium based browser should support Luminol.</span>

          <span>
            This includes Chrome (obviously) as well as Opera and Edge. If you&apos;re on Linux, at the moment, for best performance you&apos;ll need Chrome
            Canary as Google hasn&apos;t stabilized Linux WebGPU support yet.
          </span>
        </li>

        <li>
          <b>&quot;What RPG Maker versions do you plan to support?&quot;</b>
          <span>XP, VX, and VX Ace. We might support 2k and 2k3 in the future. Supporting RPG Maker XP is our current focus right now.</span>
        </li>

        <li>
          <b>&quot;If Luminol is open source, how can it go up on Steam?&quot;</b>

          <span>
            Luminol is licensed under GPLv3 with a special clause that allows Luminol binaries to link against the Steamworks SDK. We&apos;re likely going to do
            something similar to Aseprite as well, but we need to discuss it internally. We also want to make an asset pack, similar to RPG Maker, exclusively
            for the Steam release!
          </span>
        </li>

        <li>
          <b>&quot;How can I contribute to Luminol?&quot;</b>

          <span>
            Feel free to open a pull request at any time! You can take a look at our{" "}
            <a href="https://github.com/Astrabit-ST/Luminol/issues" target="_blank">
              issue tracker
            </a>{" "}
            or our{" "}
            <a href="https://github.com/Astrabit-ST/Luminol/issues" target="_blank">
              roadmap
            </a>{" "}
            for unimplemented features/bugs to see a list of things you can help with. If you&apos;d like to work on any of these, make a comment (or open an
            issue if it hasn&apos;t been already) stating that you&apos;d like to work on a feature!
          </span>

          <span>
            See our{" "}
            <a href="https://github.com/Astrabit-ST/Luminol/blob/dev/CONTRIBUTING.md" target="_blank">
              contributing guidelines
            </a>{" "}
            for more details.
          </span>

          <span>
            If you&apos;d like to work on the aforementioned asset pack, feel free to reach out over Discord or email{" "}
            <a href="mailto:melody@nowaffles.com" target="_blank">
              Melody
            </a>
            !
          </span>
        </li>

        <li>
          <b>&quot;What&apos;s the difference between the web and native versions of Luminol?&quot;</b>

          <span>
            Luminol&apos;s web-build has (most) features of the native version but has some limits due to the constraints of the browser. This isn&apos;t a
            comprehensive list, by any means, but here are some key differences:
          </span>

          <span>
            <ul>
              <li>
                RTPs are loaded from the <code>RTP</code> folder inside projects, and are not automatically detected
              </li>
              <li>Playtesting (and the integrated terminal) is unsupported</li>
              <li>Luminol may not be able to open projects (see browser compatibility)</li>
              <li>Projects cannot be in system folders</li>
              <li>All Steam workshop features are unsupported</li>
            </ul>
          </span>
        </li>
      </ul>

      <hr />

      <section className={styles.end}>
        <b>Still got any questions?</b>

        <a href="https://discord.gg/8jZKmesKJy" target="_blank" rel="noreferrer">
          <Button variant="primary">
            <img src="/brands/discord.svg" style={{ width: "1.25rem", height: "1.25rem", aspectRatio: 1 }} alt="GitHub" />
            Ask us on Discord
          </Button>
        </a>
      </section>
    </div>
  );
}
