import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const STEPS = [
  { id: 1, title: 'Informations générales' },
  { id: 2, title: 'Contenu détaillé' },
  { id: 3, title: 'Dates et calendrier' },
  { id: 4, title: 'Thèmes & Format' },
  { id: 5, title: 'Mentors' },
  { id: 6, title: 'Branding' },
  { id: 7, title: 'Preview & Soumission' },
];

export default function OrganizerCreateHackathon() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = STEPS.length;

  const handleNext = () => currentStep < totalSteps && setCurrentStep(prev => prev + 1);
  const handlePrev = () => currentStep > 1 && setCurrentStep(prev => prev - 1);

  // Step 2 internal state
  const [activeTab, setActiveTab] = useState('overview');
  const [faqs, setFaqs] = useState([{ question: "Les équipes peuvent-elles être formées avant l'événement ?", answer: "Oui, vous pouvez former votre équipe avant ou utiliser le canal de discussion dédié pour trouver des coéquipiers le jour J." }]);
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  const addFaq = () => {
    if (newFaqQ.trim() && newFaqA.trim()) {
      setFaqs([...faqs, { question: newFaqQ, answer: newFaqA }]);
      setNewFaqQ('');
      setNewFaqA('');
    }
  };

  const removeFaq = (idx) => {
    setFaqs(faqs.filter((_, i) => i !== idx));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      
      {/* Page Header mimicking the breadcrumb and top actions */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2 text-sm">
          <Link to="/organizer" className="font-medium text-slate-500 hover:text-slate-900">Accueil</Link>
          <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-slate-900">Créer un hackathon</span>
        </div>
        <div>
          <button type="button" className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
            Sauvegarder en brouillon
          </button>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        
        {/* Wizard Steps (Sidebar) */}
        <aside className="py-6 lg:col-span-3 lg:py-0">
          <nav className="space-y-1">
            {STEPS.map((step) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;

              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)} // Allow free navigation
                  className={`w-full text-left group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-white text-brand-700 shadow-sm ring-1 ring-slate-200'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                      isActive
                        ? 'bg-brand-50 border border-brand-200'
                        : isCompleted
                        ? 'bg-brand-600 border border-brand-600'
                        : 'border border-slate-300'
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className={`font-semibold ${isActive ? 'text-brand-700' : 'text-slate-500'}`}>
                        {step.id}
                      </span>
                    )}
                  </span>
                  <span className="ml-3 truncate">{step.title}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Form Content */}
        <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
          <div className="shadow sm:overflow-hidden sm:rounded-xl bg-white">
            
            {/* Step 1 */}
            <div className={currentStep === 1 ? 'block' : 'hidden'}>
              <div className="space-y-6 py-6 px-4 sm:p-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-slate-900">Informations générales</h3>
                  <p className="mt-1 text-sm text-slate-500">Commencez par les détails basiques de votre hackathon.</p>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3">
                    <label className="block text-sm font-medium text-slate-700">Titre du hackathon <span className="text-red-500">*</span></label>
                    <div className="mt-1">
                      <input type="text" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" placeholder="ex: AI for Climate Africa 2026" />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <label className="block text-sm font-medium text-slate-700">Description courte <span className="text-red-500">*</span></label>
                    <div className="mt-1">
                      <textarea rows="2" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border"></textarea>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Validation des inscriptions <span className="text-red-500">*</span></label>
                    <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                      <div className="flex items-center">
                        <input id="mode-public" name="registration_mode" type="radio" defaultChecked className="h-4 w-4 border-slate-300 text-brand-600 focus:ring-brand-600" />
                        <label htmlFor="mode-public" className="ml-3 block text-sm font-medium leading-6 text-slate-900">Ouvert à tous <span className="font-normal text-slate-500">- Inscription automatique</span></label>
                      </div>
                      <div className="flex items-center">
                        <input id="mode-approval" name="registration_mode" type="radio" className="h-4 w-4 border-slate-300 text-brand-600 focus:ring-brand-600" />
                        <label htmlFor="mode-approval" className="ml-3 block text-sm font-medium leading-6 text-slate-900">Sur approbation <span className="font-normal text-slate-500">- Validation manuelle requise</span></label>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700">Limite de participants</label>
                    <div className="mt-1">
                      <input type="number" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" placeholder="ex: 200" />
                    </div>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700">Taille min équipe</label>
                    <div className="mt-1">
                      <input type="number" defaultValue="1" min="1" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700">Taille max équipe</label>
                    <div className="mt-1">
                      <input type="number" defaultValue="4" min="1" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className={currentStep === 2 ? 'block' : 'hidden'}>
              <div className="space-y-6 py-6 px-4 sm:p-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-slate-900">Contenu détaillé</h3>
                  <p className="mt-1 text-sm text-slate-500">Rédigez le contenu principal de votre hackathon. Utilisez l'éditeur pour mettre en forme.</p>
                </div>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="border-b border-slate-200 bg-slate-50 flex overflow-x-auto">
                    {['overview', 'resources', 'rules', 'faq'].map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3 px-4 text-sm font-medium whitespace-nowrap border-b-2 ${
                          activeTab === tab 
                            ? 'text-brand-600 border-brand-500 bg-white' 
                            : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {tab === 'overview' ? "Vue d'ensemble" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>

                  {activeTab !== 'faq' && (
                    <>
                      <div className="border-b border-slate-200 bg-white p-2 flex items-center space-x-1 sm:space-x-2 text-slate-500 overflow-x-auto">
                        {/* Mockup Rich Text Toolbar */}
                        <button type="button" className="p-1.5 rounded hover:bg-slate-100" title="Gras">B</button>
                        <button type="button" className="p-1.5 rounded hover:bg-slate-100" title="Italique">I</button>
                        <div className="w-px h-5 bg-slate-300 mx-1"></div>
                        <button type="button" className="flex items-center space-x-1 p-1.5 rounded bg-brand-50 text-brand-700 transition" title="Mode Markdown activé">
                          <span className="text-xs font-semibold hidden sm:inline">Markdown actif</span>
                        </button>
                      </div>
                      <div className="bg-white p-4">
                        {activeTab === 'overview' && <textarea rows="10" className="w-full h-64 border-0 focus:ring-0 p-0 text-slate-800 resize-none outline-none" placeholder="Présentez votre hackathon..." defaultValue="Ce hackathon vise à résoudre les problèmes climatiques en Afrique..."></textarea>}
                        {activeTab === 'resources' && <textarea rows="10" className="w-full h-64 border-0 focus:ring-0 p-0 text-slate-800 resize-none outline-none" placeholder="Liens utiles, APIs fournies..."></textarea>}
                        {activeTab === 'rules' && <textarea rows="10" className="w-full h-64 border-0 focus:ring-0 p-0 text-slate-800 resize-none outline-none" placeholder="Règles de participation..."></textarea>}
                      </div>
                      <div className="bg-blue-50 border-t border-blue-100 px-4 py-2 flex items-start">
                        <p className="text-xs text-blue-700"><strong>Le mode Markdown est activé par défaut.</strong></p>
                      </div>
                    </>
                  )}

                  {activeTab === 'faq' && (
                    <div className="bg-white p-4">
                      <div className="space-y-4 mb-6">
                        {faqs.map((faq, idx) => (
                          <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-200 relative group">
                            <button type="button" onClick={() => removeFaq(idx)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                            <h4 className="font-bold text-slate-900 text-sm">{faq.question}</h4>
                            <p className="text-sm text-slate-600 mt-2">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                      <div className="bg-white border border-slate-200 shadow-sm rounded-lg p-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700">Question</label>
                            <input type="text" value={newFaqQ} onChange={e => setNewFaqQ(e.target.value)} placeholder="Ex: Qui peut participer ?" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700">Réponse</label>
                            <textarea rows="2" value={newFaqA} onChange={e => setNewFaqA(e.target.value)} placeholder="Saisissez la réponse..." className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border"></textarea>
                          </div>
                          <div>
                            <button type="button" onClick={addFaq} className="inline-flex items-center rounded-md border border-transparent bg-brand-50 text-brand-700 px-4 py-2 text-sm font-medium hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                              Ajouter la question
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className={currentStep === 3 ? 'block' : 'hidden'}>
              <div className="space-y-6 py-6 px-4 sm:p-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-slate-900">Dates et calendrier</h3>
                  <p className="mt-1 text-sm text-slate-500">Définissez la timeline de votre événement.</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700">Ouverture des inscriptions</label>
                    <div className="mt-1">
                      <input type="datetime-local" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700">Clôture des inscriptions</label>
                    <div className="mt-1">
                      <input type="datetime-local" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700">Début du Hackathon</label>
                    <div className="mt-1">
                      <input type="datetime-local" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700">Date limite des soumissions</label>
                    <div className="mt-1">
                      <input type="datetime-local" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className={currentStep === 4 ? 'block' : 'hidden'}>
              <div className="space-y-6 py-6 px-4 sm:p-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-slate-900">Thèmes & Format</h3>
                  <p className="mt-1 text-sm text-slate-500">Sur quoi les participants vont-ils travailler ?</p>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Format de l'événement</label>
                    <select className="mt-1 block w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm border">
                      <option>100% en ligne</option>
                      <option>Hybride (En ligne + Présentiel)</option>
                      <option>Présentiel uniquement</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Thèmes principaux (tags)</label>
                    <div className="mt-1">
                      <input type="text" placeholder="IA, FinTech, GreenTech (séparés par des virgules)" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Technologies imposées ou recommandées</label>
                    <div className="mt-1">
                      <input type="text" placeholder="React, Python, AWS..." className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className={currentStep === 5 ? 'block' : 'hidden'}>
              <div className="space-y-6 py-6 px-4 sm:p-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-slate-900">Mentors</h3>
                  <p className="mt-1 text-sm text-slate-500">Ajoutez des mentors qui accompagneront les équipes.</p>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Rechercher des mentors inscrits</label>
                    <div className="mt-1 flex gap-2">
                      <input type="email" placeholder="Email du mentor" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                      <button type="button" className="inline-flex items-center rounded-md border border-transparent bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300">Ajouter</button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-slate-700 mb-2">Mentors sélectionnés</h4>
                    <p className="text-sm text-slate-500 italic">Aucun mentor ajouté pour le moment.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className={currentStep === 6 ? 'block' : 'hidden'}>
              <div className="space-y-6 py-6 px-4 sm:p-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-slate-900">Branding</h3>
                  <p className="mt-1 text-sm text-slate-500">Personnalisez l'apparence visuelle de la page du hackathon.</p>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Logo de l'événement</label>
                    <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-slate-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <div className="flex text-sm text-slate-600 justify-center">
                          <label className="relative cursor-pointer rounded-md bg-white font-medium text-brand-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2 hover:text-brand-500">
                            <span>Télécharger un fichier</span>
                            <input type="file" className="sr-only" />
                          </label>
                        </div>
                        <p className="text-xs text-slate-500">PNG, JPG jusqu'à 2MB</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Image de couverture (Bannière)</label>
                    <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-slate-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <div className="flex text-sm text-slate-600 justify-center">
                          <span className="text-brand-600 font-medium cursor-pointer">Cliquer pour uploader</span>
                        </div>
                        <p className="text-xs text-slate-500">Ratio 16:9 recommandé (ex: 1200x675px)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 7 */}
            <div className={currentStep === 7 ? 'block' : 'hidden'}>
              <div className="space-y-6 py-6 px-4 sm:p-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-slate-900">Preview & Soumission</h3>
                  <p className="mt-1 text-sm text-slate-500">Vérifiez les informations avant de publier.</p>
                </div>
                <div className="bg-brand-50 border border-brand-200 rounded-md p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-brand-800">Prêt à être publié</h3>
                      <div className="mt-2 text-sm text-brand-700">
                        <p>Votre hackathon passera de brouillon à public. Les participants pourront commencer à s'inscrire si la date d'ouverture est atteinte.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="bg-slate-50 px-4 py-3 sm:px-6 border-t border-slate-200">
              <div className="flex justify-between items-center w-full">
                <button
                  type="button"
                  onClick={handlePrev}
                  className={`inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${currentStep === 1 ? 'invisible' : ''}`}
                >
                  Précédent
                </button>
                <div className="flex-1"></div>
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex justify-center rounded-md border border-transparent bg-brand-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                  >
                    Étape suivante
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigate('/organizer/hackathons')}
                    className="inline-flex justify-center rounded-md border border-transparent bg-brand-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                  >
                    Publier le Hackathon
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
