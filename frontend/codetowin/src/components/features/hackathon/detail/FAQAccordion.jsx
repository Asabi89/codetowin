import React, { useState } from 'react';

export default function FAQAccordion() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(prev => prev === index ? null : index);
  };

  const faqs = [
    {
      question: "Les débutants peuvent-ils jouer ?",
      answer: "Carrément ! On adore les petits nouveaux. Google Cloud vous donne plein d'exemples et d'environnements bac à sable pour vous lancer facilement."
    },
    {
      question: "Je peux ramener mes potes ?",
      answer: "Oui, vous pouvez être jusqu'à 4 dans une équipe. Mais tu peux aussi jouer les loups solitaires si tu préfères !"
    },
    {
      question: "Je peux utiliser un vieux projet ?",
      answer: "Non, tout le code de ton agent doit être produit pendant les dates officielles du hackathon. C'est plus juste pour tout le monde !"
    }
  ];

  return (
    <div className="faq-accordion-group">
      {faqs.map((faq, index) => (
        <div key={index} className={`faq-collapsible ${openFaqIndex === index ? 'is-open' : ''}`}>
          <button className="faq-trigger" type="button" onClick={() => toggleFaq(index)}>
            {faq.question}
          </button>
          <div className="faq-details" style={{ maxHeight: openFaqIndex === index ? '300px' : '0px', transition: 'max-height 0.2s ease-out', overflow: 'hidden' }}>
            <div className="faq-details-inner">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
