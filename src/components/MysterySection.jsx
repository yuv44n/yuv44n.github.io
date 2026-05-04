import { useEffect, useRef } from "react";
import { MYSTERY_OPTIONS, CRYPTIC_SITES, MYSTERY_LETTERS } from "../data";

export function MysterySection({ selectedIndex, onSelect, hasSubsection, selectedSiteIndex, onSiteSelect }) {
  const siteRefs = useRef([]);

  useEffect(() => {
    if (hasSubsection) {
      const el = siteRefs.current[selectedSiteIndex];
      if (el) {
        el.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [hasSubsection, selectedSiteIndex]);

  if (hasSubsection) {
    return (
      <div className="mystery-sites" role="list">
        {CRYPTIC_SITES.map((site, index) => (
          <a
            key={site}
            className={`mystery-link${index === selectedSiteIndex ? " selected" : ""}`}
            href={site}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => onSiteSelect(index)}
            ref={(node) => {
              siteRefs.current[index] = node;
            }}
            role="listitem"
          >
            {site}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="mystery-menu">
      {MYSTERY_OPTIONS.map((item, index) => {
        const isSelected = index === selectedIndex;
        const Icon = item.icon;
        const letter = MYSTERY_LETTERS[index] || "?";
        return (
          <button
            key={item.label}
            className={`mystery-item${isSelected ? " selected" : ""}`}
            type="button"
            onMouseEnter={() => onSelect(index)}
            onClick={() => {
              if (item.action === "link") {
                window.open(item.href, "_blank", "noopener,noreferrer");
              }
            }}
          >
            <span className="mystery-index">{letter}.</span>
            <span className="mystery-label-wrap">
              {item.label ? <span className="mystery-label">{item.label}</span> : null}
              {Icon ? (
                <span className="mystery-icon" aria-hidden="true">
                  <Icon />
                </span>
              ) : null}
            </span>
            <span className="mystery-indicator">{isSelected ? "<<" : ""}</span>
          </button>
        );
      })}
    </div>
  );
}