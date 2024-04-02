"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "@/styles/components/Header.module.scss";
import { MutableRefObject, useEffect, useState } from "react";

type HeaderProps = {
  containerRef: MutableRefObject<HTMLDivElement | undefined>;
};

type HeaderLink = {
  label: string;
  href: string;
};

const links: HeaderLink[] = [
  { label: "Home", href: "/" },
  { label: "Web Build", href: "/web-build" },
  { label: "News", href: "/news" },
  { label: "FAQ", href: "/faq" },
];

export default function Header(props: HeaderProps) {
  const [downscrolled, setDownscrolled] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const target = props.containerRef.current as HTMLDivElement;
    const updateScroll = () => setDownscrolled(target?.scrollTop >= 60);

    updateScroll();

    target?.addEventListener("scroll", updateScroll);
    return () => target?.removeEventListener("scroll", updateScroll);
  }, [props.containerRef]);

  return (
    <header data-downscrolled={String(downscrolled)} className={styles.header}>
      <Link href="/">
        <img className={styles.logo} src="logo-icon.png" alt="Luminol" />
      </Link>

      <nav>
        {links.map(({ href, label }, i) => (
          <Link data-active={String(path === href)} href={href} key={`header-link-${i}`}>
            {label}
          </Link>
        ))}
      </nav>

      <a className={styles.social} data-ref="discord" href="https://discord.gg/8jZKmesKJy" target="_blank" rel="noreferrer" />
      <a className={styles.social} data-ref="steam" href="https://store.steampowered.com/app/2501490/" target="_blank" rel="noreferrer" />
      <a className={styles.social} data-ref="github" href="https://github.com/Astrabit-ST/Luminol" target="_blank" rel="noreferrer" />
    </header>
  );
}
