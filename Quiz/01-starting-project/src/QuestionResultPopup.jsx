import { forwardRef } from "react";

const QuestionResultPopup = forwardRef(function QuestionResultPopup(props, ref) {

    
    return(
        <div ref={ref} className={props.visibility ? "result_visible" : "result_non_visible"}>
            <h5>{props.result} </h5>
        </div>
    );
});
export default QuestionResultPopup;
