import React from 'react';
import { Input, Form, Container, FormButton, Select } from 'semantic-ui-react';
import axios from 'axios';

const options = [
  {
    key: '1',
    text: 'One Minute',
    value: 1,
  }, {
    key: '5',
    text: 'Five Minutes',
    value: 5,
  }, {
    key: '10',
    text: 'Ten Minutes',
    value: 10,
  }, {
    key: '15',
    text: 'Fifteen Minutes',
    value: 15,
  }, {
    key: '30',
    text: 'Thirty Minutes',
    value: 30,
  }, {
    key: '45',
    text: 'Forty-five Minutes',
    value: 45,
  }, {
    key: '60',
    text: 'One Hour',
    value: 60,
  },
];

class ReminderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      reminderTime: 0,
      task: '',
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
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handleReminderTimeChange(data) {
    this.setState({ reminderTime: data.value });
  }
  handleReminderChange(e) {
    this.setState({ task: e.target.value });
  }
  handleSubmit() {
    this.setState({
      email: '',
      reminderTime: 0,
      task: '',
    });
  }
  addReminder() {
    const message = {
      task: this.state.task,
      reminderTime: this.state.reminderTime,
      email: this.state.email,
    };
    console.log(message);
    axios.post('/v1/reminders', message)
      .then((data) => {
        console.log(data);
        this.setState({
          email: '',
          reminderTime: 0,
          task: '',
        });
      })
      .catch(error => error);
  }

  render() {
    return (
      <Container textAlign="center">
        <Form>
          <Form.Group>
            <Form.Input
              width={6}
              label="Enter email"
              value={this.state.email}
              onChange={e => this.handleEmailChange(e)}
              type="email"
            />
          </Form.Group>
          <Form.Group>
            <Form.Select
              onChange={(e, data) => this.handleReminderTimeChange(data)}
              fluid
              value={this.state.reminderTime}
              label="Remind me in"
              width={6}
              options={options}
              placeholder="5 minutes"
            />
          </Form.Group>

          <Form.Group>
            <Form.TextArea
              onChange={e => this.handleReminderChange(e)}
              value={this.state.task}
              width={6}
              label="Reminder"
              placeholder="What do you want to be reminded about?"
            />
          </Form.Group>
          <Form.Group>
            <Form.Button
              width={6}
              positive
              onClick={() => {
              this.addReminder();
              }}
            >Submit
            </Form.Button>
          </Form.Group>
        </Form>
      </Container>

    );
  }
}
export default ReminderForm;
