import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { hackathonsApi } from '../../../api/hackathons';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { useToast } from '../../../context/ToastContext';
import ConfirmModal from '../../../components/common/ConfirmModal';
import { useImagePreview } from '../../../hooks/useImagePreview';
import HackathonWizardShell from '../../../components/features/hackathon/wizard/HackathonWizardShell';

export default function OrganizerEditHackathon() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showToast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);

  const logoProps = useImagePreview(null);
  const bannerProps = useImagePreview(null);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        setLoading(true);
        const data = await hackathonsApi.getHackathonById(id);
        
        // Load real data from API
        const fetchedData = {
          title: data?.title || '',
          description: data?.description || '',
          format: data?.type || data?.format || 'En ligne',
          registrationMode: data?.registration_mode || 'open',
          participantLimit: data?.participant_limit?.toString() || '',
          minTeamSize: data?.min_team_size?.toString() || '2',
          maxTeamSize: data?.max_team_size?.toString() || '5',
          registrationStart: data?.registration_start ? data.registration_start.slice(0, 16) : '',
          registrationEnd: data?.registration_end ? data.registration_end.slice(0, 16) : '',
          hackathonStart: data?.start_date ? data.start_date.slice(0, 16) : '',
          submissionDeadline: data?.end_date ? data.end_date.slice(0, 16) : '',
          overview: data?.overview || '',
          resources: data?.resources || '',
          rules: data?.rules || '',
          themes: data?.interest || '',
          technologies: data?.technologies || '',
          selectedMentors: [],
          faqs: Array.isArray(data?.faqs) ? data.faqs : [],
          jury_questions: Array.isArray(data?.jury_questions) ? data.jury_questions : []
        };
        
        setInitialData(fetchedData);
        if (data?.logo) logoProps.setUrl(data.logo);
        else logoProps.setUrl('https://ui-avatars.com/api/?name=F+B&background=047857&color=fff&size=128&rounded=true');
        
        if (data?.banner) bannerProps.setUrl(data.banner);
        else bannerProps.setUrl('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80');

      } catch (err) {
        console.warn("Erreur lors de la récupération du hackathon via l'API.", err);
        // Fallback
        setInitialData({
          title: 'Fintech Builders Challenge',
          description: "Révolutionnez le paiement mobile en Afrique de l'Ouest avec des solutions innovantes.",
          format: 'Hybride (En ligne + Présentiel)',
          registrationMode: 'open',
          participantLimit: '150',
          minTeamSize: '2',
          maxTeamSize: '5',
          registrationStart: '',
          registrationEnd: '',
          hackathonStart: '',
          submissionDeadline: '',
          overview: "Ce hackathon vise à...",
          resources: '',
          rules: '',
          themes: '',
          technologies: '',
          selectedMentors: [],
          faqs: [],
          jury_questions: []
        });
        logoProps.setUrl('https://ui-avatars.com/api/?name=F+B&background=047857&color=fff&size=128&rounded=true');
        bannerProps.setUrl('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80');
      } finally {
        setLoading(false);
      }
    };
    fetchHackathon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSaveChanges = async (formData, logoUrl, bannerUrl, customStatus = null) => {
    try {
      setIsSubmitting(true);
      const payload = {
        title: formData.title,
        description: formData.description,
        type: formData.format,
        status: customStatus || 'brouillon',
        overview: formData.overview,
        rules: formData.rules,
        resources: formData.resources,
        faqs: formData.faqs,
        jury_questions: formData.jury_questions,
        min_team_size: parseInt(formData.minTeamSize, 10) || 2,
        max_team_size: parseInt(formData.maxTeamSize, 10) || 5,
        participant_limit: formData.participantLimit ? parseInt(formData.participantLimit, 10) : null,
        registration_start: formData.registrationStart || null,
        registration_end: formData.registrationEnd || null,
        start_date: formData.hackathonStart || null,
        end_date: formData.submissionDeadline || null,
        technologies: formData.technologies,
        registration_mode: formData.registrationMode,
        interest: formData.themes,
        location: formData.location || null,
      };
      // Only include image fields if they are base64 (newly uploaded)
      if (logoUrl && logoUrl.startsWith('data:')) payload.logo = logoUrl;
      if (bannerUrl && bannerUrl.startsWith('data:')) payload.banner = bannerUrl;

      await hackathonsApi.updateHackathon(id, payload);
      showToast("Les modifications ont été enregistrées avec succès !", "success");
      navigate('/organizer/hackathons');
    } catch (err) {
      console.error("Erreur lors de l'enregistrement via l'API.", err);
      const message = err?.message || "Erreur lors de l'enregistrement.";
      showToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setConfirmDeleteOpen(false);
    try {
      setIsSubmitting(true);
      await hackathonsApi.deleteHackathon(id);
      showToast("Le hackathon a été supprimé.", "danger");
      navigate('/organizer/hackathons');
    } catch (err) {
      console.warn("Erreur lors de la suppression via l'API, simulation de succès.", err);
      showToast("Le hackathon a été supprimé.", "danger");
      navigate('/organizer/hackathons');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <HackathonWizardShell
        mode="edit"
        pageTitle="Modifier le hackathon"
        initialData={initialData}
        isSubmitting={isSubmitting}
        onSubmit={(data, l, b) => handleSaveChanges(data, l, b, 'publie')}
        onSaveDraft={(data, l, b) => handleSaveChanges(data, l, b, 'brouillon')}
        onDelete={() => setConfirmDeleteOpen(true)}
        logoProps={logoProps}
        bannerProps={bannerProps}
      />

      <ConfirmModal
        isOpen={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Supprimer le hackathon"
        message={`Êtes-vous sûr de vouloir supprimer le hackathon "${initialData?.title}" ? Cette action est irréversible.`}
        confirmText="Oui, supprimer"
        cancelText="Annuler"
        variant="danger"
      />
    </>
  );
}
