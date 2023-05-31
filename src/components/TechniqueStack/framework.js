import React, { useState } from 'react';
import { Button, IconButton ,Slider  } from "@mui/material";
import "./style.css"
function Framework({ frameworkValues, onFrameworkValueChange ,selectedFrameworks, setSelectedFrameworks}) {   
  
  const imglink = "https://firebasestorage.googleapis.com/v0/b/caps-1edf8.appspot.com/o/langIcon%2F";
    
      const toggleFramework = (framework) => {
        const isFrameworkSelected = selectedFrameworks[framework];
        setSelectedFrameworks({
          ...selectedFrameworks,
          [framework]: !isFrameworkSelected,
        });
        if (isFrameworkSelected) { // 해당 언어가 선택 해제될 때
          onFrameworkValueChange({
            ...frameworkValues,
            [framework]: 0,
          });
        }
      };
    
      const handleSliderChange = (event, framework) => {
        const value = event.target.value;
        onFrameworkValueChange({
          ...frameworkValues,
          [framework]: value,
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
    
      const renderFrameworkSlider = (framework) => {
        if (!selectedFrameworks[framework]) {
          return null;
        }
    
        return (
          <div className='framework_slidebars' key={framework} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "200px", textAlign: "center" }}>
                <img src={`${imglink}${framework}.png?alt=media`} alt="logo" width={30} height={30} style={{ marginRight: '5px' }}/> 
                {framework === 'tdmax' ? '3DMAX' : null }         
                {framework !== 'tdmax' ? framework.toUpperCase() : null}
            </div>          
            <Slider aria-label="Custom marks"  value ={frameworkValues[framework]} step={null} 
                    valueLabelDisplay="auto" marks={marks} onChange={(event) => handleSliderChange(event, framework)} sx={{ width: "400px", marginLeft: "30px" }}/>
          </div>
        );
      };
      const data = ['react','android', 'node','xcode', 'spring', 'unity', 'unreal', 'tdmax' ]; // data 변수가 버튼의 이름이자 서버에 넘길 값들
    
      return (
        <div>
        <div className="framework-buttons">
          {data.map(data => (
            <Button className={selectedFrameworks[data] ? "selected" : ""} key={data} variant="outlined" onClick={() => toggleFramework(data)} style={{ margin: '8px' }}>
             <img src={`${imglink}${data}.png?alt=media`} alt="logo" width={30} height={30} style={{ marginRight: '5px' }}/>
              {data.toUpperCase().replace('TDMAX', '3DMAX')}
            </Button>
          ))}
        </div>
        <div>
          {data.map((framework) => (renderFrameworkSlider(framework)))}
        </div>
      </div>
      );
    };

export default Framework;