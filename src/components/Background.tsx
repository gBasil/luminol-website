"use client";
import { cover } from "intrinsic-scale";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef } from "react";

type Layer = {
  image: HTMLImageElement;
  speed: number;
  x: number;
};

export default function Background(props: DetailedHTMLProps<HTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>) {
  const canvasRef = useRef();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext("2d")!;
    const dpr = devicePixelRatio;

    context.scale(dpr, dpr);

    let last = 0;

    const createImage = (src: string) => {
      const img = new Image();
      img.src = src;

      return img;
    };

    const layers: Layer[] = [
      {
        image: createImage("/background/tiles.svg"),
        speed: 25,
        x: 0,
      },
      {
        image: createImage("/background/wave-back.svg"),
        speed: 50,
        x: 0,
      },
      {
        image: createImage("/background/wave-front.svg"),
        speed: 100,
        x: 0,
      },
    ];

    const resize = () => {
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + 'px';
      canvas.style.height = innerHeight + 'px';
    };

    const draw = () => {
      const now = Date.now();
      const delta = (now - last) / 1000;

      context.clearRect(0, 0, canvas.width, canvas.height);

      for (const layer of layers) {
        const { speed, image: img } = layer;
        layer.x += speed * delta;

        if (img.complete) {
          const x = Math.floor(layer.x);
          const scale = cover(innerWidth * dpr, innerHeight * dpr, img.naturalWidth, img.naturalHeight);
          const width = Math.floor(scale.width);

          context.drawImage(img, -x, scale.y, width, scale.height);
          context.drawImage(img, width - x, scale.y, width, scale.height);

          if (x > width) layer.x = 0;
        }
      }

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
