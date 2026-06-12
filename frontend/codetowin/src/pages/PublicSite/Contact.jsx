import React, { useState } from 'react';
import { Mail, MapPin, Clock, MessageSquare, Check, AlertCircle } from 'lucide-react';
import { validateEmail, validateRequired } from '../../services/validation';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [focusedField, setFocusedField] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateRequired(formData.name)) {
      newErrors.name = 'Le nom complet est obligatoire.';
    }
    if (!validateRequired(formData.email)) {
      newErrors.email = "L'adresse email est obligatoire.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "L'adresse email n'est pas valide.";
    }
    if (!validateRequired(formData.message)) {
      newErrors.message = 'Le message ne peut pas être vide.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'general',
        message: ''
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <div style={{ backgroundColor: '#fafbfb', minHeight: '100vh', fontFamily: '"Inter", sans-serif', padding: '6rem 1.5rem', color: '#1e293b' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header Introduction */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{
            color: '#10b981',
            fontWeight: 800,
            textTransform: 'uppercase',
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            backgroundColor: '#f0fdf4',
            padding: '0.4rem 1rem',
            borderRadius: '9999px',
            border: '1px solid #d1fae5'
          }}>
            Assistance & Relations
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginTop: '1rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Contactez notre équipe
          </h1>
          <p style={{ color: '#475569', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Une question technique, une demande de partenariat ou besoin d'assistance ? Écrivez-nous directement.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '4rem',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Direct Coordinates */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Info Cards */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare style={{ color: '#10b981', width: '22px', height: '22px' }} />
                Informations directes
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Mail */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ backgroundColor: '#f0fdf4', color: '#10b981', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail style={{ width: '22px', height: '22px' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#64748b', margin: '0 0 0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>E-mail général</h4>
                    <a href="mailto:contact@codetowin.com" style={{ fontSize: '1.05rem', fontWeight: 600, color: '#0f172a', textDecoration: 'none', transition: 'color 150ms' }} onMouseEnter={(e) => e.target.style.color = '#10b981'} onMouseLeave={(e) => e.target.style.color = '#0f172a'}>
                      contact@codetowin.com
                    </a>
                  </div>
                </div>

                {/* Localisation */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ backgroundColor: '#f0fdf4', color: '#10b981', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin style={{ width: '22px', height: '22px' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#64748b', margin: '0 0 0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Siège social</h4>
                    <p style={{ fontSize: '1rem', fontWeight: 500, color: '#334155', margin: 0, lineHeight: 1.5 }}>
                      Avenue Cheikh Anta Diop,<br/>Dakar, Sénégal
                    </p>
                  </div>
                </div>

                {/* Clock */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ backgroundColor: '#f0fdf4', color: '#10b981', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock style={{ width: '22px', height: '22px' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#64748b', margin: '0 0 0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Horaires de support</h4>
                    <p style={{ fontSize: '1rem', fontWeight: 500, color: '#334155', margin: 0, lineHeight: 1.5 }}>
                      Lundi - Vendredi : 9h00 - 18h00 GMT<br/>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Temps de réponse moyen : 4 heures</span>
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Safety disclaimer */}
            <div style={{
              background: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)',
              borderRadius: '20px',
              padding: '2.5rem',
              color: '#ffffff',
              boxShadow: '0 10px 25px -5px rgba(2, 44, 34, 0.15)'
            }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.75rem' }}>Une urgence sur un hackathon ?</h4>
              <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                Si vous participez actuellement à un hackathon actif et rencontrez un bug bloquant pour soumettre votre livrable, sélectionnez l'option <strong>"Support Participant"</strong> dans le formulaire afin que votre requête soit traitée en priorité.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '24px',
            padding: '3rem 2.5rem',
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.05)'
          }}>
            
            {submitted && (
              <div style={{
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0',
                borderRadius: '12px',
                padding: '1.25rem',
                color: '#065f46',
                fontWeight: 600,
                fontSize: '0.98rem',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <Check style={{ width: '20px', height: '20px', color: '#10b981', flexShrink: 0 }} />
                <span>Message envoyé ! Nous vous répondrons dans les plus brefs délais.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="name" style={{ fontSize: '0.875rem', fontWeight: 700, color: '#475569' }}>Nom complet</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Ex: Seydou Kane"
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    border: errors.name ? '1px solid #ef4444' : focusedField === 'name' ? '1px solid #10b981' : '1px solid #cbd5e1',
                    fontSize: '0.98rem',
                    outline: 'none',
                    transition: 'all 200ms ease',
                    boxShadow: focusedField === 'name' ? '0 0 0 3px rgba(16, 185, 129, 0.1)' : 'none'
                  }}
                />
                {errors.name && (
                  <span style={{ color: '#ef4444', fontSize: '0.825rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <AlertCircle style={{ width: '14px', height: '14px' }} />
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="email" style={{ fontSize: '0.875rem', fontWeight: 700, color: '#475569' }}>Adresse e-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Ex: seydou@codetowin.com"
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    border: errors.email ? '1px solid #ef4444' : focusedField === 'email' ? '1px solid #10b981' : '1px solid #cbd5e1',
                    fontSize: '0.98rem',
                    outline: 'none',
                    transition: 'all 200ms ease',
                    boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(16, 185, 129, 0.1)' : 'none'
                  }}
                />
                {errors.email && (
                  <span style={{ color: '#ef4444', fontSize: '0.825rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <AlertCircle style={{ width: '14px', height: '14px' }} />
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Subject */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="subject" style={{ fontSize: '0.875rem', fontWeight: 700, color: '#475569' }}>Sujet de votre demande</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    border: focusedField === 'subject' ? '1px solid #10b981' : '1px solid #cbd5e1',
                    fontSize: '0.98rem',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    transition: 'all 200ms ease',
                    boxShadow: focusedField === 'subject' ? '0 0 0 3px rgba(16, 185, 129, 0.1)' : 'none'
                  }}
                >
                  <option value="general">Informations générales</option>
                  <option value="participant">Support Participant (Équipes, Hackathons)</option>
                  <option value="organizer">Intégration Organisateur (Créer un événement)</option>
                  <option value="mentor">Devenir Mentor sur la plateforme</option>
                  <option value="sponsorship">Sponsoring & Partenariats</option>
                </select>
              </div>

              {/* Message */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="message" style={{ fontSize: '0.875rem', fontWeight: 700, color: '#475569' }}>Votre message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Écrivez votre message ici..."
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    border: errors.message ? '1px solid #ef4444' : focusedField === 'message' ? '1px solid #10b981' : '1px solid #cbd5e1',
                    fontSize: '0.98rem',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    lineHeight: 1.5,
                    transition: 'all 200ms ease',
                    boxShadow: focusedField === 'message' ? '0 0 0 3px rgba(16, 185, 129, 0.1)' : 'none'
                  }}
                ></textarea>
                {errors.message && (
                  <span style={{ color: '#ef4444', fontSize: '0.825rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <AlertCircle style={{ width: '14px', height: '14px' }} />
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: isSubmitting ? '#a7f3d0' : '#10b981',
                  color: '#ffffff',
                  border: 'none',
                  padding: '1rem 1.5rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  marginTop: '0.5rem',
                  transition: 'all 200ms ease',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.2)',
                  transform: hoveredBtn ? 'translateY(-1px)' : 'none'
                }}
                onMouseEnter={() => setHoveredBtn(true)}
                onMouseLeave={() => setHoveredBtn(false)}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
