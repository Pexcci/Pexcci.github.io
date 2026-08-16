(() => {
  "use strict";

  const profile = window.PROFILE;
  const root = document.documentElement;

  const escapeHTML = (value = "") =>
    String(value).replace(/[&<>'"]/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    })[char]);

  const setProfileContent = () => {
    document.title = `${profile.name} · ${profile.role}`;
    document.querySelector('meta[name="description"]').content = profile.bio;

    document.querySelectorAll("[data-profile]").forEach((element) => {
      const key = element.dataset.profile;
      if (profile[key]) element.textContent = profile[key];
    });

    document.querySelectorAll("[data-profile-code]").forEach((element) => {
      const key = element.dataset.profileCode;
      if (profile[key]) element.textContent = `'${profile[key]}'`;
    });

    const hasGithub = profile.githubUsername && profile.githubUsername.toLowerCase() !== "yourname";
    const github = hasGithub ? `https://github.com/${profile.githubUsername}` : "#";
    const links = {
      github,
      githubRepos: hasGithub ? `${github}?tab=repositories` : "#",
      email: `mailto:${profile.email}`,
      ...profile.links
    };

    document.querySelectorAll("[data-link]").forEach((element) => {
      const url = links[element.dataset.link];
      if (!url || url === "#") {
        element.classList.add("placeholder-link");
        element.setAttribute("aria-label", `${element.textContent.trim()}（请在 profile.js 中配置）`);
      } else {
        element.href = url;
      }
    });
  };

  const folderIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 4h5l2 3h9v12H4z"></path>
    </svg>`;

  const githubIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3.5S18.2.1 15 1.8a13.4 13.4 0 0 0-7 0C4.8.1 3.7.5 3.7.5A5 5 0 0 0 3.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.4 3.5 6.5 6.8 7A4.8 4.8 0 0 0 8 18v4"></path>
    </svg>`;

  const externalIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 4h5v5M10 14 20 4M20 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6"></path>
    </svg>`;

  const starIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 2 3.1 6.3 6.9 1-5 4.8 1.2 6.9-6.2-3.3L5.8 21 7 14.1l-5-4.8 6.9-1z"></path>
    </svg>`;

  const languageColors = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572a5",
    Rust: "#dea584",
    Go: "#00add8",
    Vue: "#41b883",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Java: "#b07219",
    Swift: "#f05138"
  };

  const accentColors = {
    violet: "#8b7dff",
    cyan: "#54d9ff",
    lime: "#9eff62"
  };

  const renderProjects = (projects) => {
    const grid = document.querySelector("#projects-grid");
    grid.innerHTML = projects.map((project, index) => {
      const language = project.language || "Code";
      const glow = languageColors[language] || accentColors[project.accent] || ["#8b7dff", "#54d9ff", "#9eff62"][index % 3];
      const topics = (project.topics?.length ? project.topics : [language]).slice(0, 3);
      const repoLink = project.html_url || project.url || "#";
      const liveLink = project.homepage && project.homepage !== repoLink ? project.homepage : "";
      const hasRepoLink = repoLink && repoLink !== "#";
      const projectMeta = project.meta || "";

      return `
        <article class="project-card" style="--card-glow:${glow}">
          <div class="project-top">
            <span class="folder-icon">${folderIcon}</span>
            <div class="project-links">
              ${hasRepoLink ? `<a href="${escapeHTML(repoLink)}" target="_blank" rel="noreferrer" aria-label="在 GitHub 查看 ${escapeHTML(project.name)}">${githubIcon}</a>` : ""}
              ${liveLink ? `<a href="${escapeHTML(liveLink)}" target="_blank" rel="noreferrer" aria-label="打开 ${escapeHTML(project.name)} 在线页面">${externalIcon}</a>` : ""}
            </div>
          </div>
          <h3>${escapeHTML(project.name)}</h3>
          <p>${escapeHTML(project.description || "一个值得继续完善的开源项目。")}</p>
          <div class="project-tags">${topics.map((topic) => `<span>${escapeHTML(topic)}</span>`).join("")}</div>
          <div class="project-foot">
            <span class="language"><i></i>${escapeHTML(language)}</span>
            ${projectMeta ? `<span>${escapeHTML(projectMeta)}</span>` : `<span class="stars">${starIcon}${Number(project.stargazers_count ?? project.stars ?? 0).toLocaleString()}</span>`}
          </div>
        </article>`;
    }).join("");
  };

  const loadProjects = async () => {
    const status = document.querySelector("#projects-status");
    const username = profile.githubUsername.trim();

    if (!username || username.toLowerCase() === "yourname") {
      renderProjects(profile.featuredProjects);
      status.textContent = "内容整理自个人简历 · GitHub 用户名待补充";
      return;
    }

    status.textContent = "正在同步 GitHub 公开仓库…";
    try {
      const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`);
      if (!response.ok) throw new Error(`GitHub API ${response.status}`);
      const repositories = await response.json();
      const featured = repositories
        .filter((repo) => !repo.fork && !repo.archived)
        .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 3);

      if (!featured.length) throw new Error("没有可展示的公开仓库");
      renderProjects(featured);
      status.textContent = `已同步 @${username} 的公开仓库`;
    } catch (error) {
      renderProjects(profile.featuredProjects);
      status.textContent = "暂时无法同步 GitHub，正在显示精选项目";
      console.info(error.message);
    }
  };

  const renderStack = () => {
    const grid = document.querySelector("#stack-grid");
    grid.innerHTML = profile.stack.map((item) => `
      <div class="stack-item" style="--item-color:${escapeHTML(item.color)}">
        <span class="stack-mark">${escapeHTML(item.mark)}</span>
        <span>${escapeHTML(item.name)}</span>
      </div>`).join("");
  };

  const setupTheme = () => {
    const savedTheme = localStorage.getItem("profile-theme");
    const systemLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    root.dataset.theme = savedTheme || (systemLight ? "light" : "dark");

    document.querySelector(".theme-toggle").addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
      localStorage.setItem("profile-theme", root.dataset.theme);
    });
  };

  const setupNavigation = () => {
    const header = document.querySelector(".site-header");
    const menu = document.querySelector(".menu-toggle");
    const links = document.querySelector(".nav-links");
    const navLinks = [...links.querySelectorAll("a")];

    const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 18);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    menu.addEventListener("click", () => {
      const open = menu.getAttribute("aria-expanded") === "true";
      menu.setAttribute("aria-expanded", String(!open));
      links.classList.toggle("open", !open);
    });

    navLinks.forEach((link) => link.addEventListener("click", () => {
      menu.setAttribute("aria-expanded", "false");
      links.classList.remove("open");
    }));

    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-35% 0px -55%" });
    sections.forEach((section) => observer.observe(section));
  };

  const setupReveal = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  };

  const setupCursorGlow = () => {
    const glow = document.querySelector(".cursor-glow");
    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("pointermove", (event) => {
        glow.style.left = `${event.clientX}px`;
        glow.style.top = `${event.clientY}px`;
      }, { passive: true });
    } else {
      glow.hidden = true;
    }
  };

  setProfileContent();
  renderStack();
  loadProjects();
  setupTheme();
  setupNavigation();
  setupReveal();
  setupCursorGlow();
  document.querySelector("#year").textContent = new Date().getFullYear();

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
  }
})();
