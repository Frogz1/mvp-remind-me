import React from 'react';
import ReactDOM from 'react-dom';
import { Header, Container } from 'semantic-ui-react';
import EndingSoon from './components/EndingSoon';
import ReminderForm from './components/ReminderForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: [],
    };
    this.getTasksEndingSoon();
  }

  getTasksEndingSoon() {
    return fetch('/v1/reminders').then((data) => {
      data
        .json()
        .then((data) => {
          this.setState({ reminders: data });
        });
    }).catch(error => error);
  }

  componentDidUpdate() {
    setTimeout(() => this.getTasksEndingSoon(), 5000);
  }

  render() {
    return (
      <Container>
        <Header size="huge">Remind-Me!</Header>
        <ReminderForm onClick={() => this.getTasksEndingSoon} />
        <EndingSoon reminders={this.state.reminders} />
      </Container>
    );
  }
}

export default ReactDOM.render(<App />, document.getElementById('remind-me'));
