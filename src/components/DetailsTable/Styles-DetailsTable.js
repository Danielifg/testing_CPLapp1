
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

export const CustomTableCell = withStyles(() => ({
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
  
  
  export const customStyles = ({
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


  export const styles = theme => ({
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