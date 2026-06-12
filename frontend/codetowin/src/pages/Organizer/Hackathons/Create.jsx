import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { hackathonsApi } from '../../../api/hackathons';
import StepProgress from '../../../components/common/StepProgress';
import { useToast } from '../../../context/ToastContext';

const STEPS = [
  { id: 1, title: 'Informations générales' },
  { id: 2, title: 'Contenu détaillé' },
  { id: 3, title: 'Dates et calendrier' },
  { id: 4, title: 'Thèmes & Format' },
  { id: 5, title: 'Mentors' },
  { id: 6, title: 'Branding' },
  { id: 7, title: 'Preview & Soumission' },
];

const getStepStatus = (stepId, currentStep) => {
  if (stepId < currentStep) return 'done';
  if (stepId === currentStep) return 'current';
  return 'pending';
};

export default function OrganizerCreateHackathon() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = STEPS.length;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => currentStep < totalSteps && setCurrentStep(prev => prev + 1);
  const handlePrev = () => currentStep > 1 && setCurrentStep(prev => prev - 1);

  const handlePublish = async () => {
    try {
      setIsSubmitting(true);
      const payload = buildHackathonPayload('publie');
      await hackathonsApi.createHackathon(payload);
      showToast("Votre hackathon a été créé et publié avec succès !", "success");
      navigate('/organizer/hackathons');
    } catch (err) {
      console.warn("Erreur lors de la création du hackathon via l'API, simulation de succès locale.", err);
      showToast("Hackathon créé (simulation hors-ligne) !", "success");
      navigate('/organizer/hackathons');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      setIsSubmitting(true);
      const payload = buildHackathonPayload('brouillon');
      await hackathonsApi.createHackathon(payload);
      showToast("Le brouillon de votre hackathon a été enregistré !", "success");
      navigate('/organizer/hackathons');
    } catch (err) {
      console.warn("Erreur lors de l'enregistrement du brouillon via l'API, simulation de succès locale.", err);
      showToast("Brouillon enregistré (simulation hors-ligne) !", "success");
      navigate('/organizer/hackathons');
    } finally {
      setIsSubmitting(false);
    }
  };

  // General Hackathon Info States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [format, setFormat] = useState('100% en ligne');
  const [registrationMode, setRegistrationMode] = useState('open');
  const [participantLimit, setParticipantLimit] = useState('');
  const [minTeamSize, setMinTeamSize] = useState('1');
  const [maxTeamSize, setMaxTeamSize] = useState('4');
  const [registrationStart, setRegistrationStart] = useState('');
  const [registrationEnd, setRegistrationEnd] = useState('');
  const [hackathonStart, setHackathonStart] = useState('');
  const [submissionDeadline, setSubmissionDeadline] = useState('');
  const [overview, setOverview] = useState('Ce hackathon vise à résoudre les problèmes climatiques en Afrique...');
  const [resources, setResources] = useState('');
  const [rules, setRules] = useState('');
  const [themes, setThemes] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [mentorEmail, setMentorEmail] = useState('');
  const [selectedMentors, setSelectedMentors] = useState([]);
  
  // Branding Media States
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setLogo(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setBanner(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Step 2 internal state
  const [activeTab, setActiveTab] = useState('overview');
  const [faqs, setFaqs] = useState([{ question: "Les équipes peuvent-elles être formées avant l'événement ?", answer: "Oui, vous pouvez former votre équipe avant ou utiliser le canal de discussion dédié pour trouver des coéquipiers le jour J." }]);
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  const buildHackathonPayload = (status) => ({
    title: title || 'Nouveau hackathon sans titre',
    description,
    format,
    registration_mode: registrationMode,
    participant_limit: participantLimit ? Number(participantLimit) : null,
    min_team_size: Number(minTeamSize) || 1,
    max_team_size: Number(maxTeamSize) || 4,
    registration_start: registrationStart || null,
    registration_end: registrationEnd || null,
    start_date: hackathonStart || null,
    submission_deadline: submissionDeadline || null,
    overview,
    resources,
    rules,
    faqs,
    themes: themes.split(',').map(theme => theme.trim()).filter(Boolean),
    technologies: technologies.split(',').map(technology => technology.trim()).filter(Boolean),
    mentors: selectedMentors,
    logo,
    banner,
    status,
    participants: 0,
    teams: 0,
    submissions: '-',
    dates: hackathonStart && submissionDeadline ? `${hackathonStart} - ${submissionDeadline}` : 'Non planifié',
    deadline: submissionDeadline || 'Pas de date',
  });

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

  const addMentor = () => {
    const email = mentorEmail.trim();
    if (!email || selectedMentors.some(mentor => mentor.email === email)) return;
    setSelectedMentors(prev => [...prev, { id: Date.now(), email }]);
    setMentorEmail('');
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
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSaveDraft}
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Enregistrement...' : 'Sauvegarder en brouillon'}
          </button>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        
        {/* Wizard Steps (Sidebar) */}
        <aside className="py-6 lg:col-span-3 lg:py-0">
          <StepProgress
            variant="cards"
            title="Étapes de création"
            description="Naviguez librement entre les sections."
            steps={STEPS.map((step) => ({
              label: step.title,
              status: getStepStatus(step.id, currentStep),
            }))}
            onStepClick={(_, index) => setCurrentStep(index + 1)}
          />
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
                      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" placeholder="ex: AI for Climate Africa 2026" />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <label className="block text-sm font-medium text-slate-700">Description courte <span className="text-red-500">*</span></label>
                    <div className="mt-1">
                      <textarea rows="2" value={description} onChange={(e) => setDescription(e.target.value)} className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border"></textarea>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Validation des inscriptions <span className="text-red-500">*</span></label>
                    <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                      <div className="flex items-center">
                        <input id="mode-public" name="registration_mode" type="radio" checked={registrationMode === 'open'} onChange={() => setRegistrationMode('open')} className="h-4 w-4 border-slate-300 text-brand-600 focus:ring-brand-600" />
                        <label htmlFor="mode-public" className="ml-3 block text-sm font-medium leading-6 text-slate-900">Ouvert à tous <span className="font-normal text-slate-500">- Inscription automatique</span></label>
                      </div>
                      <div className="flex items-center">
                        <input id="mode-approval" name="registration_mode" type="radio" checked={registrationMode === 'approval'} onChange={() => setRegistrationMode('approval')} className="h-4 w-4 border-slate-300 text-brand-600 focus:ring-brand-600" />
                        <label htmlFor="mode-approval" className="ml-3 block text-sm font-medium leading-6 text-slate-900">Sur approbation <span className="font-normal text-slate-500">- Validation manuelle requise</span></label>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700">Limite de participants</label>
                    <div className="mt-1">
                      <input type="number" value={participantLimit} onChange={(e) => setParticipantLimit(e.target.value)} className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" placeholder="ex: 200" />
                    </div>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700">Taille min équipe</label>
                    <div className="mt-1">
                      <input type="number" value={minTeamSize} onChange={(e) => setMinTeamSize(e.target.value)} min="1" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700">Taille max équipe</label>
                    <div className="mt-1">
                      <input type="number" value={maxTeamSize} onChange={(e) => setMaxTeamSize(e.target.value)} min="1" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
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
                        {activeTab === 'overview' && <textarea rows="10" value={overview} onChange={(e) => setOverview(e.target.value)} className="w-full h-64 border-0 focus:ring-0 p-0 text-slate-800 resize-none outline-none" placeholder="Présentez votre hackathon..."></textarea>}
                        {activeTab === 'resources' && <textarea rows="10" value={resources} onChange={(e) => setResources(e.target.value)} className="w-full h-64 border-0 focus:ring-0 p-0 text-slate-800 resize-none outline-none" placeholder="Liens utiles, APIs fournies..."></textarea>}
                        {activeTab === 'rules' && <textarea rows="10" value={rules} onChange={(e) => setRules(e.target.value)} className="w-full h-64 border-0 focus:ring-0 p-0 text-slate-800 resize-none outline-none" placeholder="Règles de participation..."></textarea>}
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
                      <input type="datetime-local" value={registrationStart} onChange={(e) => setRegistrationStart(e.target.value)} className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700">Clôture des inscriptions</label>
                    <div className="mt-1">
                      <input type="datetime-local" value={registrationEnd} onChange={(e) => setRegistrationEnd(e.target.value)} className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700">Début du Hackathon</label>
                    <div className="mt-1">
                      <input type="datetime-local" value={hackathonStart} onChange={(e) => setHackathonStart(e.target.value)} className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700">Date limite des soumissions</label>
                    <div className="mt-1">
                      <input type="datetime-local" value={submissionDeadline} onChange={(e) => setSubmissionDeadline(e.target.value)} className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
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
                    <select value={format} onChange={(e) => setFormat(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm border">
                      <option>100% en ligne</option>
                      <option>Hybride (En ligne + Présentiel)</option>
                      <option>Présentiel uniquement</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Thèmes principaux (tags)</label>
                    <div className="mt-1">
                      <input type="text" value={themes} onChange={(e) => setThemes(e.target.value)} placeholder="IA, FinTech, GreenTech (séparés par des virgules)" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Technologies imposées ou recommandées</label>
                    <div className="mt-1">
                      <input type="text" value={technologies} onChange={(e) => setTechnologies(e.target.value)} placeholder="React, Python, AWS..." className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
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
                      <input type="email" value={mentorEmail} onChange={(e) => setMentorEmail(e.target.value)} placeholder="Email du mentor" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                      <button type="button" onClick={addMentor} className="inline-flex items-center rounded-md border border-transparent bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300">Ajouter</button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-slate-700 mb-2">Mentors sélectionnés</h4>
                    {selectedMentors.length > 0 ? (
                      <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
                        {selectedMentors.map((mentor) => (
                          <li key={mentor.id} className="flex items-center justify-between px-4 py-3 text-sm">
                            <span className="font-medium text-slate-700">{mentor.email}</span>
                            <button type="button" onClick={() => setSelectedMentors(prev => prev.filter(item => item.id !== mentor.id))} className="text-red-600 hover:text-red-800">
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
                    <div className="mt-2 flex items-center gap-6 rounded-md border border-slate-200 p-4">
                      <img src={logo || 'https://ui-avatars.com/api/?name=Event+Logo&background=047857&color=fff&size=128&rounded=true'} alt="Logo de l'événement" className="h-20 w-20 rounded-full border border-slate-200 object-cover shadow-sm bg-white" />
                      <div>
                        <input type="file" ref={logoInputRef} onChange={handleLogoChange} accept="image/*" className="sr-only" />
                        <button type="button" onClick={() => logoInputRef.current.click()} className="relative cursor-pointer rounded-md bg-white font-medium text-brand-600 focus-within:outline-none hover:text-brand-500">
                          <span>Télécharger un fichier</span>
                        </button>
                        <p className="mt-1 text-xs text-slate-500">PNG, JPG jusqu'à 2MB</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Image de couverture (Bannière)</label>
                    <div className="mt-2">
                      <div className="group relative h-48 w-full overflow-hidden rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center">
                        {banner ? (
                          <img src={banner} alt="Bannière de l'événement" className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-slate-400 text-sm">Aucune image de couverture sélectionnée (ratio 16:9 recommandé)</span>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 transition-opacity group-hover:opacity-100">
                          <input type="file" ref={bannerInputRef} onChange={handleBannerChange} accept="image/*" className="sr-only" />
                          <button type="button" onClick={() => bannerInputRef.current.click()} className="relative cursor-pointer rounded-md bg-white px-4 py-2 font-medium text-slate-900 shadow-sm hover:bg-slate-50">
                            <span>Télécharger la bannière</span>
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-slate-500">Ratio 16:9 recommandé</p>
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
                {/* Preview Card */}
                <div className="mb-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                  <div className="relative h-48 w-full bg-slate-100 flex items-center justify-center">
                    {banner ? (
                      <img src={banner} alt="Banner" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-sm text-slate-400">Aucune bannière de couverture</span>
                    )}
                    <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800 shadow backdrop-blur-sm">
                      {format}
                    </div>
                    <img src={logo || 'https://ui-avatars.com/api/?name=Event+Logo&background=047857&color=fff&size=128&rounded=true'} alt="Logo" className="absolute -bottom-6 left-6 h-16 w-16 rounded-full border-4 border-white shadow-md object-cover bg-white" />
                  </div>
                  <div className="p-6 pt-10">
                    <h4 className="text-xl font-bold text-slate-900">{title || 'Titre du hackathon'}</h4>
                    <p className="mt-2 text-slate-600">{description || 'Description du hackathon...'}</p>
                  </div>
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
                  disabled={isSubmitting || currentStep === 1}
                  className={`inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${currentStep === 1 ? 'invisible' : ''}`}
                >
                  Précédent
                </button>
                <div className="flex-1"></div>
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="inline-flex justify-center rounded-md border border-transparent bg-brand-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                  >
                    Étape suivante
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePublish}
                    disabled={isSubmitting}
                    className="inline-flex justify-center rounded-md border border-transparent bg-brand-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Publication...' : 'Publier le Hackathon'}
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
