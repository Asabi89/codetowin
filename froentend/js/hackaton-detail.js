// Multi-screen tab switching engine
const tabLinks = Array.from(document.querySelectorAll(".tab-link"));
const tabScreens = Array.from(document.querySelectorAll(".tab-screen"));

tabLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetTab = link.dataset.tab;

    // Update active links
    tabLinks.forEach(l => l.classList.toggle("active", l === link));

    // Toggle visibility of screen divisions
    tabScreens.forEach(screen => {
      const isTarget = screen.getAttribute("id") === `screen-${targetTab}`;
      screen.classList.toggle("active", isTarget);
    });

    // Smooth scroll to tab bar if scrolled past
    const navOffset = document.getElementById("tab-nav").getBoundingClientRect().top + window.scrollY - 100;
    if (window.scrollY > navOffset) {
      window.scrollTo({
        top: navOffset,
        behavior: "smooth"
      });
    }
  });
});

// FAQ accordion toggle logic
const faqCollapsibles = Array.from(document.querySelectorAll(".faq-collapsible"));
faqCollapsibles.forEach(item => {
  const trigger = item.querySelector(".faq-trigger");
  const details = item.querySelector(".faq-details");

  trigger.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    // Close all FAQ items
    faqCollapsibles.forEach(otherItem => {
      otherItem.classList.remove("is-open");
      otherItem.querySelector(".faq-details").style.maxHeight = null;
    });

    // Toggle clicked item
    if (!isOpen) {
      item.classList.add("is-open");
      details.style.maxHeight = details.scrollHeight + "px";
    }
  });
});

// ==========================================
// PARTICIPANT WORKSPACE STATE CONTROLLER
// ==========================================

const STORAGE_KEY = 'hack_agent_workspace_state';

let hackathonState = {
  registered: false,
  profile: null,
  currentStep: 1,
  projectName: "",
  projectPitch: "",
  thumbnailUrl: "",
  teammates: [],
  detailsAbout: "",
  detailsBuiltWith: "",
  detailsRepo: "",
  detailsDemo: "",
  detailsVideo: "",
  questionMcp: "",
  questionSecurity: "",
  submitted: false,
  previewActive: false
};

let easyMDEInstance = null;
let techList = [];

// Load initial state
function initWorkspace() {
  // Initialize EasyMDE text editor on #project-about-input
  const aboutEl = document.getElementById("project-about-input");
  if (aboutEl) {
    easyMDEInstance = new EasyMDE({
      element: aboutEl,
      spellChecker: false,
      status: false,
      autosave: {
        enabled: false
      },
      placeholder: "Raconte-nous tout ce que tu as fait, comment ça marche...",
      renderingConfig: {
        singleLineBreaks: false
      }
    });

    // Sync changes with state
    easyMDEInstance.codemirror.on("change", () => {
      updateStateField('detailsAbout', easyMDEInstance.value());
    });
  }

  // Setup title edit key listeners
  const titleEditInput = document.getElementById("project-title-edit-input");
  if (titleEditInput) {
    titleEditInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        saveTitleEdit();
      } else if (e.key === "Escape") {
        e.preventDefault();
        cancelTitleEdit();
      }
    });
  }

  // Setup Technology interactive tag input
  const techInput = document.getElementById("project-built-with-input");
  if (techInput) {
    techInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const val = techInput.value;
        if (val.trim()) {
          addTech(val);
          techInput.value = "";
        }
      }
    });

    techInput.addEventListener("blur", () => {
      const val = techInput.value;
      if (val.trim()) {
        addTech(val);
        techInput.value = "";
      }
    });
  }

  const techWrap = document.getElementById("tech-tags-input-wrap");
  if (techWrap && techInput) {
    techWrap.addEventListener("click", () => {
      techInput.focus();
    });
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      hackathonState = JSON.parse(stored);
    } catch(e) {
      console.error("Error loading workspace state", e);
    }
  }
  
  applyRegistrationState();
  renderWorkspace();

  // Check if query parameter specifies a tab to auto-activate
  const params = new URLSearchParams(window.location.search);
  const urlTab = params.get("tab");
  if (urlTab) {
    const tabButton = document.querySelector(`.tab-link[data-tab='${urlTab}']`);
    if (tabButton) {
      tabButton.click();
    }
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(hackathonState));
}

