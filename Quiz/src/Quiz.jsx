import { useEffect, useState, useRef } from 'react';
import QUESTIONS from '../public/questions';
import quizCompleteImg from './assets/quiz-complete.png';
import QuestionTimer from './QuestionTimer';
import QuestionResultPopup from './QuestionResultPopup';

export default function Quiz(){
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [questionData, setQuestionData] = useState(null);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [finishedQuestions, setFinishedQuestions] = useState(false);
    const [result, setResult] = useState();
    const [visibility, setVisibility] = useState(false);
    const [timer, setTimer] = useState(5000);
    
    useEffect(() => {
        findQuestion();
    }, []);

    function findQuestion(){
        let numOfQuest;

        do {
            numOfQuest = Math.floor(Math.random() * QUESTIONS.length);
        } while(answeredQuestions.includes(numOfQuest));
        setQuestionData({
            text: QUESTIONS[numOfQuest].text,
            answers: [...QUESTIONS[numOfQuest].answers].sort(() => Math.random() - 0.5)
        }); 
        if(answeredQuestions.length==0){
            setAnsweredQuestions([numOfQuest]);
            return;
        }
        setAnsweredQuestions((prev) => [...prev, numOfQuest]);
    }

    
    function clickAnswer(answer){
        setVisibility(true);
        setTimer(2000);
        // console.log(answer);
        const answeredQuestion = QUESTIONS.find((item) => item.text==questionData.text);
        if(answeredQuestion.answers[0]==answer){
            setCorrectAnswers((prev) => prev+1);
            // console.log(correctAnswers);
            setResult("Correct answer!");
        }
        else{
            setResult("False answer!");
        }

        if(QUESTIONS.length==answeredQuestions.length){
            setFinishedQuestions((prev) => !prev);
            return;
        }
        setTimeout(() => {
            setTimer(5000);
            setVisibility(false);
            findQuestion();
        },2000);
    }

    if (!questionData) {
        return <p>Loading...</p>;
    }

    if(finishedQuestions){
        return (
            <div id='question'>
                <img src={quizCompleteImg} alt="Finished Quiz" />
                <h2>Correct Answers: {correctAnswers}</h2>
            </ div>
        );
    }
    return(
        <>
            <QuestionResultPopup result={result} visibility={visibility}/>
            <div id='question'>
                <QuestionTimer onTimeout={() => {clickAnswer(null)}} timeout={timer} key={timer}/>
                <h2>{questionData.text}</h2>
                <ul id='answers'>
                    {questionData.answers.map((item, key) => (
                        <li key={key} className='answer'><button type='submit' onClick={() => {clickAnswer(item)}}>{item}</button></li>
                    ))}
                </ul>
            </div>
        </>
        
    );

    
}