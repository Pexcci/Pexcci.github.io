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

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
  }
})();
