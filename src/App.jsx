import { useEffect, useState } from "react";
import {
  Prompt,
  Menu,
  ContentSection,
  SkillsSection,
  ConnectSection,
  ProjectsSection,
  MysterySection
} from "./components";
import { MENU_ITEMS, CONNECT_LINKS, CRYPTIC_SITES, MYSTERY_OPTIONS } from "./data";
import { useTyping } from "./hooks/useTyping";
import "./App.css";

const PROMPT_TARGETS = {
  loading: "loading...",
  home: "portfolio"
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
  const [connectIndex, setConnectIndex] = useState(0);
  const [mysteryIndex, setMysteryIndex] = useState(0);
  const [mysterySubsection, setMysterySubsection] = useState(null);
  const [mysterySiteIndex, setMysterySiteIndex] = useState(0);

  const promptTarget = isLoading
    ? PROMPT_TARGETS.loading
    : activeSection
      ? activeSection === "???????"
        ? mysterySubsection
          ? `portfolio / ??????? / ${mysterySubsection}`
          : `portfolio / ${activeSection}`
        : `portfolio / ${activeSection}`
      : PROMPT_TARGETS.home;

  const displayedText = useTyping(promptTarget);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const handleKey = (event) => {
      if (activeSection === "connect") {
        handleConnectKeys(event);
        return;
      }
      if (activeSection === "???????" && !mysterySubsection) {
        handleMysteryKeys(event);
        return;
      }
      if (activeSection === "???????" && mysterySubsection) {
        handleMysterySiteKeys(event);
        return;
      }
      handleMenuKeys(event);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeSection, isLoading, connectIndex, mysteryIndex, mysterySiteIndex, mysterySubsection, selectedIndex]);

  const handleMenuKeys = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + MENU_ITEMS.length) % MENU_ITEMS.length);
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % MENU_ITEMS.length);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      setActiveSection(MENU_ITEMS[selectedIndex]);
    }
    if (event.key === "Escape") {
      event.preventDefault();
      if (activeSection === "???????" && mysterySubsection) {
        setMysterySubsection(null);
        return;
      }
      setActiveSection(null);
    }
  };

  const handleConnectKeys = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setConnectIndex((prev) => (prev - 2 + CONNECT_LINKS.length) % CONNECT_LINKS.length);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setConnectIndex((prev) => (prev + 2) % CONNECT_LINKS.length);
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setConnectIndex((prev) => (prev - 1 + CONNECT_LINKS.length) % CONNECT_LINKS.length);
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setConnectIndex((prev) => (prev + 1) % CONNECT_LINKS.length);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const target = CONNECT_LINKS[connectIndex];
      if (target) {
        window.open(target.href, "_blank", "noopener,noreferrer");
      }
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setActiveSection(null);
    }
  };

  const handleMysteryKeys = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setMysteryIndex((prev) => (prev - 1 + MYSTERY_OPTIONS.length) % MYSTERY_OPTIONS.length);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setMysteryIndex((prev) => (prev + 1) % MYSTERY_OPTIONS.length);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const target = MYSTERY_OPTIONS[mysteryIndex];
      if (!target) return;
      if (target.action === "link") {
        window.open(target.href, "_blank", "noopener,noreferrer");
        return;
      }
      if (target.action === "submenu") {
        setMysterySubsection("cool sites for cryptic hunts");
      }
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setActiveSection(null);
    }
  };

  const handleMysterySiteKeys = (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setMysterySiteIndex((prev) => (prev - 1 + CRYPTIC_SITES.length) % CRYPTIC_SITES.length);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setMysterySiteIndex((prev) => (prev + 1) % CRYPTIC_SITES.length);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const site = CRYPTIC_SITES[mysterySiteIndex];
      if (site) {
        window.open(site, "_blank", "noopener,noreferrer");
      }
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setMysterySubsection(null);
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setMysterySubsection(null);
  };

  const handleBack = () => {
    if (activeSection === "???????" && mysterySubsection) {
      setMysterySubsection(null);
      return;
    }
    setActiveSection(null);
  };

  const renderContent = () => {
    if (!activeSection) return null;

    switch (activeSection) {
      case "all i know":
        return <SkillsSection />;
      case "connect":
        return <ConnectSection selectedIndex={connectIndex} onSelect={setConnectIndex} />;
      case "projects":
        return <ProjectsSection />;
      case "???????":
        return (
          <MysterySection
            selectedIndex={mysteryIndex}
            onSelect={setMysteryIndex}
            hasSubsection={!!mysterySubsection}
            selectedSiteIndex={mysterySiteIndex}
            onSiteSelect={setMysterySiteIndex}
          />
        );
      default:
        return <ContentSection section={activeSection} />;
    }
  };

  return (
    <div className="shell">
      <div className="terminal">
        <div className="terminal-header">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="terminal-body">
          <Prompt suffix={displayedText} />
          {isLoading ? (
            <span className="cursor" aria-hidden="true" />
          ) : (
            <div className="content">
              <div className="menu-grid">
                <div className="logo" aria-hidden="true">
                  UV
                </div>
                <div className="right-panel">
                  {activeSection ? (
                    <div className="panel-body">{renderContent()}</div>
                  ) : (
                    <Menu
                      selectedIndex={selectedIndex}
                      onSelect={setSelectedIndex}
                      onNavigate={handleSectionChange}
                    />
                  )}
                  {activeSection && (
                    <button className="back-button" type="button" onClick={handleBack}>
                      esc
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}