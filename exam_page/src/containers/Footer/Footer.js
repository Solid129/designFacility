import './Footer.css';

const footer=(props)=>{
    return(
        <div className="Footer">
            <button className="buttons" onClick={props.reviewClick}>Mark for Review & Next</button>
            <button className="buttons" onClick={props.resetClick}>Clear Respponse</button>
            <button className="buttons" onClick={props.prevQuestion}>Previous</button>
            <button className="Savebutton" onClick={props.nextQuestion}>Save and Next</button>
        </div>
    );
}

export default footer;