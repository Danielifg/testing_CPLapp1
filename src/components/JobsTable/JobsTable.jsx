import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { graphql ,Query,compose } from 'react-apollo'
import TextField from '@material-ui/core/TextField';
import {showDetailsTable_redux, setJobsTableOtherDetails,
        set_JobDetails_with_new_errors} from '../../redux/actions'
import { connect } from 'react-redux'
import TablePaginationActions from '../DetailsTable/TablePaginationActions'
import CustomTableRow from  './CustomTableRow'
import './JobsTable.css'


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
    const { rows, classes, showDetailsTable_redux} = this.props; 
    const {  rowsPerPage, page } = this.state;

    let emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    let rows_data = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
  { if (rows_data){
    return (
      <div className='root'>
        <div ref="container">
          <table className='table'>
                <tr className='table-head'>              
                    <th >  Job Id       </th>
                    <th >  Date    { /* <SortIcon style={{cursor:'pointer'}} /> */} </th >                      
                    <th >  Processed    </th>
                    <th >  New Errors   </th>
                    <th >  Fixed Errors </th>                
                </tr>
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
              } else {
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
                  <CustomTableRow className='styledTableRow' key={index}>
                        <th onClick = {()=> this._handleDetailsSetters(value)} > { value.jobMstrId   } </th>
                        <th onClick = {()=> this._handleDetailsSetters(value)} > { value.exctnStrtTm } </th>
                        <th onClick = {()=> this._handleDetailsSetters(value)} > { value.prcsdCntr   } </th>
                        <th >
                                                {differences.length >0 ?
                                                  <Button variant="contained" color="secondary" size="small"
                                                            onClick={() => showDetailsTable_redux(differences)}>
                                                                    {differences.length}
                                                    </Button> : <Button variant="contained"                                                                  
                                                                 className='default-btn'> 
                                                                  ✓ 
                                                                 </Button>
                                                }
                        </th>
                        <th >
                                                {fixedErros.length >0 ?
                                                  <Button variant="contained" 
                                                   style={{backgroundColor:'limegreen'}} size="small"
                                                            onClick={() => showDetailsTable_redux(fixedErros)}>
                                                                    {fixedErros.length}
                                                    </Button> : <Button variant="contained"                                                      
                                                                 className='default-btn'> 
                                                                  ✘ 
                                                                </Button>
                                                    
                                                }
                        </th>
                  </CustomTableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 40 * emptyRows }}>
                  <th colSpan={6} />
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
          </table>
        </div>
      </div>
       );
    }}
              return null;
  }
}

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

export default connect(mapStateToProps,mapDispatchToProps)(JobsTable);
