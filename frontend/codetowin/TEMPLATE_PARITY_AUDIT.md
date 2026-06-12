# CodeToWin template parity audit

Date: 2026-06-11

## Verdict

La version React ne correspond pas encore pixel par pixel aux templates HTML/CSS/Tailwind dans `froentend/`.

Le build React fonctionne, mais la parite visuelle n'est pas complete. Les ecarts les plus importants viennent de trois sources:

- certains contenus de pages React restent plus simples que les templates;
- plusieurs pages React utilisent encore des donnees, ids ou textes differents des templates;
- les templates emails HTML n'ont pas d'equivalent React identifie.

Mise a jour alignement:

- `MainLayout.jsx` reprend maintenant le header public de `home.html` sur la home.
- Les routes participants connectees (`/hackathons`, `/hackathons/:id`, `/profile`, `/participant`) utilisent maintenant le header authentifie du prototype.
- `DashboardLayout.jsx` utilise maintenant le logo image et une structure Tailwind commune plus proche des templates mentor/organizer.
- Les donnees visibles de la premiere carte `/hackathons` sont alignees sur `hackaton.html`.
- `src/pages/Mentor/Messages.jsx` reprend maintenant la structure Tailwind du template `mentor-messages.html`.
- `src/pages/Mentor/HackathonDetails.jsx` reprend maintenant la structure Tailwind du template `mentor-hackathon-details.html`.
- `src/pages/Mentor/TeamDetails.jsx` reprend maintenant la structure Tailwind du template `mentor-team-details.html`.
- `src/pages/Mentor/Dashboard.jsx` reprend maintenant la structure Tailwind du template `mentor-dashboard.html`.
- `src/pages/Mentor/Messages.jsx` et `src/pages/Organizer/Messages.jsx` utilisent maintenant un `ChatLayout` commun.
- Les headers/filtres/stat cards dashboard récurrents commencent à être mutualisés dans `src/components/features/dashboard/`.
- Les cartes métier mentor récurrentes sont maintenant mutualisées dans `src/components/features/mentor/`.

## Couverture globale

| Zone | Templates HTML | Equivalents React | Etat |
| --- | ---: | ---: | --- |
| Participants | 7 | 7 | Partiel |
| Mentor | 13 | 13 | Faible a moyen |
| Organisateur | 20 | 20 | Moyen a bon selon page |
| Emails | 11 | 0 | Non porte |

Total templates HTML analyses: 50.

## Participants

| Template | React | Couverture classes | Diagnostic |
| --- | --- | ---: | --- |
| `participants/home.html` | `src/pages/Participant/Home.jsx` | 82% | Header public aligne, contenu proche. |
| `participants/login.html` | `src/pages/Auth/Login.jsx` | 100% | Tres proche visuellement, petits offsets restants. |
| `participants/signup.html` | `src/pages/Auth/Signup.jsx` | 100% | Tres proche structurellement. |
| `participants/hackaton.html` | `src/pages/Participant/Hackathons.jsx` | 100% avec layout | Header connecte et premiere carte alignee. |
| `participants/hackaton-detail.html` | `src/pages/Participant/HackathonDetail.jsx` | 100% avec layout | Header/footer couverts, ids encore a verifier. |
| `participants/profile.html` | `src/pages/Participant/Profile.jsx` | 100% avec layout | Header/footer couverts, contenu a verifier visuellement. |
| `participants/participant.html` | `src/pages/Participant/index.jsx` | 100% avec layout | Header/footer couverts, contenu a verifier visuellement. |

Notes importantes:

- La capture home React vs template donne environ `1202890` pixels differents sur `1440x2200` apres alignement. Visuellement le header est plus proche, mais la diff brute reste sensible aux offsets de texte sur longue page.
- La capture hackathons React vs template passe d'environ `633534` a `551721` pixels differents sur `1440x1800`.
- La page login est visuellement la plus proche; diff brute mesuree: `71065` pixels sur `1440x1600`.

