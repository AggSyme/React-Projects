import { useEffect, useState, useImperativeHandle } from "react";

export default function QuestionTimer(props){

    const [time, setTime] = useState(props.timeout);
    console.log(props);

    useEffect(() => {
        setTime(props.timeout);
        console.log("________");
        const internal = setInterval(() => {
            setTime((prevTime) => (prevTime-100));
        }, 100);

        const timer = setTimeout(() => {
        if(props.timeout==5000){
            props.onTimeout();
        }
        clearInterval(internal);
    }, props.timeout);
    
    return () => {
        clearTimeout(timer);
        clearInterval(internal);
    }
    }, [props.timeout]);    

    return <progress id="question-time" value={time} max={props.timeout}/>
}