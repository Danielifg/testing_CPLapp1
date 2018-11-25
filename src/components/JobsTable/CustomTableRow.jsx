import Radium from 'radium';
import color from 'color';
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
    cursor:'pointer'

  }
}


export default CustomTableRow = Radium(CustomTableRow);
