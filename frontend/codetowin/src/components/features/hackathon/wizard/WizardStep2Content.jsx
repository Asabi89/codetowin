import React, { useState, useRef } from 'react';
import { marked } from 'marked';

export default function WizardStep2Content({ formData, updateForm }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef(null);

  const addFaq = () => {
    if (newFaqQ.trim() && newFaqA.trim()) {
      updateForm('faqs', [...formData.faqs, { question: newFaqQ, answer: newFaqA }]);
      setNewFaqQ('');
      setNewFaqA('');
    }
  };

  const removeFaq = (idx) => {
    updateForm('faqs', formData.faqs.filter((_, i) => i !== idx));
  };

  const handleFormat = (type) => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    
    let syntax = '';
    let syntaxEnd = '';
    let defaultText = selectedText || 'texte';
    let url = '';
    
    if (type === 'h1') { syntax = '# '; syntaxEnd = ''; }
    else if (type === 'h2') { syntax = '## '; syntaxEnd = ''; }
    else if (type === 'h3') { syntax = '### '; syntaxEnd = ''; }
    else if (type === 'bold') { syntax = '**'; syntaxEnd = '**'; }
    else if (type === 'italic') { syntax = '*'; syntaxEnd = '*'; }
    else if (type === 'underline') { syntax = '<u>'; syntaxEnd = '</u>'; }
    else if (type === 'bullet') { syntax = '- '; syntaxEnd = ''; }
    else if (type === 'number') { syntax = '1. '; syntaxEnd = ''; }
    else if (type === 'link') { 
      url = window.prompt("Entrez l'URL du lien :", "https://");
      if (url === null) return; // user cancelled
      syntax = '['; syntaxEnd = `](${url})`; 
    }
    else if (type === 'image') { 
      url = window.prompt("Entrez l'URL de l'image :", "https://");
      if (url === null) return; // user cancelled
      syntax = '!['; syntaxEnd = `](${url})`; 
      defaultText = selectedText || 'description';
    }

    const newText = text.substring(0, start) + syntax + defaultText + syntaxEnd + text.substring(end);
    
    updateForm(activeTab, newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + syntax.length, start + syntax.length + defaultText.length);
    }, 0);
  };

  const handleKeyDown = (e) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Support de la touche TAB (insère 2 espaces)
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const insertText = '  ';
      const newText = text.substring(0, start) + insertText + text.substring(end);
      updateForm(activeTab, newText);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + insertText.length;
      }, 0);
      return;
    }

    if (e.key === 'Enter') {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      
      const textBeforeCursor = text.substring(0, start);
      const lastNewLineIndex = textBeforeCursor.lastIndexOf('\n');
      const currentLine = textBeforeCursor.substring(lastNewLineIndex + 1);
      
      const ulMatch = currentLine.match(/^(\s*)([-*])\s+(.*)$/);
      const olMatch = currentLine.match(/^(\s*)(\d+)\.\s+(.*)$/);
      
      if (ulMatch) {
        e.preventDefault();
        const [, indent, bullet, content] = ulMatch;
        if (!content.trim()) {
          const newText = text.substring(0, lastNewLineIndex + (lastNewLineIndex === -1 ? 0 : 1)) + text.substring(end);
          updateForm(activeTab, newText);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = lastNewLineIndex + (lastNewLineIndex === -1 ? 0 : 1);
          }, 0);
        } else {
          const insertText = `\n${indent}${bullet} `;
          const newText = text.substring(0, start) + insertText + text.substring(end);
          updateForm(activeTab, newText);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start + insertText.length;
          }, 0);
        }
      } else if (olMatch) {
        e.preventDefault();
        const [, indent, number, content] = olMatch;
        if (!content.trim()) {
          const newText = text.substring(0, lastNewLineIndex + (lastNewLineIndex === -1 ? 0 : 1)) + text.substring(end);
          updateForm(activeTab, newText);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = lastNewLineIndex + (lastNewLineIndex === -1 ? 0 : 1);
          }, 0);
        } else {
          const nextNumber = parseInt(number, 10) + 1;
          const insertText = `\n${indent}${nextNumber}. `;
          const newText = text.substring(0, start) + insertText + text.substring(end);
          updateForm(activeTab, newText);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start + insertText.length;
          }, 0);
        }
      }
    }
  };

  const placeholders = {
    overview: "Présentez votre hackathon...",
    resources: "Liens utiles, APIs fournies...",
    rules: "Règles de participation..."
  };

  return (
    <div className="space-y-6 py-6 px-4 sm:p-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-slate-900">Contenu détaillé</h3>
        <p className="mt-1 text-sm text-slate-500">Rédigez le contenu principal de votre hackathon. Utilisez l'éditeur pour mettre en forme.</p>
      </div>
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 flex overflow-x-auto">
          {['overview', 'resources', 'rules', 'faq'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => { setActiveTab(tab); setIsPreview(false); }}
              className={`flex-1 py-3 px-4 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === tab 
                  ? 'text-brand-600 border-brand-500 bg-white' 
                  : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab === 'overview' ? "Vue d'ensemble" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab !== 'faq' && (
          <>
            <div className="border-b border-slate-200 bg-white p-2 flex items-center justify-between text-slate-500 overflow-x-auto">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button type="button" onClick={() => handleFormat('h1')} className="p-1.5 rounded hover:bg-slate-100 font-bold text-xs" title="Titre 1">H1</button>
                <button type="button" onClick={() => handleFormat('h2')} className="p-1.5 rounded hover:bg-slate-100 font-bold text-xs" title="Titre 2">H2</button>
                <button type="button" onClick={() => handleFormat('h3')} className="p-1.5 rounded hover:bg-slate-100 font-bold text-xs" title="Titre 3">H3</button>
                <div className="w-px h-5 bg-slate-300 mx-1"></div>
                <button type="button" onClick={() => handleFormat('bold')} className="p-1.5 rounded hover:bg-slate-100" title="Gras"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14h4.5c2.5 0 4.5-2 4.5-4.5 0-1.7-.9-3.2-2.3-4 1.1-.6 1.8-1.8 1.8-3.2C16.5 5.1 14.7 3.5 12.5 3.5H8zm2 2h2.5c1.1 0 2 .9 2 2s-.9 2-2 2H10V7zm0 6h3c1.1 0 2 .9 2 2s-.9 2-2 2h-3v-4z"/></svg></button>
                <button type="button" onClick={() => handleFormat('italic')} className="p-1.5 rounded hover:bg-slate-100" title="Italique"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4v3h2.2l-3.4 10H6v3h8v-3h-2.2l3.4-10H18V4h-8z"/></svg></button>
                <button type="button" onClick={() => handleFormat('underline')} className="p-1.5 rounded hover:bg-slate-100" title="Souligné"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17c3.3 0 6-2.7 6-6V3h-2.5v8c0 1.9-1.6 3.5-3.5 3.5S8.5 12.9 8.5 11V3H6v8c0 3.3 2.7 6 6 6zm-7 2v2h14v-2H5z"/></svg></button>
                <div className="w-px h-5 bg-slate-300 mx-1"></div>
                <button type="button" onClick={() => handleFormat('bullet')} className="p-1.5 rounded hover:bg-slate-100" title="Liste à puces"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h2v2H4V6zm0 5h2v2H4v-2zm0 5h2v2H4v-2zm4-10h12v2H8V6zm0 5h12v2H8v-2zm0 5h12v2H8v-2z"/></svg></button>
                <button type="button" onClick={() => handleFormat('number')} className="p-1.5 rounded hover:bg-slate-100" title="Liste numérotée"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/></svg></button>
                <div className="w-px h-5 bg-slate-300 mx-1"></div>
                <button type="button" onClick={() => handleFormat('link')} className="p-1.5 rounded hover:bg-slate-100" title="Lien"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3.9 12c0-1.7 1.4-3.1 3.1-3.1h4V7H7c-2.8 0-5 2.2-5 5s2.2 5 5 5h4v-1.9H7c-1.7 0-3.1-1.4-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.7 0 3.1 1.4 3.1 3.1s-1.4 3.1-3.1 3.1h-4V17h4c2.8 0 5-2.2 5-5s-2.2-5-5-5z"/></svg></button>
                <button type="button" onClick={() => handleFormat('image')} className="p-1.5 rounded hover:bg-slate-100" title="Image"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg></button>
                <div className="w-px h-5 bg-slate-300 mx-1"></div>
                <button type="button" className="flex items-center space-x-1 p-1.5 rounded bg-brand-50 text-brand-700 transition" title="Mode Markdown activé">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.56 18H3.44C2.65 18 2 17.37 2 16.59V7.41C2 6.63 2.65 6 3.44 6h17.12c.79 0 1.44.63 1.44 1.41v9.18c0 .78-.65 1.41-1.44 1.41zM6.81 15.19v-4.14L8.43 13l1.63-1.95v4.14h1.72V8.81h-1.63L8.43 11 6.72 8.81H5.09v6.38h1.72zm10.74-2.82h-1.89V8.81h-1.72v3.56h-1.88l2.75 3.32 2.74-3.32z"/></svg>
                  <span className="text-xs font-semibold hidden sm:inline">Markdown actif</span>
                </button>
              </div>
              <div>
                <button 
                  type="button" 
                  onClick={() => setIsPreview(!isPreview)}
                  className={`text-xs px-3 py-1.5 rounded-md border transition ${isPreview ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
                >
                  {isPreview ? 'Éditer' : 'Prévisualiser'}
                </button>
              </div>
            </div>
            
            <div className="bg-white p-4">
              {isPreview ? (
                <div 
                  className="w-full h-64 overflow-y-auto prose prose-sm max-w-none prose-slate"
                  dangerouslySetInnerHTML={{ __html: formData[activeTab] ? marked.parse(formData[activeTab]) : '<p class="text-slate-400 italic">Rien à prévisualiser...</p>' }}
                />
              ) : (
                <textarea 
                  ref={textareaRef}
                  rows="10" 
                  value={formData[activeTab]} 
                  onChange={(e) => updateForm(activeTab, e.target.value)} 
                  onKeyDown={handleKeyDown}
                  className="w-full h-64 border-0 focus:ring-0 p-0 text-slate-800 resize-none outline-none font-mono text-sm leading-relaxed" 
                  placeholder={placeholders[activeTab]}
                ></textarea>
              )}
            </div>
            
            <div className="bg-blue-50 border-t border-blue-100 px-4 py-2 flex items-start">
              <p className="text-xs text-blue-700"><strong>Le mode Markdown est activé par défaut.</strong> {isPreview ? "Vous visualisez le rendu final." : "Vous pouvez utiliser des balises comme **texte** pour le gras."}</p>
            </div>
          </>
        )}

        {activeTab === 'faq' && (
          <div className="bg-white p-4">
            <div className="space-y-4 mb-6">
              {formData.faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-lg border border-slate-200 relative group">
                  <button type="button" onClick={() => removeFaq(idx)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                  <h4 className="font-bold text-slate-900 text-sm">{faq.question}</h4>
                  <p className="text-sm text-slate-600 mt-2">{faq.answer}</p>
                </div>
              ))}
              {formData.faqs.length === 0 && (
                <p className="text-sm text-slate-500 italic">Aucune FAQ ajoutée pour le moment.</p>
              )}
            </div>
            <div className="bg-white border border-slate-200 shadow-sm rounded-lg p-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Question</label>
                  <input type="text" value={newFaqQ} onChange={e => setNewFaqQ(e.target.value)} placeholder="Ex: Qui peut participer ?" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Réponse</label>
                  <textarea rows="2" value={newFaqA} onChange={e => setNewFaqA(e.target.value)} placeholder="Saisissez la réponse..." className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border"></textarea>
                </div>
                <div>
                  <button type="button" onClick={addFaq} className="inline-flex items-center rounded-md border border-transparent bg-brand-50 text-brand-700 px-4 py-2 text-sm font-medium hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                    Ajouter la question
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
