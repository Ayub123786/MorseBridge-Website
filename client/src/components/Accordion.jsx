import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const Accordion = ({ items = [] }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div className="accordion-wrapper">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className={`accordion-item ${isOpen ? 'active' : ''}`}>
            <div className="accordion-header" onClick={() => toggle(idx)}>
              <span>{item.question}</span>
              <ChevronDown
                size={18}
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform var(--transition-fast)',
                  color: isOpen ? 'var(--brand-blue-light)' : 'var(--text-muted)'
                }}
              />
            </div>
            {isOpen && (
              <div className="accordion-content">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
