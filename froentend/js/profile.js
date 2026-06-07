const STORAGE_KEY = 'hack_agent_workspace_state';
let hackathonState = {
  registered: false,
  profile: null,
  currentStep: 1,
  projectName: "",
  projectPitch: "",
  projectTrack: "MongoDB Track",
  thumbnailUrl: "",
  teammates: [],
  detailsProblem: "",
  detailsSolution: "",
  detailsTech: "",
  detailsChallenges: "",
  detailsBuiltWith: "",
  detailsRepo: "",
  detailsDemo: "",
  detailsVideo: "",
  questionMcp: "",
  questionSecurity: "",
  submitted: false,
  previewActive: false
};

let skillsList = [];
let interestsList = [];

// Load existing state from localStorage to pre-fill the form
function loadProfileForm() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      hackathonState = JSON.parse(stored);
      if (hackathonState.profile) {
        const p = hackathonState.profile;
        document.getElementById("profile-first-name").value = p.firstName || "";
        document.getElementById("profile-last-name").value = p.lastName || "";
        document.getElementById("profile-title").value = p.title || "";
        document.getElementById("profile-about").value = p.about || "";
        document.getElementById("profile-bio").value = p.bio || "";
        document.getElementById("profile-city").value = p.city || "";
        document.getElementById("profile-country").value = p.country || "";
        document.getElementById("profile-github").value = p.github || "";
        document.getElementById("profile-linkedin").value = p.linkedin || "";
        document.getElementById("profile-website").value = p.website || "";
        if (p.avatar) {
          document.getElementById("profile-avatar-preview").src = p.avatar;
          hackathonState.tempAvatarUrl = p.avatar;
        }

        // Load skills into tag elements
        if (p.skills) {
          skillsList = p.skills.split(",").map(s => s.trim()).filter(Boolean);
          renderSkillsTags();
        }

        // Load interests into tag elements
        if (p.interests) {
          interestsList = p.interests.split(",").map(s => s.trim()).filter(Boolean);
          renderInterestsTags();
        }
      }
    } catch(e) {
      console.error("Error loading profile state", e);
    }
  }
}

function triggerProfilePhotoUpload() {
  document.getElementById("profile-photo-input").click();
}

function previewProfilePhoto(event) {
  const file = event.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    document.getElementById("profile-avatar-preview").src = url;
    hackathonState.tempAvatarUrl = url;
  }
}

// Skills Tag logic
function renderSkillsTags() {
  const wrap = document.getElementById("tags-input-wrap");
  const textInput = document.getElementById("profile-skills-input");
  const hiddenInput = document.getElementById("profile-skills");

  // Clear existing tags
  const existingTags = wrap.querySelectorAll(".tag-pill");
  existingTags.forEach(t => t.remove());

  skillsList.forEach((skill, index) => {
    const pill = document.createElement("div");
    pill.className = "tag-pill";
    pill.innerHTML = `
      <span>${escapeHTML(skill)}</span>
      <button type="button" class="tag-remove-btn" onclick="removeSkill(${index})">&times;</button>
    `;
    wrap.insertBefore(pill, textInput);
  });

  hiddenInput.value = skillsList.join(", ");
}

function addSkill(skillName) {
  const cleaned = skillName.trim().replace(/,+/g, "");
  if (cleaned && !skillsList.includes(cleaned)) {
    skillsList.push(cleaned);
    renderSkillsTags();
  }
}

function removeSkill(index) {
  skillsList.splice(index, 1);
  renderSkillsTags();
}

