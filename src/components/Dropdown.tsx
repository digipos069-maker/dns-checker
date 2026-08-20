'use client';

import { useState, useRef, useEffect } from 'react';
import { DnsRecordType } from '@/actions/dns';

interface DropdownProps {
  value: DnsRecordType;
  onChange: (value: DnsRecordType) => void;
  options: { label: string; value: DnsRecordType; description?: string }[];
}

export default function Dropdown({ value, onChange, options }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="dropdown-container" ref={containerRef}>
      <button
        type="button"
        className={`dropdown-header input-field ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="dropdown-selected-text">{selectedOption.label}</span>
        <svg
          className={`dropdown-chevron ${isOpen ? 'rotate' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 8l4 4 4-4" />
        </svg>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <ul className="dropdown-list">
            {options.map((option) => (
              <li
                key={option.value}
                className={`dropdown-item ${option.value === value ? 'selected' : ''}`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                <div className="dropdown-item-label">{option.label}</div>
                {option.description && (
                  <div className="dropdown-item-desc">{option.description}</div>
                )}
                {option.value === value && (
                  <svg className="dropdown-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
