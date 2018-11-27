import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import JobsTable from '../components/JobsTable/JobsTable'
import DetailsTable from '../components/DetailsTable/DetailsTable'
import JobPreview from '../components/JobsTable/JobPreview';
import { Query,graphql,compose  } from 'react-apollo'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import { FETCH_MAIN_DATA }  from '../graphql/Queries'
import  Loader from '../components/Loader/Loader'
import { setSearchFlag } from '../redux/actions'
import MainAppBar from '../components/MainAppBar/MainAppBar'
import Grid from '@material-ui/core/Grid';



class Reports extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: 0
    }
  }

  shouldComponentUpdate(nextProps){
    return(this.props.reportsData !== nextProps.reportsData ||
       this.props.jobs_filtered_data !== nextProps.jobs_filtered_data)
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleReaload(){
      if (performance.navigation.type == 1) {
        this.props.history.push(`/`)      
    }
  }

  render() {

    const { classes, reportsData,jobs_filtered_data} = this.props
    let ACTUAL_DATA = jobs_filtered_data ? jobs_filtered_data : reportsData
    //this.handleReaload();
    return (
      <div>
      <Grid container  >
          <Grid item xs={12}  >
                <MainAppBar/>
                
          </Grid>
          <Grid item lg={12} style={{marginTop:'2em'}}>
          <div className={classes.root}>
                {!ACTUAL_DATA?
                    <div style={{display:'flex',justifyContent:'center'}}>
                            <Loader />
                    </div>
                    :
                    <div>
                            <div style={{display:'flex', justifyContent:'space-evenly'}}>
                                      <Grid item xs={5}>
                                                    <div>
                                                        <JobsTable rows={ACTUAL_DATA}/>
                                                        <JobPreview/>
                                                    </div>
                                      </Grid>
                                        <Grid item xs={6}>
                                                    <div >
                                                        <DetailsTable style={{overflowX: 'hidden'}} />
                                                      </div>
                                        </Grid>
                              </div>
                        </div>
                        }
                  </div>
                </Grid>
            </Grid>
        </div>
    );
  }
}


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    marginTop:'2.5rem'
  },
  loader:{
    marginTop:'5em',
    display:'flex',
    justifyContent:'center'
  },
  tablesContainer:{
    justifyContent:'space-evenly',
    width:'100%',
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft:'0px',
  }
});

function mapStateToProps(state){
  return{
      showDetails             : state.showDetails,
      reportsData             : state.reportsData,
      searching               : state.searching,
      jobs_filtered_data      : state.jobs_filtered_data,
      details                 : state.details,
      reports_data_to_display : state.reports_data_to_display
  }
}

function mapDispatchToProps(dispatch){
  return{
    setSearchFlag:(boolean) =>dispatch(setSearchFlag(boolean))
  }
}

Reports.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
};
// this is the first one
export default compose(
          connect(mapStateToProps,mapDispatchToProps),
          withStyles(styles, { withTheme: true }))
(Reports)
