import { API_setReportsData } from '../../graphql/DataFetchers'
import { jobsFilter, detailsFilter } from '../Filters'

const SHOW_DETAILS= 'SHOW_DETAILS';
const HIDE_DETAILS= 'HIDE_DETAILS';
const SEARCH_DATES = 'SEARCH_DATES';

const SET_REPORTS_DATA = 'SET_REPORTS_DATA';

const SET_SEARCH_FLAG = 'SET_SEARCH_FLAG'
const SET_DETAILS_TABLE_PROCESSING_MESSAGE = 'SET_DETAILS_TABLE_PROCESSING_MESSAGE'
const SET_JOBS_TABLE_OTHER_DETAILS = 'SET_JOBS_TABLE_OTHER_DETAILS'
const SET_JOBDETAILS_WITH_NEW_ERRORS = 'SET_JOBDETAILS_WITH_NEW_ERRORS'
const SET_JOBS_FILTERED_DATA = 'SET_JOBS_FILTERED_DATA'
const SET_DETAILS_FILTERED_DATA = 'SET_DETAILS_FILTERED_DATA'
const SET_REPORTS_TO_DISPLAY = 'SET_REPORTS_TO_DISPLAY'

const set_Reports_Data_To_Display = ( reports_data_to_display ) =>({
  type: SET_REPORTS_TO_DISPLAY,
  reports_data_to_display
})

//  FILTERS
const set_Jobs_Filtered_Data = (jobs_filtered_data) => ({
      type: SET_JOBS_FILTERED_DATA,
      jobs_filtered_data: jobs_filtered_data
  })

const set_JobDetails_with_new_errors = (jobDetailsNewErrors) =>{
      type: SET_JOBDETAILS_WITH_NEW_ERRORS,
      jobDetailsNewErrors
}

const showDetailsTable_redux = (details) => ({
  type: SHOW_DETAILS,
  details
})

const hideDetailsTable_redux = () => ({
  type: HIDE_DETAILS
})

const setSearchDates = (from,to) =>({
  type: SEARCH_DATES,
  from,
  to
})
const setReportsData = (operation) => dispatch => (
    API_setReportsData(operation)
        .then(data => dispatch({
            type: SET_REPORTS_DATA,
            reportsData: data
        }))
)

const setSearchFlag = (searching) =>({
  type: SET_SEARCH_FLAG,
  searching
})

const setDetailsTableProcessingMessage = (message) =>({
  type: SET_DETAILS_TABLE_PROCESSING_MESSAGE,
  message
})

const setJobsTableOtherDetails = (otherDetails) =>({
  type: SET_JOBS_TABLE_OTHER_DETAILS,
  otherDetails
})

export {
  SHOW_DETAILS,
  SET_DETAILS_TABLE_PROCESSING_MESSAGE,
  SET_JOBS_TABLE_OTHER_DETAILS,
  SET_REPORTS_TO_DISPLAY,
  set_Reports_Data_To_Display,
  SET_JOBS_FILTERED_DATA,
  SET_DETAILS_FILTERED_DATA,
  HIDE_DETAILS,
  SEARCH_DATES,
  SET_REPORTS_DATA,
  SET_SEARCH_FLAG,
  SET_JOBDETAILS_WITH_NEW_ERRORS,
  setSearchFlag,
  showDetailsTable_redux,
  set_JobDetails_with_new_errors,
  setFilterQuery,
  hideDetailsTable_redux,
  set_Jobs_Filtered_Data,
  set_Details_Filtered_Data,
  setSearchDates,
setReportsData,
  setDetailsTableProcessingMessage,
  setJobsTableOtherDetails
 }
