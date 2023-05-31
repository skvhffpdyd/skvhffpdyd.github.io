import React from 'react';
import { Bar } from 'react-chartjs-2';
import "./radarChart.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const langoptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '프로그래밍 언어',
    },
  },
};

const databaseoptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '데이터베이스',
    },
  },
};

const frameworkoptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '프레임워크',
    },
  },
};

export 

function RadarChart({teamdata, memberdata}) { 
    const langArr = Object.keys(teamdata.teamLanguage).filter(key => key !== 'id' && teamdata.teamLanguage[key] !== 0);
    const teamlangvalue = Object.entries(teamdata.teamLanguage).filter(([key, value]) => key !== 'id' && value !== 0).map(([key, value]) => value);
    
    const memberlangvalue = langArr.map(lang => memberdata.memberLang[lang]).filter(value => value !== undefined);
    
    const databaseArr = Object.keys(teamdata.teamDatabase).filter(key => key !== 'id' && teamdata.teamDatabase[key] !== 0);
    const teamdatabasevalue = Object.entries(teamdata.teamDatabase).filter(([key, value]) => key !== 'id' && value !== 0).map(([key, value]) => value);
    
    const memberdatabasevalue = databaseArr.map(data => memberdata.memberDB[data]).filter(value => value !== undefined);
    
    const frameworkArr = Object.keys(teamdata.teamFramework).filter(key => key !== 'id' && teamdata.teamFramework[key] !== 0);
    const teamframeworkvalue = Object.entries(teamdata.teamFramework).filter(([key, value]) => key !== 'id' && value !== 0).map(([key, value]) => value);
    
    const memberframeworkvalue = databaseArr.map(data => memberdata.memberFramework[data]).filter(value => value !== undefined);
    
    
    const langdata = {
        labels: langArr,
        datasets: [
          {
            label: '팀의 요구사항',
            data: teamlangvalue,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: '유저의 능력',
            data: memberlangvalue,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

      const databasedata = {
        labels: databaseArr,
        datasets: [
          {
            label: '팀의 요구사항',
            data: teamdatabasevalue,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: '유저의 능력',
            data: memberdatabasevalue,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

      const frameworkdata = {
        labels: frameworkArr,
        datasets: [
          {
            label: '팀의 요구사항',
            data: teamframeworkvalue,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: '유저의 능력',
            data: memberframeworkvalue,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
    return (
      <div className='radarChart'>
        {langArr.length===0 ? null: 
        <div className='radarChart_Bar'>
          <Bar options={langoptions} data={langdata} />
        </div>
        }
        {frameworkArr.length===0 ? null: 
        <div className='radarChart_Bar'>   
          <Bar options={frameworkoptions} data={frameworkdata} />
        </div>
        }
        {databaseArr.length===0 ? null:
        <div className='radarChart_Bar'>
          <Bar options={databaseoptions} data={databasedata} />        
        </div>
        }        
      </div>
    );
}

export default RadarChart;