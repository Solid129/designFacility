import Questionbubble from '../../components/Questionbubble/Questionbubble';
import './Sidebar.css';

const sidebar = (props) => {
    return (
        <div className="Sidebar">
        <div className="StudentTitle"><span>Best of Luck!</span></div>
            <div className="Sidebar-Questionbubble"><Questionbubble className="Questionbubble">2</Questionbubble><p className="Sidebar-text">Question not Visited</p></div>
            <div className="Sidebar-Questionbubble"><Questionbubble className="Questionbubble notAnswered">2</Questionbubble><p className="Sidebar-text">Question not Answered</p></div>
            <div className="Sidebar-Questionbubble"><Questionbubble className="Questionbubble answered">2</Questionbubble><p className="Sidebar-text">Question Answered</p></div>
            <div className="Sidebar-Questionbubble"><Questionbubble className="Questionbubble marked">2</Questionbubble><p className="Sidebar-text">Question Marked</p></div>
            <div className="Sidebar-Questionbubble"><Questionbubble className="Questionbubble answered-marked">2</Questionbubble><p className="Sidebar-text">Question Answered & Marked for Review</p></div>
            <div className="SectionName"><span>{props.section}</span></div>
            <div><span>Choose a question:</span></div>
            <div className="questionList">{props.questions}</div>
            <div className="ButtonDiv">
            <button className="Submit" onClick={props.onSubmit}>SUBMIT</button>
            </div>
        </div>
    )
}

export default sidebar;