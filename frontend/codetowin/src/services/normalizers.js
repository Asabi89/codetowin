/**
 * Normalizers centralisés pour CodeToWin.
 * Réduit la duplication du code dans les composants.
 */

export const extractArray = (data, key) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.conversations)) return data.conversations;
  if (key && Array.isArray(data?.[key])) return data[key];
  return [];
};

export const normalizeConversation = (conversation) => ({
  id: conversation.id || conversation._id,
  name: conversation.name || conversation.title || conversation.team?.name || 'Conversation',
  headerName: conversation.headerName || conversation.name || conversation.team?.name,
  role: conversation.role || conversation.context || conversation.hackathon?.title || 'Conversation',
  category: conversation.category || (conversation.organizer ? 'organisation' : (conversation.mentor ? 'mentors' : 'equipes')),
  isGroup: conversation.isGroup ?? conversation.is_group ?? Boolean(conversation.team),
  avatar: conversation.avatar || conversation.team?.initials || conversation.name?.slice(0, 2).toUpperCase() || 'CT',
  avatarBgColor: conversation.avatarBgColor || 'bg-emerald-100',
  avatarTextColor: conversation.avatarTextColor || 'text-emerald-600',
  avatarBorderColor: conversation.avatarBorderColor || 'border-emerald-200',
  status: conversation.status || 'offline',
  unread: conversation.unread ?? conversation.unread_count ?? 0,
  lastTime: conversation.lastTime || conversation.last_message_at || '',
  lastMessage: conversation.lastMessage || conversation.last_message || '',
  messages: extractArray(conversation.messages).map((message) => ({
    id: message.id || message._id,
    sender: message.sender || (message.is_me ? 'me' : 'them'),
    senderName: message.senderName || message.sender_name || message.user?.name || 'Utilisateur',
    text: message.text || message.content || '',
    time: message.time || message.created_at || '',
  })),
});

export const normalizeStatus = (status = '') => {
  const value = String(status).toLowerCase();
  if (['active', 'published', 'publié', 'publie'].includes(value)) return 'publie';
  if (['draft', 'brouillon'].includes(value)) return 'brouillon';
  if (['pending', 'attente', 'en attente', 'pending_review'].includes(value)) return 'attente';
  if (['completed', 'termine', 'terminé', 'finished'].includes(value)) return 'termine';
  return status || 'brouillon';
};

export const normalizeHackathon = (hackathon) => {
  const status = String(hackathon.status || '').toLowerCase();
  const active = ['active', 'published', 'publie', 'publié', 'ongoing'].includes(status);
  return {
    ...hackathon,
    id: hackathon.id || hackathon._id || hackathon.slug,
    name: hackathon.title || hackathon.name || 'Hackathon sans titre',
    title: hackathon.title || hackathon.name || 'Hackathon sans titre',
    type: hackathon.type || hackathon.format || (hackathon.online ? 'En ligne' : 'Présentiel'),
    status: normalizeStatus(hackathon.status),
    statusClass: active ? 'bg-green-100 text-green-800 ring-green-600/20' : 'bg-slate-100 text-slate-800 ring-slate-500/10',
    location: hackathon.location || hackathon.city || hackathon.country || `${hackathon.format || (hackathon.online ? 'En ligne' : 'Présentiel')} · ${hackathon.location || hackathon.city || 'Dakar'}`,
    participants: hackathon.participants ?? hackathon.participants_count ?? hackathon.registrations_count ?? '-',
    teams: hackathon.teams ?? hackathon.teams_count ?? '-',
    teamsCount: hackathon.teamsCount ?? hackathon.teams_count ?? hackathon.assigned_teams_count ?? hackathon.teams ?? 0,
    submissions: hackathon.submissions ?? hackathon.submissions_count ?? '-',
    submissionsCount: hackathon.submissionsCount ?? hackathon.submissions_count ?? hackathon.submissions ?? 0,
    deadline: hackathon.deadline || hackathon.submission_deadline || 'Non planifié',
  };
};

export const normalizeNotification = (notification) => ({
  ...notification,
  id: notification.id || notification._id,
  title: notification.title || notification.subject || 'Notification',
  description: notification.description || notification.message || notification.content || '',
  time: notification.time || notification.created_at || '',
  unread: notification.unread ?? !notification.read_at,
  iconBg: notification.iconBg || 'bg-slate-100',
});

export const normalizeTeam = (team) => ({
  ...team,
  id: team.id || team._id,
  name: team.name || 'Équipe',
  description: team.description || 'Pas de description fournie.',
  detailPath: team.detailPath || `/mentor/teams/${team.id || team._id}`,
  status: team.status || (team.submission ? 'Soumission en cours' : 'Pas encore de projet'),
});

export const normalizeSubmission = (submission) => {
  const team = submission.team || {};
  const status = String(submission.status || '').toLowerCase();
  const evaluated = ['evaluated', 'évalué', 'evalue', 'reviewed'].includes(status);
  return {
    ...submission,
    id: submission.id || submission._id,
    teamName: submission.teamName || submission.team_name || team.name || 'Équipe',
    projectName: submission.projectName || submission.project_name || submission.title || 'Projet sans titre',
    status: evaluated ? 'evaluated' : 'submitted',
    statusLabel: evaluated ? 'Évalué' : 'Soumis',
  };
};
