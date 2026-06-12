import React, { useState } from 'react';
import { useToast } from '../../../../context/ToastContext';

export default function TeamInvitePanel({ workspaceState, updateWorkspaceState, handleJumpToStep }) {
  const [inviteEmail, setInviteEmail] = useState('');
  const { showToast } = useToast();

  const handleSendInvite = () => {
    if (inviteEmail && inviteEmail.includes('@')) {
      const mockName = inviteEmail.split('@')[0].replace(/[._-]/g, ' ');
      const formattedName = mockName.charAt(0).toUpperCase() + mockName.slice(1);

      const updatedTeammates = [
        ...(workspaceState.teammates || []),
        {
          name: formattedName,
          avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80`,
          role: 'Developer',
          status: 'pending'
        }
      ];

      updateWorkspaceState({ teammates: updatedTeammates });
      setInviteEmail('');
      showToast(`Invitation email successfully sent to ${inviteEmail}!`, 'success');
    } else {
      showToast('Veuillez entrer une adresse email valide.', 'warning');
    }
  };

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText('https://codetowin.org/hackathon/google-cloud-rapid-agent/invite/a29df83c');
    showToast("Lien d'invitation copié !", 'success');
  };

  return (
    <div className="wizard-step-panel is-active">
      <div className="step-pane-header">
        <h3 className="step-pane-title">Gérer l'équipe</h3>
        <p className="step-pane-desc">Ajoute tes potes par email ou via un lien secret magique.</p>
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Inviter par email</label>
          <div className="invite-input-row">
            <input
              type="email"
              className="form-input"
              placeholder="pote@superdev.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <button type="button" className="btn-action-primary invite-btn" onClick={handleSendInvite}>Inviter</button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Le lien secret</label>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
            Envoie ce lien à tes amis pour qu'ils rejoignent l'équipe.
          </p>
          <div className="invite-link-box">
            <span className="invite-link-text">
              https://codetowin.org/hackathon/google-cloud-rapid-agent/invite/a29df83c
            </span>
            <button type="button" className="btn-action-secondary" style={{ borderRadius: '9999px', padding: '0.35rem 1rem', fontSize: '0.8rem' }} onClick={handleCopyInviteLink}>
              Copier le lien
            </button>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '1rem' }}>
          <label className="form-label">Membres de l'équipe</label>
          <div className="teammates-list">
            {workspaceState.teammates && workspaceState.teammates.map((m, idx) => (
              <div key={idx} className="teammate-row">
                <div className="teammate-info">
                  <img src={m.avatar} className="teammate-avatar" alt={m.name} />
                  <div className="teammate-identity">
                    <span className="teammate-name">{m.name}</span>
                    <span className="teammate-role-badge">{m.role}</span>
                  </div>
                </div>
                <span className={`teammate-status-badge ${m.status === 'joined' ? 'status-joined' : 'status-pending'}`}>
                  {m.status === 'joined' ? 'Joined' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="step-actions-footer">
        <button type="button" className="btn-action-secondary" onClick={() => handleJumpToStep(1)}>Retour</button>
        <button type="button" className="btn-action-primary" onClick={() => handleJumpToStep(3)}>Suivant !</button>
      </div>
    </div>
  );
}
