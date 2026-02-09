import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useDispatch} from "react-redux";


import '../css/main.css';
import '../css/default.css';
import '../css/qna.css';


const Question = (props) => {
  const dispatch = useDispatch();

  const [questionArr, setQuestionArr] = useState([]);
  const [showQuestion, setShowQuestion] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentQuestion , setCurrentQuestion] = useState(null);
  const [questionIndex , setQuestionIndex] = useState(0);
  const [fadeInOut, setFadeInOut] = useState("");


 
  useEffect(()=>{
    axios.get("/json/question2.json")
         .then((res)=>{
            setQuestionArr(res.data);
            setCurrentQuestion(res.data[0]);
         })
  },[])

  useEffect(()=>{
    setFadeInOut('fade-in');
    setShowQuestion(!showQuestion);
    setIsDisabled(!isDisabled);
  },[currentQuestion])


  const moveNextQuestion = (option) => {
    console.dir("CLICK EVENT");
    if (showQuestion) {
      setFadeInOut('fade-out');
      setIsDisabled(!isDisabled);
      setTimeout(() => {
      setShowQuestion(!showQuestion);
      setCurrentQuestion(questionArr[questionIndex+1]); 

      if(questionIndex !== 11){
        setQuestionIndex(questionIndex+1);
      }
      }, 800);
    } 
    dispatch({type: option});

    if (questionIndex === 11){
      moveCalculate();
    }
  };


  const moveCalculate = () => {
    props.pathHandler("calculate");
  }

  return (
  <div className="qna">
    <div  className="img-section">
    <section className="mx-auto mt-5">
      <div className='bar-container'>
      <img   src={require(`../images/bar/bar${questionIndex}.png`)} alt="bar1Image" className='img-fluid' />
      </div>
    </section>
    </div>
    <div  className="img-section">
    <section className="mx-auto mt-2 mb-1 py-1 px-1">
    <section className="mx-auto mt-4" />
      <img
        src={require(`../images/q/${questionIndex}.png`)}
        alt="q1Image"
        className={'img-fluid '+fadeInOut}
        style={{ width: "37%" }}
      />
    </section>

    {currentQuestion &&(
    <p className={'mt-2 mb-1 py-1 question-design '+fadeInOut}>
    {currentQuestion.question}
    </p>
      )
    }  
    </div>
    {currentQuestion &&(
      showQuestion?
      <>
      <div className='option-container'>
      <button id="option1" className={'mt-4 '+fadeInOut} disabled={isDisabled}   onClick={() => moveNextQuestion(currentQuestion.options[0].value)}>{currentQuestion.options[0].text}</button>
      <br/>
      <button id="option2" className={'mx-auto mt-2 '+fadeInOut} disabled={isDisabled}   onClick={() => moveNextQuestion(currentQuestion.options[1].value)}>{currentQuestion.options[1].text}</button>
      </div>
      </>:null
    )}
    <div className="logo-container">
    <img
      src={require(`../images/logo.png`)}
      alt="mainImage"
      className="img-fluid"
    />
  </div>
</div>

  );
}


export default Question;