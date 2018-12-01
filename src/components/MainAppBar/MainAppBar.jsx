import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button';
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
import FilterChip from '../FilterChip/FilterChip';
import './MainAppBar.css'

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
      displayedOptions : ["PolicyNumber","Status","Job Details","Job Id","Contract Exp Date",'Job Type','Processed',"Execution Message","Job Details Id","UUID"],
      selectOptions : {
                "polNo":"PolicyNumber",
                "exctnSts":"Status",
                "jobDetailses":"Job Details",
                "jobMstrId":"Job Id",
                "cntrctExpryDt":"Contract Exp Date",
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
            jobs_filtered_data, hideDetailsTable_redux}= this.props

            console.log(this.props.jobs_filtered_data)

      let filterSelectData = [];            
      const selectedProp = '';
      hideDetailsTable_redux()
      const data_to_use = jobs_filtered_data? jobs_filtered_data.data : reportsData

  Object.keys(selectOptions).forEach(function(key) {
      if(selectOptions[key] === queryProperty){
           
        filterSelectData = data_to_use.filter(i => i[key] === query)
        
        if(filterSelectData.length <= 0){ data_to_use.map(function(job){
        
          job.jobDetailses.map(function(details){
        
            if(details[key] === query){
        
              job.jobDetailses = job.jobDetailses.filter(i => i[key] === query)
        
              filterSelectData.push(job)                         
            }        
          })     
        })        
      }      
    }                                
  })

       // Error Handler Empty filter resultset
       if(filterSelectData.length <= 0){
         this.setState({filter_placeholder:'No Data...'})
         this.setState({filter_error_color:'#f08080'})
       }

       if(filterSelectData.length <= 0  & jobs_filtered_data != 'undefined'){
         filterSelectData = data_to_use         
       }

      
       set_Jobs_Filtered_Data(query, filterSelectData)
       console.log(this.props.jobs_filtered_data)
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

    <div style={{position:'fixed', zIndex:'5px'}}>
          <AppBar >
                <div style={styles.container}>

                <div style={{width:'40%'}}>
                  <div style={styles.searchSection}>                        
                               <FormControl required>
                                     <Select 
                                       native
                                       value={this.state.queryProperty}
                                       onChange={(event)=> this.setState({queryProperty: event.target.value})}
                                       name="Prop"
                                       inputProps={{ id: 'props'}}>
                                       <option value="" />
                                       {this.state.displayedOptions.map(key => (
                                                  <option key={key} value={key} >
                                                        {key}
                                                   </option>
                                            ))}
                                      </Select>                                  
                                 </FormControl>

                                 <input type="text" style={styles.filter_input}
                               onChange={(event) => this._handleEmptyFilter(event) }
                               placeholder={filter_placeholder}/>

                              <button onClick={() => this._handleFilterData()}className='search-btn'>
                                <p style={{color:'rgb(33,150,243)',marginTop: '3px'}}> SEARCH </p>
                              </button>                                                       
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
                                  <button onClick={() => this._handleDataLookUp()} className='search-btn' style={{marginTop:'-1px'}}>
                                         <p style={{color:'rgb(33,150,243)',marginTop: '4px'}}> SEARCH </p>
                                  </button>
                        </div>
                </div>      
              </AppBar>
              {this.props.jobs_filtered_data?              
                    <FilterChip query={this.state.query}/>
                :null}
              
      </div>
  );
 }
}

const styles = {
   container: {
   height:'2.4rem',
   alignSelf:'center',
   padding:'0px',
   width:'100%',
   display: 'flex',
   flexWrap: 'wrap',
   justifyContent:'space-around',
   position:"fixed",
   backgroundColor:"#f5f5f5",
   borderTop:'3px solid #2196f3',
   boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
  },
  searchSection: {  
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
    alignItems:'center',
    marginBottom:'2px'
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
filter_input:{
    height:'15px',
    fontSize:'15px',
    marginRight:'5px',
    color:'black', 
    borderColor:'transparent',
    //backgroundColor:`${filter_error_color}`, 
    borderRadius:'5px',
    marginTop:'5px'
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
