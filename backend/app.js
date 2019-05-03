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
var date = new Date("Mon Jan 15 2019");
getProcessor.getEmployeesWIthShiftTypes(date,"12:00", "16:00", "C", function(err, res) {
  console.log(res);

});
app.post('/',function(req, res, next){
    res.json({msg: 'This is CORS-enabled for all origins!'});

    console.log("body: ", req.body.shopAMbools[0]);

    createSchedule(req.body);

});

app.listen(3000);

function createSchedule(body){
  console.log("schedule(body): ", body.shopAMbools[0]);

  var i = 2;
  while(i != 7){

      //would like to have a function that returns ids of all employees
      //who are available for shift. So input start time, end time, shift type, and
      //return array of ids.

      //Would also like a function that returns fname and lname when id is input.
    if(body.shopAMbools[i]){
      getProcessor.getListOfEmployeeAvailableDaysAndTimes('evan', 'verma', function(err, results){
        console.log("results: ", results);
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
