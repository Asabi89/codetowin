import React, { useState } from 'react';

export default function WizardStep5Mentors({ formData, updateForm }) {
  const [mentorEmail, setMentorEmail] = useState('');

  const addMentor = () => {
    const email = mentorEmail.trim();
    if (!email || formData.selectedMentors.some(mentor => mentor.email === email)) return;
    updateForm('selectedMentors', [...formData.selectedMentors, { id: Date.now(), email }]);
    setMentorEmail('');
  };

  const removeMentor = (id) => {
    updateForm('selectedMentors', formData.selectedMentors.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6 py-6 px-4 sm:p-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-slate-900">Mentors</h3>
        <p className="mt-1 text-sm text-slate-500">Ajoutez des mentors qui accompagneront les équipes.</p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">Rechercher des mentors inscrits</label>
          <div className="mt-1 flex gap-2">
            <input type="email" value={mentorEmail} onChange={(e) => setMentorEmail(e.target.value)} placeholder="Email du mentor" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
            <button type="button" onClick={addMentor} className="inline-flex items-center rounded-md border border-transparent bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300">Ajouter</button>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-medium text-slate-700 mb-2">Mentors sélectionnés</h4>
          {formData.selectedMentors.length > 0 ? (
            <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
              {formData.selectedMentors.map((mentor) => (
                <li key={mentor.id} className="flex items-center justify-between px-4 py-3 text-sm">
                  <span className="font-medium text-slate-700">{mentor.email}</span>
                  <button type="button" onClick={() => removeMentor(mentor.id)} className="text-red-600 hover:text-red-800">
                    Retirer
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 italic">Aucun mentor ajouté pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}
