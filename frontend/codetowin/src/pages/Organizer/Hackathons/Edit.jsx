import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Check, Bold, Italic, Underline, List as ListIcon, ListOrdered, Link as LinkIcon, Image as ImageIcon, Info, Plus, Trash2, ImagePlus
} from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Informations générales' },
  { id: 2, title: 'Contenu détaillé' },
  { id: 3, title: 'Dates et calendrier' },
  { id: 4, title: 'Thèmes & Format' },
  { id: 5, title: 'Mentors' },
  { id: 6, title: 'Branding' },
  { id: 7, title: 'Preview & Soumission' },
];

export default function OrganizerEditHackathon() {
  const navigate = useNavigate();
  const { id } = useParams(); // Hackathon ID
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
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-slate-900">Éditer : Fintech Builders Challenge</h1>
          <span className="inline-flex items-center rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold leading-5 text-slate-800">
            Statut : Brouillon
          </span>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          
          {/* Wizard Navigation */}
          <aside className="py-6 lg:col-span-3 lg:py-0">
            <nav className="space-y-1">
              {STEPS.map((step) => {
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;

                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-full group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                      isActive
                        ? 'bg-white text-brand-700 shadow-sm ring-1 ring-slate-200'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border ${
                        isActive
                          ? 'bg-brand-50 border-brand-200'
                          : isCompleted
                          ? 'bg-brand-600 border-brand-600'
                          : 'border-slate-300'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5 text-white" />
                      ) : (
                        <span className={`font-semibold ${isActive ? 'text-brand-700' : 'text-slate-500'}`}>
                          {step.id}
                        </span>
                      )}
                    </span>
                    <span className="ml-3 truncate text-left">{step.title}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Form Content */}
          <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
            <div className="shadow sm:overflow-hidden sm:rounded-xl">
              
              {/* Step 1 */}
              {currentStep === 1 && (
                <div className="bg-white px-4 py-6 sm:p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium leading-6 text-slate-900">Informations générales</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-slate-700">Titre du hackathon <span className="text-red-500">*</span></label>
                      <input type="text" defaultValue="Fintech Builders Challenge" className="mt-1 block w-full rounded-md border border-slate-300 shadow-sm py-2 px-3 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 sm:text-sm" />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-slate-700">Description courte <span className="text-red-500">*</span></label>
                      <textarea rows="2" defaultValue="Révolutionnez le paiement mobile en Afrique de l'Ouest avec des solutions innovantes." className="mt-1 block w-full rounded-md border border-slate-300 shadow-sm py-2 px-3 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 sm:text-sm"></textarea>
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
                      <input type="number" defaultValue="150" className="mt-1 block w-full rounded-md border border-slate-300 shadow-sm py-2 px-3 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 sm:text-sm" />
                    </div>
                    <div className="col-span-3 sm:col-span-1">
                      <label className="block text-sm font-medium text-slate-700">Taille min équipe</label>
                      <input type="number" defaultValue="2" min="1" className="mt-1 block w-full rounded-md border border-slate-300 shadow-sm py-2 px-3 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 sm:text-sm" />
                    </div>
                    <div className="col-span-3 sm:col-span-1">
                      <label className="block text-sm font-medium text-slate-700">Taille max équipe</label>
                      <input type="number" defaultValue="5" min="1" className="mt-1 block w-full rounded-md border border-slate-300 shadow-sm py-2 px-3 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 sm:text-sm" />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <div className="bg-white px-4 py-6 sm:p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium leading-6 text-slate-900">Contenu détaillé</h3>
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
                              ? 'border-brand-500 text-brand-600'
                              : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {tab === 'overview' ? "Vue d'ensemble" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      ))}
                    </div>

                    {activeTab !== 'faq' && (
                      <>
                        <div className="border-b border-slate-200 bg-white p-2 flex items-center space-x-1 sm:space-x-2 text-slate-500 overflow-x-auto">
                          <button type="button" className="p-1.5 rounded hover:bg-slate-100"><Bold className="w-4 h-4"/></button>
                          <button type="button" className="p-1.5 rounded hover:bg-slate-100"><Italic className="w-4 h-4"/></button>
                          <button type="button" className="p-1.5 rounded hover:bg-slate-100"><Underline className="w-4 h-4"/></button>
                          <div className="w-px h-5 bg-slate-300 mx-1"></div>
                          <button type="button" className="p-1.5 rounded hover:bg-slate-100"><ListIcon className="w-4 h-4"/></button>
                          <button type="button" className="p-1.5 rounded hover:bg-slate-100"><ListOrdered className="w-4 h-4"/></button>
                          <div className="w-px h-5 bg-slate-300 mx-1"></div>
                          <button type="button" className="p-1.5 rounded hover:bg-slate-100"><LinkIcon className="w-4 h-4"/></button>
                          <button type="button" className="p-1.5 rounded hover:bg-slate-100"><ImageIcon className="w-4 h-4"/></button>
                        </div>
                        <div className="bg-white p-4">
                          {activeTab === 'overview' && <textarea rows="10" className="w-full h-64 border-0 focus:ring-0 p-0 text-slate-800 resize-none outline-none" defaultValue="Nous recherchons des développeurs, designers et experts financiers pour repenser l'expérience utilisateur des services de transfert d'argent. Ce hackathon de 48h mettra à l'épreuve vos compétences en création d'API, sécurité et interfaces mobiles."></textarea>}
                          {activeTab === 'resources' && <textarea rows="10" className="w-full h-64 border-0 focus:ring-0 p-0 text-slate-800 resize-none outline-none"></textarea>}
                          {activeTab === 'rules' && <textarea rows="10" className="w-full h-64 border-0 focus:ring-0 p-0 text-slate-800 resize-none outline-none"></textarea>}
                        </div>
                        <div className="bg-blue-50 border-t border-blue-100 px-4 py-2 flex items-start">
                          <Info className="h-4 w-4 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-xs text-blue-700"><strong>Le mode Markdown est activé par défaut.</strong></p>
                        </div>
                      </>
                    )}

                    {activeTab === 'faq' && (
                      <div className="bg-white p-4">
                        <div className="space-y-4 mb-6">
                          {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-200 relative group">
                              <button onClick={() => removeFaq(idx)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 className="w-5 h-5" />
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
                              <input type="text" value={newFaqQ} onChange={e => setNewFaqQ(e.target.value)} placeholder="Ex: Qui peut participer ?" className="mt-1 block w-full rounded-md border border-slate-300 shadow-sm py-2 px-3" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700">Réponse</label>
                              <textarea rows="2" value={newFaqA} onChange={e => setNewFaqA(e.target.value)} placeholder="Saisissez la réponse..." className="mt-1 block w-full rounded-md border border-slate-300 shadow-sm py-2 px-3"></textarea>
                            </div>
                            <div>
                              <button onClick={addFaq} type="button" className="inline-flex items-center rounded-md bg-brand-50 text-brand-700 px-4 py-2 text-sm font-medium hover:bg-brand-100">
                                <Plus className="-ml-1 mr-2 h-5 w-5" /> Ajouter la question
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {currentStep === 3 && (
                <div className="bg-white px-4 py-6 sm:p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium leading-6 text-slate-900">Dates et calendrier</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-slate-700">Ouverture des inscriptions</label>
                      <input type="datetime-local" defaultValue="2026-07-01T08:00" className="mt-1 block w-full rounded-md border border-slate-300 py-2 px-3 shadow-sm" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-slate-700">Clôture des inscriptions</label>
                      <input type="datetime-local" defaultValue="2026-07-31T23:59" className="mt-1 block w-full rounded-md border border-slate-300 py-2 px-3 shadow-sm" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-slate-700">Début du Hackathon</label>
                      <input type="datetime-local" defaultValue="2026-08-05T09:00" className="mt-1 block w-full rounded-md border border-slate-300 py-2 px-3 shadow-sm" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-slate-700">Date limite des soumissions</label>
                      <input type="datetime-local" defaultValue="2026-08-07T12:00" className="mt-1 block w-full rounded-md border border-slate-300 py-2 px-3 shadow-sm" />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {currentStep === 4 && (
                <div className="bg-white px-4 py-6 sm:p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium leading-6 text-slate-900">Thèmes & Format</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Format de l'événement</label>
                      <select className="mt-1 block w-full rounded-md border border-slate-300 py-2 pl-3 pr-10 text-base" defaultValue="Hybride (En ligne + Présentiel)">
                        <option>100% en ligne</option>
                        <option>Hybride (En ligne + Présentiel)</option>
                        <option>Présentiel uniquement</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Thèmes principaux (tags)</label>
                      <input type="text" defaultValue="FinTech, Blockchain, Mobile Money" className="mt-1 block w-full rounded-md border border-slate-300 py-2 px-3" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Technologies imposées ou recommandées</label>
                      <input type="text" defaultValue="React Native, Node.js, API Bancaires" className="mt-1 block w-full rounded-md border border-slate-300 py-2 px-3" />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5 */}
              {currentStep === 5 && (
                <div className="bg-white px-4 py-6 sm:p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium leading-6 text-slate-900">Mentors</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Rechercher des mentors inscrits</label>
                      <div className="mt-1 flex gap-2">
                        <input type="email" placeholder="Email du mentor" className="block w-full rounded-md border border-slate-300 py-2 px-3" />
                        <button type="button" className="inline-flex items-center rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300">Ajouter</button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-slate-700 mb-2">Mentors sélectionnés</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
                          <div className="flex items-center">
                            <img src="https://ui-avatars.com/api/?name=Seydou+Kane&background=047857&color=fff" alt="" className="h-8 w-8 rounded-full" />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-slate-900">Seydou Kane</p>
                              <p className="text-xs text-slate-500">Expert Fintech / API Bancaires</p>
                            </div>
                          </div>
                          <button type="button" className="text-slate-400 hover:text-red-500">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </li>
                        <li className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
                          <div className="flex items-center">
                            <img src="https://ui-avatars.com/api/?name=Aminata+Lo&background=047857&color=fff" alt="" className="h-8 w-8 rounded-full" />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-slate-900">Aminata Lo</p>
                              <p className="text-xs text-slate-500">Lead UX/UI Designer</p>
                            </div>
                          </div>
                          <button type="button" className="text-slate-400 hover:text-red-500">
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6 */}
              {currentStep === 6 && (
                <div className="bg-white px-4 py-6 sm:p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium leading-6 text-slate-900">Branding</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Logo de l'événement</label>
                      <div className="mt-2 flex items-center gap-6 rounded-md border border-slate-200 p-4">
                        <img src="https://ui-avatars.com/api/?name=F+B&background=047857&color=fff&size=128&rounded=true" alt="Logo de l'événement" className="h-20 w-20 rounded-full object-cover border-2 border-white shadow-sm" />
                        <div>
                          <div className="flex text-sm text-slate-600">
                            <label className="relative cursor-pointer rounded-md bg-white font-medium text-brand-600 hover:text-brand-500">
                              <span>Modifier le logo</span>
                              <input type="file" className="sr-only" />
                            </label>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">PNG, JPG jusqu'à 2MB</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Image de couverture (Bannière)</label>
                      <div className="mt-2">
                        <div className="relative h-48 w-full overflow-hidden rounded-md border border-slate-200">
                          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80" alt="Bannière de l'événement" className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <label className="relative cursor-pointer rounded-md bg-white px-4 py-2 font-medium text-slate-900 shadow-sm hover:bg-slate-50">
                              <span>Modifier la bannière</span>
                              <input type="file" className="sr-only" />
                            </label>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">Ratio 16:9 recommandé</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 7 */}
              {currentStep === 7 && (
                <div className="bg-white px-4 py-6 sm:p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium leading-6 text-slate-900">Preview & Soumission</h3>
                  </div>
                  {/* Preview Card */}
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm mb-6">
                    <div className="relative h-48 w-full">
                      <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80" alt="Banner" className="h-full w-full object-cover" />
                      <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur-sm shadow">
                        Hybride
                      </div>
                      <img src="https://ui-avatars.com/api/?name=F+B&background=047857&color=fff&size=128&rounded=true" alt="Logo" className="absolute -bottom-6 left-6 h-16 w-16 rounded-full border-4 border-white shadow-md" />
                    </div>
                    <div className="p-6 pt-10">
                      <div>
                        <h4 className="text-xl font-bold text-slate-900">Fintech Builders Challenge</h4>
                        <p className="mt-1 text-sm text-slate-500">Révolutionnez le paiement mobile en Afrique de l'Ouest avec des solutions innovantes.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-brand-50 border border-brand-200 rounded-md p-4">
                    <div className="flex">
                      <Info className="h-5 w-5 text-brand-400" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-brand-800">Prêt à être publié</h3>
                        <p className="mt-2 text-sm text-brand-700">
                          Votre hackathon passera de brouillon à public.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="bg-slate-50 px-4 py-3 sm:px-6 border-t border-slate-200">
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-4">
                    <button type="button" className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                      Supprimer
                    </button>
                    <button
                      type="button"
                      onClick={handlePrev}
                      className={`inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 ${currentStep === 1 ? 'invisible' : ''}`}
                    >
                      Précédent
                    </button>
                  </div>
                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex justify-center rounded-md bg-brand-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-800"
                    >
                      Étape suivante
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigate('/organizer/hackathons')}
                      className="inline-flex justify-center rounded-md bg-brand-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-800"
                    >
                      Enregistrer les modifications
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
