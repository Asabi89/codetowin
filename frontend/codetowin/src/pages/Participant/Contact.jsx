import React, { useState } from 'react';
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
      newErrors.name = 'Le nom est obligatoire.';
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

    // Simulate successful form submission
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
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', padding: '2.5rem' }}>
        
        <span style={{ color: '#047857', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.825rem', letterSpacing: '0.05em' }}>
          Assistance & Relations
        </span>
        
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
          Contactez-Nous
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem' }}>
          Notre équipe est là pour vous aider. Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
        </p>

        {submitted && (
          <div style={{
            backgroundColor: '#ecfdf5',
            border: '1px solid #10b981',
            borderRadius: '8px',
            padding: '1rem',
            color: '#065f46',
            fontWeight: 500,
            fontSize: '0.95rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>✓</span> Votre message a été envoyé avec succès ! Nous vous recontacterons très bientôt.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label htmlFor="name" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Nom complet</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Seydou Kane"
              style={{
                padding: '0.65rem 0.85rem',
                borderRadius: '6px',
                border: errors.name ? '1px solid #ef4444' : '1px solid #cbd5e1',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 150ms'
              }}
            />
            {errors.name && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 500 }}>{errors.name}</span>}
          </div>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label htmlFor="email" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Adresse e-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ex: seydou@codetowin.com"
              style={{
                padding: '0.65rem 0.85rem',
                borderRadius: '6px',
                border: errors.email ? '1px solid #ef4444' : '1px solid #cbd5e1',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 150ms'
              }}
            />
            {errors.email && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 500 }}>{errors.email}</span>}
          </div>

          {/* Query Type */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label htmlFor="subject" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Sujet de votre demande</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              style={{
                padding: '0.65rem 0.85rem',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem',
                backgroundColor: '#fff',
                outline: 'none'
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label htmlFor="message" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569' }}>Votre message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Écrivez votre message ici..."
              style={{
                padding: '0.65rem 0.85rem',
                borderRadius: '6px',
                border: errors.message ? '1px solid #ef4444' : '1px solid #cbd5e1',
                fontSize: '0.95rem',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                transition: 'border-color 150ms'
              }}
            ></textarea>
            {errors.message && <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 500 }}>{errors.message}</span>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={{
              backgroundColor: '#047857',
              color: '#fff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              marginTop: '0.5rem',
              transition: 'background-color 150ms'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#065f46'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#047857'}
          >
            Envoyer le message
          </button>

        </form>
      </div>
    </div>
  );
}
