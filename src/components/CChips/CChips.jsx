import React from 'react';
import './CChips.css'
import Chip from '@material-ui/core/Chip';


function CChips (filters, _onDeleteFilter){
        return(
            <div className="under-bar">
                
                    <Chip  className="custom-chip" 
                             label="Awesome"
                           variant="outlined" />
                    <Chip  className="custom-chip" variant="outlined" 
                          label="Awesome dev-v"/>
                    <Chip  className="custom-chip"  variant="outlined"
                             label="AwesomeCip" />
              </div>
        )
}

export default CChips;