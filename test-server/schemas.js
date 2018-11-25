const { ApolloServer, gql } = require('apollo-server');
// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  # This "Job" type can be used in other type declarations.
  schema{
  	query: Query
  }

   type Query {
     		 getJobs(from: String, to: String):[JobMaster]
  	}

   type JobMaster {
            jobMstrId : String
            jobMstrNm : String
            jobMstrDesc : String
            strtTm : String
            endTm : String
            exctnSts : String
            mchnId : String
            strtUsr : String
            exctnEnvrmnt : String
            prcsId : String
            prcsdCntr : String
            faildCntr : String
            exitRsn : String
            entryArgmnts : String
            hlck : String
            lstUpdtTm : String
            lstUpdtUsr : String
            crtnTm : String
            crtnUsr : String
            exctnStrtTm : String
            exctnEndTm : String
            exctnEndDtTmParm : String
            trxDltDly : String
            jobDetailses : [JobDetails]
    }

    type JobDetails {
     	 thrdNm : String
       jobDtlId : String
       jobMaster : String
       uuid : String
       pvCd : String
       coNo : String
       lobCd : String
       exctnMsg : String
  	 exctnDtTm : String
  	 rtryCntr : String
  	 prcsdCd : String
  	 cntrctVrsnId : String
  	 cntrctStsCd : String
  	 cntrctStsRsn : String
  	 termNo : String
  	 termVrsnNo : String
  	 hlck : String
  	 lstUpdtTm : String
  	 lstUpdtUsr : String
  	 crtnTm : String
  	 crtnUsr : String
  	 polNo : String
  	 dstrbNo : String
  	 dstrbNm : String
  	 brnchCd : String
  	 cntrctExpryDt : String
  	 cntrctDltTms : String
  	 descActnSprt : String
  	 cdTypeTransCtra : String
    }
`;

module.exports = { typeDefs }
