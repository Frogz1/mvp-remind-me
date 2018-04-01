import React from 'react';
import moment from 'moment';

const EndingSoon = props => (
  <ul>
    {
    props.reminders.map((item) => {
      return (
        <li style={{ 'list-style-type': 'none' }} key={item._id}>{item.task}
        <b> reminding in {moment(item.reminderTime).fromNow()}</b>
      </li>);
      })
  }
  </ul>
);

export default EndingSoon;
