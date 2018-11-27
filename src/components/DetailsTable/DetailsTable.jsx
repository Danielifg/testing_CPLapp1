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
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import uuidv1 from 'uuid/v1'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import { graphql , Query,compose } from 'react-apollo'
import {hideDetailsTable_redux, setDetailsTableProcessingMessage} from '../../redux/actions'
import Loader from '../Loader/Loader'
import dateformat from 'dateformat'
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import  {format}  from '../../graphql/Queries'
import TablePaginationActions from './TablePaginationActions'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './DetailsTable.css'

class DetailsTable extends React.Component {
  state = {
    selectedRow:'#d3d3d3',
    page: 0,
    rowsPerPage: 10,
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  onHoverRow = () =>{
    this.setState({selectedRow:'#dcdee8'})
  }

  render() {
    const { classes  ,  hideDetailsTable_redux, detailsRow, setDetailsTableProcessingMessage, reportsData} = this.props;
    const { rowsPerPage, page,selectedRow } = this.state;
    const emptyRows = detailsRow?rowsPerPage - Math.min(rowsPerPage, detailsRow.length - page * rowsPerPage):null
    const detailsData = detailsRow? detailsRow : reportsData[0].jobDetailses

    return (
      detailsData?
      <div className={classes.root} >
        
          <table  >
                  <TableBody>
                    {detailsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((details, i) => {
                      const renewal = details.cntrctExpryDt? Moment(Date.parse(details.cntrctExpryDt)).subtract(60,'days') : null
                      const daysToRenewal =details.cntrctExpryDt? Moment(details.cntrctExpryDt, "YYYYMMDD").fromNow() : null

                      return (
                        <TableRow key={i}
                           onClick={() => setDetailsTableProcessingMessage(details)} style={{cursor:'pointer'}}>
                          <td>
                                   <ExpansionPanel className='expansion-panel'>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{borderColor:'transparent'}}>
                                                <Typography >                                                
                                                 <b>PolNom</b> {details.polNo} {"   "}
                                                 <b>Status</b> {details.prcsdCd} {"   "}
                                                 <b>Days to Renewal</b> {daysToRenewal ? daysToRenewal : `Not available`}
                                                 </Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                          <Typography style={{textAlign:'left'}}>
                                                          <b>Record</b> {details.jobDtlId}
                                                  <br/>   <b>PolNom</b> {details.polNo}
                                                  <br/>   <b>Status</b> {details.prcsdCd}
                                                  <br/>   <b>Expiracy</b> {details.cntrctExpryDt}
                                                  <br/>   <b>Renewal</b> {renewal ? format(renewal) :`Not available`}
                                                  <br/>   <b>Days to Renewal</b> {daysToRenewal ? daysToRenewal : `Not available`}

                                                  <br/>   <b>Message</b>  {details.exctnMsg}
                                              </Typography>
                                        </ExpansionPanelDetails>
                                      </ExpansionPanel>
                             </td>
                        </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 40 * emptyRows }}>
                  <CustomTableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody >
            <TableFooter>
              <TableRow style={{overflowX: 'hidden'}}>
                <TablePagination style={{overflowX: 'hidden'}}
                  colSpan={3}
                  count={detailsData.length}
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
      :
      <div style={{display:'flex', justifyContent:'center'}}>
                     <Loader />
               </div>
    );
  }
}
const customStyles = {
  inputFilter:{
    backgroundColor:'#f5f5f5',
    height:'20px',
    width:'8em'
  },
  tableRow:{
    alignContent:'center',
    padding:'10px',
    width:'20px'
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
    padding:'20px 0px 0px 0px !important'
  },
  body: {
    fontSize: 15,
    height:10,
      textAlign:'center'
  },
}))(TableCell);
const styles = theme => ({
  root: {
    width: '100%',
    marginTop:'2em',
    overflowX: 'scroll',
    boxShadow:'white',
      textAlign:'center'
  },
  table: {
    minWidth: 700,
 //   padding:'0px !important',
      textAlign:'center'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
      height:'10px',
        textAlign:'center'
    },
  },
  tableWrapper:{
  //  padding:'0px',
    fontSize: 15,
  },
  selectedRow:{
    cursor:'pointer',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});
function mapStateToProps(state){
  return{
      detailsRow:state.details,
      reportsData: state.reportsData,
  }
}

function mapDispatchToProps(dispatch){
  return{
      hideDetailsTable_redux:() => dispatch(hideDetailsTable_redux()),
      setDetailsTableProcessingMessage:(message) => dispatch(setDetailsTableProcessingMessage(message))
  }
}

DetailsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withStyles(styles)
)(DetailsTable);
