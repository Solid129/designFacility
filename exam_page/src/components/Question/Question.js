import React, { Component } from 'react';
import Option from '../Options/Option.js';
import './Question.css';
import Footer from '../../containers/Footer/Footer';

class Question extends Component {
    componentDidUpdate() {
        this.resetAnswer();
        var ele = document.getElementById(this.props.question.option);
        if (ele) {
            ele.children[1].className = "optionText selected";
        }
    }

    resetAnswer = () => {
        document.getElementById("option1").children[1].className = "optionText";
        document.getElementById("option2").children[1].className = "optionText";
        document.getElementById("option3").children[1].className = "optionText";
        document.getElementById("option4").children[1].className = "optionText";
    }

    resetButton = () => {
        this.resetAnswer();
        this.props.selected(this.props.index, this.props.section, this.props.qnum, "");
    }

    render() {
        return (
            <div>
                <h2 className="Qnum">{this.props.qnum}</h2>
                <p className="Qtext">{this.props.question.quesText}</p>
                <Option id="option1" text={this.props.question.option1} onSelect={() => this.props.selected(this.props.index, this.props.section, this.props.qnum, "option1")} >A</Option>
                <Option id="option2" text={this.props.question.option2} onSelect={() => this.props.selected(this.props.index, this.props.section, this.props.qnum, "option2")} >B</Option>
                <Option id="option3" text={this.props.question.option3} onSelect={() => this.props.selected(this.props.index, this.props.section, this.props.qnum, "option3")} >C</Option>
                <Option id="option4" text={this.props.question.option4} onSelect={() => this.props.selected(this.props.index, this.props.section, this.props.qnum, "option4")} >D</Option>
                <Footer
                        prevQuestion={this.props.prevQuestion}
                        nextQuestion={this.props.nextQuestion}
                        reviewClick={this.props.markQuestion}
                        resetClick={this.resetButton}
                    />
            </div>
        );
    }
}

export default Question;