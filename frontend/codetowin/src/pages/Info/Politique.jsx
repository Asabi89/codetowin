import React from "react";
import PublicPageLayout from "./PublicPageLayout";

export default function Politique() {
  return (
    <PublicPageLayout
      eyebrow="Confidentialité"
      title="Politique de confidentialité"
      intro="Cette politique explique quelles données CodeToWin peut traiter, pourquoi elles sont utilisées, où elles apparaissent dans l’application et comment les utilisateurs peuvent garder le contrôle."
      updatedAt="Dernière mise à jour : 12 juin 2026"
      notice="Dans l’environnement local du projet, certaines données sont stockées dans le navigateur pour simuler une session et un workspace. En production, ces traitements doivent être reliés aux règles de l’API et de l’hébergement utilisés."
      sections={[
        {
          title: "1. Données de compte",
          body: "Lors de l’inscription, la connexion ou la vérification e-mail, CodeToWin peut traiter les informations nécessaires à l’identification de l’utilisateur.",
          items: [
            "Pseudo, adresse e-mail, mot de passe ou fournisseur social utilisé pour la connexion.",
            "Code de vérification e-mail dans le parcours de validation simulé.",
            "Rôle applicatif: participant, mentor ou organisateur selon le compte, l’invitation ou le contexte.",
            "Informations de session, dont un token JWT lorsque l’API est utilisée.",
          ],
        },
        {
          title: "2. Données de profil",
          body: "Le profil permet de présenter les utilisateurs et de faciliter la collaboration.",
          items: [
            "Prénom, nom, titre, bio, pitch, ville, pays et avatar.",
            "Compétences, centres d’intérêt, expertises, disponibilité et domaines techniques.",
            "Liens GitHub, LinkedIn, site web ou portfolio.",
            "Pour les mentors et organisateurs: informations professionnelles, organisation, spécialités et préférences.",
          ],
        },
        {
          title: "3. Données liées aux hackathons",
          body: "CodeToWin traite les informations nécessaires à la création, l’exploration, l’inscription et la gestion des hackathons.",
          items: [
            "Titre, description, dates, lieu, format en ligne ou présentiel, limite de participants, thèmes, technologies, ressources, règles et FAQ.",
            "Inscriptions, statuts d’approbation ou de rejet, participants associés et équipes formées.",
            "Invitations de mentors, assignations de mentors à des équipes et historique de participation.",
            "Annonces, rappels, discussions et notifications liées à un événement.",
          ],
        },
        {
          title: "4. Données d’équipe et de projet",
          body: "Les équipes et soumissions peuvent contenir des informations de travail collaboratif.",
          items: [
            "Nom d’équipe, membres, rôles internes, statut d’invitation et mentor assigné.",
            "Nom du projet, pitch, miniature, description, technologies, dépôt GitHub, démonstration, vidéo et réponses aux questions du hackathon.",
            "Brouillons, aperçu de soumission, statut de soumission finale et évaluations associées.",
            "Commentaires publics des mentors et notes privées destinées aux organisateurs.",
          ],
        },
        {
          title: "5. Données de certificats et résultats",
          body: "Les certificats et résultats servent à prouver une participation ou une distinction.",
          items: [
            "Nom du bénéficiaire, rôle, hackathon, type de certificat, date d’émission, émetteur et code unique.",
            "Statut du certificat: valide, révoqué ou régénéré.",
            "Motif de révocation lorsque cela est nécessaire pour expliquer une invalidation.",
            "Classements, résultats finaux, équipes gagnantes et distinctions publiées par les organisateurs.",
          ],
        },
        {
          title: "6. Messages, notifications et support",
          body: "La messagerie et le support permettent de suivre les échanges opérationnels.",
          items: [
            "Conversations, messages, expéditeurs, destinataires, heures d’envoi et catégories de discussion.",
            "Notifications de nouvelle inscription, invitation mentor, équipe créée, soumission, message ou rappel d’échéance.",
            "Demandes envoyées via la page Contact: nom, e-mail, sujet et message.",
            "Informations de contexte ajoutées volontairement par l’utilisateur pour résoudre un problème.",
          ],
        },
        {
          title: "7. Données techniques",
          body: "Le fonctionnement technique de l’application peut impliquer des données stockées ou transmises par le navigateur.",
          items: [
            "Token d’authentification stocké localement lorsque l’API est utilisée.",
            "État de workspace local comme profil, projet, coéquipiers, progression, liens et statut de soumission.",
            "Paramètres d’interface, filtres, onglets, préférences de notifications ou états de lecture.",
            "Requêtes envoyées à l’API configurée par VITE_API_URL ou, par défaut, localhost:8000/api.",
          ],
        },
        {
          title: "8. Finalités d’utilisation",
          body: "Les données sont utilisées pour fournir les fonctionnalités de la plateforme.",
          items: [
            "Créer et sécuriser les comptes utilisateurs.",
            "Permettre l’inscription aux hackathons, la formation d’équipes et la collaboration.",
            "Gérer les projets, soumissions, évaluations, résultats et certificats.",
            "Afficher les profils publics, le Talent Network et la vérification de certificats.",
            "Envoyer des notifications, faciliter les conversations et répondre aux demandes de support.",
            "Améliorer la qualité de l’expérience et diagnostiquer les erreurs dans les environnements de test.",
          ],
        },
        {
          title: "9. Visibilité publique",
          body: "Certaines données peuvent être visibles sans connexion ou depuis des routes publiques.",
          items: [
            "Profils de talents, mentors ou organisateurs lorsqu’ils sont publiés.",
            "Compétences, pays, ville, disponibilité, liens professionnels, victoires et nombre de certificats.",
            "Hackathons terminés, rôle dans un projet, nom du projet et codes de certificat associés.",
            "Résultat de vérification d’un certificat lorsque le code unique est saisi.",
          ],
        },
        {
          title: "10. Partage des données",
          body: "Les données sont partagées uniquement selon les besoins fonctionnels de la plateforme.",
          items: [
            "Les organisateurs peuvent consulter les inscriptions, équipes, soumissions, évaluations et informations nécessaires à la gestion d’un hackathon.",
            "Les mentors peuvent consulter les équipes et soumissions qui leur sont assignées.",
            "Les participants d’une équipe peuvent voir les informations utiles à la collaboration.",
            "Les visiteurs peuvent voir les profils publics, hackathons publics et certificats vérifiables.",
            "Les données ne doivent pas être revendues ou utilisées hors du cadre prévu sans base légitime et information claire.",
          ],
        },
        {
          title: "11. Conservation",
          body: "La durée de conservation dépend du type de donnée et du contexte d’utilisation.",
          items: [
            "Les données de compte sont conservées tant que le compte existe ou tant qu’elles sont nécessaires à la sécurité.",
            "Les projets, résultats et certificats peuvent être conservés plus longtemps afin de maintenir la preuve de participation.",
            "Les messages et notifications peuvent être conservés pour assurer le suivi des événements et résoudre les litiges.",
            "Dans la version locale, certaines données persistent dans localStorage jusqu’à déconnexion ou nettoyage du navigateur.",
          ],
        },
        {
          title: "12. Sécurité",
          body: "CodeToWin prévoit des accès différenciés par rôle et des routes protégées pour limiter l’accès aux espaces sensibles.",
          items: [
            "Les espaces organisateur et mentor sont protégés par rôle.",
            "Les requêtes API peuvent inclure un token d’autorisation.",
            "Un token expiré ou non autorisé peut être supprimé localement après une erreur 401.",
            "Les utilisateurs doivent choisir un mot de passe robuste, éviter de partager leurs accès et signaler tout usage suspect.",
          ],
        },
        {
          title: "13. Droits des utilisateurs",
          body: "Chaque utilisateur peut demander des informations sur ses données, leur correction ou leur suppression lorsque cela est compatible avec les obligations de preuve, de sécurité et de fonctionnement.",
          items: [
            "Modifier son profil depuis l’espace prévu.",
            "Demander une correction d’un certificat ou d’une information publique.",
            "Demander la suppression ou la limitation de certaines données.",
            "Signaler un contenu abusif, une usurpation ou une erreur de visibilité.",
          ],
        },
        {
          title: "14. Contact confidentialité",
          body: "Pour toute demande liée aux données personnelles, utilisez la page Contact avec l’adresse e-mail du compte, le type de demande, les pages concernées et les éléments permettant d’identifier rapidement le problème.",
        },
      ]}
    />
  );
}
