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
    <nav className="tab-nav flex overflow-x-auto whitespace-nowrap flex-nowrap" id="tab-nav" aria-label="Screen Tabs Navigation" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          type="button"
          className={`tab-link whitespace-nowrap px-4 py-2 flex-shrink-0 ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
