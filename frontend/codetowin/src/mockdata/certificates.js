// Fictional dataset of certificates for verification simulator
export const mockCertificates = {
  'VALID-PARTICIPANT-101': {
    recipient: 'Seydou Kane',
    role: 'Participant',
    hackathon: 'CodeToWin Africa AI Sprint',
    type: 'Participation',
    issuedDate: '2026-06-12',
    issuer: 'TechHub Sénégal & CodeToWin',
    status: 'valid'
  },
  'VALID-FINALIST-202': {
    recipient: 'Aminata Diop',
    role: 'Finaliste (Top 5)',
    hackathon: 'CodeToWin Africa AI Sprint',
    type: 'Finalist',
    issuedDate: '2026-06-12',
    issuer: 'TechHub Sénégal & CodeToWin',
    status: 'valid'
  },
  'VALID-MENTOR-303': {
    recipient: 'Papa Demba',
    role: 'Mentor Expert',
    hackathon: 'Product Design Hack Weekend',
    type: 'Contribution mentor',
    issuedDate: '2026-06-14',
    issuer: 'Lagos Design Society',
    status: 'valid'
  },
  'REVOKED-404': {
    recipient: 'John Doe',
    role: 'Participant',
    hackathon: 'Data for Impact Challenge',
    type: 'Participation',
    issuedDate: '2026-05-20',
    issuer: 'Nairobi Analytics Lab',
    status: 'revoked',
    reason: 'Règles du hackathon non respectées (Plagiat de projet).'
  }
};
