import { CONNECT_LINKS } from "../data";

export function ConnectSection({ selectedIndex, onSelect }) {
  return (
    <div className="connect-grid" role="list">
      {CONNECT_LINKS.map((item, index) => {
        const Icon = item.icon;
        return (
          <a
            key={item.label}
            className={`connect-item${index === selectedIndex ? " selected" : ""}`}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => onSelect(index)}
            role="listitem"
            aria-label={item.label}
          >
            <span className="bracket">[</span>
            <span className="connect-icon">
              <Icon aria-hidden="true" />
            </span>
            <span className="bracket">]</span>
          </a>
        );
      })}
    </div>
  );
}