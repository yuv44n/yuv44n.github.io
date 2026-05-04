import { CONTENT } from "../data";

export function ContentSection({ section }) {
  const lines = CONTENT[section];
  if (!lines) return null;

  return (
    <div className="output">
      {lines.map((line, idx) => {
        return (
          <div key={idx} className="line">
            <span>{line}</span>
          </div>
        );
      })}
    </div>
  );
}