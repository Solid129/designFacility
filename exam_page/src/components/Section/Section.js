import './Section.css';

function section(props){
    return <h3 id={props.id} className="Sections" onClick={props.selected}>{props.text}</h3>;
}

export default section;