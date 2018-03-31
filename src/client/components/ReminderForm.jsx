import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

const ReminderForm = (props) => {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <TextField
        label="Email"
        id="margin-normal"
        defaultValue=""
        className={classes.textField}
        helperText="e.g. jane@doe.com"
        margin="normal"
      />
      <TextField
        label="Reminder"
        id="margin-normal"
        defaultValue=""
        className={classes.textField}
        helperText="e.g. pick up billy at school"
        margin="normal"
      />
      <Button
        variant="raised"
        color="primary"
      >
        Save
      </Button>
    </div>
  );
};

export default withStyles(styles)(ReminderForm);