function resetProjectWorkspace() {
  if (confirm("Are you sure you want to reset your project workspace? This will erase all draft details.")) {
    localStorage.removeItem(STORAGE_KEY);
    hackathonState = {
      registered: hackathonState.registered, // Keep registration status
      profile: hackathonState.profile,
      currentStep: 1,
      projectName: "",
      projectPitch: "",
      thumbnailUrl: "",
      teammates: hackathonState.profile ? [{
        name: `${hackathonState.profile.firstName} ${hackathonState.profile.lastName}`,
        avatar: hackathonState.profile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80",
        role: "Team Leader",
        status: "joined"
      }] : [],
      detailsAbout: "",
      detailsBuiltWith: "",
      detailsRepo: "",
      detailsDemo: "",
      detailsVideo: "",
      questionMcp: "",
      questionSecurity: "",
      submitted: false,
      previewActive: false
    };
    saveState();
    
    // Clear inputs on page
    const form = document.getElementById("project-submission-form");
    if (form) form.reset();
    
    const thumbImg = document.getElementById("project-thumbnail-preview-img");
    if (thumbImg) thumbImg.style.display = "none";

    if (easyMDEInstance) {
      easyMDEInstance.value("");
    }
    techList = [];
    renderTechTags();
    
    renderWorkspace();
  }
}

function applyRegistrationState() {
  const joinBtn = document.querySelector(".btn-primary[onclick='openProfileModal()']");
  const quickInfoJoinBtn = document.querySelector(".btn-primary[href='#register']");
  
  if (hackathonState.registered) {
    // Hide unregistered onboarding state
    const unregBlock = document.getElementById("project-unregistered-state");
    if (unregBlock) unregBlock.style.display = "none";
    
    // Show active workspace
    const regBlock = document.getElementById("project-registered-state");
    if (regBlock) regBlock.style.display = "flex";
    
    // Sync quick info buttons
    if (quickInfoJoinBtn) {
      quickInfoJoinBtn.innerText = "Enter Project Workspace";
      quickInfoJoinBtn.removeAttribute("href");
      quickInfoJoinBtn.onclick = (e) => {
        e.preventDefault();
        const projectTab = document.querySelector(".tab-link[data-tab='my-project']");
        if (projectTab) projectTab.click();
      };
    }
  } else {
    // Show unregistered onboarding state
    const unregBlock = document.getElementById("project-unregistered-state");
    if (unregBlock) unregBlock.style.display = "block";
    
    // Hide active workspace
    const regBlock = document.getElementById("project-registered-state");
    if (regBlock) regBlock.style.display = "none";

    if (quickInfoJoinBtn) {
      quickInfoJoinBtn.innerText = "Join this hackaton";
      quickInfoJoinBtn.setAttribute("href", "#register");
      quickInfoJoinBtn.onclick = (e) => {
        e.preventDefault();
        openProfileModal();
      };
    }
  }
}

// Profile Setup Onboarding redirection
function openProfileModal() {
  window.location.href = "profile.html";
}

// Project Wizard Interactions
function triggerThumbnailUpload() {
  document.getElementById("project-thumbnail-input").click();
}

function previewThumbnailPhoto(event) {
  const file = event.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    const previewImg = document.getElementById("project-thumbnail-preview-img");
    previewImg.src = url;
    previewImg.style.display = "block";
    
    hackathonState.thumbnailUrl = url;
    saveState();
  }
}

function updateStateField(fieldName, value) {
  hackathonState[fieldName] = value;
  saveState();
  
  // Update live elements
  if (fieldName === 'projectName') {
    const display = document.getElementById("workspace-project-title-display");
    if (display) display.innerText = value || "Untitled Project";
  }
}

// Title Editing actions
function startEditingTitle() {
  const displayContainer = document.getElementById("project-title-display-container");
  const editContainer = document.getElementById("project-title-edit-container");
  const editInput = document.getElementById("project-title-edit-input");

  if (displayContainer && editContainer && editInput) {
    editInput.value = hackathonState.projectName || "";
    displayContainer.style.display = "none";
    editContainer.style.display = "flex";
    editInput.focus();
  }
}

function saveTitleEdit() {
  const displayContainer = document.getElementById("project-title-display-container");
  const editContainer = document.getElementById("project-title-edit-container");
  const editInput = document.getElementById("project-title-edit-input");

  if (displayContainer && editContainer && editInput) {
    const val = editInput.value.trim();
    updateStateField('projectName', val);
    
    // Also sync with step 1 input if it exists
    const nameInput = document.getElementById("project-name-input");
    if (nameInput) {
      nameInput.value = val;
    }

    displayContainer.style.display = "flex";
    editContainer.style.display = "none";
  }
}

function cancelTitleEdit() {
  const displayContainer = document.getElementById("project-title-display-container");
  const editContainer = document.getElementById("project-title-edit-container");

  if (displayContainer && editContainer) {
    displayContainer.style.display = "flex";
    editContainer.style.display = "none";
  }
}

