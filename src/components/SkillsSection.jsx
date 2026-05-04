import { SKILLS } from "../data";

export function SkillsSection() {
  return (
    <div className="output">
      {SKILLS.map((item) => (
        <div key={item.title} className="line">
          <span className={`label ${item.colorClass}`}>{item.title}:</span>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
}