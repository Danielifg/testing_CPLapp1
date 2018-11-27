import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
  colorPrimary: {
    backgroundColor: '#B2DFDB',
  },
  barColorPrimary: {
    backgroundColor: '#00695C',
  },
};



function Loader(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress style={{backgroundColor:'#2196f3'}}/>
      <br />
      <LinearProgress color="secondary" />
      <br />
      <LinearProgress
        classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }}
      />
    </div>
  );
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);
