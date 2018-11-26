import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import FormControl from '@material-ui/core/FormControl';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormHelperText from '@material-ui/core/FormHelperText';
import { compose  } from 'react-apollo'
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from 'react-redux'
import { request, GraphQLClient } from 'graphql-request'
import  {FETCH_MAIN_DATA}  from '../../graphql/Queries'
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

import { setReportsData, setSearchFlag, setSearchDates,
          set_Jobs_Filtered_Data,
          set_Details_Filtered_Data,
          hideDetailsTable_redux} from '../../redux/actions'

class MainAppBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      filter_placeholder : 'Filter...',
      filter_error_color : '#FFF',
      dates_error_color:'#FFF',
      queryProperty:'',
      query:'',
      from: null,
      to: null,
      searching:false,
      displayedOptions : ["PolicyNumber","Status","Job Details","Job Id","Contract Expiracy Date",'Job Type','Processed',"Execution Message","Job Details Id","UUID"],
      selectOptions : {
                "polNo":"PolicyNumber",
                "exctnSts":"Status",
                "jobDetailses":"Job Details",
                "jobMstrId":"Job Id",
                "cntrctExpryDt":"Contract Expiracy Date",
                "jobMstrNm":'Job Type',
                "lstUpdtTm":'Job Last Update Time',
                "prcsdCntr":'Processed',
                "endTm":" Job End Time",
                "strtTm": "Job Start Time",
                 "exctnDtTm":"Execution Date Time",
                 "exctnMsg":"Execution Message",
                 "jobDtlId":"Job Details Id",
                 "lstUpdtTm":" Job Last Update Time",
                 "prcsdCd":" ",
                 "uuid" :" UUID"
               }
    }
  }

// ** ***********************  Apollo Client Call  ******************************  **
  _handleDataLookUp = () =>{
    const { setReportsData, setSearchFlag ,hideDetailsTable_redux,searching} = this.props
    const { from, to } = this.state
    if(from!==null && to!==null){
          this.props.setSearchDates(from,to)
          this.setState({searching:true})
          setSearchFlag(this.state.searching);
          const operation = {  query: FETCH_MAIN_DATA,  variables: {from,to} }
          setReportsData(operation);      //  Apollo Call
          this.setState({dates_error_color:'#FFF'})
    }else{
          this.setState({dates_error_color:'#f08080'})
    }
  }

