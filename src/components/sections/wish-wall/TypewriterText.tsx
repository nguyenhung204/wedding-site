"use client";
import { useState, useEffect } from "react";

interface Props {
  text: string;
  onDone?: () => void;
}

export default function TypewriterText({ text, onDone }: Props) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setShown("");
    setDone(false);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(iv);
        setDone(true);
        onDone?.();
      }
    }, 90);
    return () => clearInterval(iv);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <>
      {shown}
      {!done && <span className="animate-pulse">|</span>}
    </>
  );
}
