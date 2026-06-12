import React from 'react';

export default function HackathonTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: 'Aperçu' },
    { id: 'my-project', label: 'Mon projet' },
    { id: 'participants', label: 'Participants' },
    { id: 'resources', label: 'Ressources' },
    { id: 'rules', label: 'Règles' },
    { id: 'updates', label: 'Actus' },
    { id: 'discussions', label: 'Bla-bla' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <nav className="tab-nav" id="tab-nav" aria-label="Screen Tabs Navigation">
      {tabs.map(tab => (
        <button
          key={tab.id}
          type="button"
          className={`tab-link ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
