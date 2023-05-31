import React, { useEffect } from 'react';
import { useState } from "react";
import { ContestCard } from "../ContestCard/contestCard.js"
import {Link} from "react-router-dom";
import {useSearchParams} from "react-router-dom";
import { Pagination } from "@mui/material";
import { motion } from "framer-motion";
import { FaSearch } from 'react-icons/fa'
import "./contest.css";

function Contest() {
    const refresh_token = localStorage.getItem("refresh-token");
    const login_token = localStorage.getItem("login-token");
    
    const [contestList, setContestList] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState("");
    const searchBarOnChange = (e) => {
        setSearch(e.target.value)
    }   
    const search_string = searchParams.get("search");
    

    const searchContest = () => {
        fetch(`${process.env.REACT_APP_API_URL}/contest/${search}?page=1`,{
            headers: {
                'refresh-token': refresh_token,
                'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
            },      
        })
        .then((response) => response.json())        
        .then((obj) => {setContestList(obj.data)
        console.log(obj); setPage_maxcount(obj.metadata.totalPage);
        window.location.href = `/list/contest?search=${search}&page=1`;
    })}

    const page_number = searchParams.get("page");
    const [page_maxcount, setPage_maxcount] = useState(0);

    useEffect(() => {
        if(search_string != null){
            setSearch(search_string);
            fetch(`${process.env.REACT_APP_API_URL}/contest/${search_string}?page=${page_number}`,{
                headers: {
                    'refresh-token': refresh_token,
                    'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
                },      
            })
            .then((response) => response.json())        
            .then((obj) => {setContestList(obj.data)
            console.log(obj); setPage_maxcount(obj.state);})
        }        
        else {
            fetch(`${process.env.REACT_APP_API_URL}/contest?page=${page_number}`,{
                headers: {
                    'refresh-token': refresh_token,
                    'login-token': login_token,//헤더로 로그인 토큰 넣어야 삭제됨
                },      
            })
            .then((response) => response.json())        
            .then((obj) => {setContestList(obj.data)
            console.log(obj); setPage_maxcount(obj.state);})
        }              
    }, []);

    const handleKeyDown = (event) => {
        const key = event.code;
        switch(key){
            case 'Enter':
                searchContest();
            break;
            default:
        }
    }
    
    //삭제할때 teams/{team.id}/delete 이렇게 post로 보내면 삭제됨
    //``역따음표 사이에 값넣기
    
    const cardStyle = {
        width: '25%',
        minWidth: 200,
        height: 200,
      };
      
      const mediaQueryStyle = {
        '@media (max-width: 768px)': {
          width: '25%',
          minWidth: 200,
        },
      };
      
    return (
        <div className='contest_list'>
            <div className='contest_search'>
                <p className='contest_search_title'>
                    공모전 검색
                </p>
                <div class="search-form">
                    <input
                    type="text"
                    placeholder={search_string==null ? "공모전을 검색해보세요. ":search_string}
                    className="search_bar"
                    name="searchText"
                    onChange={searchBarOnChange}
                    onKeyDown={handleKeyDown}
                    />
                    <button class="search-button" onClick={searchContest}>
                        <FaSearch/>
                    </button>
                </div>
            </div>           
            
            <div className="contest-card-container">          
                {contestList && contestList.map(contest => (
                    <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    
                    whileInView={{
                        opacity: 1, y: 0,
                        transition: { delay: 0.1 }
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}>
                    <div key={contest.cid} className="card_contest" sx={{ ...cardStyle, ...mediaQueryStyle }}>                    
                        <ContestCard contest={contest} />
                    </div>
                    </motion.div>
                    ))}
            </div>
            <div className="page">
                <Pagination page={Number(searchParams.get("page"))} count={page_maxcount} size="large" 
                 onChange={(e, value) => {
                    search === "" ? 
                    window.location.href = `/list/contest?page=${value}`
                    :
                    window.location.href = `/list/contest?search=${search}&page=${value}`
                    ;
                  }}
                />
            </div>
        </div>
    );
            
}

export default Contest;