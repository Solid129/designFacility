import { Component } from 'react';
import Question from '../Question/Question';
import Section from '../Section/Section';
import './ExamPage.css';
import Questionbubble from '../Questionbubble/Questionbubble';
import Sidebar from '../../containers/Sidebar/Sidebar';
import Header from '../../containers/Header/Header';

class ExamPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSection: {},
            currentQuestion: 1,
            submitted:false
        };
    }

    componentWillMount() {
        this.setState({
            exam: this.props.exam,
            minutes: this.props.exam.examDurationInMinutes,
            seconds: 0
        })
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const seconds = this.state.seconds;
            const minutes = this.state.minutes;

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    selectSection = (index, name) => {
        if (this.state.currentSection.name) {
            document.getElementById(this.state.currentSection.name).className = "Sections";
        }
        document.getElementById(name).className = "selectedSection";
        this.setState({
            currentSection: {
                index: index,
                name: name
            },
            currentQuestion: 1
        });
    }

    selectQuestion = (index) => {
        this.setState({
            currentQuestion: index,
        });
    }

    optionSelected = (index, section, question, option) => {
        var state = { ...this.state };
        var newExam = { ...state.exam };
        var newSection = [...newExam.sections];
        var newSection1 = { ...newSection[index] };
        var newSection2 = [...newSection1[section]];
        var newQuestion = { ...newSection2[question - 1] };
        newQuestion.option = option;
        if (option === "") {
            newQuestion.type = "notAnswered";
        } else {
            newQuestion.type = "answered";
        }
        newSection2[question - 1] = newQuestion;
        newSection1[section] = newSection2;
        newSection[index] = newSection1;
        newExam.sections = newSection;
        this.setState({
            exam: newExam
        });
    }

    prevQuestion = () => {
        var prevQ = this.state.currentQuestion - 1;
        var prevS = this.state.currentSection.index - 1;
        var section = this.state.currentSection;
        var state = { ...this.state };
        var newExam = { ...state.exam };
        var newSection = [...newExam.sections];
        var newSection1 = { ...newSection[section.index] };
        var newSection2 = [...newSection1[section.name]];
        var newQuestion = { ...newSection2[prevQ] };
        if (newQuestion.option) {
            if (newQuestion.option === "") {
                newQuestion.type = "notAnswered";
            } else {
                newQuestion.type = "answered";
            }
        } else {
            newQuestion.type = "notAnswered";
        }
        newSection2[prevQ] = newQuestion;
        newSection1[section.name] = newSection2;
        newSection[section.index] = newSection1;
        newExam.sections = newSection;
        this.setState({
            exam: newExam
        });
        if (prevQ > 0) {
            this.selectQuestion(prevQ);
        } else if (prevS >= 0) {
            newSection = Object.keys(this.state.exam.sections[prevS]);
            var question = this.state.exam.sections[prevS][newSection[0]].length;
            this.selectSection(prevS, newSection[0]);
            this.selectQuestion(question);
        }
    }

    nextQuestion = () => {
        var nextQ = this.state.currentQuestion + 1;
        var section = this.state.currentSection;
        var state = { ...this.state };
        var newExam = { ...state.exam };
        var newSection = [...newExam.sections];
        var newSection1 = { ...newSection[section.index] };
        var newSection2 = [...newSection1[section.name]];
        var newQuestion = { ...newSection2[nextQ - 2] };
        if (newQuestion.option) {
            if (newQuestion.option === "") {
                newQuestion.type = "notAnswered";
            } else {
                newQuestion.type = "answered";
            }
        } else {
            newQuestion.type = "notAnswered";
        }
        newSection2[nextQ - 2] = newQuestion;
        newSection1[section.name] = newSection2;
        newSection[section.index] = newSection1;
        newExam.sections = newSection;
        this.setState({
            exam: newExam
        });
        if (nextQ <= this.state.exam.sections[section.index][section.name].length) {
            this.selectQuestion(nextQ);
        } else if (section.index + 1 < this.state.exam.sections.length) {
            var newSectionName = Object.keys(this.state.exam.sections[section.index + 1]);
            this.selectSection(section.index + 1, newSectionName[0]);
        } else {
            newSectionName = Object.keys(this.state.exam.sections[0]);
            this.selectSection(0, newSectionName[0]);
            this.selectQuestion(1);
        }
    }

    markQuestion = () => {
        var nextQ = this.state.currentQuestion + 1;
        var section = this.state.currentSection;
        var question = this.state.currentQuestion;
        var state = { ...this.state };
        var newExam = { ...state.exam };
        var newSection = [...newExam.sections];
        var newSection1 = { ...newSection[section.index] };
        var newSection2 = [...newSection1[section.name]];
        var newQuestion = { ...newSection2[question - 1] };
        if (newQuestion.option) {
            if (newQuestion.option === "") {
                newQuestion.type = "marked";
            } else {
                newQuestion.type = "answered-marked"
            }
        } else {
            newQuestion.type = "marked";
        }
        newSection2[question - 1] = newQuestion;
        newSection1[section.name] = newSection2;
        newSection[section.index] = newSection1;
        newExam.sections = newSection;
        this.setState({
            exam: newExam
        });
        if (nextQ <= this.state.exam.sections[section.index][section.name].length) {
            this.selectQuestion(nextQ);
        } else if (section.index + 1 < this.state.exam.sections.length) {
            var newSectionName = Object.keys(this.state.exam.sections[section.index + 1]);
            this.selectSection(section.index + 1, newSectionName[0]);
        } else {
            newSectionName = Object.keys(this.state.exam.sections[0]);
            this.selectSection(0, newSectionName[0]);
            this.selectQuestion(1);
        }
    }

    onsubmitted=()=>{
        if(this.state.exam){
            this.setState({
                submitted:true
            })
        }
    }

    render() {
        var sectionsList = <p>Error fetching sections!</p>;
        var question = <p>Please Select Section!</p>;
        var questionsList = <p>No section selected!</p>;
        if (this.state.exam) {
            sectionsList = this.state.exam.sections.map((s, index) => {
                return <Section
                    id={Object.keys(s)[0]}
                    className="Section"
                    text={Object.keys(s)[0]}
                    selected={() => this.selectSection(index, Object.keys(s)[0])} />
            });
            let i = this.state.currentSection;
            var sections = this.state.exam.sections;
            for (var [j, sec] of sections.entries()) {
                if (i.index === j) {
                    questionsList = sec[i.name].map((qu, index) => {
                        return <Questionbubble
                            className={"Questionbubble " + (qu.type ? qu.type : "")}
                            id={qu._id}
                            onClick={() => this.selectQuestion(index + 1)}>
                            {index + 1}
                        </Questionbubble>
                    });
                    if (this.state.currentQuestion > sec[i.name].length) {
                        question = <Question
                            qnum={1}
                            section={i.name}
                            question={sec[i.name][0]}
                            selected={this.optionSelected}
                            nextQuestion={this.nextQuestion}
                            prevQuestion={this.prevQuestion}
                            markQuestion={this.markQuestion}
                        />;
                    }
                    else {
                        for (var k = 0; k < sec[i.name].length; k++) {
                            if (k === this.state.currentQuestion - 1) {
                                question = <Question
                                    index={i.index}
                                    section={i.name}
                                    qnum={k + 1}
                                    question={sec[i.name][k]}
                                    selected={this.optionSelected}
                                    nextQuestion={this.nextQuestion}
                                    prevQuestion={this.prevQuestion}
                                    markQuestion={this.markQuestion}
                                />;
                            }
                        }
                    }
                }
            }

        }
        const seconds = this.state.seconds;
        const minutes = this.state.minutes;
        var page = null;
        if((minutes===0 && seconds===0) || this.state.submitted){
            page = <div>Exam Ended!</div>
        }else{
            page = (<div className="ExamPage">
            <div className="QuestionArea">
                <Header minutes={minutes} seconds={seconds} examTitle={this.state.exam.examTitle} />
                <div className="Sectionbar">{sectionsList}</div>
                {question}
            </div>
            <Sidebar section={this.state.currentSection.name} questions={questionsList} onSubmit={this.onsubmitted}/>
        </div>);
        }
        return (
            <div>{page}</div>
        );
    }
}

export default ExamPage;

