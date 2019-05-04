const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const getSQLProcessor = require('./getSQLProcessor');
const insertProcessor = require('./insertProcessor');
var app = express();
var getProcessor = new getSQLProcessor();
var queryInsert = new insertProcessor();
app.use( cors() );
app.use( bodyParser.json() );
/* EXAMPLE
var date = new Date("Mon Jan 15 2019");
getProcessor.getEmployeesWithShiftTypes(date,"12:00", "16:00", "C", function(err, res) {
  console.log(res);

});*/
var date = new Date("2015-5-10");

var dat1 = new Date("2015-10-10");
/*queryInsert.requestedDayOff("evan", "verma", "2015-5-10", "2015-10-10", " a", function(err, res) {
  if(err) {
  }
  if(res) console.log("yay");
});*/

app.post('/',function(req, res, next){
    res.json({msg: 'This is CORS-enabled for all origins!'});
    console.log("body: ", req.body.shopAMbools[0]);
    createSchedule(req.body);
});

app.get('/employee-info', function(req, res, next) {
  getProcessor.getAllEmployeeInfoExceptRoles(function(err, results) {
    if (err) {
      next(err);
      return;
    }

    getProcessor.getAllRoles(function(err, rolesList) {
      if (err) {
        next(err);
        return;
      }
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
      var valsJSON = JSON.stringify(joined);
      res.json(joined);
    });
  });
});

app.get('/admin-rto', function(req, res, next) {
  getProcessor.getListOfEmployeeRTO(function(err, results) {
    if (err) {
      next(err);
      return;
    }
      let joined = [];
      for (let i = 0; i < results.length; i++) {
        let joinedItem = {
          ...results[i],
        };
        joined.push(joinedItem);
      }
      for (let k = 0; k < joined.length; k++) {
        console.log(joined[k]);
      }
      console.log('sending: ' + joined);
      res.json(joined);
  });
});

app.use(function(err, req, res, next) {
  console.error(err);
  res.status(500).send({
    message: 'something we wrong'
  });
});

app.listen(3000);

function createSchedule(body){
  console.log("body: ", body);

  var scheduleDays = new Array(7);

  //fix data in dates array
  for (var i=0;i<7;i++){
    scheduleDays[i] = new Date( body.dateStrings[i] );
    console.log("scheduleDays[",i,"]: ", scheduleDays[i]);
  }

  var i = 2;
  while(i != 7){

      //would like to have a function that returns ids of all employees
      //who are available for shift. So input start time, end time, shift type, and
      //return array of ids.

      //Would also like a function that returns fname and lname when id is input.
    if(body.shopAMbools[i]){
      getProcessor.getEmployeesWithShiftTypes(
        scheduleDays[i],body.shopAMtimes[i], body.shopPMtimes[i], 'S', function(err, results){
          console.log("results for day 0: \n", results);
      });
      console.log("did query for i ===", i);
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
