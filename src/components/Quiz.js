import React, { useState, useEffect } from "react";
import {nanoid} from "nanoid";
import he from "he";

export default function Quiz(props) {

    // Change the number of questions
    const numberOfQuestions = 5;

    const [questions, setQuestions] = useState({
        question_0: "",
        question_1: "",
        question_2: "",
        question_3: "",
        question_4: ""
    });
    const [showResult, setShowResult] = useState(false);
    const [count, setCount] = useState(0);

    const checkAnswersBtn = <button className="check-answers" onClick={checkAnswers}>Check Answers</button>;
    const gameOver = <div className="game-over">
                        <div className="result">You scored {count}/{numberOfQuestions} correct answers</div>
                        <button className="play-again" onClick={props.startGame}>Play Again</button>
                    </div>;

    function handleChange(event) {
        const {name, value} = event.target;
        setQuestions(prevQuestions => {
            return {
                ...prevQuestions,
                [name]: value
            };
        })
    }
    
    function checkAnswers() {
        setShowResult(true);
        const correctAnswers = props.data.map(item => item.correct_answer);
        const choosenAnswers = Object.values(questions);
        let checkedAnswers = [];
        for(let i = 0; i < numberOfQuestions; i++) {
            if(correctAnswers[i] === choosenAnswers[i]) {
                setCount(prevCount => prevCount + 1);
            }
        }
    }

    return (
        <div className="container quiz">
            {props.data.map((item, i) => {
                if(i < numberOfQuestions) {
                    return (
                        <div className="box" key={nanoid()}>
                            <h2>{he.decode(item.question)}</h2>
                            <div className="answers">
                            {props.answers[i].map(answer => {
                                return (
                                    <div key={nanoid()} className="answer">
                                        <input
                                            type="radio"
                                            id={answer + i}
                                            name={`question_${i}`}
                                            value={answer}
                                            checked={answer === questions[`question_${i}`]}
                                            onChange={(handleChange)}
                                            className={`${showResult && answer === item.correct_answer ? "correct" : ""}
                                                        ${showResult && answer === questions[`question_${i}`] && answer !== item.correct_answer ? "wrong" : ""}`}
                                        />
                                        <label 
                                            htmlFor={answer + i} 
                                        >
                                            {he.decode(answer)}
                                        </label>
                                    </div>
                                )
                            })}
                            </div>
                        </div>
                    )
                }
            })}
            {showResult ? gameOver : checkAnswersBtn}
        </div>
    );
}