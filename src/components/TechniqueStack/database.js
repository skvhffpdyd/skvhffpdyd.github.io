import React, { useState } from 'react';
import { Button, IconButton ,Slider  } from "@mui/material";
import "./style.css"

function Database({ databaseValues, onDatabaseValueChange, selectedDatabases, setSelectedDatabases }) {    
    
    const imglink = "https://firebasestorage.googleapis.com/v0/b/caps-1edf8.appspot.com/o/langIcon%2F";
      const toggleDatabase = (database) => {
        const isDatabaseSelected = selectedDatabases[database];
        setSelectedDatabases({
          ...selectedDatabases,
          [database]: !isDatabaseSelected,
        });
        if (isDatabaseSelected) { // 해당 언어가 선택 해제될 때
          onDatabaseValueChange({
            ...databaseValues,
            [database]: 0,
          });
        }
      };
    
      const handleSliderChange = (event, database) => {
        const value = event.target.value;
        onDatabaseValueChange({
          ...databaseValues,
          [database]: value,
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
      const data = ['mysqlL', 'mariadbL' , 'mongodbL', 'schemaL']; // data 변수가 버튼의 이름이자 서버에 넘길 값들
    
      const renderDatabaseSlider = (database) => {
        if (!selectedDatabases[database]) {
          return null;
        }
    
        return (
          <div className='database_slidebars' key={database} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "200px", textAlign: "center" }}>
                  <img src={`${imglink}${database}.png?alt=media`} alt="logo" width={30} height={30} style={{ marginRight: '5px' }}/>
                  {database === 'mysqlL' ? 'MYSQL' : null }
                  {database === 'mariadbL' ? 'MARIA DB' : null }
                  {database === 'mongodbL' ? 'MONGO DB' : null }
                  {database === 'schemaL' ? 'DB 설계' : null }
            </div>          
            <Slider aria-label="Custom marks"  value ={databaseValues[database]} step={null} 
                    valueLabelDisplay="auto" marks={marks} onChange={(event) => handleSliderChange(event, database)} sx={{ width: "400px", marginLeft: "30px" }}/>
          </div>
        );
      };
     
    
      return (
        <div>
            <div className="database-buttons">
                {data.map(data => (
                    <Button className={selectedDatabases[data] ? "selected" : ""} key={data} variant="outlined" onClick={() => toggleDatabase(data)} style={{ margin: '8px' }}>
                      <img src={`${imglink}${data}.png?alt=media`} alt="logo" width={30} height={30} style={{ marginRight: '5px' }}/>
                    {data.toUpperCase().replace('MYSQLL', 'MYSQL').replace('MARIADBL','MARIA DB').replace('MONGODBL','MONGO DB').replace('SCHEMAL','DB 설계')}
                    </Button>
                ))}
            </div>
            <div>
                {data.map((database) => (renderDatabaseSlider(database)))}
            </div>
        </div>
      );
    };

export default Database;