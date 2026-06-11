import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function OrganizerCertificate() {
  const { id } = useParams();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-200">
      <style>{`
        .certificate-container {
          width: 297mm;
          height: 210mm; /* A4 Landscape */
          background-color: white;
          margin: 2rem auto;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          position: relative;
          overflow: hidden;
        }
        .certificate-border {
          position: absolute;
          top: 15mm;
          bottom: 15mm;
          left: 15mm;
          right: 15mm;
          border: 2px solid #059669;
          padding: 4px;
        }
        .certificate-inner-border {
          width: 100%;
          height: 100%;
          border: 1px solid #10B981;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
          position: relative;
          background-image: radial-gradient(circle at center, #ffffff 0%, #f8fafc 100%);
        }
        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.03;
          width: 50%;
          pointer-events: none;
        }
        @media print {
          body { background-color: white; margin: 0; }
          .certificate-container { margin: 0; box-shadow: none; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Header with Actions (Not printed) */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between no-print sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to={`/organizer/hackathons/${id}/results`} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700">
            <svg className="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            Retour aux résultats
          </Link>
          <div className="h-6 w-px bg-slate-300"></div>
          <span className="text-sm font-medium text-slate-900">Aperçu du certificat</span>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
            <svg className="-ml-0.5 mr-1.5 h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
              <path d="M3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            </svg>
            Télécharger PDF
          </button>
          <button type="button" onClick={handlePrint} className="inline-flex items-center rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
            <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
            </svg>
            Imprimer
          </button>
        </div>
      </div>

      {/* Certificate Render */}
      <div className="flex-1 overflow-auto py-8">
        <div className="certificate-container">
          {/* Decor corner top-left */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-brand-600 rounded-br-full opacity-10"></div>
          {/* Decor corner bottom-right */}
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand-500 rounded-tl-full opacity-10"></div>
          
          <div className="certificate-border">
            <div className="certificate-inner-border">
              
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" className="watermark" alt="Watermark" />

              <div className="mb-8">
                <img src="../../assets/brand/codetowin-brand.png" alt="CodeToWin" className="h-12 mx-auto" onError={(e) => { e.target.src='https://placehold.co/200x50/047857/white?text=CodeToWin'; }} />
                <span className="ml-2 rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">Organisateur</span>
              </div>

              <h1 className="text-5xl font-serif text-brand-900 tracking-wide uppercase font-bold mb-2">Certificat de Mérite</h1>
              <p className="text-lg text-slate-500 font-medium uppercase tracking-widest mb-10">Ce certificat est fièrement décerné à</p>

              <h2 className="text-6xl font-display font-bold text-slate-900 mb-6 italic">Emmanuel Dubois</h2>

              <p className="text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed mb-12">
                En reconnaissance de sa participation exceptionnelle et de sa <strong>1ère place</strong> avec l'équipe <span className="font-bold text-brand-700">AgriTech Innovators</span> lors de la compétition d'innovation :
              </p>

              <h3 className="text-3xl font-display font-bold text-yellow-500 mb-12">Hackathon "AI for Climate Africa"</h3>

              <div className="w-full max-w-4xl flex justify-between items-end mt-auto px-12 z-10">
                <div className="flex flex-col items-center">
                  <div className="w-48 border-b-2 border-slate-400 mb-2"></div>
                  <p className="font-bold text-slate-900">Dr. Aminata Sow</p>
                  <p className="text-sm text-slate-500">Présidente du Jury</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full border-4 border-yellow-400 bg-yellow-50 flex items-center justify-center mb-4 transform -translate-y-4 shadow-md">
                    <span className="text-yellow-600 font-bold text-center leading-tight">
                      <span className="block text-2xl">🏆</span>
                      <span className="block text-[10px] uppercase mt-1">1er Prix</span>
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">Délivré le 16 Juin 2026</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-48 border-b-2 border-slate-400 mb-2"></div>
                  <p className="font-bold text-slate-900">Moussa Diop</p>
                  <p className="text-sm text-slate-500">Organisateur, TechHub</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
