const data = [
    {
      "job": "1",
      "jobDetailses": [
                            {
                            "polNo": "772126490",
                            "prcsdCd": "COMPLETE",
                            },
                            {
                            "polNo": "421297881",
                            "prcsdCd": "FAILED",
                            }
                      ]
    },
    {
        "job": "2",
        "jobDetailses": [
                              {
                              "polNo": "772126490",
                              "prcsdCd": "FAILED",
                              },
                              {
                              "polNo": "421297881-X1",                    //[{pol:dccc,ijdie:ee}]
                              "prcsdCd": "FAILED",
                              },
                              {
                                "polNo": "421297881",
                                "prcsdCd": "COMPLETED",
                              }
                        ]
      },
      {
        "job": "3",
        "jobDetailses": [
                              {
                              "polNo": "77212649-x2",
                              "prcsdCd": "FAILED",
                              },
                              {
                              "polNo": "421297881-X1",
                              "prcsdCd": "FAILED",
                              },
                              {
                                "polNo": "421297881-C",
                                "prcsdCd": "COMPLETE",
                                },
                              {
                                "polNo": "421297881",
                                "prcsdCd": "COMPLETED",
                              }
                        ]
      },

      {
        "job": "4",
        "jobDetailses": [
                              {
                              "polNo": "77212649-x2",
                              "prcsdCd": "FAILED",
                              },
                              {
                              "polNo": "421297881-X3",
                              "prcsdCd": "FAILED",
                              },
                              {
                                "polNo": "421297881",
                                "prcsdCd": "COMPLETED",
                              }
                        ]
      }]


data.map((value,index,arr)=>{

})
const result
data.map((value, index, arr)=> {
  const current = value;
  const next =  arr[index + 1]
  const longerNext = current.jobDetailses.length < ( next && next.jobDetailses.length)? true: false;

  const differences = []

  if(longerNext && next){
    const currentPolicyNumbers = current.jobDetailses.filter(i=>i.prcsdCd === 'FAILED').map((data)=> data.polNo)

    next.jobDetailses.filter(i=>i.prcsdCd === 'FAILED').forEach((data, index, arr)=> {
      if(!currentPolicyNumbers.includes(data.polNo)){
        differences.push(data)
      }

    })
  }else {

    if(next){
       const nextPolicyNumbers = next.jobDetailses.filter(i=>i.prcsdCd === 'FAILED').map((data)=> data.polNo)

    current.jobDetailses.filter(i=>i.prcsdCd === 'FAILED').forEach((data, index, arr)=> {
      if(!nextPolicyNumbers.includes(data.polNo)){
        differences.push(data)
      }

    })

    }
  }
  if(differences.length){
    return   result.push({job:next["job"], jobDetailses: differences})
  }
})