## Mentor

| Template | React | Couverture classes avec layout | Diagnostic |
| --- | --- | ---: | --- |
| `mentor/mentor-dashboard.html` | `src/pages/Mentor/Dashboard.jsx` | 99% | Tres proche structurellement, détails visuels à vérifier par capture. |
| `mentor/mentor-hackathon-details.html` | `src/pages/Mentor/HackathonDetails.jsx` | 96% | Très proche structurellement, détails visuels à vérifier par capture. |
| `mentor/mentor-hackathon-submissions.html` | `src/pages/Mentor/HackathonSubmissions.jsx` | 54% | Portage partiel. |
| `mentor/mentor-invitations.html` | `src/pages/Mentor/Invitations.jsx` | 61% | Moyen, pas pixel-perfect. |
| `mentor/mentor-messages.html` | `src/pages/Mentor/Messages.jsx` + `src/components/features/messaging/ChatLayout.jsx` | 82% | Structure mutualisee, donnees mentor isolees. |
| `mentor/mentor-notifications.html` | `src/pages/Mentor/Notifications.jsx` + `src/components/features/notifications/NotificationCenter.jsx` | 90% | Structure mutualisee avec organizer, details visuels a verifier. |
| `mentor/mentor-profile.html` | `src/pages/Mentor/Profile.jsx` | 51% | Structure et styles modifies. |
| `mentor/mentor-settings.html` | `src/pages/Mentor/Settings.jsx` | 51% | Portage partiel. |
| `mentor/mentor-submission-details.html` | `src/pages/Mentor/SubmissionDetails.jsx` | 53% | Portage partiel. |
| `mentor/mentor-submissions.html` | `src/pages/Mentor/Submissions.jsx` | 53% | Portage partiel. |
| `mentor/mentor-team-details.html` | `src/pages/Mentor/TeamDetails.jsx` | 92% | Très proche structurellement, détails visuels à vérifier par capture. |
| `mentor/mentor-team-feedback.html` | `src/pages/Mentor/TeamFeedback.jsx` | 58% | Portage partiel. |
| `mentor/mentor-teams.html` | `src/pages/Mentor/Teams.jsx` | 57% | Portage partiel. |

Probleme principal mentor:

- Le layout mentor React est maintenant plus proche du template Tailwind.
- `mentor-dashboard`, `mentor-messages`, `mentor-hackathon-details` et `mentor-team-details` sont maintenant rapproches des templates; les autres composants de page mentor restent encore fortement reinterpretes avec des classes custom ou des structures React divergentes.
- Resultat: le cadre global est meilleur, mais les pages mentor doivent encore etre alignees une par une.

## Organisateur

