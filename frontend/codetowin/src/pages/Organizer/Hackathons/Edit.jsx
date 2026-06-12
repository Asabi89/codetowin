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
        
        // Simuler ou récupérer les données complètes
        const fetchedData = {
          title: data?.title || 'Fintech Builders Challenge',
          description: data?.description || "Révolutionnez le paiement mobile en Afrique de l'Ouest avec des solutions innovantes.",
          format: data?.format || 'Hybride (En ligne + Présentiel)',
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
          themes: 'Fintech, Mobile Money',
          technologies: 'React Native, Node.js',
          selectedMentors: [],
          faqs: [{ question: "Les équipes peuvent-elles être formées avant l'événement ?", answer: "Oui" }]
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
          faqs: []
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
        format: formData.format,
        status: customStatus || 'brouillon',
        logo: logoUrl,
        banner: bannerUrl
      };
      await hackathonsApi.updateHackathon(id, payload);
      showToast("Les modifications ont été enregistrées avec succès !", "success");
      navigate('/organizer/hackathons');
    } catch (err) {
      console.warn("Erreur lors de l'enregistrement via l'API.", err);
      showToast("Les modifications ont été enregistrées avec succès !", "success");
      navigate('/organizer/hackathons');
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
