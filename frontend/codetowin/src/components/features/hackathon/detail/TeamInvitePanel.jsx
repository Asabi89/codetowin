import React, { useState } from 'react';
import { useToast } from '../../../../context/ToastContext';
import { teamsApi } from '../../../../api/teams';

  export default function TeamInvitePanel({ workspaceState, updateWorkspaceState, handleJumpToStep, hackathon }) {
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviting, setInviting] = useState(false);
    const [isSolo, setIsSolo] = useState(false);
    const [savingTeam, setSavingTeam] = useState(false);
    const { showToast } = useToast();
  
    // Build real invite link from team's invite_token
    const team = workspaceState.team || null;
    const inviteToken = team?.invite_token || null;
    const inviteLink = inviteToken
      ? `${window.location.origin}/invite/${inviteToken}`
      : null;
      
    const isSoloTeam = team?.is_solo || isSolo;
  
    const handleSaveTeam = async () => {
      if (!workspaceState.teamName) {
        showToast("Veuillez entrer un nom d'équipe.", 'warning');
        return;
      }
      setSavingTeam(true);
      try {
        const hackathonId = workspaceState.currentHackathonId || '1'; 
        const res = await teamsApi.createTeam(hackathonId, {
          name: workspaceState.teamName,
          is_solo: isSolo
        });
        const newTeam = res.data || res;
        updateWorkspaceState({ 
          teamId: newTeam.id,
          team: newTeam
        });
        showToast(isSolo ? "Participation en solo enregistrée !" : "Équipe créée avec succès !", 'success');
      } catch (error) {
        showToast("Erreur lors de la création.", 'error');
      } finally {
        setSavingTeam(false);
      }
    };
  
    const handleSendInvite = async () => {
      if (!inviteEmail || !inviteEmail.includes('@')) {
        showToast('Veuillez entrer une adresse email valide.', 'warning');
        return;
      }
      const teamId = workspaceState.teamId || team?.id;
      if (!teamId || teamId === 'team_1') {
        showToast("Créez d'abord une équipe avant d'inviter.", 'warning');
        return;
      }
      setInviting(true);
      try {
        await teamsApi.inviteMember(teamId, { email: inviteEmail });
        const updatedTeammates = [
          ...(workspaceState.teammates || []),
          {
            name: inviteEmail,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(inviteEmail)}&background=random`,
            role: 'Invité',
            status: 'pending'
          }
        ];
        updateWorkspaceState({ teammates: updatedTeammates });
        setInviteEmail('');
        showToast(`Invitation envoyée à ${inviteEmail} !`, 'success');
      } catch (error) {
        showToast("Erreur lors de l'envoi de l'invitation.", 'error');
      } finally {
        setInviting(false);
      }
    };
  
    const handleCopyInviteLink = () => {
      if (!inviteLink) {
        showToast("Aucun lien disponible. Créez d'abord une équipe.", 'warning');
        return;
      }
      navigator.clipboard.writeText(inviteLink)
        .then(() => showToast("Lien d'invitation copié !", 'success'))
        .catch(() => {
          const el = document.createElement('textarea');
          el.value = inviteLink;
          document.body.appendChild(el);
          el.select();
          document.execCommand('copy');
          document.body.removeChild(el);
          showToast("Lien d'invitation copié !", 'success');
        });
    };
  
    return (
      <div className="wizard-step-panel is-active">
        <div className="step-pane-header">
          <h3 className="step-pane-title">Gérer l'équipe</h3>
          <p className="step-pane-desc">Crée ton équipe, invite tes potes ou participe en solo.</p>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="team-name">Nom de l'équipe (ou ton nom si solo)</label>
            <input
              type="text"
              id="team-name"
              className="form-input"
              placeholder="ex: Les Génies du Code"
              value={workspaceState.teamName || ''}
              onChange={(e) => updateWorkspaceState({ teamName: e.target.value })}
              disabled={!!workspaceState.teamId && workspaceState.teamId !== 'team_1'}
            />
            {(!workspaceState.teamId || workspaceState.teamId === 'team_1') && (
              <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                {(!hackathon || !hackathon.min_team_size || hackathon.min_team_size <= 1) && (
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input 
                      type="checkbox" 
                      checked={isSolo} 
                      onChange={(e) => setIsSolo(e.target.checked)} 
                    />
                    Je participe en solo
                  </label>
                )}
              <button 
                type="button" 
                className="btn-action-primary" 
                style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                onClick={handleSaveTeam}
                disabled={savingTeam || !workspaceState.teamName}
              >
                {savingTeam ? 'Enregistrement...' : (isSolo ? 'Valider (Solo)' : "Créer l'équipe")}
              </button>
            </div>
          )}
        </div>

        {!isSoloTeam && (
          <>
            <div className="form-group">
              <label className="form-label">Inviter par email</label>
              <div className="invite-input-row">
                <input
                  type="email"
                  className="form-input"
                  placeholder="pote@superdev.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendInvite()}
                  disabled={!workspaceState.teamId || workspaceState.teamId === 'team_1'}
                />
                <button
                  type="button"
                  className="btn-action-primary invite-btn"
                  onClick={handleSendInvite}
                  disabled={inviting || !workspaceState.teamId || workspaceState.teamId === 'team_1'}
                >
                  {inviting ? 'Envoi...' : 'Inviter'}
                </button>
              </div>
              {(!workspaceState.teamId || workspaceState.teamId === 'team_1') && (
                <p style={{ fontSize: '0.75rem', color: '#eab308', marginTop: '0.25rem' }}>Créez l'équipe d'abord pour inviter des membres.</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Lien d'invitation</label>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Partage ce lien — quiconque clique dessus rejoint l'équipe directement.
              </p>
              <div className="invite-link-box">
                <span className="invite-link-text" style={{ opacity: inviteLink ? 1 : 0.5, fontStyle: inviteLink ? 'normal' : 'italic' }}>
                  {inviteLink || '— Crée une équipe pour obtenir ton lien —'}
                </span>
                <button
                  type="button"
                  className="btn-action-secondary"
                  style={{ borderRadius: '9999px', padding: '0.35rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                  onClick={handleCopyInviteLink}
                  disabled={!inviteLink}
                >
                  Copier
                </button>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label className="form-label">Membres de l'équipe</label>
              <div className="teammates-list">
                {workspaceState.teammates && workspaceState.teammates.length > 0
                  ? workspaceState.teammates.map((m, idx) => (
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
                  ))
                  : (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>
                      Aucun membre pour l'instant. Invitez des coéquipiers !
                    </p>
                  )
                }
              </div>
            </div>
          </>
        )}
      </div>
      <div className="step-actions-footer">
        <button type="button" className="btn-action-secondary" onClick={() => handleJumpToStep(1)}>Retour</button>
        <button type="button" className="btn-action-primary" onClick={() => handleJumpToStep(3)}>Suivant !</button>
      </div>
    </div>
  );
}
