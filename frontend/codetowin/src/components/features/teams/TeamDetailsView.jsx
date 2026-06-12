import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../common/Badge';

export default function TeamDetailsView({ 
  role = 'mentor',
  team = {
    name: 'FinTech Innovators',
    status: 'Projet soumis',
    statusTone: 'green',
    hackathonName: 'AI for Climate Africa',
    project: {
      title: 'EcoPay : Plateforme de paiement mobile bas carbone',
      description: "EcoPay est une solution Fintech innovante visant à réduire l'empreinte carbone des transactions mobiles. En optimisant les appels API et en hébergeant les nœuds de validation sur des serveurs alimentés aux énergies renouvelables, l'équipe propose une architecture 3x plus efficiente que les standards actuels.",
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'AWS Green']
    },
    members: [
      { name: 'Moussa Diop', isLeader: true, avatar: 'https://ui-avatars.com/api/?name=Moussa+Diop&background=random', title: 'Développeur Fullstack • Sénégal' },
      { name: 'Aisha Fall', isLeader: false, avatar: 'https://ui-avatars.com/api/?name=Aisha+Fall&background=random', title: "UX/UI Designer • Côte d'Ivoire" },
      { name: 'Kofi Mensah', isLeader: false, avatar: 'https://ui-avatars.com/api/?name=Kofi+Mensah&background=random', title: 'Data Engineer • Ghana' }
    ],
    resources: [
      { type: 'github', label: 'Dépôt GitHub', value: 'github.com/fintech-innovators/ecopay', url: '#' },
      { type: 'demo', label: 'Démo en ligne', value: 'app.ecopay-demo.com', url: '#' },
      { type: 'pdf', label: 'Pitch Deck (PDF)', value: '2.4 MB', url: '#' },
      { type: 'image', label: 'Maquette (PNG)', value: '1.2 MB', url: '#' }
    ],
    activities: [
      { id: 1, label: 'Projet soumis pour évaluation', date: 'Hier', type: 'success' },
      { id: 2, label: 'Mentor Dr. Ousmane assigné', date: '2 Juin', type: 'info' },
      { id: 3, label: 'Création de l\'équipe', date: '28 Mai', type: 'default' }
    ],
    mentor: {
      name: 'Dr. Ousmane Ba',
      avatar: 'https://ui-avatars.com/api/?name=Dr+Ousmane+Ba&background=random',
      specialty: 'Expert en Intelligence Artificielle'
    }
  },
  actions,
  mentorSection
}) {
  const dashboardBase = role === 'organizer' ? '/organizer' : '/mentor';

  // Normalize members array to handle strings, objects, and missing fields safely
  const normalizedMembers = (team?.members || []).map((m, index) => {
    if (typeof m === 'string') {
      return {
        id: `m-${index}`,
        name: `Membre ${index + 1}`,
        avatar: m,
        title: 'Participant',
        isLeader: index === 0
      };
    }
    return {
      id: m?.id || `m-${index}`,
      name: m?.name || `Membre ${index + 1}`,
      avatar: m?.avatar || `https://ui-avatars.com/api/?name=Membre+${index + 1}&background=random`,
      title: m?.title || 'Participant',
      isLeader: !!m?.isLeader
    };
  });
  
  // Icon selectors for resources
  const renderResourceIcon = (type) => {
    switch (type) {
      case 'github':
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
            <svg className="h-6 w-6 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'demo':
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
        );
      case 'pdf':
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'image':
      default:
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
    }
  };

  const renderTimelineIcon = (type) => {
    switch (type) {
      case 'success':
        return (
          <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </span>
        );
      case 'info':
        return (
          <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </span>
        );
      default:
        return (
          <span className="h-8 w-8 rounded-full bg-slate-400 flex items-center justify-center ring-8 ring-white">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </span>
        );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand-100 text-2xl font-bold text-brand-700 shadow-inner">
              {team?.name ? team.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'EQ'}
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-slate-900">{team?.name || 'Équipe'}</h1>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant={team?.statusTone || 'green'}>
                  {team?.status === 'Projet soumis' ? (
                    <>
                      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                      Projet soumis
                    </>
                  ) : (team?.status || 'Aucun statut')}
                </Badge>
                {team?.hackathonName && (
                  <span className="text-sm text-slate-500 font-medium">• Hackathon "{team.hackathonName}"</span>
                )}
              </div>
            </div>
          </div>
          {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Project Details */}
            {team?.project && (
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                  <h2 className="text-lg font-medium text-slate-900">Le Projet</h2>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900">{team.project.title}</h3>
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                    {team.project.description}
                  </p>
                  {team.project.technologies && team.project.technologies.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Technologies utilisées</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {team.project.technologies.map((tech, i) => (
                          <span key={i} className="inline-flex items-center rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-600/10">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Team Members */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
                <h2 className="text-lg font-medium text-slate-900">Membres de l'équipe ({normalizedMembers.length})</h2>
                <span className="text-sm text-slate-500">
                  Chef d'équipe : {normalizedMembers.find(m => m.isLeader)?.name || 'Aucun'}
                </span>
              </div>
              <ul role="list" className="divide-y divide-slate-200">
                {normalizedMembers.map((member, i) => (
                  <li key={i} className="flex items-center justify-between p-6 hover:bg-slate-50/50 transition">
                    <div className="flex items-center">
                      <img className={`h-12 w-12 rounded-full object-cover ${member.isLeader ? 'ring-2 ring-brand-500' : ''}`} src={member.avatar} alt="" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-slate-900">
                          {member.name} 
                          {member.isLeader && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-brand-100 px-2 py-0.5 text-xs font-medium text-brand-800">
                              Leader
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-slate-500">{member.title}</p>
                      </div>
                    </div>
                    <Link to={`${dashboardBase}/public/talents/${member.id || member.name.toLowerCase().replace(/\s+/g, '-')}`} className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                      <svg className="-ml-1 mr-1.5 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Voir profil
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources & Deliverables */}
            {team?.resources && team.resources.length > 0 && (
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                  <h2 className="text-lg font-medium text-slate-900">Ressources & Livrables</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {team.resources.map((res, i) => (
                      <a key={i} href={res.url || '#'} className="flex items-center rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition">
                        {renderResourceIcon(res.type)}
                        <div className="ml-4">
                          <p className="text-sm font-medium text-slate-900">{res.label}</p>
                          <p className="text-xs text-slate-500">{res.value}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column (1/3) */}
          <div className="space-y-6">
            
            {/* Mentor Section (Optional or dynamically passed) */}
            {mentorSection ? mentorSection : (
              role === 'organizer' && team?.mentor && (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                  <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                    <h2 className="text-lg font-medium text-slate-900">Mentor Assigné</h2>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center">
                      <img className="h-12 w-12 rounded-full object-cover" src={team.mentor.avatar} alt="" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-slate-900">{team.mentor.name}</p>
                        <p className="text-xs text-slate-500">{team.mentor.specialty}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Link to="/organizer/messages" className="flex flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition">
                        Message
                      </Link>
                      <button type="button" className="flex flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition">
                        Changer
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}

            {/* Team Timeline Activity */}
            {team?.activities && team.activities.length > 0 && (
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                  <h2 className="text-lg font-medium text-slate-900">Activité de l'équipe</h2>
                </div>
                <div className="p-6">
                  <div className="flow-root">
                    <ul role="list" className="-mb-8">
                      {team.activities.map((act, i) => (
                        <li key={act.id}>
                          <div className="relative pb-8">
                            {i !== team.activities.length - 1 && (
                              <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true"></span>
                            )}
                            <div className="relative flex space-x-3">
                              <div>
                                {renderTimelineIcon(act.type)}
                              </div>
                              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                <div>
                                  <p className="text-sm text-slate-500">{act.label}</p>
                                </div>
                                <div className="whitespace-nowrap text-right text-xs text-slate-500">
                                  <time>{act.date}</time>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
