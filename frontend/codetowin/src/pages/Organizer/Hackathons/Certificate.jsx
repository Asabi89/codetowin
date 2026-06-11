import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Download, Printer } from 'lucide-react';
import codetowinLogo from '../../../assets/brand/codetowin-brand.png'; // Assuming it's here, or use placeholder

export default function OrganizerCertificate() {
  const { id } = useParams();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-200">
      
      {/* Header with Actions (Not printed) */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between print:hidden sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link to={`/organizer/hackathons/${id}/results`} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700">
            <ChevronLeft className="mr-1 h-5 w-5" />
            Retour aux résultats
          </Link>
          <div className="h-6 w-px bg-slate-300"></div>
          <span className="text-sm font-medium text-slate-900">Aperçu du certificat</span>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
            <Download className="-ml-0.5 mr-1.5 h-5 w-5 text-slate-400" />
            Télécharger PDF
          </button>
          <button type="button" onClick={handlePrint} className="inline-flex items-center rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
            <Printer className="-ml-0.5 mr-1.5 h-5 w-5" />
            Imprimer
          </button>
        </div>
      </div>

      {/* Certificate Render */}
      <div className="flex-1 overflow-auto py-8 flex justify-center">
        <div className="bg-white relative overflow-hidden shadow-xl" style={{ width: '297mm', height: '210mm', minWidth: '297mm', minHeight: '210mm' }}>
          
          {/* Decor corner top-left */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-brand-600 rounded-br-full opacity-10"></div>
          {/* Decor corner bottom-right */}
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand-500 rounded-tl-full opacity-10"></div>
          
          <div className="absolute top-[15mm] bottom-[15mm] left-[15mm] right-[15mm] border-2 border-brand-600 p-1">
            <div className="w-full h-full border border-brand-500 flex flex-col items-center justify-center text-center p-8 relative bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#f8fafc_100%)]">
              
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] w-1/2 pointer-events-none" alt="Watermark" />

              <div className="mb-8 flex flex-col items-center">
                {/* Fallback to simple text if logo not found, or use img */}
                <h2 className="text-2xl font-bold text-brand-700">CodeToWin</h2>
                <span className="mt-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">Organisateur</span>
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
