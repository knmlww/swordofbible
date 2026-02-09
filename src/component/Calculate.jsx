import React, { useEffect } from 'react';
import {useDispatch , useSelector} from "react-redux";
import { useNavigate  } from 'react-router-dom';
import {getBrowser} from '../common/Utils';
import '../css/main.css';
import '../css/default.css';
import '../css/calculate.css'
import axios from 'axios';

const Calculate = (props) => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const  iScore  = useSelector(state => state.iScore);
  const  eScore  = useSelector(state => state.eScore);
  const  nScore  = useSelector(state => state.nScore);
  const  sScore  = useSelector(state => state.sScore);
  const  tScore  = useSelector(state => state.tScore);
  const  fScore  = useSelector(state => state.fScore);
  const  jScore  = useSelector(state => state.jScore);
  const  pScore  = useSelector(state => state.pScore);

  useEffect(()=>{
    const generateImage = (param) => {
      const ran = Math.random();
  
  
        if(ran<0.5){
          
        const imageName = param.concat("1");
        return imageName;
  
        }else{
        const imageName = param.concat("2");
        return imageName;
        }
        
      }
  
  const generateMBTI = () => {

    
    let result = "";
    let i_result = 0;
    let e_result = 0;
    let n_result = 0;
    let s_result = 0;
    let t_result = 0;
    let f_result = 0;
    let j_result = 0;
    let p_result = 0;

    if(iScore > eScore){
        result += 'I';
        i_result += 1;
    }else{
        result += 'E';
        e_result += 1;
    }

    if(nScore > sScore){
        result += 'N';
        n_result += 1;
    }else{
        result += 'S';
        s_result += 1;
    }

    if(tScore > fScore){
        result += 'T';
        t_result += 1;
    }else{
        result += 'F';
        f_result += 1;
    }

    if(jScore > pScore){
        result += 'J';
        j_result += 1;
    }else{
        result += 'P';
        p_result += 1;
    }

    const generatedImage = generateImage(result);

    const url = '/holymbti/insertResult';
    const data = {
        'mbtiResult' : result,
        'iResult' : i_result,
        'eResult' : e_result,
        'nResult' : n_result,
        'sResult' : s_result,
        'tResult' : t_result,
        'fResult' : f_result,
        'jResult' : j_result,
        'pResult' : p_result,
        'imgName' : generatedImage
    };

    const config = {"Content-Type": 'application/json'};

    axios.post(url,data,config)
      .then(res => {
        const browser = getBrowser();
        // 성공 처리
        dispatch({type: 'SAVE_RESULT',payload:result});
       // navigate(`/searchResult?search=${generatedNumber}` ,{ state: generatedNumber });
       if(navigator.userAgent.match("KAKAOTALK") && browser === 'Safari'){
        const a = document.createElement('a');
        a.href = `/searchResult/${res.data.issueId}`;
        document.body.appendChild(a);
        a.click();
       }else{
       navigate(`/searchResult/${res.data.issueId}`);
       }
    }).catch(err => {
      // 에러 처리
      //console.dir(err);// --> 서버단 에러메세지 출력~
      //console.dir()
    });
  
  }


    setTimeout(() => {
      generateMBTI();
      }, 4000);
  },[])

  return (
    <div id='calculate' className='calculate'>
        <div id='image' className='calculate-image-container'>
            <img src={require(`../images/sword_move.gif`)} alt=" sword_move" className='img-fluid' style={{ width: "30%" }}/>
        <p className='loading'>말씀의 검 만드는 중...</p>
        </div>

    </div>
  );
}

export default Calculate;