// ** ***********************  FILTER  ******************************  **
_handleFilterData(){
      const { queryProperty, query, selectOptions} = this.state
      const { reportsData, showDetails ,set_Jobs_Filtered_Data,
            jobs_filtered_data,hideDetailsTable_redux}= this.props

      let filterSelectData = [];
      const selectedProp = '';
      hideDetailsTable_redux()

  Object.keys(selectOptions).forEach(function(key) {
      if(selectOptions[key] === queryProperty){ filterSelectData = reportsData.filter(i => i[key] === query )
              if(filterSelectData.length <= 0){ reportsData.map(function(job){
                       job.jobDetailses.map(function(details){
                         if(details[key] === query){ job.jobDetailses = job.jobDetailses.filter(i => i[key] === query)
                            filterSelectData.push(job) }})})}}
        })


       // Error Handler Empty filter resultset
       if(filterSelectData.length <= 0){
         this.setState({filter_placeholder:'No Data...'})
         this.setState({filter_error_color:'#f08080'})
       }

       if(filterSelectData.length <= 0  & jobs_filtered_data != 'undefined'){
         filterSelectData = reportsData
       }


       set_Jobs_Filtered_Data(filterSelectData)
       console.log(jobs_filtered_data)
       console.log(reportsData)
       console.log(queryProperty)
       console.log(query)
  }


  //***************************************************************************
  _handleEmptyFilter(event){
  console.log(event.target.value)
  this.setState({filter_placeholder:'Filter...'})
  this.setState({filter_error_color:'#FFF'})

 this.setState({query: event.target.value})
    if(this.state.query === ' '){
        this.props.set_Jobs_Filtered_Data(this.props.reportsData.data.getJobs)
    }
  }
  _handleDelete(){
    alert('delte');
  }

  render(){

      const { classes, setFilterQuery,showDetails } = this.props;
      const { selectOptions,filter_error_color,filter_placeholder, dates_error_color } = this.state

  return (
          <AppBar >
                <Toolbar style={styles.container}>

                <div style={{width:'60%'}}>
                  <div style={styles.searchSection}>
                        <input type="text" style={{height:'18px',fontSize:'20px', marginRight:'5px',
                         color:'black', borderColor:'transparent', backgroundColor:`${filter_error_color}`, borderRadius:'5px'}}
                               onChange={(event) => this._handleEmptyFilter(event) }
                               placeholder={filter_placeholder}/>

                               <FormControl required className={classes.formControl}>
                                     <Select
                                       native
                                       value={this.state.queryProperty}
                                       onChange={(event)=> this.setState({queryProperty: event.target.value})}
                                       name="Prop"
                                       inputProps={{ id: 'props'}}>
                                       <option value="" />
                                       {this.state.displayedOptions.map(key => (
                                                  <option key={key} value={key} >
                                                        <h3>{key}</h3><hr/>
                                                   </option>
                                            ))}
                                      </Select>
                                     <FormHelperText>Required</FormHelperText>
                                 </FormControl>

                               <IconButton className={classes.button} style={styles.searchBtn}
                                           onClick={() => this._handleFilterData()}>
                                         <SearchIcon fontSize='inherit' />
                               </IconButton>                                                           
                  </div>

                             <div style={{marginTop:'10px'}}>
                                  <Chip color="primary" label={this.state.query} onDelete={this._handleDelete} variant="outlined"
                                  style={{height:'25px'}} /> 
                                   <Chip color="primary" label={this.state.query} onDelete={this._handleDelete} variant="outlined"
                                  style={{height:'25px'}} /> 
                                   <Chip color="primary" label={this.state.query} onDelete={this._handleDelete} variant="outlined"
                                  style={{height:'25px'}} /> 
                                   <Chip color="primary" label={this.state.query} onDelete={this._handleDelete} variant="outlined"
                                  style={{height:'25px'}} /> 
                                   <Chip color="primary" label={this.state.query} onDelete={this._handleDelete} variant="outlined"
                                  style={{height:'25px'}} /> 

                              </div>
               </div>

                  <div style={styles.barDatesSection}>

                              <div>
                                 <input type="date"
                                        style={{height:'20px',fontSize:'12px', width:'13em', color:'black',
                                                borderColor:'transparent',backgroundColor:`${dates_error_color}`,
                                                borderRadius:'5px'}}
                                        onChange={(event) => this.setState({from: event.target.value})}
                                        onFocus={() => this.setState({dates_error_color:'#FFF'})}/>
                              </div>

                              <div>
                                <Typography variant="subheading" color="primary"> - </Typography>
                              </div>

                              <div>
                                <input type="date"
                                        style={{height:'20px',fontSize:'12px', width:'13em', color:'black',
                                                borderColor:'transparent', backgroundColor:`${dates_error_color}`,
                                                borderRadius:'5px'}}
                                        onChange={(event) => this.setState({to: event.target.value})}/>
                              </div>

                                  <IconButton className={classes.button}
                                              style={styles.searchBtn}
                                              onClick={() => this._handleDataLookUp()}>
                                            <SearchIcon fontSize='inherit' />
                                  </IconButton>
                        </div>
                </Toolbar>
              </AppBar>
  );
 }
}

const styles = {
   container: {
    height:'2em',
   alignSelf:'center',
   padding:'0px',
   width:'100%',
   display: 'flex',
   flexWrap: 'wrap',
   justifyContent:'space-evenly',
   position:"fixed",
   backgroundColor:"#f5f5f5",
   borderTop:'5px solid #3f51b5',
   boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
  },
  searchSection: {
    marginTop:'2em',
   width:'100%',
   alignItems: 'center',
   justifyContent:'space-evenly',
   display: 'flex',
   flexWrap:'wrap',
   marginLeft:'0px',
},
  barDatesSection:{
    justifyContent:'space-evenly',
    width:'35%',
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft:'0px',
    borderRight:'solid 2px #d3d3d3',
    alignItems:'center'
  },
  filterInput:{
    width:'20em'
  },
  input_dates:{

  },
  searchBtn:{
    border:'solid .5px  #d3d3d3',
    borderRight:'solid 1px #d3d3d3'
  },
  logo:{
    marginLeft:'0px',
    width:'10em',
    padding:'1px'
  }
};

function mapStateToProps(state){
  //console.log(state)
  return{
      showDetails: state.showDetails,
      reportsData: state.reportsData,
      searching  : state.searching,
      from:state.from,
      to:state.to,
      jobs_filtered_data:state.jobs_filtered_data
  }
}

function mapDispatchToProps(dispatch){
  return{
    setReportsData:(operation)                              => dispatch(setReportsData(operation)),
    setSearchFlag:(searching)                                 => dispatch(setSearchFlag(searching)),
    set_Jobs_Filtered_Data:(arrayResult, data, prop, query) => dispatch(set_Jobs_Filtered_Data(arrayResult, data, prop, query)),
    setSearchDates:(from,to)                                => dispatch(setSearchDates(from,to)),
    hideDetailsTable_redux:()                              => dispatch(hideDetailsTable_redux())
  }
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  withStyles(styles)
)(MainAppBar);
