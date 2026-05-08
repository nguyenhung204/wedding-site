export interface Wish {
  key: string;
  name: string;
  message: string;
  submittedAt: number;
}

export const SLOTS = [
  // Left column
  { x: "5%",  y: "5%",  angle: -2 },
  { x: "1%",  y: "27%", angle:  2 },
  { x: "1%",  y: "51%", angle: -3 },
  { x: "1%",  y: "74%", angle:  2 },
  // Right column
  { x: "78%", y: "5%",  angle:  2 },
  { x: "78%", y: "27%", angle: -2 },
  { x: "78%", y: "51%", angle:  3 },
  { x: "78%", y: "74%", angle: -2 },
  // Top strip (above heads)
  { x: "31%", y: "1%",  angle: -1 },
  { x: "53%", y: "1%",  angle:  1 },
  // Bottom strip (below feet)
  { x: "29%", y: "88%", angle: -2 },
  { x: "53%", y: "89%", angle:  2 },
] as const;

export const MAX_VISIBLE = 10;
