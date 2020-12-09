import './Header.css';


const header = (props) => {
    return (
        <div className="Header">
            <h2 className="Title">Design Facilty {props.examTitle}</h2>
            <div className="Timer">Time Left: 
                {props.minutes}:{props.seconds < 10 ? `0${props.seconds}` : props.seconds}
            </div>
        </div>
    );
}

export default header;