const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const filterGroups = Array.from(document.querySelectorAll("[data-filter-group]"));
const filterMenus = {
  status: document.getElementById("statusFilterMenu"),
  location: document.getElementById("locationFilterMenu"),
  interest: document.getElementById("interestFilterMenu"),
};
const filterButtons = {
  status: document.querySelector('[data-filter-chip="status"]'),
  location: document.querySelector('[data-filter-chip="location"]'),
  interest: document.querySelector('[data-filter-chip="interest"]'),
};
const filterValueLabels = {
  status: document.querySelector('[data-filter-value="status"]'),
  location: document.querySelector('[data-filter-value="location"]'),
  interest: document.querySelector('[data-filter-value="interest"]'),
};
const cards = Array.from(document.querySelectorAll(".card"));
const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");
// ===== AUTH HEADER LOGIC =====
function loadHkAuthHeader() {
  const stored = localStorage.getItem('hack_agent_workspace_state');
  if (!stored) return;
  try {
    const state = JSON.parse(stored);
    if (state.registered && state.profile) {
      const p = state.profile;
      const fullName = `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'User';
      const avatar = p.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80';
      const username = `@${(p.firstName || 'user').toLowerCase()}${(p.lastName || '').toLowerCase()}`;
      document.getElementById('hk-header-avatar').src = avatar;
      document.getElementById('hk-header-name').textContent = p.firstName || 'User';
      document.getElementById('hk-dd-avatar').src = avatar;
      document.getElementById('hk-dd-name').textContent = fullName;
      document.getElementById('hk-dd-email').textContent = username;
    }
  } catch(e) { console.error('Error loading auth header', e); }
}
function toggleHkDropdown() {
  const pill = document.getElementById('hk-avatar-pill');
  const dd = document.getElementById('hk-avatar-dropdown');
  const isOpen = dd.classList.contains('is-open');
  dd.classList.toggle('is-open', !isOpen);
  pill.classList.toggle('is-open', !isOpen);
}
document.addEventListener('click', (e) => {
  const wrap = document.querySelector('.avatar-pill-wrap');
  if (wrap && !wrap.contains(e.target)) {
    const dd = document.getElementById('hk-avatar-dropdown');
    const pill = document.getElementById('hk-avatar-pill');
    if (dd) dd.classList.remove('is-open');
    if (pill) pill.classList.remove('is-open');
  }
});
function signOutHk() { localStorage.removeItem('hack_agent_workspace_state'); window.location.href = 'froentend/home.html'; }
loadHkAuthHeader();

const filterState = {
  status: "all",
  location: "all",
  interest: "all",
};


function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function titleCase(value) {
  return String(value || "")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function createFilterOption(value, label, isSelected = false) {
  const option = document.createElement("button");
  option.type = "button";
  option.className = "filter-option";
  option.setAttribute("role", "option");
  option.dataset.filterValue = value;
  option.setAttribute("aria-selected", String(isSelected));

  const text = document.createElement("span");
  text.textContent = label;

  const marker = document.createElement("span");
  marker.className = "filter-option__marker";
  marker.setAttribute("aria-hidden", "true");
  marker.textContent = "✓";

  option.append(text, marker);

  if (isSelected) {
    option.classList.add("is-selected");
  }

  return option;
}

function populateFilterMenu(menu, values, allLabel, formatter = (value) => value) {
  menu.innerHTML = "";
  menu.appendChild(createFilterOption("all", allLabel, true));
  values.forEach((value) => {
    menu.appendChild(createFilterOption(value, formatter(value), false));
  });
}

function getStatusFromDates(startValue, endValue) {
  const today = new Date();
  const start = new Date(`${startValue}T00:00:00`);
  const end = new Date(`${endValue}T23:59:59`);
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  const msPerDay = 24 * 60 * 60 * 1000;

  if (todayStart < startDay) {
    return { filter: "upcoming", label: "À venir" };
  }

  if (todayStart > endDay) {
    return { filter: "ended", label: "Terminé" };
  }

  const daysLeft = Math.max(0, Math.ceil((endDay - todayStart) / msPerDay));

  if (daysLeft === 0) {
    return { filter: "live", label: "Finit aujourd'hui" };
  }

  return {
    filter: "live",
    label: `Il reste ${daysLeft} jour${daysLeft === 1 ? "" : "s"}`,
  };
}

function initializeCards() {
  cards.forEach((card) => {
    const badge = card.querySelector("[data-status-badge]");
    const status = getStatusFromDates(card.dataset.start, card.dataset.end);
    const title = card.querySelector("h3")?.textContent || "";
    const prize = card.dataset.prize || "";
    const location = card.dataset.location || "";
    const interest = card.dataset.interest || "";

    card.dataset.status = status.filter;
    if (badge) {
      badge.textContent = status.label;
      // Set dynamic status classes
      badge.classList.remove("upcoming", "live", "ended");
      badge.classList.add(status.filter);
    }

    // Check the location status and flag online cards
    const locStatusEl = card.querySelector(".card-location-status");
    if (locStatusEl) {
      const locText = locStatusEl.textContent.trim().toLowerCase();
      if (locText === "online") {
        card.classList.add("is-online");
      } else {
        card.classList.remove("is-online");
      }
    }

    card.dataset.search = normalizeText(
      [
        card.dataset.keywords,
        title,
        prize,
        location,
        interest,
        card.textContent,
      ].join(" ")
    );
  });
}

function initializeFilters() {
  populateFilterMenu(filterMenus.status, ["live", "upcoming", "ended"], "Tous", titleCase);

  const locations = [...new Set(cards.map((card) => card.dataset.location).filter(Boolean))];
  const interests = [...new Set(cards.map((card) => card.dataset.interest).filter(Boolean))];

  populateFilterMenu(filterMenus.location, locations, "Partout");
  populateFilterMenu(filterMenus.interest, interests, "Tous", titleCase);

  updateFilterUi("status");
  updateFilterUi("location");
  updateFilterUi("interest");
}

function getFilterLabel(filterName, value) {
  if (value === "all") {
    if (filterName === "status") return "Status";
    if (filterName === "location") return "Location";
    if (filterName === "interest") return "Interest";
  }

  // Return only the first word to ensure "only one word on the tab"
  const firstWord = value.split(/[,\s]+/)[0];
  return titleCase(firstWord);
}

function updateFilterUi(filterName) {
  const button = filterButtons[filterName];
  const label = filterValueLabels[filterName];
  const menu = filterMenus[filterName];
  const currentValue = filterState[filterName];

  if (!button || !label || !menu) {
    return;
  }

  label.textContent = getFilterLabel(filterName, currentValue);
  button.setAttribute("aria-expanded", String(menu.classList.contains("is-open")));

  menu.querySelectorAll(".filter-option").forEach((option) => {
    const isSelected = option.dataset.filterValue === currentValue;
    option.classList.toggle("is-selected", isSelected);
    option.setAttribute("aria-selected", String(isSelected));
  });
}

function closeFilterMenu(filterName) {
  const group = document.querySelector(`[data-filter-group="${filterName}"]`);
  const button = filterButtons[filterName];
  const menu = filterMenus[filterName];

  if (!group || !button || !menu) {
    return;
  }

  group.classList.remove("is-open");
  menu.classList.remove("is-open");
  button.setAttribute("aria-expanded", "false");
}

function closeAllFilterMenus() {
  Object.keys(filterMenus).forEach(closeFilterMenu);
}

function openFilterMenu(filterName) {
  const group = document.querySelector(`[data-filter-group="${filterName}"]`);
  const button = filterButtons[filterName];
  const menu = filterMenus[filterName];

  if (!group || !button || !menu) {
    return;
  }

  Object.keys(filterMenus).forEach((name) => {
    if (name !== filterName) {
      closeFilterMenu(name);
    }
  });

  const isOpen = menu.classList.contains("is-open");
  group.classList.toggle("is-open", !isOpen);
  menu.classList.toggle("is-open", !isOpen);
  button.setAttribute("aria-expanded", String(!isOpen));
}

function setFilterValue(filterName, value) {
  filterState[filterName] = value;
  updateFilterUi(filterName);
  applyFilter();
}

function applyFilter() {
  const query = normalizeText(searchInput.value);
  const compactQuery = query.replace(/\s+/g, "");
  const selectedStatus = filterState.status;
  const selectedLocation = normalizeText(filterState.location);
  const selectedInterest = normalizeText(filterState.interest);
  let visibleCount = 0;

  cards.forEach((card) => {
    const haystack = card.dataset.search || "";
    const compactHaystack = haystack.replace(/\s+/g, "");
    const matchesSearch =
      !query || haystack.includes(query) || compactHaystack.includes(compactQuery);
    const matchesStatus = selectedStatus === "all" || card.dataset.status === selectedStatus;
    const matchesLocation =
      selectedLocation === "all" || normalizeText(card.dataset.location).includes(selectedLocation);
    const matchesInterest =
      selectedInterest === "all" ||
      normalizeText(card.dataset.interest).includes(selectedInterest) ||
      selectedInterest.includes(normalizeText(card.dataset.interest));

    const isVisible =
      matchesSearch && matchesStatus && matchesLocation && matchesInterest;

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  resultsCount.textContent = `${visibleCount} hackathon${visibleCount === 1 ? "" : "s"}`;
  emptyState.classList.toggle("is-visible", visibleCount === 0);
}

function handleFilterChipClick(filterName) {
  openFilterMenu(filterName);
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  applyFilter();
});

searchInput.addEventListener("input", applyFilter);

filterGroups.forEach((group) => {
  const filterName = group.dataset.filterGroup;
  const button = filterButtons[filterName];
  const menu = filterMenus[filterName];

  if (!filterName || !button || !menu) {
    return;
  }

  button.addEventListener("click", () => handleFilterChipClick(filterName));

  menu.addEventListener("click", (event) => {
    const option = event.target.closest(".filter-option");
    if (!option) {
      return;
    }

    setFilterValue(filterName, option.dataset.filterValue || "all");
    closeFilterMenu(filterName);
  });
});

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-filter-group]")) {
    return;
  }

  closeAllFilterMenus();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllFilterMenus();
  }
});

initializeCards();
initializeFilters();
applyFilter();
