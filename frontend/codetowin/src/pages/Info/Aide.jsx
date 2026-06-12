import React from "react";
import PublicPageLayout from "./PublicPageLayout";

export default function Aide() {
  return (
    <PublicPageLayout
      eyebrow="Support"
      title="Centre d’aide CodeToWin"
      intro="Un guide complet pour utiliser CodeToWin: inscription, hackathons, équipes, projets, mentors, organisateurs, certificats, messages et profils publics."
      updatedAt="Support fonctionnel pour les participants, mentors et organisateurs"
      notice="Astuce: si vous utilisez la version locale du projet, certaines actions peuvent être simulées côté navigateur ou basculer sur des données de démonstration lorsque l’API n’est pas disponible."
      sections={[
        {
          title: "1. Créer un compte et se connecter",
          body: "L’inscription crée un compte participant par défaut. Après validation de l’e-mail, l’utilisateur est redirigé vers son profil afin de compléter ses informations.",
          items: [
            "Renseignez un pseudo, une adresse e-mail, un mot de passe et confirmez le mot de passe.",
            "Un code de vérification à six chiffres est généré pour simuler la validation e-mail.",
            "Les connexions GitHub et Google sont présentes dans l’interface et créent aussi un profil participant de démonstration.",
            "La connexion peut déduire un rôle mentor ou organisateur selon le contexte de redirection, mais l’inscription publique reste centrée sur les participants.",
          ],
        },
        {
          title: "2. Compléter son profil participant",
          body: "Le profil sert à présenter vos compétences et à rendre votre participation plus crédible auprès des équipes, mentors, organisateurs et recruteurs.",
          items: [
            "Ajoutez votre prénom, nom, titre professionnel, bio, pitch, ville, pays et photo de profil.",
            "Renseignez vos compétences, centres d’intérêt, GitHub, LinkedIn et site personnel.",
            "Ces informations alimentent le profil public et peuvent aider à apparaître dans le Talent Network.",
            "Vous pouvez revenir modifier vos informations depuis l’espace profil.",
          ],
        },
        {
          title: "3. Explorer les hackathons",
          body: "La page d’exploration regroupe les hackathons disponibles avec recherche, filtres et fiches détaillées.",
          items: [
            "Recherchez un hackathon par nom, thème, technologie, lieu, format ou mots-clés.",
            "Consultez les dates, le lieu, le nombre de participants, le prix, le format en ligne ou présentiel et les informations principales.",
            "Ouvrez une fiche hackathon pour accéder à la présentation, aux pistes, aux règles, aux ressources, aux participants, aux annonces, aux discussions et à la FAQ.",
            "Certains hackathons peuvent demander l’acceptation de règles ou conditions spécifiques avant la soumission finale.",
          ],
        },
        {
          title: "4. Rejoindre ou gérer une équipe",
          body: "CodeToWin organise le travail autour d’équipes, avec un leader, des membres, des invitations et des rôles internes.",
          items: [
            "Depuis une fiche hackathon, vous pouvez voir les participants inscrits et rechercher des profils par nom ou compétence.",
            "Un leader d’équipe peut inviter un membre par e-mail ou générer un lien d’invitation.",
            "Le workspace garde la liste des coéquipiers, leur statut et leur rôle comme Team Leader ou Developer.",
            "Les organisateurs et mentors peuvent consulter les équipes, leurs membres, le mentor assigné et l’avancement du projet.",
          ],
        },
        {
          title: "5. Préparer et soumettre un projet",
          body: "Le workspace projet permet de construire une soumission complète étape par étape.",
          items: [
            "Renseignez le nom du projet, un pitch court, une image ou miniature, puis les détails du projet.",
            "Ajoutez les technologies utilisées, le dépôt GitHub, le lien de démonstration et une vidéo de présentation si disponible.",
            "Répondez aux questions spécifiques du hackathon, par exemple l’intégration MCP ou les choix de sécurité.",
            "Avant la soumission, vérifiez l’aperçu public, acceptez les directives puis envoyez le projet définitivement.",
          ],
        },
        {
          title: "6. Utiliser les ressources, annonces et discussions",
          body: "Les hackathons peuvent fournir une boîte à outils, des liens de documentation, des annonces officielles et un espace de discussion.",
          items: [
            "Consultez les ressources pour retrouver la documentation, les APIs fournies, les guides techniques et les modèles de départ.",
            "Lisez les annonces pour suivre les rappels de dates, consignes et messages d’organisation.",
            "Utilisez les discussions pour demander de l’aide, chercher un coéquipier ou suivre les sujets ouverts par la communauté.",
            "Les messages importants peuvent aussi apparaître dans l’espace de notifications.",
          ],
        },
        {
          title: "7. Vérifier un certificat",
          body: "La page de vérification permet de contrôler publiquement la validité d’un certificat CodeToWin avec un code unique.",
          items: [
            "Saisissez un code comme VALID-PARTICIPANT-101, VALID-FINALIST-202, VALID-MENTOR-303 ou REVOKED-404 dans l’outil de vérification.",
            "Un certificat valide affiche le bénéficiaire, le rôle, le hackathon, le type, la date d’émission et l’émetteur.",
            "Un certificat révoqué peut afficher la raison de révocation, par exemple une règle non respectée.",
            "Les organisateurs peuvent générer des certificats depuis les résultats ou l’espace certificat d’un hackathon.",
          ],
        },
        {
          title: "8. Comprendre le Talent Network",
          body: "Le Talent Network met en avant les profils publics, compétences, pays, disponibilités, victoires et certificats.",
          items: [
            "Les visiteurs peuvent rechercher des talents par nom, poste, compétence ou pays.",
            "Une fiche talent affiche la bio, les liens professionnels, les compétences, les hackathons terminés, les rôles et les certificats associés.",
            "Les profils organisateurs et mentors disposent aussi de pages publiques consultables depuis les dashboards.",
            "Les utilisateurs connectés restent dans leur espace tout en consultant des profils publics via des routes embarquées sécurisées.",
          ],
        },
        {
          title: "9. Espace organisateur",
          body: "L’organisateur pilote la création, la publication et le suivi des hackathons.",
          items: [
            "Créez ou modifiez un hackathon avec titre, dates, limite de participants, description, règles, ressources, FAQ, thèmes et technologies.",
            "Gérez les participants: recherche, statut en attente, approbation, rejet et consultation de profil.",
            "Suivez les équipes, assignez des mentors, consultez les soumissions, configurez l’évaluation et publiez les résultats.",
            "Envoyez des annonces, gérez les membres de l’organisation, les messages, les notifications et les paramètres de l’organisation.",
          ],
        },
        {
          title: "10. Espace mentor",
          body: "Le mentor accompagne des équipes, répond aux invitations et évalue les projets assignés.",
          items: [
            "Acceptez ou refusez les invitations de mentorat envoyées par des organisateurs.",
            "Consultez vos équipes assignées, leur progression, leurs jalons, les membres et les détails de projet.",
            "Accédez aux soumissions par hackathon, ouvrez une soumission et ajoutez une évaluation.",
            "Rédigez des commentaires publics pour l’équipe et des notes privées réservées à l’organisation.",
          ],
        },
        {
          title: "11. Messagerie et notifications",
          body: "Les espaces mentor et organisateur disposent de conversations et notifications pour suivre l’activité.",
          items: [
            "Les conversations peuvent concerner des participants, équipes, mentors ou membres d’organisation.",
            "Les notifications signalent les invitations, messages, nouvelles équipes, soumissions, rappels de fin et actions importantes.",
            "Vous pouvez marquer une notification comme lue ou marquer toutes les notifications comme lues.",
            "Si l’API est indisponible, certains écrans utilisent des données de démonstration afin de garder l’interface testable.",
          ],
        },
        {
          title: "12. Problèmes fréquents",
          body: "Voici les vérifications rapides à faire avant de contacter le support.",
          items: [
            "Mot de passe refusé: vérifiez que le mot de passe et sa confirmation sont identiques.",
            "Certificat introuvable: contrôlez le code exact, les majuscules et les tirets.",
            "Projet non soumis: assurez-vous d’avoir accepté les directives et complété les champs obligatoires.",
            "Profil incomplet: retournez sur la page profil et renseignez les champs publics utiles.",
            "Données étranges en local: déconnectez-vous pour réinitialiser l’état stocké dans le navigateur.",
          ],
        },
      ]}
    />
  );
}
