import React, { useState, useEffect } from "react";
import "./style.css";
import StartPage from "./components/StartPage";
import Quiz from "./components/Quiz";
import Loading from "./components/Loading";

function App() {

  const [data, setData] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);
  const [loading, setLoading] = useState(false);

  function startGame() {
    setStartQuiz(true);
    setLoading(true);
    fetch("https://opentdb.com/api.php?amount=50")
    .then(res => res.json())
    .then(res => setData(res.results))
    .then(res => setLoading(false));
  }

  function getAllAnswers() {
    let allAnswers = [];
    data.map(item => {
        allAnswers.push([...item.incorrect_answers, item.correct_answer]);
    })
    for(let a of allAnswers) {
        for(let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
    }
    return allAnswers;
}

  return (
    <>
      {startQuiz ? 
      loading ? <Loading /> : <Quiz data={data} answers={getAllAnswers()} startGame={startGame} />
      : <StartPage startGame={startGame} />}
    </>
  );
}

export default App;

// https://opentdb.com/api.php?amount=50
// The database for the app: https://opentdb.com/api_config.php
