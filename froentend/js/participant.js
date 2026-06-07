const STORAGE_KEY = 'hack_agent_workspace_state';

// ===== HEADER LOGIC =====
function loadAuthHeader() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;
  try {
    const state = JSON.parse(stored);
    if (state.registered && state.profile) {
      const p = state.profile;
      const fullName = `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'User';
      const avatar = p.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80';
      const username = `@${(p.firstName || 'user').toLowerCase()}${(p.lastName || '').toLowerCase()}`;

      document.getElementById('header-avatar-img').src = avatar;
      document.getElementById('header-avatar-name').textContent = p.firstName || 'User';
      document.getElementById('dropdown-avatar-img').src = avatar;
      document.getElementById('dropdown-user-name').textContent = fullName;
      document.getElementById('dropdown-user-email').textContent = username;
    }
  } catch(e) {
    console.error('Error loading auth header', e);
  }
}

function toggleAvatarDropdown() {
  const pill = document.getElementById('avatar-pill-toggle');
  const dropdown = document.getElementById('avatar-dropdown');
  const isOpen = dropdown.classList.contains('is-open');

  if (isOpen) {
    dropdown.classList.remove('is-open');
    pill.classList.remove('is-open');
  } else {
    dropdown.classList.add('is-open');
    pill.classList.add('is-open');
  }
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
  const wrap = document.querySelector('.avatar-pill-wrap');
  if (wrap && !wrap.contains(e.target)) {
    document.getElementById('avatar-dropdown').classList.remove('is-open');
    document.getElementById('avatar-pill-toggle').classList.remove('is-open');
  }
});

function openSearch() {
  alert('Search functionality coming soon!');
}

function signOut() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = 'home.html';
}

// ===== PROFILE PAGE DATA =====
function loadProfilePage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    window.location.href = 'home.html';
    return;
  }

  try {
    const state = JSON.parse(stored);
    if (!state.registered || !state.profile) {
      window.location.href = 'home.html';
      return;
    }

    const p = state.profile;
    const fullName = `${p.firstName || ''} ${p.lastName || ''}`.trim();
    const username = `@${(p.firstName || '').toLowerCase()}${(p.lastName || '').toLowerCase()}`;
    const avatar = p.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80';

    // Identity
    document.getElementById('profile-page-avatar').src = avatar;
    document.getElementById('profile-fullname').textContent = fullName || 'Participant Name';
    document.getElementById('profile-username').textContent = username;
    document.title = `${fullName} - CodeToWin Profile`;

    // Role badge (use title if available)
    if (p.title) {
      document.getElementById('profile-role-badge').innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6-5 6 5 6"></path><path d="m15 6 5 6-5 6"></path></svg>
        ${escapeHTML(p.title)}
      `;
    }

    // Location
    const locParts = [p.city, p.country].filter(Boolean);
    if (locParts.length) {
      document.getElementById('meta-location-text').textContent = locParts.join(', ');
    }

    // Social links
    if (p.github) {
      const el = document.getElementById('meta-github');
      el.style.display = 'inline-flex';
      el.href = p.github;
    }
    if (p.linkedin) {
      const el = document.getElementById('meta-linkedin');
      el.style.display = 'inline-flex';
      el.href = p.linkedin;
    }
    if (p.website) {
      const el = document.getElementById('meta-website');
      el.style.display = 'inline-flex';
      el.href = p.website;
    }

    // Bio / About
    if (p.about) {
      document.getElementById('profile-bio-text').textContent = p.about;
    } else if (p.bio) {
      document.getElementById('profile-bio-text').textContent = p.bio;
    }

    // Skills
    if (p.skills) {
      const skillsList = p.skills.split(',').map(s => s.trim()).filter(Boolean);
      const container = document.getElementById('profile-skills-list');
      container.innerHTML = skillsList.map(s =>
        `<span class="skill-pill">${escapeHTML(s)}</span>`
      ).join('');
    }

    // Interests
    if (p.interests) {
      const interestsList = p.interests.split(',').map(s => s.trim()).filter(Boolean);
      const container = document.getElementById('profile-interests-list');
      container.innerHTML = interestsList.map(s =>
        `<span class="interest-pill">${escapeHTML(s)}</span>`
      ).join('');
    }

    // In-progress projects
    const projectName = state.projectName || 'Untitled Project';
    const isSubmitted = state.submitted;

    if (!isSubmitted) {
      document.getElementById('in-progress-projects-grid').innerHTML = `
        <div class="project-card">
          <div class="project-card-thumb">${escapeHTML(projectName.charAt(0).toUpperCase())}</div>
          <div class="project-card-body">
            <span class="project-card-status status-draft">Draft</span>
            <div class="project-card-title">${escapeHTML(projectName)}</div>
            <div class="project-card-desc">In progress — continue working on your submission</div>
            <div class="project-card-footer">
              <span class="project-likes">Step ${state.currentStep || 1}/5</span>
              <a href="hackaton-detail.html?tab=my-project" style="font-size:0.82rem; font-weight:700; color:var(--green); text-decoration:none;">Continue →</a>
            </div>
          </div>
        </div>
      `;
      document.getElementById('stat-projects').textContent = '1';
    } else {
      document.getElementById('in-progress-section').style.display = 'none';
      // Show in portfolio
      document.getElementById('portfolio-projects-grid').innerHTML = `
        <div class="project-card">
          <div class="project-card-thumb">${escapeHTML(projectName.charAt(0).toUpperCase())}</div>
          <div class="project-card-body">
            <span class="project-card-status status-submitted">Submitted</span>
            <div class="project-card-title">${escapeHTML(projectName)}</div>
            <div class="project-card-desc">${escapeHTML(state.projectPitch || 'A project submitted to the Google Cloud Rapid Agent Hackathon')}</div>
            <div class="project-card-footer">
              <span class="project-likes">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path></svg>
                0
              </span>
              <a href="hackaton-detail.html?tab=my-project" style="font-size:0.82rem; font-weight:700; color:var(--green); text-decoration:none;">View →</a>
            </div>
          </div>
        </div>
      `;
      document.getElementById('stat-projects').textContent = '1';
    }

    // Empty portfolio fallback
    if (!isSubmitted) {
      document.getElementById('portfolio-projects-grid').innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <div class="empty-state-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
          </div>
          <h3>No Public Projects Yet</h3>
          <p>Submit your first hackathon project to build your portfolio.</p>
        </div>
      `;
    }

    // Hackathons tab
    document.getElementById('hackathons-list').innerHTML = `
      <div class="hackathon-entry">
        <div class="hackathon-entry-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6-5 6 5 6"></path><path d="m15 6 5 6-5 6"></path></svg>
        </div>
        <div class="hackathon-entry-info">
          <div class="hackathon-entry-title">Google Cloud Rapid Agent Hackathon</div>
          <div class="hackathon-entry-meta">Joined · Online · Jun 2026</div>
        </div>
        <span class="hackathon-entry-badge badge-joined">Joined</span>
      </div>
    `;

    // Badges tab
    document.getElementById('badges-grid').innerHTML = `
      <div class="badge-card">
        <div class="badge-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22,4 12,14.01 9,11.01"></polyline></svg>
        </div>
        <div class="badge-title">Welcome to CodeToWin</div>
        <div class="badge-desc">Completed profile setup</div>
        <div class="badge-earned-date">🏆 Earned</div>
      </div>
      <div class="badge-card locked">
        <div class="badge-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
        </div>
        <div class="badge-title">First Project Submitted</div>
        <div class="badge-desc">Submit your first hackathon project</div>
        <div class="badge-progress-bar"><div class="badge-progress-fill" style="width:${isSubmitted ? '100' : '0'}%"></div></div>
      </div>
      <div class="badge-card locked">
        <div class="badge-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"></circle><path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"></path></svg>
        </div>
        <div class="badge-title">Team Player</div>
        <div class="badge-desc">Complete a project with a team of 3+</div>
        <div class="badge-progress-bar"><div class="badge-progress-fill" style="width:0%"></div></div>
      </div>
      <div class="badge-card locked">
        <div class="badge-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        </div>
        <div class="badge-title">Hackathon Winner</div>
        <div class="badge-desc">Win a prize in any hackathon</div>
        <div class="badge-progress-bar"><div class="badge-progress-fill" style="width:0%"></div></div>
      </div>
      <div class="badge-card locked">
        <div class="badge-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        </div>
        <div class="badge-title">5 Hackathons</div>
        <div class="badge-desc">Join 5 hackathons on CodeToWin</div>
        <div class="badge-progress-bar"><div class="badge-progress-fill" style="width:20%"></div></div>
      </div>
      <div class="badge-card locked">
        <div class="badge-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="11" height="16" rx="2"></rect><path d="M7 8h5M7 11h5M7 14h4"></path><circle cx="17.2" cy="15.2" r="2.3"></circle><path d="m16.3 17.1-1 2.9 1.8-1 1.8 1-1-2.9"></path></svg>
        </div>
        <div class="badge-title">Certified Builder</div>
        <div class="badge-desc">Earn your first certificate</div>
        <div class="badge-progress-bar"><div class="badge-progress-fill" style="width:0%"></div></div>
      </div>
    `;

    // Activity tab
    document.getElementById('activity-timeline').innerHTML = `
      <div class="activity-item">
        <div class="activity-dot"></div>
        <div class="activity-text">Joined <strong>Google Cloud Rapid Agent Hackathon</strong></div>
        <div class="activity-time">Just now</div>
      </div>
      <div class="activity-item">
        <div class="activity-dot"></div>
        <div class="activity-text">Completed profile setup</div>
        <div class="activity-time">Just now</div>
      </div>
      <div class="activity-item">
        <div class="activity-dot"></div>
        <div class="activity-text">Created account on <strong>CodeToWin</strong></div>
        <div class="activity-time">Today</div>
      </div>
    `;

  } catch(e) {
    console.error('Error loading profile', e);
  }
}

// ===== TABS =====
function switchProfileTab(tabId) {
  document.querySelectorAll('.profile-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.profile-tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `tab-${tabId}`);
  });
}

// ===== UTILS =====
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
  loadAuthHeader();
  loadProfilePage();
});
