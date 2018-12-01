import React from 'react';
import './FilterChip.css'
import Chip from '@material-ui/core/Chip';


function FilterChip ({query}){
        function onDeleteChip(tag){
              alert(tag)
        }
        return(
            <div className="under-bar">
                    <Chip  className="custom-chip" 
                             label={query}
                             onDelete={()=>onDeleteChip(query)}
                           variant="outlined" />
              </div>
        )
}

export default FilterChip;