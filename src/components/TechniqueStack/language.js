import React, { useEffect, useState } from 'react';
import { Button, IconButton ,Slider  } from "@mui/material";
import "./style.css"

function Languages({ languageValues, onLanguageValueChange, selectedLanguages,setSelectedLanguages }) { 
  
  const imglink = "https://firebasestorage.googleapis.com/v0/b/caps-1edf8.appspot.com/o/langIcon%2F";

      const toggleLanguage = (language) => {
        const isLanguageSelected = selectedLanguages[language];
        setSelectedLanguages({
          ...selectedLanguages,
          [language]: !isLanguageSelected,
        });
        if (isLanguageSelected) { // 해당 언어가 선택 해제될 때
          onLanguageValueChange({
            ...languageValues,
            [language]: 0,
          });
        }
      };
    
      const handleSliderChange = (event, language) => {
        const value = event.target.value;
        onLanguageValueChange({
          ...languageValues,
          [language]: value,
        });
      };

      const marks = [
        {
          value: 0,
          label: '아예 못함',
        },
        {
          value: 25,
          label: '못함',
        },
        {
          value: 50,
          label: '보통',
        },
        {
          value: 75,
          label: '잘함',
        },
        {
          value: 100,
          label: '아주잘함',
        },
      ];
    
      const renderLanguageSlider = (language) => {
        if (!selectedLanguages[language]) {
          return null;
        }
    
        return (
          <div className='language_slidebars' key={language} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "200px", textAlign: "center" }}>
              <img src={`${imglink}${language}.png?alt=media`} alt="logo" width={30} height={30} style={{ marginRight: '5px' }}/> 
              {language === 'cpp' ? 'C++' : null }
              {language === 'cs' ? 'C#' : null }
              {language === 'sql_Lang' ? 'SQL' : null}
              {language !== 'cpp' && language !== 'cs' && language !== 'sql_Lang'? language.toUpperCase() : null}
            </div>
                      
            <Slider  aria-label="Custom marks"  value ={languageValues[language]} step={null} 
                    valueLabelDisplay="auto" marks={marks} onChange={(event) => handleSliderChange(event, language)} sx={{ width: "400px", marginLeft: "30px" }}/>
          </div>
        );
      };
      const lang = ['c', 'cpp', 'cs', 'java', 'javascript','sql_Lang','swift','kotlin','typescript','python','html','r']; // lang 변수가 버튼의 이름이자 서버에 넘길 값들
      
      return (
        <div>
          <div className="language-buttons">
          {lang.map(lang => ( //map함수로 여러개의 button을 생성      
            <Button className={selectedLanguages[lang] ? "selected" : ""} key={lang} variant="outlined" onClick={() => toggleLanguage(lang)} style={{ margin: '8px' }}>
            <img src={`${imglink}${lang}.png?alt=media`} alt="logo" width={30} height={30} style={{ marginRight: '8px' }}/>
              {lang.toUpperCase().replace('CS', 'C#').replace('CPP','C++').replace('SQL_LANG','SQL')}
            </Button>
          ))}
          </div>
          <div>
          {lang.map((language) => (renderLanguageSlider(language)))}
          </div>
        </div>
      );
    };

export default Languages;