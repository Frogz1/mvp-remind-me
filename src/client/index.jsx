import React from 'react';
import ReactDOM from 'react-dom';
import EndingSoon from './components/EndingSoon.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: [],
    }
    this.getTasksEndingSoon();
  }

  getTasksEndingSoon() {
    return fetch('/v1/reminders')
      .then((data) => {
        data.json()
          .then((data) => {
            this.setState({
              reminders: data
            })
          })
      })
      .catch(error => error)
  }
  
  

  render() {
    return (
      <div>
        <label>Email</label>
        <input type="text" />
        <h1>Ending Soon</h1>
        <EndingSoon reminders={this.state.reminders} />
      </div>
    );
  }
}

export default ReactDOM.render(<App />, document.getElementById('remind-me'));