import React from 'react';
import './Option.css';
import Questionbubble from '../Questionbubble/Questionbubble';

function option(props) {
    return (
        <div id={props.id} className="Option">
            <Questionbubble className="Questionbubble option">{props.children}</Questionbubble>
            <p className="optionText" onClick={props.onSelect}>{props.text}</p>
        </div>
    );
}

export default option;