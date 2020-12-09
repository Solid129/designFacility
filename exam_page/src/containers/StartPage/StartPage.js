import './StartPage.css';

const startPage = (props)=>{
    return <div className="StartPage">
        <button className="StartButton" onClick={props.onStart}>Start Exam</button>
    </div>
}

export default startPage;