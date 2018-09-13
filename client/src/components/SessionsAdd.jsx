import React from 'react';
import $ from 'jquery';
import moment from 'moment';
import { Form, Button } from 'semantic-ui-react';
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react';

class SessionsAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DATE: '',
      START_TIME: '',
      END_TIME: '',
      hostId: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, { name, value }) {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  onSubmit() {
    this.setState({ hostId: this.props.hostId });
    console.log(this.state);
    $.ajax({
      type: 'POST',
      url: `/api/hosts/${this.props.hostId}/sessions`,
      data: JSON.stringify({ data: this.state }),
      contentType: 'application/json',
      success: function(data) {
        //TODO redirect the page to host profile
        console.log(data);
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Group widths="equal">
            <DateInput
              name="DATE"
              placeholder="Date"
              value={this.state.DATE}
              iconPosition="left"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <TimeInput
              name="START_TIME"
              placeholder="Start time"
              value={this.state.START_TIME}
              onChange={this.handleChange}
            />
            <TimeInput
              name="END_TIME"
              placeholder="End time"
              value={this.state.END_TIME}
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form>
        <Button onClick={this.onSubmit}>Submit</Button>
      </div>
    );
  }
}

export default SessionsAdd;
