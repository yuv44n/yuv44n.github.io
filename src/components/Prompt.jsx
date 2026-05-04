export function Prompt({ suffix }) {
  return (
    <div className="prompt">
      <span className="prompt-prefix">yuv44n@yuv44n.github.io</span>
      <span className="prompt-path"> ~ % {suffix}</span>
    </div>
  );
}