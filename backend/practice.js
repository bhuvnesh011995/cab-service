// const statofday = require("date-fns/startOfDay")
// const endofday = require("date-fns/endOfDay")



// console.log(statofday(new Date(2012,7,14)))
// console.log(endofday(new Date(2012,7,14)))

let states = [
    { name: 'rajasthan' },
    { name: 'west bangal' },
    { name: 'gujrat' },
    {
      name: 'maharastra',
      country: {  name: 'india' }
    },
    {
      name: 'panjab',
      country: { name: 'pakistan' }
    }
  ]
  let stateList = [];
  let count = 0;
  for(i=0;i<states.length;i++){
      
      stateList.push({name:states[i].name})
      if(states[i].country){
          while(count<=i){
              stateList[count].country=states[i].country.name;
              count++
          }
      }
  }
  
  console.log(stateList)