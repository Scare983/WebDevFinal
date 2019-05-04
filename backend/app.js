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

/*queryInsert.requestedDayOff("evan", "verma", "2015-5-10", "2015-10-10", " a", function(err, res) {
  if(err) {
  }
  if(res) console.log("yay");
});*/
app.post('/admin-set-schedule',function(req, res, next){
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
        let dateStart = new Date(joined[k].reqOffStart);
        let dateFormat = dateStart.getMonth() + '-' + dateStart.getDate() + '-' + dateStart.getFullYear();
        joined[k].reqOffStart = dateFormat;

        let dateEnd = new Date(joined[k].reqOffEnd);
        let dateFormatEnd = dateEnd.getMonth() + '-' + dateEnd.getDate() + '-' + dateEnd.getFullYear();
        joined[k].reqOffEnd = dateFormatEnd;
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
  var shopAMworkers = [];

  //  Fixes data in dates array
  for (var i=0;i<7;i++){
    scheduleDays[i] = new Date( body.dateStrings[i] );
    console.log("scheduleDays[",i,"]: ", scheduleDays[i]);
  }

  //  Writes template to csv file
  var fileName = (scheduleDays[0].getMonth() + 1).toString().concat("-",
                  (scheduleDays[0].getDate()).toString().concat("-"),
                  scheduleDays[0].getFullYear().toString());
  var shopFileName = `shop_schedule_${fileName}.csv`;

  console.log("shopFileName: ", shopFileName);
  shopFD = fs.openSync(shopFileName,'w+');

  fs.readFile('shop_schedule_template.txt', function(err, data){
    fs.write(shopFD,data,0,function(err){});
  });


  //  Iterates through all boolean values from form
  //  and writes employee name to csv file one shift
  //  at a time
  var i = 2;
  while(i != 7){

    if(body.shopAMbools[i]){
      getProcessor.getEmployeesWithShiftTypes(
        scheduleDays[i],body.shopAMtimes[i], body.shopPMtimes[i], 'S', function(err, results){

          //iterates through sql data and puts value into html table.
          //PROBLEM: iterations run in parallel, so cannot check for who is
          //         working same shift type on other days

          //Need to not use this async function and use a regular for loop instead
          async.map(results, function(obj, callback) {
            var id;
            var fName;
            var lName;

            id = obj.id;
            fName = obj.fName;
            lName = obj.lName;
            can_work_day = obj.can_work_day;

            callback(err, {id: id,
                          fName: fName,
                          lName: lName,
                          can_work_day: can_work_day
                          });

          }, function(err, info){
            var randomIndex = Math.floor(Math.random() * info.length);
            shopAMworkers.push(info);
            var shopAMworker = info[randomIndex];
            shopAMworker.fName = shopAMworker.fName.charAt(0).toString().toUpperCase().concat(
                  shopAMworker.fName.substring(1,shopAMworker.fName.length));
            shopAMworker.lName = shopAMworker.lName.charAt(0).toString().toUpperCase().concat(
                  shopAMworker.lName.substring(1,shopAMworker.lName.length));
            console.log("shopAMworker: ", shopAMworker);

          });

//==================== NOT WORKING ==================================================//

          console.log("shopAMworkers.length: ", shopAMworkers.length);

          for(var i=0;i<shopAMworkers.length;i++){
              console.log("here");
              console.log("shopAMworker[",i,"].fName: ", shopAMworkers[i].fName);

              fs.readFile(shopFileName,'utf8',function(err, data){
		  var searchedName = shopAMworkers[i].fName.concat(' ', shopAMworkers[i].lName);
		  var pos = data.indexOf( searchedName );
		  console.log("pos: ", pos);

		  for (var i=0;i < (shopAMworkers[i].can_work_day+2);i++)
		      pos = data.indexOf(',',pos) + 1;

		  var shiftInfoString =
		      ` ${body.shopAMtimes[shopAMworkers[i].can_work_day]}-${body.shopPMtimes[shopAMworkers[i].can_work_day]}, `;

		  fs.write(shopFD,shiftInfoString,pos,function(err){});

              });

          }

//=========================NOT WORKING ==============================================//




        });

      }

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
