"use client";
import { cover } from "intrinsic-scale";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef } from "react";

export default function Background(props: DetailedHTMLProps<HTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>) {
  const canvasRef = useRef();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext("2d")!;

    let x = 0;
    let last = 0;

    const img = new Image();
    img.src = "/background.png";

    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    };

    const draw = () => {
      const now = Date.now();
      const delta = (now - last) / 1000;

      context.clearRect(0, 0, canvas.width, canvas.height);
      x += Math.floor(100 * delta);

      if (img.complete) {
        const scale = cover(innerWidth, innerHeight, img.naturalWidth, img.naturalHeight);
        const width = Math.floor(scale.width);

        context.drawImage(img, -x, scale.y, width, scale.height);
        context.drawImage(img, width - x, scale.y, width, scale.height);
        context.fillText(`scaled: ${width}, ${scale.height}`, 20, 190);

        if (x > width) x = 0;
      }

      context.fillStyle = "#f00";
      context.font = "24px sans-serif";
      context.textBaseline = "top";
      context.fillText(`img.complete: ${img.complete}`, 20, 100);
      context.fillText(`x: ${x}`, 20, 130);
      context.fillText(`image proportions: ${img.naturalWidth}, ${img.naturalHeight}`, 20, 160);

      last = now;
      requestAnimationFrame(draw);
    };

    draw();
    resize();

    addEventListener("resize", resize);
    return () => removeEventListener("resize", resize);
  }, [canvasRef]);

  return <canvas {...props} ref={canvasRef as any}></canvas>;
}
