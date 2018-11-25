import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import {compose } from 'react-apollo'

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function Record(props) {
  const { classes, otherDetailsMessage ,reportsData} = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>

        {otherDetailsMessage?
          <ul>
          <li><b>Policy: </b> {otherDetailsMessage.polNo} </li>
           <li><b> Expiracy Date: </b> {otherDetailsMessage.cntrctExpryDt} </li>
            <li><b>Execution Message: </b> {otherDetailsMessage.exctnMsg} </li>
          </ul> : <h3 style={{color:'#d3d3d3'}}>Select Policy to display message ...</h3>
        }
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

Record.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){

  return{
      otherDetailsMessage: state.otherDetailsMessage,
      reportsData: state.reportsData,
  }
}

export default compose(
  connect(mapStateToProps,null),
  withStyles(styles)
)(Record);
