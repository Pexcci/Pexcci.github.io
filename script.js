(() => {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const followButton = document.querySelector(".follow-button");
  const sidebar = document.querySelector(".sidebar");

  navToggle.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("open", !open);
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    navToggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
  }));

  followButton.addEventListener("click", (event) => {
    if (window.innerWidth <= 680 && !sidebar.classList.contains("links-open")) {
      event.preventDefault();
      sidebar.classList.add("links-open");
      followButton.textContent = "Profile links";
    }
  });

  const sections = [...document.querySelectorAll("main section")];
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => link.classList.toggle("active", link.hash === `#${entry.target.id}`));
    });
  }, { rootMargin: "-25% 0px -65%" });
  sections.forEach((section) => sectionObserver.observe(section));

  document.querySelector("#year").textContent = new Date().getFullYear();

  const resourceList = document.querySelector(".resource-list");
  if (resourceList) {
    fetch(`./resources.json?v=${Date.now()}`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Resource data unavailable");
        return response.json();
      })
      .then((resources) => {
        if (!Array.isArray(resources) || resources.length === 0) return;
        const fragment = document.createDocumentFragment();
        resources.forEach((resource) => {
          if (!resource?.title || !resource?.url) return;
          const item = document.createElement("li");
          const link = document.createElement("a");
          link.href = resource.url;
          link.target = "_blank";
          link.rel = "noreferrer";
          link.textContent = resource.title;
          item.append(link);
          fragment.append(item);
        });
        if (fragment.childElementCount > 0) resourceList.replaceChildren(fragment);
      })
      .catch(() => {});
  }

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
  }
})();
