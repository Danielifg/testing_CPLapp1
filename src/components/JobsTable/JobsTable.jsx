import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import SortIcon from '@material-ui/icons/Sort'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import CheckBox from '@material-ui/icons/CheckBox';
import LastPageIcon from '@material-ui/icons/LastPage';
import ChevronRight from '@material-ui/icons/ChevronRight'
import { graphql ,Query,compose } from 'react-apollo'
import TextField from '@material-ui/core/TextField';
import {showDetailsTable_redux, setJobsTableOtherDetails,
  set_JobDetails_with_new_errors} from '../../redux/actions'
import { connect } from 'react-redux'
import List from 'list.js'
import { jobsFilter, detailsFilter } from '../../redux/Filters'
import styled from 'styled-components'
import TablePaginationActions from '../DetailsTable/TablePaginationActions'
import {getFixedErros} from '../../redux/Filters'
import CustomTableRow from  './CustomTableRow'

class JobsTable extends React.Component {
  state = {
    selectedRow:'',
    page: 0,
    rowsPerPage: 10,
    rows:''
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  _handleSortToggle = () => {
    this.setState({rows:this.props.rows.sort((a,b) =>{ return new Date(b.exctnStrtTm) - new Date(a.exctnStrtTm) } ) })
  }
  _handleDetailsSetters = (value) => {
    this.props.setJobsTableOtherDetails(value);
    this.props.showDetailsTable_redux(value.jobDetailses)
  }
  render() {
    const { rows, classes, open, getJobs,showDetails,
            showDetailsTable_redux,setJobsTableOtherDetails,
            query, set_JobDetails_with_new_errors } = this.props; const result = [];
    const {  rowsPerPage, page, selectedRow } = this.state;
    let emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    let rows_data = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  //  rows_data.reverse();
  { if (rows_data){

    return (
      <Paper className={classes.root}>
        <div ref="container" className={classes.tableWrapper}>
          <Table className={classes.table} style={styles.tableWrapper}>
          <TableHead>
                <TableRow>
                     <CustomTableCell > <b>  Job Id        </b>   </CustomTableCell>
                     <CustomTableCell > <b> Date  </b>   { /* <SortIcon style={{cursor:'pointer'}} /> */} </CustomTableCell >
                      {/*<CustomTableCell > <b> Status      </b>  </CustomTableCell>*/}
                      <CustomTableCell > <b> Processed   </b>  </CustomTableCell>
                        <CustomTableCell > <b> New Errors  </b>  </CustomTableCell>
                        <CustomTableCell > <b> Fixed Errors  </b>  </CustomTableCell>
                </TableRow>
        </TableHead>
            <TableBody className='container'>
            {rows_data.map((value,index,arr) => {

              const current = value;
              const next =  arr[index + 1]
              const longerNext = next? current.jobDetailses.length < ( next && next.jobDetailses.length)? true: false : null
              const differences = [];
              const fixedErros = [];
              const TRANSACTION_NOT_IN_FORCE = "ContractVersion.Id=null";
              if(longerNext && next){
                const currentPolicyNumbers = current.jobDetailses.filter(i=>i.prcsdCd === 'FAILED').map((data)=> data.polNo)
                next.jobDetailses.filter(i=>i.prcsdCd === 'FAILED').forEach((data, index, arr)=> {
                  if(!currentPolicyNumbers.includes(data.polNo)){
                        if(data.exctnMsg.search(TRANSACTION_NOT_IN_FORCE) < 1){
                              differences.push(data)
                          }
                        }
                     })
              }else {
                if(next){
                   const nextPolicyNumbers = next.jobDetailses.filter(i=>i.prcsdCd === 'FAILED').map((data)=> data.polNo)
                   current.jobDetailses.filter(i=>i.prcsdCd === 'FAILED').forEach((data, index, arr)=> {
                      if(!nextPolicyNumbers.includes(data.polNo)){
                        if(data.exctnMsg.search(TRANSACTION_NOT_IN_FORCE) < 1){
                              differences.push(data)
                          }
                        }
                    })
                  }
                }

                if(next){
                  const currentPolicyNumbers = current.jobDetailses.filter(i=>i.prcsdCd === 'FAILED').map((data)=> data.polNo)
                  next.jobDetailses.filter(i=>i.prcsdCd === 'COMPLETED').forEach((data, index, arr)=> {
                    if(currentPolicyNumbers.includes(data.polNo)){
                           fixedErros.push(data)
                       }
                    })
                  }

                return (
                  <CustomTableRow style={customStyles.styledTableRow} key={index}>
                        <CustomTableCell onClick = {()=> this._handleDetailsSetters(value)} > {value.jobMstrId   } </CustomTableCell>
                        <CustomTableCell onClick = {()=> this._handleDetailsSetters(value)} > {value.exctnStrtTm } </CustomTableCell>
                        <CustomTableCell onClick = {()=> this._handleDetailsSetters(value)} > {value.prcsdCntr   } </CustomTableCell>
                        <CustomTableCell >
                                                {differences.length >0 ?
                                                  <Button variant="contained" color="secondary" className={classes.button}
                                                            onClick={() => showDetailsTable_redux(differences)}>
                                                                    {differences.length}
                                                    </Button> : <Button variant="contained"  style={{backgroundColor:'white',color:'black'}}
                                                            className={classes.button}> ✓ </Button>
                                                }
                        </CustomTableCell>
                        <CustomTableCell >
                                                {fixedErros.length >0 ?
                                                  <Button variant="contained" className={classes.button}
                                                   style={{backgroundColor:'limegreen'}}
                                                            onClick={() => showDetailsTable_redux(fixedErros)}>
                                                                    {fixedErros.length}
                                                    </Button> : <Button variant="contained"  style={{backgroundColor:'white',color:'black'}}
                                                    className={classes.button}>  ✘ </Button>
                                                }
                        </CustomTableCell>
                  </CustomTableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 40 * emptyRows }}>
                  <CustomTableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
       );
    }}
              return null;
  }
}

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#f5f5f5',
    color: 'black',
    fontWeight:'normal',
    fontSize: 15,
    textAlign:'center',
    //border:'solid 1px black',
    padding:'0px 0px 0px 0px !important',
    alignContent:'center'

  },
  body: {
    fontSize: 15,
    height:10,
      textAlign:'center'
  }
}))(TableCell);
const customStyles = ({
  inputFilter:{
    backgroundColor:'#f5f5f5',
    height:'20px',
    width:'8em'
  },
  styledTableRow:{
    alignContent:'center',
    padding:'0px',
  cursor:'pointer'
  },
  onSelectedStyledTableRow:{
     backgroundColor:'aliceblue'
   }
})
const styles = theme => ({
  root: {
    width: '100%',
    marginTop:'1px',
    overflowX: 'scroll',
 //   padding:'0px !important'
  },
  table: {
    minWidth: 700,
  //  padding:'0px !important'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
      height:'10px'

    },
  },
  tableWrapper:{
    fontSize: 15,
  },
  selectedRow:{
    cursor:'pointer',
  }
});

function mapStateToProps(state){
  return{
      showDetails: state.showDetails,
      query: state.query,
      jobs_filtered_data: state.jobs_filtered_data
  }
}

function mapDispatchToProps(dispatch){
  return{
      showDetailsTable_redux:          (details)      => dispatch(showDetailsTable_redux(details)),
      setJobsTableOtherDetails:        (otherDetails) => dispatch(setJobsTableOtherDetails(otherDetails)),
      set_JobDetails_with_new_errors:  (errors)       => dispatch(set_JobDetails_with_new_errors(errors))
  }
}


JobsTable.propTypes = {
  classes: PropTypes.object,
};

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withStyles(styles)
)(JobsTable);
