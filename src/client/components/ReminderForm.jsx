import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { Input, Form, Container, FormButton, Select } from 'semantic-ui-react';
import moment from 'moment';

const options = [
  {
    key: '1',
    text: 'One Minutes',
    value: 1,
  },
  {
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
  },
  {
    key: '30',
    text: 'Thirty Minutes',
    value: 30,
  },
  {
    key: '45',
    text: 'Forty-five Minutes',
    value: 45,
  },
  {
    key: '60',
    text: 'One Hour',
    value: 60,
  },
];

const ReminderForm = props => (

  <Container textAlign="center">
    <Form>
      <Form.Group>
        <Form.Input width={6} label="Enter email" type="email" />
      </Form.Group>
      <Form.Group>
        <Form.Select
          fluid
          label="Remind me in"
          width={6}
          options={options}
          placeholder="5 minutes" 
        />
      </Form.Group>

      <Form.Group>
        <Form.TextArea
          width={6}
          label="Reminder"
          placeholder="What do you want to be reminded about?" 
        />
      </Form.Group>
      <Form.Group>
        <Form.Button width={6} positive>Submit</Form.Button>
      </Form.Group>
    </Form>

  </Container>

);

export default ReminderForm;
