const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const util = require('util');
const async = require('async');
const fs = require('fs');
const getSQLProcessor = require('./getSQLProcessor');
const insertProcessor = require('./insertProcessor');

var app = express();
var getProcessor = new getSQLProcessor();
var queryInsert = new insertProcessor();
app.use( cors() );
app.use( bodyParser.json() );

app.post('/',function(req, res, next){
    res.json({msg: 'This is CORS-enabled for all origins!'});

    console.log("body: ", req.body.shopAMbools[0]);

    createSchedule(req.body);

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

    if(body.shopAMbools[i]){
      getProcessor.getEmployeesWithShiftTypes(
        scheduleDays[i],body.shopAMtimes[i], body.shopPMtimes[i], 'S', function(err, results){

          //iterates through sql data and puts value into html table.
          //PROBLEM: iterations run in parallel, so cannot check for who is
          //         working same shift type on other days
          async.map(results, function(obj, callback) {
            var id;
            var fName;
            var lName;

            id = obj.id;
            fName = obj.fName;
            lName = obj.lName;
            can_work_day = obj.can_work_day;

            callback(err, {id: id, fName: fName, lName: lName, can_work_day: can_work_day});

          }, function(err, info){
            console.log("info.length: ", info.length);
            var randomIndex = Math.floor(Math.random() * info.length);
            console.log("randomIndex: ", randomIndex);
            console.log("shopAM worker: ", info[randomIndex]);

          });


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
