import React, { useState } from 'react';
import { FaGlobe } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

const LanguageSwitcher = () => {
  const languages = [
    { code: 'en', label: 'English', shortName: 'EN' },
    { code: 'es', label: 'Español', shortName: 'ES' },
    { code: 'fr', label: 'Français', shortName: 'FR' },
    { code: 'de', label: 'Deutsch', shortName: 'DE' },
    { code: 'it', label: 'Italiano', shortName: 'IT' },
    { code: 'zh', label: '中文', shortName: 'ZH' },
    { code: 'ja', label: '日本語', shortName: 'JA' },
    { code: 'ru', label: 'Русский', shortName: 'RU' },
    { code: 'ar', label: 'العربية', shortName: 'AR' },
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
          <span className="text-white">{languages[languageIndex].shortName}</span>
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