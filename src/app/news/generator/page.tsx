/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useState } from "react";
import { PostEntry } from "@/consts";

import Header from "@/components/Header";
import Button from "@/components/Button";

import styles from "@/styles/news.module.scss";

export default function Features() {
  const containerRef = useRef<HTMLDivElement>();
  const fileInputRef = useRef<HTMLInputElement>();
  const nameInputRef = useRef<HTMLInputElement>();

  const [entries, setEntries] = useState<{ [fname: string]: PostEntry }>({});
  const [file, setFile] = useState<File | undefined>(undefined);
  const amount = Object.keys(entries).length;

  const [minify, setMinify] = useState(false);

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState<string[]>([""]);
  const [timestamp, setTimestamp] = useState(Date.now());

  const [filename, setFilename] = useState("");
  const [pendingCursor, setPendingCursor] = useState(false);

  const parseIndex = async () => {
    setEntries({});
    if (!file) return;

    const raw = await file.text();
    if (!raw.trim()) return;

    try {
      const parsed = JSON.parse(raw);
      setEntries(parsed);
    } catch (err) {
      console.error("Failed to parse index file:", err);
      alert(`Something went wrong while parsing the JSON.\n${err}\n\nYou can read more details on the console.`);
    }
  };

  const downloadIndex = () => {
    const entry: PostEntry = {
      title,
      timestamp,
      thumbnail,
      tags: tags.filter((t) => t.trim().length > 0),
    };

    const blob = new Blob([JSON.stringify({ ...entries, [filename]: entry }, undefined, minify ? undefined : 2)]);
    const uri = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = uri;
    a.download = "index.json";
    a.click();

    URL.revokeObjectURL(uri);
  };

  useEffect(() => {
    if (tags.at(-1) !== "") {
      setTags((p) => {
        const arr = [...p];
        arr.push("");

        return arr;
      });
    } else setTags((p) => [...p].filter((t, i) => t !== "" || i === p.length - 1));
  }, [tags]);

  useEffect(() => {
    const split = filename.split(".");
    if (filename.trim().length > 0 && split.length <= 1) {
      setFilename(`${filename}.md`);
      setPendingCursor(true);
    } else if (split[0].trim().length <= 0) setFilename("");
  }, [filename]);

  useEffect(() => {
    if (pendingCursor) {
      const input = nameInputRef.current;
      const split = filename.split(".");
      split.pop();

      const i = split.join(".").length;

      if (input) input.setSelectionRange(i, i);

      setPendingCursor(false);
    }
  }, [pendingCursor]);

  useEffect(() => {
    parseIndex();
  }, [file]);

  return (
    <div className="main" ref={containerRef as any}>
      <Header containerRef={containerRef} />

      <input type="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files?.[0])} ref={fileInputRef as any} />

      <section className="intro">
        <b>Index Generator</b>
      </section>

      <main className={styles.generator}>
        <section>
          <b>Current Index</b>

          <main>
            <Button onClick={() => fileInputRef.current?.click()} variant="secondary">
              {file ? `Selected ${file.name}`.concat(entries ? ` (${amount} entr${amount === 1 ? "y" : "ies"})` : "") : "Select file"}
            </Button>

            <label htmlFor="minify" onClick={() => setMinify(!minify)}>
              <input checked={minify} type="checkbox" name="minify" />
              Minify JSON
            </label>
          </main>
        </section>

        <section>
          <b>
            File Name
            <small>Name of the markdown file in posts directory</small>
          </b>
          <input
            onChange={(e) => setFilename(e.target.value)}
            ref={nameInputRef as any}
            data-component="input"
            type="text"
            placeholder="Insert filename..."
            value={filename}
          />
        </section>

        <section>
          <b>Post Title</b>
          <input onChange={(e) => setTitle(e.target.value)} data-component="input" type="text" placeholder="Write in your title..." value={title} />
        </section>

        <section>
          <b>
            Thumbnail
            <small>Optional, 16:9 recommended</small>
          </b>

          <main>
            <input onChange={(e) => setThumbnail(e.target.value)} data-component="input" type="url" placeholder="Link to your image..." value={thumbnail} />
            {thumbnail.length > 0 && <img src={thumbnail} alt={thumbnail} />}
          </main>
        </section>

        <section>
          <b>
            Date & Time
            <small>{new Date(timestamp).toLocaleString(["en-UK"], { dateStyle: "medium", timeStyle: "short" })}</small>
          </b>
          <input
            onChange={(e) => setTimestamp(e.target.valueAsNumber)}
            data-component="input"
            type="number"
            value={timestamp}
            placeholder="Unix timestamp with milliseconds..."
          />
        </section>

        <section>
          <b>Tags</b>

          <main>
            {tags.map((val, i) => (
              <input
                data-component="input"
                type="text"
                placeholder="Add tag..."
                value={val}
                key={`post-tag-${i}`}
                onChange={(e) => {
                  setTags((p) => {
                    const arr = [...p];
                    arr[i] = e.target.value;

                    return arr;
                  });
                }}
              />
            ))}
          </main>
        </section>

        <section>
          <div />
          <Button onClick={downloadIndex} variant="primary">
            {amount <= 0 ? "Create new" : "Update"} index
          </Button>
        </section>

        {amount <= 0 && (
          <section>
            <b>Caution</b>
            <span>
              This will generate a fresh new index file that will only include the entry you are generating on this page.
              <br />
              <br />
              Please check to confirm you are not overwriting any other important indexes.
            </span>
          </section>
        )}
      </main>
    </div>
  );
}
