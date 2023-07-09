export default function StartPage(props) {
    return (
        <div className="container">
            <h1 className="title">Quizzical</h1>
            <p className="description">Test your knowledge in different fields</p>
            <button className="start-quiz" onClick={props.startGame}>Start Quiz</button>
        </div>
    );
}