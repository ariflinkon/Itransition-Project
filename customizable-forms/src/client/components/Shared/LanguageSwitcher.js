import React, { useState } from 'react';
import { FaGlobe } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

const LanguageSwitcher = () => {
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'it', label: 'Italiano' },
    { code: 'zh', label: '中文' },
    { code: 'ja', label: '日本語' },
    { code: 'ru', label: 'Русский' },
    { code: 'ar', label: 'العربية' },
  ];

  
  const [languageIndex, setLanguageIndex] = useState(0);

  const selectLanguage = (index) => {
    setLanguageIndex(index);
  };

  return (
    <div className="d-flex justify-content-end">
      <Dropdown>
        <Dropdown.Toggle variant="dark" id="languageDropdown" style={{ padding: '3px 10px', borderRadius: '5px' }}>
          <FaGlobe size={20} className="text-white mr-2" />
          <span className="text-white">{languages[languageIndex].label}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ borderRadius: '5px' }}>
          {languages.map((language, index) => (
            <Dropdown.Item key={language.code} onClick={() => selectLanguage(index)} style={{ padding: '5px 10px' }}>
              {language.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default LanguageSwitcher;