| Template | React | Couverture classes avec layout | Diagnostic |
| --- | --- | ---: | --- |
| `organisation/organisateur-dashboard.html` | `src/pages/Organizer/Dashboard/index.jsx` | 99% | Tres proche structurellement. |
| `organisation/organisateur-hackathons.html` | `src/pages/Organizer/Hackathons/index.jsx` | 85% | Bon, mais filtres/actions divergent. |
| `organisation/organisateur-create-hackathon.html` | `src/pages/Organizer/Hackathons/Create.jsx` | 90% | Bon, wizard/navigation a verifier. |
| `organisation/organisateur-edit-hackathon.html` | `src/pages/Organizer/Hackathons/Edit.jsx` | 85% | Bon mais texte/ids divergent fortement. |
| `organisation/organisateur-participants.html` | `src/pages/Organizer/Hackathons/Participants.jsx` | 98% | Tres proche structurellement. |
| `organisation/organisateur-teams.html` | `src/pages/Organizer/Hackathons/Teams.jsx` | 80% | Moyen, classes supplementaires. |
| `organisation/organisateur-team-details.html` | `src/pages/Organizer/Hackathons/TeamDetails.jsx` | 98% | Tres proche structurellement. |
| `organisation/organisateur-mentors.html` | `src/pages/Organizer/Hackathons/Mentors.jsx` | 89% | Bon, onglets/ids a verifier. |
| `organisation/organisateur-submissions.html` | `src/pages/Organizer/Hackathons/Submissions.jsx` | 86% | Bon, cartes et hover divergent. |
| `organisation/organisateur-evaluation.html` | `src/pages/Organizer/Hackathons/Evaluation.jsx` | 98% | Tres proche structurellement. |
| `organisation/organisateur-results.html` | `src/pages/Organizer/Hackathons/Results.jsx` | 93% | Bon a tres bon. |
| `organisation/organisateur-announcements.html` | `src/pages/Organizer/Hackathons/Announcements.jsx` | 90% | Bon, item actif divergent. |
| `organisation/organisateur-new-announcement.html` | `src/pages/Organizer/Hackathons/NewAnnouncement.jsx` | 98% | Tres proche structurellement. |
| `organisation/organisateur-announcement-details.html` | `src/pages/Organizer/Hackathons/AnnouncementDetails.jsx` | 96% | Bon a tres bon. |
| `organisation/organisateur-certificate.html` | `src/pages/Organizer/Hackathons/Certificate.jsx` | 98% | Tres proche, classes gold manquantes. |
| `organisation/organisateur-membres.html` | `src/pages/Organizer/Members.jsx` | 98% | Tres proche structurellement. |
| `organisation/organisateur-messages.html` | `src/pages/Organizer/Messages.jsx` + `src/components/features/messaging/ChatLayout.jsx` | 85% | Structure mutualisee, donnees organizer isolees. |
| `organisation/organisateur-notifications.html` | `src/pages/Organizer/Notifications.jsx` + `src/components/features/notifications/NotificationCenter.jsx` | 93% | Bon, structure maintenant mutualisee. |
| `organisation/organisateur-user-profile.html` | `src/pages/Organizer/UserProfile.jsx` | 78% | Moyen, contenu/classes modifies. |
| `organisation/organisateur-settings.html` | `src/pages/Organizer/Settings.jsx` | 77% | Moyen, tabs/forms divergent. |

Problemes principaux organizer:

- Plusieurs pages sont proches structurellement, mais le layout commun React n'est pas toujours strictement identique au template.
- Le logo de sidebar React utilise maintenant l'image brand comme les templates.
- Certaines pages dynamiques changent les textes, les ids, les etats actifs, ou les donnees.

## Emails

Ces templates HTML n'ont pas d'equivalent React identifie:

- `emails/email-announcement.html`
- `emails/email-evaluation-reminder.html`
- `emails/email-hackathon-registration.html`
- `emails/email-hackathon-results.html`
- `emails/email-invite-member.html`
- `emails/email-mentor-invitation.html`
- `emails/email-password-reset.html`
- `emails/email-submission-received.html`
- `emails/email-team-invitation.html`
- `emails/email-verification.html`
- `emails/email-welcome.html`

Ils doivent rester comme templates HTML autonomes, ou etre portes dans un systeme React/email separe si l'objectif est vraiment un portage complet.

## Priorite de correction

1. Aligner `MainLayout.jsx` sur les headers publics et authentifies des templates participants.
2. Remplacer le layout mentor React custom par la structure Tailwind des templates mentor.
3. Harmoniser `DashboardLayout.jsx` organizer avec les sidebars/topbars HTML d'origine.
4. Aligner les donnees statiques React sur les donnees HTML avant toute comparaison pixel.
5. Corriger les pages organizer les moins proches: messages, settings, user profile, teams.
6. Decider quoi faire des emails: garder HTML ou creer des composants emails dedies.

## Validation deja faite

- `npm run build` passe dans `frontend/codetowin`.
- Captures locales effectuees pour home, login et hackathons.
- Comparaison statique effectuee pour tous les templates participants, mentor et organizer.
