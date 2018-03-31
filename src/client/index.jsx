import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/GridList'
import EndingSoon from './components/EndingSoon.jsx';
import ReminderForm from './components/ReminderForm.jsx';
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

    <Grid container="true" style={{"display":"flex", "flexWrap":"flex", "alignItem":"true"}}>
      <Grid item='true' direction="column" justify="center" md={12}>
        <ReminderForm />
        </Grid>
        </Grid>
    
        <EndingSoon reminders={this.state.reminders} />
</div>


    );
  }
}

export default ReactDOM.render(<App />, document.getElementById('remind-me'));