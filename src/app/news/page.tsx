/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";

import { NEWS_ROOT, PostEntry } from "@/consts";
import Header from "@/components/Header";

import styles from "@/styles/news.module.scss";
import Link from "next/link";

enum LoadingStatus {
  Pending,
  Complete,
  Failed,
}

export default function News() {
  const containerRef = useRef<HTMLDivElement>();

  const [status, setStatus] = useState(LoadingStatus.Pending);
  const [news, setNews] = useState<{ [fname: string]: PostEntry }>({});

  const Posts = () => {
    return (
      <>
        {Object.keys(news).map((fname, i) => {
          const post = news[fname];
          const date = new Date(post.timestamp);

          return (
            <Link key={`post-${i}`} href={`/news/view?p=${fname}`}>
              <div>
                <aside>
                  <b>{post.title}</b>
                  <span>
                    {date.toLocaleDateString(["en-UK"], { dateStyle: "medium" })}
                    <div />
                    {date.toLocaleTimeString(["en-UK"], { timeStyle: "short" })}
                  </span>

                  {post.tags.length > 0 && (
                    <footer>
                      {post.tags.map((tag, j) => (
                        <b key={`post-${i}-tag-${j}`}>{tag}</b>
                      ))}
                    </footer>
                  )}
                </aside>

                {post.thumbnail && <img src={post.thumbnail} alt="Post thumbnail" />}
              </div>
            </Link>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    fetch(`${NEWS_ROOT}/index.json`)
      .then((res) => {
        if (res.status !== 200) throw new Error(`Got non-200 status: ${res.statusText}`);
        return res.json();
      })
      .then((data: { [fname: string]: PostEntry }) => {
        setNews(data ?? {});
        setStatus(LoadingStatus.Complete);
      })
      .catch((err) => {
        setStatus(LoadingStatus.Failed);
        console.error("Failed to load posts:", err);
      });
  }, []);

  return (
    <div className="main" ref={containerRef as any}>
      <Header containerRef={containerRef} />

      <section className="intro">
        <b>News</b>
      </section>

      <main className={styles.news}>
        {status === LoadingStatus.Pending ? (
          <span>Loading...</span>
        ) : status === LoadingStatus.Failed ? (
          <span>Could not load posts at this time. Try again later!</span>
        ) : (
          <Posts />
        )}
      </main>
    </div>
  );
}
