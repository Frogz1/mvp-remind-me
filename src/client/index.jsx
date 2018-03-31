import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label>Email</label>
        <input type="text" />
        <h1>Recently expired reminders</h1>
        <ul>
          <li>Take kids to soccer</li>
          <li>Get dinner</li>
        </ul>
      </div>
    );
  }
}

export default ReactDOM.render(<App />, document.getElementById('remind-me'));