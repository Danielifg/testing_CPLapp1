import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});


function Loader(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
        <CircularProgress className={classes.progress} color="secondary" />
    </div>
  );
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);
