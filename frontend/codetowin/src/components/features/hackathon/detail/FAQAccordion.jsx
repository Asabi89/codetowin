import React, { useState } from 'react';

export default function FAQAccordion({ faqs: propFaqs }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(prev => prev === index ? null : index);
  };

  const faqs = propFaqs || [];

  if (faqs.length === 0) {
    return <p className="text-slate-500 italic text-center">Aucune question fréquente n'a encore été ajoutée par les organisateurs.</p>;
  }

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
