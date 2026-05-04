import { MENU_ITEMS, MENU_COLORS } from "../data";

export function Menu({ selectedIndex, onSelect, onNavigate, activeSection, onBack }) {
  return (
    <ul className="menu" aria-label="portfolio menu">
      {MENU_ITEMS.map((item, index) => {
        const isSelected = index === selectedIndex;
        const colorClass = MENU_COLORS[index] || "";
        return (
          <li
            key={item}
            className={`${isSelected ? "selected" : ""} ${colorClass}`.trim()}
            onMouseEnter={() => onSelect(index)}
            onClick={() => onNavigate(item)}
          >
            <span className="menu-index">{index + 1}.</span>
            <span className="menu-label">{item}</span>
            <span className="menu-indicator">{isSelected ? "<<" : ""}</span>
          </li>
        );
      })}
    </ul>
  );
}