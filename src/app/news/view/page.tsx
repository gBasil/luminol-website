/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { marked } from "marked";
import markedAlert from "marked-alert";
import markedFootnote from "marked-footnote";

import DOMPurify from "dompurify";

import { NEWS_ROOT, PostEntry } from "@/consts";
import Header from "@/components/Header";

import styles from "@/styles/news.module.scss";

export default function NewsArticle() {
  const containerRef = useRef<HTMLDivElement>();
  const params = useSearchParams();
  const router = useRouter();

  const [post, setPost] = useState<PostEntry>();
  const [content, setContent] = useState("");

  const parsed = useMemo(() => {
    const final = marked
      .use(markedFootnote())
      .use(markedAlert({ className: styles.alert }))
      .parse(content);
    return DOMPurify.sanitize(String(final));
  }, [content]);

  const loadPostWithMeta = async (data: { [fname: string]: PostEntry }) => {
    try {
      const filename = String(params.get("p"));
      const res = await fetch(`${NEWS_ROOT}/posts/${filename}`);
      const current = data[filename];

      setContent(await res.text());
      setPost({
        title: current?.title ?? "Untitled post",
        tags: current?.tags ?? [],
        timestamp: current?.timestamp ?? Date.now(),
        thumbnail: current?.thumbnail,
      });
    } catch (err) {
      console.error("Failed to fetch post content:", err);
      router.push("/news");
    }
  };

  useEffect(() => {
    fetch(`${NEWS_ROOT}/index.json`)
      .then((res) => {
        if (res.status !== 200) throw new Error(`Got non-200 status: ${res.statusText}`);
        return res.json();
      })
      .then(loadPostWithMeta)
      .catch((err) => {
        console.error("Failed to load post meta:", err);
        router.push("/news");
      });
  }, []);

  return (
    <div className="main" ref={containerRef as any}>
      <Header containerRef={containerRef} />

      {post ? (
        <>
          <section className={`intro ${styles.header}`} style={{ "--thumbnail": post.thumbnail ? `url(${post.thumbnail})` : "" } as any}>
            <aside>
              <b>{post.title}</b>
              <footer>
                {post.tags.map((tag, j) => (
                  <b key={`tag-${j}`}>{tag}</b>
                ))}
              </footer>
            </aside>

            {post.thumbnail && <img src={post.thumbnail} alt="Post thumbnail" />}
          </section>

          <main className={styles.content} dangerouslySetInnerHTML={{ __html: parsed }} />
        </>
      ) : (
        <span className={styles.loading}>Loading...</span>
      )}
    </div>
  );
}
