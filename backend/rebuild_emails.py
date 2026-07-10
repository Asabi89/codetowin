import os

BASE_DIR = r"c:\Users\admin\Documents\project\HACKafri\backend\templates\emails"

def get_template(content):
    return f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f7f6; margin: 0; padding: 0; }}
        .container {{ max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); }}
        .header {{ background: #ffffff; padding: 30px; text-align: center; border-bottom: 1px solid #f0f0f0; }}
        .header img {{ height: 45px; object-fit: contain; }}
        .content {{ padding: 40px 30px; color: #4a5568; line-height: 1.6; font-size: 16px; }}
        .content h1 {{ color: #1a202c; font-size: 22px; font-weight: 700; margin-top: 0; margin-bottom: 20px; }}
        .footer {{ background: #f8fafc; padding: 30px; text-align: center; font-size: 13px; color: #a0aec0; border-top: 1px solid #f0f0f0; }}
        .button {{ display: inline-block; background-color: #047857; color: #ffffff !important; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 20px; margin-bottom: 20px; }}
        .otp-box {{ background: #f1f5f9; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 20px; text-align: center; font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #0f172a; margin: 30px 0; }}
        .data-box {{ background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #047857; }}
        .data-box p {{ margin: 5px 0; }}
    </style>
</head>
<body>
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7f6; margin: 0; padding: 0;">
        <tr>
            <td align="center">
                <div class="container">
                    <div class="header">
                        <img src="https://codetowin.pro/assets/brand/codetowin-brand.png" alt="CodeToWin">
                    </div>
                    <div class="content">
                        {content}
                        <p style="margin-top: 30px;">Cordialement,<br><strong>L'équipe CodeToWin</strong></p>
                    </div>
                    <div class="footer">
                        &copy; 2026 CodeToWin. Tous droits réservés.<br>
                        La plateforme de référence pour les hackathons technologiques en Afrique.<br><br>
                        <a href="https://codetowin.pro" style="color: #a0aec0; text-decoration: underline;">codetowin.pro</a>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>"""

emails = {
    'email-welcome.html': """
        <h1>Bienvenue sur CodeToWin ! 🚀</h1>
        <p>Bonjour,</p>
        <p>Nous sommes ravis de vous compter parmi nous. CodeToWin est la plateforme idéale pour participer aux meilleurs hackathons, démontrer vos compétences, et innover en équipe.</p>
        <p>Votre compte est maintenant actif. Vous pouvez dès à présent explorer les hackathons ouverts et rejoindre une équipe.</p>
        <div style="text-align: center;">
            <a href="{{ dashboardUrl }}" class="button">Accéder à mon tableau de bord</a>
        </div>
    """,
    'email-otp.html': """
        <h1>Votre code de vérification</h1>
        <p>Bonjour,</p>
        <p>Pour finaliser votre démarche sur CodeToWin, veuillez utiliser le code de vérification ci-dessous :</p>
        <div class="otp-box">{{ otp }}</div>
        <p>Ce code expirera dans quelques minutes. Si vous n'avez pas demandé ce code, vous pouvez ignorer cet e-mail.</p>
    """,
    'email-password-reset.html': """
        <h1>Réinitialisation de votre mot de passe</h1>
        <p>Bonjour,</p>
        <p>Nous avons reçu une demande de réinitialisation de votre mot de passe pour votre compte CodeToWin.</p>
        <p>Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe :</p>
        <div style="text-align: center;">
            <a href="{{ resetUrl }}" class="button">Réinitialiser mon mot de passe</a>
        </div>
        <p>Si vous n'avez pas fait cette demande, votre compte est en sécurité et vous pouvez ignorer cet e-mail.</p>
    """,
    'email-new-message.html': """
        <h1>Nouveau message reçu</h1>
        <p>Bonjour,</p>
        <p>Vous avez reçu un nouveau message de la part de <strong>{{ senderName }}</strong> sur la plateforme CodeToWin.</p>
        <div class="data-box">
            <p style="color: #64748b; font-style: italic;">"{{ messagePreview }}..."</p>
        </div>
        <div style="text-align: center;">
            <a href="{{ messagesUrl }}" class="button">Lire le message</a>
        </div>
    """,
    'email-hackathon-joined.html': """
        <h1>Inscription confirmée ! 🎉</h1>
        <p>Bonjour <strong>{{ participantName }}</strong>,</p>
        <p>Votre inscription au hackathon <strong>{{ hackathonName }}</strong> organisé par <em>{{ organizerName }}</em> a bien été confirmée.</p>
        <p>Préparez-vous à collaborer, créer, et innover ! Vous pouvez consulter les détails et les ressources du hackathon directement sur votre espace.</p>
        <div style="text-align: center;">
            <a href="{{ hackathonUrl }}" class="button">Voir le hackathon</a>
        </div>
    """,
    'email-project-submitted.html': """
        <h1>Projet soumis avec succès ! 🏆</h1>
        <p>Bonjour <strong>{{ participantName }}</strong>,</p>
        <p>Félicitations ! Votre projet <strong>{{ projectName }}</strong> a été soumis avec succès pour le hackathon <strong>{{ hackathonName }}</strong>.</p>
        <p>Les organisateurs et mentors vont maintenant pouvoir examiner votre travail. Nous vous souhaitons une excellente réussite pour l'évaluation !</p>
        <div style="text-align: center;">
            <a href="{{ projectUrl }}" class="button">Voir mon projet</a>
        </div>
    """,
    'email-invite-member.html': """
        <h1>Invitation à rejoindre une équipe</h1>
        <p>Bonjour,</p>
        <p>Vous avez été invité(e) à rejoindre l'organisation/équipe <strong>{{ organizationName }}</strong> sur CodeToWin, avec le rôle : <strong>{{ roleName }}</strong>.</p>
        {% if tempPassword %}
        <div class="data-box">
            <p>Un compte a été créé pour vous.</p>
            <p><strong>Mot de passe temporaire :</strong> {{ tempPassword }}</p>
            <p style="font-size: 13px; margin-top: 10px; color: #ef4444;">Veuillez le modifier dès votre première connexion.</p>
        </div>
        {% endif %}
        <p>Cliquez sur le bouton ci-dessous pour accepter l'invitation et accéder à votre espace :</p>
        <div style="text-align: center;">
            <a href="{{ inviteUrl }}" class="button">Accepter l'invitation</a>
        </div>
    """,
    'email-mentor-invite.html': """
        <h1>Invitation Mentor 🎓</h1>
        <p>Bonjour <strong>{{ mentorName }}</strong>,</p>
        <p>L'organisateur <em>{{ organizerName }}</em> vous invite à devenir Mentor pour le hackathon <strong>{{ hackathonName }}</strong>.</p>
        <p>En tant que mentor, votre expertise guidera les équipes vers l'excellence tout au long de l'événement.</p>
        <p>Veuillez vous rendre sur votre tableau de bord pour accepter ou refuser cette invitation :</p>
        <div style="text-align: center;">
            <a href="{{ dashboardUrl }}" class="button">Gérer l'invitation</a>
        </div>
    """
}

os.makedirs(BASE_DIR, exist_ok=True)

for filename, content in emails.items():
    filepath = os.path.join(BASE_DIR, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(get_template(content))
    print(f"Generated {filename}")
