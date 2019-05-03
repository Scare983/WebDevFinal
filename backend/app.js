const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const getSQLProcessor = require('./getSQLProcessor');
const insertProcessor = require('./insertProcessor');

var app = express();
var getProcessor = new getSQLProcessor();
var queryInsert = new insertProcessor();
var i = getProcessor.getListOfEmployeeAvailableDaysAndTimes("evan", "verma");
app.use( cors() );
app.use( bodyParser.json() );
/* EXAMPLE
var date = new Date("Mon Jan 15 2019");
getProcessor.getEmployeesWithShiftTypes(date,"12:00", "16:00", "C", function(err, res) {
  console.log(res);

});*/
/*app.post('/',function(req, res, next){
    res.json({msg: 'This is CORS-enabled for all origins!'});

    console.log("body: ", req.body.shopAMbools[0]);

    createSchedule(req.body);
  next();
});*/
app.get('/', function(req, res, next) {
 /*getProcessor.getAllEmployeeInfo(function (err, results) {
    var newRes = JSON.stringify(results); //makes object into JSON string
    res.json(newRes);
    res.end();
   console.log(newRes);
  }); */
  getProcessor.getAllEmployeeInfoExceptRoles(function(err, results) {
    if (err) {
      // TODO: send res error.
      console.error(err);
      return;
    }

    getProcessor.getAllRoles(function(err, rolesList) {
      if (err) {
        console.error(err);
        return;
      }
      console.log('rolesList' + rolesList);
      // OUTPUT FORMAT:
      /*[
          fName: 'patrick',
          lName: 'unknown',
          employeeType: 'employee',
          email: 'Patrick@gmail.com',
          gender: 'M',
          userName: 'changemeUGA21',
          password: '123567',
          prefWeekends: 0,
          prefNumOfShifts: 2,
          roleTrained: [ 'S', 'R', 'RR', 'C' ] 
        ]
      */
      let joined = [];
      for (let i = 0; i < results.length; i++) {
        let joinedItem = {
          ...results[i],
          roleTrained: []
        };

        for (let j = 0; j < rolesList.length; j++) {
          if (rolesList[j].id == joinedItem.id) {
            joinedItem.roleTrained.push(rolesList[j].roleTrained);
          }
        }
        
        joined.push(joinedItem);
      }
      for (let k = 0; k < joined.length; k++) {
        console.log(joined[k]);
      }
      console.log('sending: ' + joined);
      res.send(joined);
    });
  });
});
  /*results.forEach(function(result){
    let arr = [];
    getProcessor.getEmployeeRolesTrainedIn(result.fName,result.lName, function (err1, res) {
      if(typeof(res) == undefined ||typeof(res) == null ) {

      }
      else {
        res.forEach(function(rolesWithId) {
          arr.push(rolesWithId.roleTrained);
          console.log(rolesWithId.roleTrained);
        });
        for(let z =0; z < results.length; z++) {
          if(typeof(res[0]) == undefined || typeof(res[0]) == null ) break;
          try {
            if (result.id == res[0].id) {
              otherRes[z].roleTrained = arr;
              break;
            }
          }catch(er) {}
        }

      }
    }, conn);


  }); */

//});

app.listen(3000);

function createSchedule(body){
  console.log("schedule(body): ", body);

  var i = 2;
  while(i != 7){

      //would like to have a function that returns ids of all employees
      //who are available for shift. So input start time, end time, shift type, and
      //return array of ids.

      //Would also like a function that returns fname and lname when id is input.
    if(body.shopAMbools[i]){
      getProcessor.getListOfEmployeeAvailableDaysAndTimes('evan', 'verma', function(err, results){
      	console.log("sql query success");
      });
    }
    if(body.shopPMbools[i]){
      //fill shopPMworkers[i]
    }
    if(body.rrAMbools[i]){
      //fill rrAMworkers[i]
    }
    if(body.rrPMbools[i]){
      //fill rrPMworkers[i]
    }
    if(body.cartsAMbools[i]){
      //fill cartsAMworkers[i]
    }
    if(body.cartsPMbools[i]){
      //fill cartsPMworkers[i]
    }
    if(body.rangeAMbools[i]){
      //fill rangeAMworkers[i]
    }
    if(body.rangePMbools[i]){
      //fill rangePMworkers[i]
    }
    if(body.starterAMbools[i]){
      //fill starterAMworkers[i]
    }
    if(body.starterPMbools[i]){
      //fill starterPMworkers[i]
    }
    if(body.tcAMbools[i]){
      //fill tcAMworkers[i]
    }
    if(body.tcPMbools[i]){
      //fill tcPMworkers[i]
    }

    if(i === 2) i = 4;
      else if(i === 4) i = 1;
        else if(i === 1) i = 3;
          else if(i === 3) i = 5;
            else if(i === 5) i = 6;
              else if(i === 6) i = 0;
                else if(i === 0) i = 7;
  }


}
