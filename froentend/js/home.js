function setMobileNavOpen(isOpen) {
  const sidebar = document.getElementById("mobile-nav-sidebar");
  const backdrop = document.getElementById("mobile-nav-backdrop");
  const toggle = document.getElementById("mobile-nav-toggle");

  if (!sidebar || !backdrop || !toggle) {
    return;
  }

  sidebar.classList.toggle("is-open", isOpen);
  backdrop.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
}

function openMobileNav() {
  setMobileNavOpen(true);
}

function closeMobileNav() {
  setMobileNavOpen(false);
}

function toggleMobileNav() {
  const sidebar = document.getElementById("mobile-nav-sidebar");
  if (!sidebar) {
    return;
  }

  setMobileNavOpen(!sidebar.classList.contains("is-open"));
}

const mobileNavToggle = document.getElementById("mobile-nav-toggle");
const mobileNavBackdrop = document.getElementById("mobile-nav-backdrop");
const mobileNavClose = document.getElementById("mobile-nav-close");

if (mobileNavToggle) {
  mobileNavToggle.addEventListener("click", toggleMobileNav);
}

if (mobileNavBackdrop) {
  mobileNavBackdrop.addEventListener("click", closeMobileNav);
}

if (mobileNavClose) {
  mobileNavClose.addEventListener("click", closeMobileNav);
}

window.addEventListener("resize", () => {
  if (window.innerWidth >= 640) {
    closeMobileNav();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileNav();
  }
});

function handleExploreHackathons() {
  window.location.href = "/hackathons";
}

function handleCreateHackathon() {
  window.location.href = "/create-hackathon";
}

function handleViewHackathonDetails(slug) {
  console.log("View hackathon details:", slug);
  window.location.href = "/hackathons/" + slug;
}

function handleJoinAsParticipant() {
  window.location.href = "/register";
}
