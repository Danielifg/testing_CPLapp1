import {
  HIDE_DETAILS,
  SHOW_DETAILS,
  SEARCH_DATES,
  SET_REPORTS_DATA,
  SET_SEARCH_FLAG,
  SET_DETAILS_TABLE_PROCESSING_MESSAGE,
  SET_JOBS_TABLE_OTHER_DETAILS,
  SET_JOBS_FILTERED_DATA,
  SET_DETAILS_FILTERED_DATA,
  SET_JOBDETAILS_WITH_NEW_ERRORS,
  SET_REPORTS_TO_DISPLAY
 } from '../actions';

const initState = {
  searching:false,
  errors:[]
}

function showTables( state = initState, action){
  switch(action.type){
    case SET_REPORTS_TO_DISPLAY:
            return{
                        ...state,
              reports_data_to_display:  action.reports_data_to_display
            }
    case SET_JOBDETAILS_WITH_NEW_ERRORS:
            return{
                  ...state,
              details_with_new_errors:  state.errors.push(action.jobDetailsNewErrors)
            }
    case SET_JOBS_FILTERED_DATA:
            return{
                        ...state,
              jobs_filtered_data:  action.jobs_filtered_data
            }
    case SET_DETAILS_FILTERED_DATA:
            return{
                          ...state,
               details_filtered_data: action.details_filtered_data
            }
    case SHOW_DETAILS:
            return{
              ...state,
              details : action.details,
              showDetails:true
            }
    case HIDE_DETAILS:
            return{
              ...state,
              showDetails:false
            }
      case SEARCH_DATES:
            return{
              ...state,
              from: action.from,
              to: action.to
            }
      case SET_REPORTS_DATA:
            return{
              ...state,
              reportsData: action.reportsData.data.getJobs.filter(i => i.jobMstrNm === "Conversion")
                            .sort((b, a) => {  return new Date(a.exctnStrtTm) - new Date(b.exctnStrtTm) })
            }
      case SET_SEARCH_FLAG:
            return{
              searching: action.searching
            }
      case SET_JOBS_TABLE_OTHER_DETAILS:
            return{
              ...state,
              otherDetails: action.otherDetails
            }
      case SET_DETAILS_TABLE_PROCESSING_MESSAGE:
            return{
              ...state,
              otherDetailsMessage: action.message
            }
    default:
        return state;
  }
}
export default showTables;