function escapeHTML(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// Interests Tag logic
function renderInterestsTags() {
  const wrap = document.getElementById("interests-input-wrap");
  const textInput = document.getElementById("profile-interests-input");
  const hiddenInput = document.getElementById("profile-interests");

  const existingTags = wrap.querySelectorAll(".tag-pill");
  existingTags.forEach(t => t.remove());

  interestsList.forEach((interest, index) => {
    const pill = document.createElement("div");
    pill.className = "tag-pill";
    pill.style.background = "var(--bg-subtle)";
    pill.style.color = "var(--text-muted)";
    pill.style.border = "1px solid var(--line)";
    pill.innerHTML = `
      <span>${escapeHTML(interest)}</span>
      <button type="button" class="tag-remove-btn" style="color:var(--text-muted)" onclick="removeInterest(${index})">&times;</button>
    `;
    wrap.insertBefore(pill, textInput);
  });

  hiddenInput.value = interestsList.join(", ");
}

function addInterest(name) {
  const cleaned = name.trim().replace(/,+/g, "");
  if (cleaned && !interestsList.includes(cleaned)) {
    interestsList.push(cleaned);
    renderInterestsTags();
  }
}

function removeInterest(index) {
  interestsList.splice(index, 1);
  renderInterestsTags();
}

function saveProfile(event) {
  event.preventDefault();

  const firstName = document.getElementById("profile-first-name").value;
  const lastName = document.getElementById("profile-last-name").value;
  const bio = document.getElementById("profile-bio").value;
  const skills = document.getElementById("profile-skills").value;
  const city = document.getElementById("profile-city").value;
  const country = document.getElementById("profile-country").value;
  const github = document.getElementById("profile-github").value;
  const linkedin = document.getElementById("profile-linkedin").value;
  const website = document.getElementById("profile-website").value;
  const avatar = hackathonState.tempAvatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80";

  const title = document.getElementById("profile-title").value;
  const about = document.getElementById("profile-about").value;
  const interests = document.getElementById("profile-interests").value;

  hackathonState.registered = true;
  hackathonState.profile = {
    firstName,
    lastName,
    title,
    about,
    bio,
    skills,
    interests,
    city,
    country,
    github,
    linkedin,
    website,
    avatar
  };

  // Initialize teammates listing
  if (!hackathonState.teammates || hackathonState.teammates.length === 0) {
    hackathonState.teammates = [
      {
        name: `${firstName} ${lastName}`,
        avatar: avatar,
        role: "Team Leader",
        status: "joined"
      },
      {
        name: "Elena Rostova",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&h=80&q=80",
        role: "Developer",
        status: "pending"
      }
    ];
  } else {
    // Update Team Leader profile name & avatar if team exists
    const leader = hackathonState.teammates.find(t => t.role === "Team Leader");
    if (leader) {
      leader.name = `${firstName} ${lastName}`;
      leader.avatar = avatar;
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(hackathonState));
  
  // Redirect to detail page with tab=my-project URL param to auto-switch tabs
  window.location.href = "hackaton-detail.html?tab=my-project";
}

function cancelProfile() {
  window.location.href = "hackaton-detail.html";
}

// ===== AUTH HEADER LOGIC =====
function loadPfAuthHeader() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;
  try {
    const state = JSON.parse(stored);
    if (state.registered && state.profile) {
      const p = state.profile;
      const fullName = `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'User';
      const avatar = p.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80';
      const username = `@${(p.firstName || 'user').toLowerCase()}${(p.lastName || '').toLowerCase()}`;
      document.getElementById('pf-header-avatar').src = avatar;
      document.getElementById('pf-header-name').textContent = p.firstName || 'User';
      document.getElementById('pf-dd-avatar').src = avatar;
      document.getElementById('pf-dd-name').textContent = fullName;
      document.getElementById('pf-dd-email').textContent = username;
    }
  } catch(e) { console.error('Error loading auth header', e); }
}

function togglePfDropdown() {
  const pill = document.getElementById('pf-avatar-pill');
  const dd = document.getElementById('pf-avatar-dropdown');
  const isOpen = dd.classList.contains('is-open');
  dd.classList.toggle('is-open', !isOpen);
  pill.classList.toggle('is-open', !isOpen);
}

document.addEventListener('click', (e) => {
  const wrap = document.querySelector('.avatar-pill-wrap');
  if (wrap && !wrap.contains(e.target)) {
    const dd = document.getElementById('pf-avatar-dropdown');
    const pill = document.getElementById('pf-avatar-pill');
    if (dd) dd.classList.remove('is-open');
    if (pill) pill.classList.remove('is-open');
  }
});

function signOutPf() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = 'home.html';
}

// Initialize listeners
window.addEventListener("DOMContentLoaded", () => {
  loadPfAuthHeader();
  loadProfileForm();

  const skillsInput = document.getElementById("profile-skills-input");
  
  // Listen for Space or Enter to append tags
  skillsInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const val = skillsInput.value;
      if (val.trim()) {
        addSkill(val);
        skillsInput.value = "";
      }
    }
  });

  // Add tag on input blur
  skillsInput.addEventListener("blur", () => {
    const val = skillsInput.value;
    if (val.trim()) {
      addSkill(val);
      skillsInput.value = "";
    }
  });

  // Let clicking the wrapper focus the actual text input box
  document.getElementById("tags-input-wrap").addEventListener("click", () => {
    skillsInput.focus();
  });

  // Interests input listeners
  const interestsInput = document.getElementById("profile-interests-input");

  interestsInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const val = interestsInput.value;
      if (val.trim()) {
        addInterest(val);
        interestsInput.value = "";
      }
    }
  });

  interestsInput.addEventListener("blur", () => {
    const val = interestsInput.value;
    if (val.trim()) {
      addInterest(val);
      interestsInput.value = "";
    }
  });

  document.getElementById("interests-input-wrap").addEventListener("click", () => {
    interestsInput.focus();
  });
});
