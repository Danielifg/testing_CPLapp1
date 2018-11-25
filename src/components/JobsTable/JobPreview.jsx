import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import { compose } from 'react-apollo'
import Loader from '../Loader/Loader'

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

class JobPreview extends React.Component {
state = {
  errorMsg:null
}
render(){
  const { classes, otherDetails } = this.props;
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <Card className={classes.card}>
      <CardContent>
    {otherDetails?  <div>

                          <ul>
                            <li><b> Job ID : </b>             {otherDetails.jobMstrId} </li>
                            <li> <b>  Updated   Time :  </b>  {otherDetails.lstUpdtTm} </li>
                            <li><b>   Job start Time :  </b>  {otherDetails.strtTm} </li>
                            <li> <b>  Job end   Time :  </b>  {otherDetails.endTm} </li>
                            <li> <b>  Environment :  </b>  {otherDetails.exctnEnvrmnt} </li>
                            <li> <b>  Status :  </b>  {otherDetails.exctnSts} </li>
                            <li> <b> Processed :  </b>  {otherDetails.prcsdCntr} </li>
                            {this.state.errorMsg?   <li> <b> Message :  </b>  {this.state.errorMsg} </li> : null}
                          </ul>
                   </div>
        :
        <div style={{marginTop:'3em'}}>
                <h3 style={{color:'#d3d3d3'}}>Select Job to display details ...</h3>
          </div>
        }

    </CardContent>

        {otherDetails?   <CardActions>
              <Button style={{borderColor:'#d3d3d3'}} size="small"><b> Job Details </b>  </Button>
          </CardActions>:null
        }
     </Card>
  );
  }
}

JobPreview.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return{
      otherDetails:state.otherDetails
  }
}

export default compose(
    connect(mapStateToProps,null),
    withStyles(styles)
  )(JobPreview);
