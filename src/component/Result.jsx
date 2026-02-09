/* eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useNavigate ,useLocation, useSearchParams,useParams } from 'react-router-dom';
import {useSelector , useDispatch} from "react-redux";
import {blobToBase64, getBrowser, b64toBlob} from '../common/Utils';
import axios from 'axios';
import '../css/main.css';
import '../css/default.css';
import '../css/final.css';

const Result = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const location = window.location.href;

    const [data , setData] = useState(false);
    const [type, setType] = useState(null);

    const [bibleUrl, setBibleUrl] = useState(null);
    const [descUrl, setDescUrl] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const { search } = useParams();

    useEffect(()=>{
        const url = `/holymbti/searchResult/${search}`;
        axios.get(url, {
          params: {
            search: searchParams.get("search")
          }
        })
         .then((res)=>{
          setType(res.data);
          setData(true)
         }).catch((error)=>{
          setData(false);
         })

    },[]);
      
    const moveHome = () => {
      const browser = getBrowser();
      dispatch({type:"CLEAR_SCORE"})
      if(navigator.userAgent.match("KAKAOTALK") && browser == 'Safari'){
        const a = document.createElement('a');
        a.href = '/';
        document.body.appendChild(a);
        a.click();
      }
      else{
        navigate('/')
      }
    }

    const movePage = (url) => {
      const browser = getBrowser();
      if(navigator.userAgent.match("KAKAOTALK") && browser == 'Safari'){
          window.open('kakaotalk://web/openExternal?url='+url, "_blank", "noopener, noreferrer");
 
      }else{
        window.open(url, "_blank", "noopener, noreferrer");
      }
  }

  const handleCopyClipBoard = async (text) => {
    try {
            await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었어요.");
    } catch (err) {
    }
  };

 
  const downloadFile = async () => {
    const browser = getBrowser();
    var useragt = navigator.userAgent.toLowerCase();
    const target_url = `${process.env.REACT_APP_TARGET_URL}/download?image=${type.typeDtlName}.jpg`;
		if(useragt.match(/kakaotalk/i)){
        if(navigator.userAgent.match("KAKAOTALK") && browser == 'Safari'){
          window.location.href= target_url;
 
      }
      else {
          window.location.href='intent://'+target_url.replace(/https?:\/\//i,'')+'#Intent;scheme=http;package=com.android.chrome;end';
        }               

		}else if(useragt.match(/instagram/i)){
      if(useragt.match(/iphone|ipad|ipod/i)){
        window.open(target_url, "_blank", "noopener, noreferrer");

    }
    else {
        window.location.href='intent://'+target_url.replace(/https?:\/\//i,'')+'#Intent;scheme=http;package=com.android.chrome;end';
      }               

    }
    else{
     window.location.href = target_url;
    } 

  
};


  const shareKakao = () => {

    const resultUrl = location;

    if (window.Kakao) {
      const kakao = window.Kakao;
 
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY);
      }
      Kakao.Share.sendDefault({
        
        objectType: 'feed',
        content: {
          title: '6월 1일, 부흥을 위한 말씀의 검',
          description: '마귀의 간계를 능히 대적하기 위하여 하나님의 전신갑주를 입으라',
          imageUrl:type.typeThumbnailImageUrl,
          imageWidth:800,
          link: {
            // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
            mobileWebUrl: resultUrl,
            webUrl: resultUrl,
          },
        },
        buttons: [
          {
            title: '결과 보기',
            link: {
              mobileWebUrl: resultUrl,
              webUrl: resultUrl,
            },
          },
          {
            title: '테스트 하기',
            link: {
              mobileWebUrl: process.env.REACT_APP_TARGET_URL,
              webUrl: process.env.REACT_APP_TARGET_URL,
            },
          },
        ],
      });
    }
  };


    return (
        
      <div className="final-container">
        {data?
        <>
        <div className='bible-section'>
          <img id="resultTop" className='img-fluid' src={require(`../images/type5.jpg`)} alt="resultTop"/>
            <p className='bible'>{type.typePray}</p> 
        </div>
     
        <div className="mbti-result">
          <img id="resultImage" style={{width:"100%"}}	src={require(`../images/background/${type.typeDtlName}.jpg`)} alt={type.typeName}/>
            <p className='bible-sword'>말씀 배경화면으로 전신갑주 완전무장!</p>
        </div>
        <div className='download-container'>
        <button  className="download-button" onClick={downloadFile}
        >
        이미지 다운로드</button>
        </div>
          <div className='bible-char-container'>
          <img id="bible-character" className='img-fluid ccm-img'	src={require(`../images/bibleChar/CHAR_${type.typeName}.jpg`)} alt='bible-character'/>
          </div>

         
        <div className='ccm-img-container'>
        <img id="ccmImage" className='img-fluid ccm-img'	src={require(`../images/ccmImage/CCM_${type.typeDtlName}.png`)} alt='ccm'/>
        </div>
        <button className="listen-button" onClick={() => movePage(type.typeCcmUrl)}>
        들으러 가기</button>
        <div className='last-button-container'>
        <button className="last-button"  onClick={() => movePage("http://www.youthfg.com/since/1")}>홀스 홈페이지 바로가기</button>  
        <br/> 
        <button className="last-button-instagram" onClick={() => movePage("https://www.instagram.com/theholyspirit_fg")}>홀스 인스타 바로가기</button>  
        <br/>
        <button className="last-button" onClick={() => moveHome("https://www.instagram.com/theholyspirit_fg")}>테스트 다시하기</button>  
        </div>


        <div className='share-box'>
        <div className='share'>
        <img src={require(`../images/link-button.png`)} alt="result-logo" onClick={()=>handleCopyClipBoard(`${location}`)} className="img-fluid" style={{ width: "20%" }}/>
        <img  src={require(`../images/kakao.png`)}
            alt="카카오톡 공유 보내기 버튼"
            className="img-fluid"
            onClick={shareKakao}
            style={{ width: "20%" }}/>
        </div>
        </div>
    
        </>
         :null
         }

        <div id="logo" className='logo-container'>
          <img
            src={require(`../images/logo.png`)}
            alt="result-logo"
            className="img-fluid"
          />
        </div>
      </div>
    );
  };


  
export default Result;