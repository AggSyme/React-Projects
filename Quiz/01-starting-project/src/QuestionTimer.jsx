import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {

    const [time, setTime] = useState(timeout);

    useEffect(() => {
        setTime(timeout);
        const internal = setInterval(() => {
            setTime((prevTime) => Math.max(0, prevTime - 100));
        }, 100);

        const timer = setTimeout(() => {
            onTimeout();
        }, timeout);

        return () => {
            clearTimeout(timer);
            clearInterval(internal);
        };
    }, [timeout, onTimeout]);

    return <progress id="question-time" value={time} max={timeout} />;
}