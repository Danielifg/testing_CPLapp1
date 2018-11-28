import Radium from 'radium';
import React from 'react';


class CustomTableRow extends React.Component{
  render(){
    const { children } = this.props
    return(
      <tr style={radium_styles.radium}  >
          {children}
      </tr>
    )
  }
}

const radium_styles = {
  radium: {
    ':hover':{
     background: 'rgb(245,245,245)'
  },
   ':active': {
    background: 'aliceblue'
  },
    alignContent:'center',
    padding:'0px',
    cursor:'pointer',
  textAlign:'center'

  }
}


export default CustomTableRow = Radium(CustomTableRow);
