import React from "react";
import PublicPageLayout from "./PublicPageLayout";

export default function Conditions() {
  return (
    <PublicPageLayout
      eyebrow="Cadre d’utilisation"
      title="Conditions d’utilisation"
      intro="Ces conditions décrivent les règles d’utilisation de CodeToWin pour les participants, mentors, organisateurs et visiteurs qui consultent les profils publics ou les certificats."
      updatedAt="Dernière mise à jour : 12 juin 2026"
      notice="Ce contenu est adapté au fonctionnement actuel de l’application CodeToWin. Il ne remplace pas un avis juridique personnalisé, mais sert de base claire pour le prototype et les pages publiques."
      sections={[
        {
          title: "1. Objet de la plateforme",
          body: "CodeToWin connecte les talents tech, les équipes, les mentors et les organisateurs autour de hackathons. La plateforme permet notamment d’explorer des événements, créer des profils, former des équipes, soumettre des projets, évaluer des travaux, publier des résultats et vérifier des certificats.",
        },
        {
          title: "2. Comptes utilisateurs",
          body: "Chaque utilisateur doit fournir des informations exactes lors de son inscription et garder ses accès confidentiels.",
          items: [
            "L’inscription publique crée un compte participant par défaut.",
            "Les rôles mentor et organisateur donnent accès à des espaces spécialisés et peuvent être attribués selon le contexte, une invitation ou une configuration administrative.",
            "Vous êtes responsable des actions réalisées avec votre compte, y compris les soumissions, messages, invitations et modifications de profil.",
            "CodeToWin peut limiter ou suspendre un compte en cas de fraude, usurpation, abus, spam, plagiat, contenu interdit ou violation des règles d’un hackathon.",
          ],
        },
        {
          title: "3. Règles pour les participants",
          body: "Les participants s’engagent à respecter les règles générales de CodeToWin et les règles propres à chaque hackathon.",
          items: [
            "Compléter son profil avec des informations sincères et utiles à la collaboration.",
            "Respecter les autres participants, mentors, organisateurs et membres de la communauté.",
            "Soumettre uniquement des projets autorisés, dont l’équipe possède les droits ou les permissions nécessaires.",
            "Ne pas présenter un projet plagié, trompeur, dangereux ou contraire aux règles de l’événement.",
            "Accepter que certains éléments de participation, projet, rôle, classement ou certificat soient affichés publiquement lorsque la fonctionnalité le prévoit.",
          ],
        },
        {
          title: "4. Équipes, invitations et collaboration",
          body: "Les équipes sont utilisées pour organiser la participation à un hackathon.",
          items: [
            "Le leader d’équipe peut inviter des membres par e-mail ou lien d’invitation.",
            "Chaque membre doit contribuer de bonne foi et respecter le périmètre du projet.",
            "Les rôles internes comme Team Leader ou Developer servent à clarifier les responsabilités, sans créer de relation contractuelle entre CodeToWin et les membres.",
            "Les conflits d’équipe doivent être signalés à l’organisateur ou au support avec les éléments nécessaires à la résolution.",
          ],
        },
        {
          title: "5. Projets et soumissions",
          body: "Une soumission peut inclure le nom du projet, le pitch, une image, une description, les technologies utilisées, un dépôt de code, une démonstration, une vidéo et des réponses à des questions spécifiques.",
          items: [
            "Vous devez vérifier les informations avant l’envoi définitif du projet.",
            "Les liens externes fournis doivent être accessibles, légitimes et compatibles avec les règles du hackathon.",
            "CodeToWin ou l’organisateur peut refuser, masquer ou invalider une soumission qui viole les règles, les droits d’autrui ou la sécurité de la plateforme.",
            "Une soumission définitive peut être consultée par les organisateurs, mentors assignés, évaluateurs et, selon le cas, affichée dans les résultats ou profils publics.",
          ],
        },
        {
          title: "6. Règles pour les organisateurs",
          body: "Les organisateurs utilisent CodeToWin pour créer et administrer des hackathons.",
          items: [
            "Ils doivent publier des informations claires: dates, format, règles, ressources, critères, récompenses, FAQ et modalités de participation.",
            "Ils peuvent approuver ou rejeter des inscriptions, gérer les participants, équipes, mentors, annonces, soumissions, évaluations, résultats et certificats.",
            "Ils doivent traiter les participants et mentors de manière équitable, documenter les décisions importantes et éviter toute manipulation abusive des résultats.",
            "Ils sont responsables du contenu qu’ils publient, des ressources fournies et des annonces envoyées aux participants.",
          ],
        },
        {
          title: "7. Règles pour les mentors",
          body: "Les mentors accompagnent les équipes et peuvent évaluer les soumissions qui leur sont assignées.",
          items: [
            "Un mentor peut accepter ou refuser une invitation de mentorat.",
            "Il doit donner des retours constructifs, respecter la confidentialité des informations sensibles et éviter les conflits d’intérêts.",
            "Les commentaires publics sont destinés aux équipes; les notes privées sont destinées aux organisateurs.",
            "Un mentor ne doit pas utiliser les idées, documents ou projets d’une équipe sans autorisation.",
          ],
        },
        {
          title: "8. Évaluations, résultats et certificats",
          body: "Les évaluations et résultats peuvent servir à établir un classement et à générer des certificats.",
          items: [
            "Les organisateurs définissent ou appliquent une grille d’évaluation selon les critères du hackathon.",
            "Les certificats peuvent représenter une participation, une place de finaliste, une contribution mentor ou une distinction.",
            "Chaque certificat vérifiable possède un code unique et peut afficher le bénéficiaire, le rôle, l’événement, le type, la date, l’émetteur et le statut.",
            "Un certificat peut être révoqué ou régénéré si une erreur, une fraude, un plagiat ou une violation de règles est détecté.",
          ],
        },
        {
          title: "9. Profils publics et Talent Network",
          body: "CodeToWin met en avant certains profils, compétences, certificats, hackathons terminés et disponibilités dans un réseau public de talents.",
          items: [
            "Les informations publiques peuvent inclure nom, titre, pays, ville, bio, avatar, compétences, liens professionnels, victoires, certificats et projets associés.",
            "Les visiteurs, recruteurs, organisateurs et mentors peuvent consulter ces profils selon les routes publiques prévues.",
            "Vous devez éviter de publier des informations confidentielles, sensibles ou appartenant à autrui dans votre profil.",
          ],
        },
        {
          title: "10. Messages, annonces et notifications",
          body: "La plateforme inclut des conversations, annonces et notifications liées aux hackathons.",
          items: [
            "Les messages doivent rester professionnels, utiles et respectueux.",
            "Les annonces officielles d’un hackathon peuvent contenir des rappels, consignes, changements de calendrier ou informations de cérémonie.",
            "Les notifications signalent des événements importants: invitation, assignation, nouveau message, nouvelle soumission, équipe créée ou rappel de deadline.",
            "CodeToWin peut retirer ou limiter un contenu abusif, offensant, frauduleux ou contraire aux règles de la communauté.",
          ],
        },
        {
          title: "11. Propriété intellectuelle",
          body: "Chaque utilisateur conserve les droits qu’il détient sur ses contenus, projets, textes, images et liens.",
          items: [
            "En publiant un projet ou profil, vous autorisez CodeToWin à l’afficher, l’héberger, le référencer et le présenter dans le cadre de la plateforme.",
            "Vous garantissez disposer des droits nécessaires sur les éléments soumis, y compris code, visuels, textes, vidéos, modèles et jeux de données.",
            "Les marques, logos, contenus et interfaces CodeToWin ne peuvent pas être copiés ou réutilisés sans autorisation.",
          ],
        },
        {
          title: "12. Sécurité et usages interdits",
          body: "Il est interdit d’utiliser CodeToWin d’une manière qui nuit à la plateforme, aux utilisateurs ou aux partenaires.",
          items: [
            "Ne tentez pas d’accéder aux comptes, espaces, APIs ou données qui ne vous sont pas destinés.",
            "N’envoyez pas de code malveillant, lien dangereux, contenu trompeur, spam ou tentative de phishing.",
            "Ne contournez pas les protections d’accès, routes protégées, rôles ou validations de la plateforme.",
            "Ne surchargez pas volontairement les services, endpoints ou espaces de messagerie.",
          ],
        },
        {
          title: "13. Disponibilité et version de démonstration",
          body: "Le projet contient des écrans connectés à une API et des données de démonstration utilisées lorsque l’API n’est pas disponible.",
          items: [
            "Certaines actions locales peuvent être simulées avec localStorage ou des jeux de données mockés.",
            "Les fonctionnalités peuvent évoluer, être temporairement indisponibles ou changer selon l’environnement de déploiement.",
            "CodeToWin ne garantit pas l’absence totale d’erreurs dans une version de test ou de prototype.",
          ],
        },
        {
          title: "14. Contact et signalement",
          body: "Pour signaler un problème de compte, certificat, projet, contenu, sécurité ou comportement, utilisez la page Contact en ajoutant les détails utiles: e-mail du compte, nom du hackathon, équipe, code certificat et capture si nécessaire.",
        },
      ]}
    />
  );
}
