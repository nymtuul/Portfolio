import type { CSSProperties } from "react";

const newsprintWords =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa officia deserunt mollit anim est laborum".split(
    " ",
  );

function fakeParagraph(seed: number, len = 30): string {
  let r = seed;
  const out: string[] = [];
  for (let i = 0; i < len; i++) {
    r = (r * 9301 + 49297) % 233280;
    out.push(newsprintWords[r % newsprintWords.length]);
  }
  return out.join(" ");
}

export function Newsprint({
  paragraphs = 4,
  seed = 1,
  style,
}: {
  paragraphs?: number;
  seed?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        fontFamily: "Georgia, serif",
        fontSize: 9.5,
        lineHeight: 1.35,
        color: "#2d3e5f",
        columnCount: 1,
        textAlign: "justify",
        ...style,
      }}
    >
      {Array.from({ length: paragraphs }).map((_, i) => (
        <p key={i} style={{ margin: "0 0 7px", textIndent: 10 }}>
          {fakeParagraph(seed + i * 13, 35 + ((i * 4) % 18))}.
        </p>
      ))}
    </div>
  );
}
