import React,{useEffect} from 'react';
import { Button} from "@mui/material";
import "./category.css"
const category = [
  { id: "개인 팀프로젝트", title: "개인 팀프로젝트" },
  { id: "공모전 및 대회", title: "공모전 및 대회" },
  { id: "캡스톤 디자인", title: "캡스톤 디자인" },
  { id: "과목 팀프로젝트", title: "과목 팀프로젝트" },   
];



const subject = [ 
  {id:"웹프레임워크1" ,title:"웹프레임워크1"},
  {id:"네트워크프로그래밍" ,title:"네트워크프로그래밍"},
  {id:"안드로이드프로그래밍" ,title:"안드로이드프로그래밍"},
  {id:"고급모바일프로그래밍" ,title:"고급모바일프로그래밍"},
];

const rule = [
  { id: "프론트엔드", title: "프론트엔드"},
  { id: "백엔드", title: "백엔드"},
];


function Category({checkCategory,setCheckCategory, checkRule,setCheckRule,checkSubject,setCheckSubject , categoryOnClick  }) {
  useEffect(()=>{
    categoryOnClick();
  },[checkCategory,checkRule,checkSubject])
   // 체크된 아이템을 담을 배열을 props로 받는다.
   function handleCheck(event) {
    const { name, value, checked } = event.target;
  
    if (checked) {
      switch (name) {
        case "category":
          setCheckCategory((prev) => [...prev, value]);
               
          break;
        case "rule":
          setCheckRule((prev) => [...prev, value]);
          
          break;
        case "subject":
          setCheckSubject((prev) => [...prev, value]);
          
          break;
        default:
          break;
      }
     
    } else {
      switch (name) {
        case "category":
          if(checkCategory.includes("과목 팀프로젝트")){
            setCheckSubject([]);
         
          }
          setCheckCategory((prev) => prev.filter((id) => id !== value));
                
          break;
        case "rule":
          setCheckRule((prev) => prev.filter((id) => id !== value));
          
          break;
        case "subject":
          setCheckSubject((prev) => prev.filter((id) => id !== value));
          break;
        default:
          break;
      }
      
    }
  }

  const handleCheckAll = (event) => {
    if (event.target.checked) {
      const allDataItems = category.map((item) => item.id);
      const allRuleItems = rule.map((item) => item.id);
      const allSubjectItems = subject.map((item) => item.id);
      setCheckCategory(allDataItems);
      setCheckRule(allRuleItems);
      setCheckSubject(allSubjectItems);
    } else {
      setCheckCategory([]);
      setCheckRule([]);
      setCheckSubject([]);
    }   
  }
  useEffect(() => {
    const categoryTable = document.querySelector('.category-table');
    if (categoryTable !== null) {
      categoryTable.style.height = checkCategory.includes("과목 팀프로젝트") ? '660px' : '470px';
    }
  }, [checkCategory]);


  return (
    <div className='category-table'>
    <div className='category-title'>
    <h2>카테고리</h2>
    </div>
    <table>    
      <tbody>
        <tr>
          <td>
          <input type="checkbox" checked={checkCategory.length+checkRule.length+checkSubject.length==10} onChange={handleCheckAll} />
          <label>전체선택</label>
          </td>          
        </tr>     
        <tr>프로젝트 </tr>
        {category.map((item) => (          
          <tr key={item.id}>
            <td>
              <input
                type="checkbox"
                id={item.id}
                value={item.id}
                name='category'
                checked={checkCategory.includes(item.id)}
                onChange={handleCheck}
              />
              <label htmlFor={item.id}>{item.title}</label>
            </td>
          </tr>
        ))}       
        {checkCategory.includes("과목 팀프로젝트")?<td>과목 선택</td> : null}
        {checkCategory.includes("과목 팀프로젝트") &&          
          subject.map((item) => (
            <>            
            <tr key={item.id}>              
              <td>
                <input
                  type="checkbox"
                  id={item.id}
                  name='subject'
                  value={item.id}
                  checked={checkSubject.includes(item.id)}
                  onChange={handleCheck}
                />
                <label htmlFor={item.id}>{item.title}</label>
              </td>
            </tr>
            </>
          ))}
         <tr>역할</tr>
        {rule.map((item) => (
          <tr key={item.id}>
          <td>
            <input
              type="checkbox"
              name='rule'
              id={item.id}
              value={item.id}
              checked={checkRule.includes(item.id)}
              onChange={handleCheck}
            />
            <label htmlFor={item.id}>{item.title}</label>
          </td>
          
        </tr>        
        ))}
        <button className='filter-btn' onClick={categoryOnClick} variant="contained" sx={{ width: "200px" }}>필터 적용</button>
      </tbody>
    </table>
    </div>
  );
}
export default Category;