// Technologies tags rendering & interactions
function renderTechTags() {
  const wrap = document.getElementById("tech-tags-input-wrap");
  const textInput = document.getElementById("project-built-with-input");
  const hiddenInput = document.getElementById("project-built-with");
  if (!wrap || !textInput || !hiddenInput) return;

  // Clear existing tags
  const existingTags = wrap.querySelectorAll(".tag-pill");
  existingTags.forEach(t => t.remove());

  techList.forEach((tech, index) => {
    const pill = document.createElement("div");
    pill.className = "tag-pill";
    pill.innerHTML = `
      <span>${escapeHTML(tech)}</span>
      <button type="button" class="tag-remove-btn" onclick="removeTech(${index})">&times;</button>
    `;
    wrap.insertBefore(pill, textInput);
  });

  hiddenInput.value = techList.join(", ");
  updateStateField('detailsBuiltWith', hiddenInput.value);
}

function addTech(techName) {
  const cleaned = techName.trim().replace(/,+/g, "");
  if (cleaned && !techList.includes(cleaned)) {
    techList.push(cleaned);
    renderTechTags();
  }
}

function removeTech(index) {
  techList.splice(index, 1);
  renderTechTags();
}

function escapeHTML(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function renderWorkspace() {
  if (!hackathonState.registered) return;

  // Restore input values
  document.getElementById("project-name-input").value = hackathonState.projectName || "";
  document.getElementById("project-pitch-input").value = hackathonState.projectPitch || "";
  document.getElementById("project-built-with").value = hackathonState.detailsBuiltWith || "";
  document.getElementById("project-repo-link").value = hackathonState.detailsRepo || "";
  document.getElementById("project-demo-link").value = hackathonState.detailsDemo || "";
  document.getElementById("project-video-link").value = hackathonState.detailsVideo || "";
  document.getElementById("question-mcp-input").value = hackathonState.questionMcp || "";
  document.getElementById("question-security-input").value = hackathonState.questionSecurity || "";

  // Set title display
  document.getElementById("workspace-project-title-display").innerText = hackathonState.projectName || "Untitled Project";

  // Restore EasyMDE content
  if (easyMDEInstance) {
    easyMDEInstance.value(hackathonState.detailsAbout || "");
  }

  // Restore technology tags
  if (hackathonState.detailsBuiltWith) {
    techList = hackathonState.detailsBuiltWith.split(",").map(t => t.trim()).filter(Boolean);
  } else {
    techList = [];
  }
  renderTechTags();

  // Restore thumbnail if exists
  const previewImg = document.getElementById("project-thumbnail-preview-img");
  if (hackathonState.thumbnailUrl) {
    previewImg.src = hackathonState.thumbnailUrl;
    previewImg.style.display = "block";
  } else {
    previewImg.style.display = "none";
  }

  // Render teammates
  renderTeammatesList();

  // Restore step
  jumpToWizardStep(hackathonState.currentStep);

  // Update status badge
  const badge = document.getElementById("project-status-badge");
  if (hackathonState.submitted) {
    badge.innerText = "Submitted";
    badge.className = "badge-submitted";
  } else {
    badge.innerText = "Draft";
    badge.className = "badge-draft";
  }
}

function jumpToWizardStep(stepNumber) {
  if (!hackathonState.registered) return;
  
  hackathonState.currentStep = stepNumber;
  saveState();

  // Update step panels active state
  for (let i = 1; i <= 5; i++) {
    const panel = document.getElementById(`wizard-step-panel-${i}`);
    const indicator = document.getElementById(`step-indicator-${i}`);
    
    if (panel) {
      panel.classList.toggle("is-active", i === stepNumber);
    }
    if (indicator) {
      indicator.classList.toggle("is-active", i === stepNumber);
      indicator.classList.toggle("is-completed", i < stepNumber);
    }
  }

  // Update header progress text
  const progressPercent = (stepNumber - 1) * 20;
  const statusText = hackathonState.submitted ? "Submitted - 100% Completed" : `Step ${stepNumber}/5 - ${progressPercent}% Completed`;
  document.getElementById("project-progress-text-display").innerText = statusText;

  // Render step 5 summaries
  if (stepNumber === 5) {
    document.getElementById("summary-project-name").innerText = hackathonState.projectName || "Untitled Project";
    document.getElementById("summary-team-status").innerText = `${hackathonState.teammates.length} Builders`;
    
    const storyValid = hackathonState.detailsAbout && hackathonState.detailsAbout.trim().length > 0;
    const summaryStory = document.getElementById("summary-story-status");
    if (storyValid) {
      summaryStory.innerText = "Complete";
      summaryStory.style.color = "var(--green)";
    } else {
      summaryStory.innerText = "Incomplete Details";
      summaryStory.style.color = "#dc2626";
    }
  }
}

function proceedToWizardStep(stepNumber) {
  jumpToWizardStep(stepNumber);
}

// Teammates Invite & List Logic
function renderTeammatesList() {
  const container = document.getElementById("teammates-list-container");
  if (!container) return;
  
  container.innerHTML = "";

  hackathonState.teammates.forEach(m => {
    const row = document.createElement("div");
    row.className = "teammate-row";
    
    const displayStatus = m.status === 'joined' ? 'Joined' : (m.status === 'pending' ? 'Pending' : 'Invited');
    const statusClass = m.status === 'joined' ? 'status-joined' : 'status-pending';

    row.innerHTML = `
      <div class="teammate-info">
        <img src="${m.avatar}" class="teammate-avatar" alt="${m.name}" />
        <div class="teammate-identity">
          <span class="teammate-name">${m.name}</span>
          <span class="teammate-role-badge">${m.role}</span>
        </div>
      </div>
      <span class="teammate-status-badge ${statusClass}">${displayStatus}</span>
    `;
    container.appendChild(row);
  });
}

function sendTeammateInvite() {
  const emailInput = document.getElementById("invite-email-input");
  const email = emailInput.value.trim();
  
  if (email && email.includes("@")) {
    // Extract name from email as mock
    const name = email.split("@")[0].replace(/[._-]/g, ' ');
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    
    hackathonState.teammates.push({
      name: formattedName,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80`,
      role: "Developer",
      status: "pending"
    });
    
    saveState();
    renderTeammatesList();
    emailInput.value = "";
    alert(`Invitation email successfully sent to ${email}!`);
  } else {
    alert("Please enter a valid email address.");
  }
}

// Copy Link helper with selection fallback
function copySecretInviteLink(btn) {
  const urlText = document.getElementById("workspace-invite-url").innerText;
  
  function selectAndCopy() {
    const input = document.createElement("input");
    input.value = urlText;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    
    const originalText = btn.innerText;
    btn.innerText = "Copied!";
    setTimeout(() => {
      btn.innerText = originalText;
    }, 2000);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(urlText).then(() => {
      const originalText = btn.innerText;
      btn.innerText = "Copied!";
      setTimeout(() => {
        btn.innerText = originalText;
      }, 2000);
    }).catch(() => {
      selectAndCopy();
    });
  } else {
    selectAndCopy();
  }
}

// Preview toggling & dynamic render bindings
function toggleProjectPreview() {
  hackathonState.previewActive = !hackathonState.previewActive;
  saveState();

  const editorNode = document.getElementById("workspace-editor-flow");
  const previewNode = document.getElementById("workspace-preview-pane");
  const toggleBtn = document.getElementById("btn-project-preview-toggle");

  if (hackathonState.previewActive) {
    editorNode.style.display = "none";
    previewNode.style.display = "flex";
    toggleBtn.innerText = "Edit Project";
    
    // Populate live preview nodes
    document.getElementById("preview-title-val").innerText = hackathonState.projectName || "Untitled Project";
    document.getElementById("preview-pitch-val").innerText = hackathonState.projectPitch || "Short elevator pitch will render here.";
    
    // Render About the Project Markdown content
    const aboutVal = document.getElementById("preview-about-val");
    if (aboutVal) {
      aboutVal.innerHTML = hackathonState.detailsAbout ? marked.parse(hackathonState.detailsAbout) : "No details provided yet.";
    }

    // Tech list display
    const techListDisplay = document.getElementById("preview-tech-list-display");
    techListDisplay.innerHTML = "";
    if (hackathonState.detailsBuiltWith) {
      hackathonState.detailsBuiltWith.split(",").forEach(t => {
        const cleaned = t.trim();
        if (cleaned) {
          const span = document.createElement("span");
          span.className = "preview-tech-tag";
          span.innerText = cleaned;
          techListDisplay.appendChild(span);
        }
      });
    } else {
      techListDisplay.innerHTML = `<span style="font-size:0.85rem; color:var(--text-muted);">No tech stack specified.</span>`;
    }

    // Links display
    const repoLink = document.getElementById("preview-repo-link-display");
    const demoLink = document.getElementById("preview-demo-link-display");
    const videoLink = document.getElementById("preview-video-link-display");
    const noLinks = document.getElementById("preview-no-links-display");

    let hasLinks = false;
    if (hackathonState.detailsRepo) {
      repoLink.href = hackathonState.detailsRepo;
      repoLink.style.display = "flex";
      hasLinks = true;
    } else {
      repoLink.style.display = "none";
    }

    if (hackathonState.detailsDemo) {
      demoLink.href = hackathonState.detailsDemo;
      demoLink.style.display = "flex";
      hasLinks = true;
    } else {
      demoLink.style.display = "none";
    }

    if (hackathonState.detailsVideo) {
      videoLink.href = hackathonState.detailsVideo;
      videoLink.style.display = "flex";
      hasLinks = true;
    } else {
      videoLink.style.display = "none";
    }

    noLinks.style.display = hasLinks ? "none" : "block";

    // Teammates sidebar display
    const teammatesDisplay = document.getElementById("preview-teammates-display");
    teammatesDisplay.innerHTML = "";
    hackathonState.teammates.forEach(m => {
      const card = document.createElement("div");
      card.className = "preview-teammate-card";
      card.innerHTML = `
        <img src="${m.avatar}" class="preview-teammate-avatar" alt="${m.name}" />
        <div class="preview-teammate-info">
          <span class="preview-teammate-name">${m.name}</span>
          <span class="preview-teammate-role">${m.role}</span>
        </div>
      `;
      teammatesDisplay.appendChild(card);
    });

    // Cover Image Display
    const cover = document.getElementById("preview-cover-display");
    if (hackathonState.thumbnailUrl) {
      cover.style.background = `url(${hackathonState.thumbnailUrl}) center/cover no-repeat`;
      cover.style.color = "transparent";
      cover.innerText = "";
    } else {
      cover.style.background = `linear-gradient(135deg, var(--green-light) 0%, #d1fae5 100%)`;
      cover.style.color = "var(--green-dark)";
      cover.innerText = hackathonState.projectName || "Project Draft";
    }

  } else {
    editorNode.style.display = "block";
    previewNode.style.display = "none";
    toggleBtn.innerText = "Preview Project";
  }
}

// Submit project action
function submitProjectSubmission() {
  const agreeGuidelines = document.getElementById("agree-guidelines").checked;
  const agreeTerms = document.getElementById("agree-terms").checked;

  if (!agreeGuidelines || !agreeTerms) {
    alert("Please check both checkboxes to agree to the code guidelines and terms of service before submitting.");
    return;
  }

  hackathonState.submitted = true;
  saveState();

  const badge = document.getElementById("project-status-badge");
  if (badge) {
    badge.innerText = "Submitted";
    badge.className = "badge-submitted";
  }

  // Update progress text
  document.getElementById("project-progress-text-display").innerText = "Submitted - 100% Completed";

  alert("Congratulations! Your project has been successfully submitted to the Google Cloud Rapid Agent Hackathon. You can still modify details until the deadline.");
  
  // Show project in preview mode after submit
  if (!hackathonState.previewActive) {
    toggleProjectPreview();
  }
}

// ===== AUTH HEADER LOGIC =====
function loadHdAuthHeader() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;
  try {
    const state = JSON.parse(stored);
    if (state.registered && state.profile) {
      const p = state.profile;
      const fullName = `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'User';
      const avatar = p.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80';
      const username = `@${(p.firstName || 'user').toLowerCase()}${(p.lastName || '').toLowerCase()}`;
      document.getElementById('hd-header-avatar').src = avatar;
      document.getElementById('hd-header-name').textContent = p.firstName || 'User';
      document.getElementById('hd-dd-avatar').src = avatar;
      document.getElementById('hd-dd-name').textContent = fullName;
      document.getElementById('hd-dd-email').textContent = username;
    }
  } catch(e) { console.error('Error loading auth header', e); }
}

function toggleHdAvatarDropdown() {
  const pill = document.getElementById('hd-avatar-pill');
  const dropdown = document.getElementById('hd-avatar-dropdown');
  const isOpen = dropdown.classList.contains('is-open');
  if (isOpen) {
    dropdown.classList.remove('is-open');
    pill.classList.remove('is-open');
  } else {
    dropdown.classList.add('is-open');
    pill.classList.add('is-open');
  }
}

document.addEventListener('click', (e) => {
  const wrap = document.querySelector('.avatar-pill-wrap');
  if (wrap && !wrap.contains(e.target)) {
    const dd = document.getElementById('hd-avatar-dropdown');
    const pill = document.getElementById('hd-avatar-pill');
    if (dd) dd.classList.remove('is-open');
    if (pill) pill.classList.remove('is-open');
  }
});

function signOutHd() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = 'home.html';
}

// Initialize
window.addEventListener("DOMContentLoaded", () => {
  loadHdAuthHeader();
  initWorkspace();
});
