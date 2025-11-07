import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AlbumCoverProps {
  url: string;
  pixelLevel: number;
}

const AlbumCover: React.FC<AlbumCoverProps> = ({ url, pixelLevel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    imgRef.current = img;

    img.onload = () => {
      const width = canvas.width;
      const height = canvas.height;
      const scaledWidth = Math.max(1, Math.floor(width / pixelLevel));
      const scaledHeight = Math.max(1, Math.floor(height / pixelLevel));

      // Reduz e redesenha pixelado
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
      ctx.drawImage(
        canvas,
        0,
        0,
        scaledWidth,
        scaledHeight,
        0,
        0,
        width,
        height
      );
    };
  }, [url, pixelLevel]);

  return (
    <motion.canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="rounded-xl shadow-md"
      initial={{ opacity: 0.5, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: `blur(${Math.max(0, pixelLevel / 5)}px)`,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    />
  );
};

export default AlbumCover;
