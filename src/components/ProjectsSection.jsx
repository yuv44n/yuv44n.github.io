export const PROJECTS = [
  {
    title: "PaperPulse",
    href: "https://github.com/yuv44n/PaperPulse",
    meta: "Flutter, Dart, Supabase, OpenRouter API"
  },
  {
    title: "Year Progress Widget",
    href: "https://github.com/yuv44n/year-progress-widget",
    meta: "Kotlin, XML, Android SDK"
  },
  {
    title: "YouTube Playlist Progress Tracker",
    href: "https://github.com/yuv44n/play_list_",
    meta: "JavaScript, HTML5, YouTube API"
  }
];

export function ProjectsSection({ githubUrl = "https://github.com/yuv44n" }) {
  return (
    <div className="projects">
      {PROJECTS.map((project) => (
        <div key={project.title} className="project">
          <a
            className="project-title"
            href={project.href}
            target="_blank"
            rel="noreferrer"
          >
            {project.title}
          </a>
          <div className="project-meta">{project.meta}</div>
        </div>
      ))}
      <span className="project-footer">
        find more at{" "}
        <a href={githubUrl} target="_blank" rel="noreferrer">
          my github
        </a>
      </span>
    </div>
  );
}