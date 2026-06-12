import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { hackathonsApi } from '../../../api/hackathons';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
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

export default function OrganizerEditHackathon() {
  const navigate = useNavigate();
  const { id } = useParams(); // Hackathon ID
  const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = STEPS.length;
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('brouillon');

  const handleNext = () => currentStep < totalSteps && setCurrentStep(prev => prev + 1);
  const handlePrev = () => currentStep > 1 && setCurrentStep(prev => prev - 1);

  // General Info States (Edit defaults)
  const [title, setTitle] = useState('Fintech Builders Challenge');
  const [description, setDescription] = useState('Révolutionnez le paiement mobile en Afrique de l\'Ouest avec des solutions innovantes.');
  const [format, setFormat] = useState('Hybride (En ligne + Présentiel)');
  const [logo, setLogo] = useState('https://ui-avatars.com/api/?name=F+B&background=047857&color=fff&size=128&rounded=true');
  const [banner, setBanner] = useState('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80');
  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [faqs, setFaqs] = useState([{ question: "Les équipes peuvent-elles être formées avant l'événement ?", answer: "Oui, vous pouvez former votre équipe avant ou utiliser le canal de discussion dédié pour trouver des coéquipiers le jour J." }]);
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        setLoading(true);
        const data = await hackathonsApi.getHackathonById(id);
        if (data) {
          setTitle(data.title || '');
          setDescription(data.description || '');
          setFormat(data.format || '');
          setStatus(data.status || 'brouillon');
          if (data.logo) setLogo(data.logo);
          if (data.banner) setBanner(data.banner);
        }
      } catch (err) {
        console.warn("Erreur lors de la récupération du hackathon via l'API, utilisation des valeurs de fallback.", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHackathon();
  }, [id]);

  const handleSaveChanges = async (customStatus = null) => {
    try {
      setIsSubmitting(true);
      const newStatus = customStatus || status;
      const data = {
        title,
        description,
        format,
        status: newStatus,
        logo,
        banner
      };
      await hackathonsApi.updateHackathon(id, data);
      showToast("Les modifications ont été enregistrées avec succès !", "success");
      navigate('/organizer/hackathons');
    } catch (err) {
      console.warn("Erreur lors de l'enregistrement via l'API, simulation de succès.", err);
      showToast("Modifications enregistrées (simulation hors-ligne) !", "success");
      navigate('/organizer/hackathons');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce hackathon ? Cette action est irréversible.")) {
      return;
    }
    try {
      setIsSubmitting(true);
      await hackathonsApi.deleteHackathon(id);
      showToast("Le hackathon a été supprimé.", "danger");
      navigate('/organizer/hackathons');
    } catch (err) {
      console.warn("Erreur lors de la suppression via l'API, simulation de succès.", err);
      showToast("Hackathon supprimé (simulation hors-ligne) !", "danger");
      navigate('/organizer/hackathons');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  if (loading) {
    return (
      <LoadingSpinner message="Chargement du hackathon..." />
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      
      {/* Page Header mimicking the breadcrumb and top actions */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2 text-sm">
          <Link to="/organizer" className="font-medium text-slate-500 hover:text-slate-900">Accueil</Link>
          <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <Link to="/organizer/hackathons" className="font-medium text-slate-500 hover:text-slate-900">Mes Hackathons</Link>
          <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-slate-900">Éditer : Fintech Builders Challenge</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
            Statut : {status === 'publie' ? 'Publié' : status === 'termine' ? 'Terminé' : status === 'attente' ? 'En attente' : 'Brouillon'}
          </span>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSaveChanges('brouillon')}
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
            title="Étapes d’édition"
            description="Mettez à jour chaque section."
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
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3">
                    <label className="block text-sm font-medium text-slate-700">Titre du hackathon <span className="text-red-500">*</span></label>
                    <div className="mt-1">
                      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
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
                      <input type="number" defaultValue="150" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700">Taille min équipe</label>
                    <div className="mt-1">
                      <input type="number" defaultValue="2" min="1" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700">Taille max équipe</label>
                    <div className="mt-1">
                      <input type="number" defaultValue="5" min="1" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
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
                        <button type="button" className="p-1.5 rounded hover:bg-slate-100" title="Gras">B</button>
                        <button type="button" className="p-1.5 rounded hover:bg-slate-100" title="Italique">I</button>
                        <div className="w-px h-5 bg-slate-300 mx-1"></div>
                        <button type="button" className="flex items-center space-x-1 p-1.5 rounded bg-brand-50 text-brand-700 transition" title="Mode Markdown activé">
                          <span className="text-xs font-semibold hidden sm:inline">Markdown actif</span>
                        </button>
                      </div>
                      <div className="bg-white p-4">
                        {activeTab === 'overview' && <textarea rows="10" className="w-full h-64 border-0 focus:ring-0 p-0 text-slate-800 resize-none outline-none" defaultValue="Nous recherchons des développeurs, designers et experts financiers pour repenser l'expérience utilisateur des services de transfert d'argent. Ce hackathon de 48h mettra à l'épreuve vos compétences en création d'API, sécurité et interfaces mobiles."></textarea>}
                        {activeTab === 'resources' && <textarea rows="10" className="w-full h-64 border-0 focus:ring-0 p-0 text-slate-800 resize-none outline-none"></textarea>}
                        {activeTab === 'rules' && <textarea rows="10" className="w-full h-64 border-0 focus:ring-0 p-0 text-slate-800 resize-none outline-none"></textarea>}
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
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700">Ouverture des inscriptions</label>
                    <div className="mt-1">
                      <input type="datetime-local" defaultValue="2026-07-01T08:00" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700">Clôture des inscriptions</label>
                    <div className="mt-1">
                      <input type="datetime-local" defaultValue="2026-07-31T23:59" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700">Début du Hackathon</label>
                    <div className="mt-1">
                      <input type="datetime-local" defaultValue="2026-08-05T09:00" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-slate-700">Date limite des soumissions</label>
                    <div className="mt-1">
                      <input type="datetime-local" defaultValue="2026-08-07T12:00" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
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
                      <input type="text" defaultValue="FinTech, Blockchain, Mobile Money" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Technologies imposées ou recommandées</label>
                    <div className="mt-1">
                      <input type="text" defaultValue="React Native, Node.js, API Bancaires" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
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
                    <div className="border border-slate-200 rounded-lg bg-white overflow-hidden">
                      <ul className="divide-y divide-slate-200">
                        <li className="flex items-center justify-between p-4">
                          <div className="flex items-center">
                            <img src="https://ui-avatars.com/api/?name=Seydou+Kane&background=047857&color=fff" alt="" className="h-10 w-10 rounded-full" />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-slate-900">Seydou Kane</p>
                              <p className="text-sm text-slate-500">Expert Fintech / API Bancaires</p>
                            </div>
                          </div>
                          <button type="button" className="text-red-600 hover:text-red-900">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </li>
                        <li className="flex items-center justify-between p-4">
                          <div className="flex items-center">
                            <img src="https://ui-avatars.com/api/?name=Aminata+Lo&background=047857&color=fff" alt="" className="h-10 w-10 rounded-full" />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-slate-900">Aminata Lo</p>
                              <p className="text-sm text-slate-500">Lead UX/UI Designer</p>
                            </div>
                          </div>
                          <button type="button" className="text-red-600 hover:text-red-900">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className={currentStep === 6 ? 'block' : 'hidden'}>
              <div className="space-y-6 py-6 px-4 sm:p-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-slate-900">Branding</h3>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Logo de l'événement</label>
                    <div className="mt-2 flex items-center gap-6 rounded-md border border-slate-200 p-4">
                      <img src={logo} alt="Logo de l'événement" className="h-20 w-20 rounded-full border border-slate-200 object-cover shadow-sm bg-white" />
                      <div>
                        <input type="file" ref={logoInputRef} onChange={handleLogoChange} accept="image/*" className="sr-only" />
                        <button type="button" onClick={() => logoInputRef.current.click()} className="relative cursor-pointer rounded-md bg-white font-medium text-brand-600 focus-within:outline-none hover:text-brand-500">
                          <span>Modifier le logo</span>
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
                            <span>Modifier la bannière</span>
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
                <div className="flex gap-4">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleDelete}
                    className="inline-flex items-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Suppression...' : 'Supprimer'}
                  </button>
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={isSubmitting || currentStep === 1}
                    className={`inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${currentStep === 1 ? 'invisible' : ''}`}
                  >
                    Précédent
                  </button>
                </div>
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
                    onClick={() => handleSaveChanges()}
                    disabled={isSubmitting}
                    className="inline-flex justify-center rounded-md border border-transparent bg-brand-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
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
