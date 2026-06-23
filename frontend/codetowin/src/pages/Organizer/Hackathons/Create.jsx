import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hackathonsApi } from '../../../api/hackathons';
import { useToast } from '../../../context/ToastContext';
import { useImagePreview } from '../../../hooks/useImagePreview';
import { OrganizerContext } from '../../../context/OrganizerContext';
import HackathonWizardShell from '../../../components/features/hackathon/wizard/HackathonWizardShell';

const INITIAL_DATA = {
  title: '',
  description: '',
  format: '100% en ligne',
  location: '',
  prize: '',
  registrationMode: 'open',
  participantLimit: '',
  minTeamSize: '1',
  maxTeamSize: '4',
  registrationStart: '',
  registrationEnd: '',
  hackathonStart: '',
  submissionDeadline: '',
  overview: 'Ce hackathon vise à résoudre les problèmes climatiques en Afrique...',
  resources: '',
  rules: '',
  themes: '',
  technologies: '',
  selectedMentors: [],
  faqs: [{ question: "Les équipes peuvent-elles être formées avant l'événement ?", answer: "Oui, vous pouvez former votre équipe avant ou utiliser le canal de discussion dédié pour trouver des coéquipiers le jour J." }],
  jury_questions: []
};

export default function OrganizerCreateHackathon() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { refreshHackathons } = useContext(OrganizerContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const logoProps = useImagePreview(null);
  const bannerProps = useImagePreview(null);

  const mapFormat = (format) => {
    if (format.includes('en ligne') && !format.includes('Hybride')) return 'En ligne';
    if (format.includes('Présentiel') && !format.includes('Hybride')) return 'Présentiel';
    if (format.includes('Hybride')) return 'Hybride';
    return format;
  };

  const buildHackathonPayload = (formData, logoUrl, bannerUrl, status) => ({
    title: formData.title || 'Nouveau hackathon sans titre',
    description: formData.description,
    type: mapFormat(formData.format),
    location: formData.location || (mapFormat(formData.format) === 'En ligne' ? 'En ligne' : 'TBD'),
    prize: formData.prize || 'À définir',
    registration_mode: formData.registrationMode,
    participant_limit: formData.participantLimit ? Number(formData.participantLimit) : null,
    min_team_size: Number(formData.minTeamSize) || 1,
    max_team_size: Number(formData.maxTeamSize) || 4,
    registration_start: formData.registrationStart || null,
    registration_end: formData.registrationEnd || null,
    start_date: formData.hackathonStart || new Date().toISOString(),
    end_date: formData.submissionDeadline || new Date().toISOString(),
    overview: formData.overview,
    resources: formData.resources,
    rules: formData.rules,
    faqs: formData.faqs,
    jury_questions: formData.jury_questions,
    interest: formData.themes,
    technologies: formData.technologies,
    mentors: formData.selectedMentors,
    logo: logoUrl,
    banner: bannerUrl,
    status,
    deadline: formData.submissionDeadline || 'Pas de date',
  });

  const handlePublish = async (formData, logoUrl, bannerUrl) => {
    try {
      setIsSubmitting(true);
      const payload = buildHackathonPayload(formData, logoUrl, bannerUrl, 'publie');
      await hackathonsApi.createHackathon(payload);
      localStorage.removeItem('hackathonDraftForm');
      await refreshHackathons();
      showToast("Votre hackathon a été créé et publié avec succès !", "success");
      navigate('/organizer/hackathons');
    } catch (err) {
      const apiErrors = err.response?.data;
      if (apiErrors && typeof apiErrors === 'object') {
        setErrors(apiErrors);
        showToast("Le formulaire contient des erreurs. Veuillez vérifier les étapes précédentes.", "error");
      } else {
        showToast("Erreur lors de la création du hackathon. Vérifiez les champs.", "error");
      }
      console.warn("Erreur lors de la création du hackathon:", apiErrors || err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async (formData, logoUrl, bannerUrl) => {
    try {
      setIsSubmitting(true);
      const payload = buildHackathonPayload(formData, logoUrl, bannerUrl, 'brouillon');
      await hackathonsApi.createHackathon(payload);
      localStorage.removeItem('hackathonDraftForm');
      await refreshHackathons();
      showToast("Le brouillon de votre hackathon a été enregistré !", "success");
      navigate('/organizer/hackathons');
    } catch (err) {
      const apiErrors = err.response?.data;
      if (apiErrors && typeof apiErrors === 'object') {
        setErrors(apiErrors);
        showToast("Le formulaire contient des erreurs. Veuillez vérifier les étapes précédentes.", "error");
      } else {
        showToast("Erreur lors de l'enregistrement du brouillon.", "error");
      }
      console.warn("Erreur lors de l'enregistrement du brouillon:", apiErrors || err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <HackathonWizardShell
      mode="create"
      pageTitle="Créer un hackathon"
      initialData={INITIAL_DATA}
      isSubmitting={isSubmitting}
      onSubmit={handlePublish}
      onSaveDraft={handleSaveDraft}
      logoProps={logoProps}
      bannerProps={bannerProps}
      errors={errors}
    />
  );
}
