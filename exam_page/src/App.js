import { Component } from 'react';
import './App.css';
import ExamPage from './components/ExamPage/ExamPage';
import StartPage from './containers/StartPage/StartPage';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examStarted: false,
      errorMessage:""
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
          var newState = null;
          axios.get("http://5.181.217.46/DesignFacility/useGETMethodForTheResponse/Sumit_Kumar")
              .then(response => {
                  newState = response.data.exam;
                  this.setState({ exam: newState });
              }).catch(e=>{
                this.setState({
                  errorMessage:e.message
                });
              });
      }

  onStart = () => {
    if(this.state.exam){
      this.setState({
        examStarted: true
      });
    }
  }

  render() {
    var exam = <StartPage onStart={this.onStart}></StartPage>;
    if(this.state.errorMessage!==""){
      exam = <h2>{this.state.errorMessage}</h2>
    }
    if (this.state.examStarted) {
      exam = <ExamPage exam={this.state.exam} />
    }
    return (
      <div className="App">
        {exam}
      </div>
    );
  }
}

export default App;
