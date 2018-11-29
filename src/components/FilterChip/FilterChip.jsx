import React from 'react';
import './CChips.css'
import Chip from '@material-ui/core/Chip';


function FilterChip (filters, _onDeleteFilter,query){

        return(
            <div className="under-bar">
                    <Chip  className="custom-chip" 
                             label={"query"}
                           variant="outlined" />
                    <Chip  className="custom-chip" variant="outlined" 
                          label={"query"}/>
                    <Chip  className="custom-chip"  variant="outlined"
                             label={"query"}/>
              </div>
        )
}

export default FilterChip;