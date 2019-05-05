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

  var templateData = fs.readFileSync('shop_schedule_template.txt');
  fs.writeSync(shopFD,templateData,0);
  console.log("wrote");


//  var randomIndex;
  var fileData;

    if(body.shopAMbools[2]){

		getProcessor.getEmployeesWithShiftTypes(
			scheduleDays[2],body.shopAMtimes[2], body.shopPMtimes[2], 'S', function(err,results){
				console.log(results);
				var randomIndex = Math.floor(Math.random() * results.length);
				var properFname = results[randomIndex].fName.charAt(0).toString().toUpperCase().concat(
                  results[randomIndex].fName.substring(1,results[randomIndex].fName.length));
                var properLname = results[randomIndex].lName.charAt(0).toString().toUpperCase().concat(
                  results[randomIndex].lName.substring(1,results[randomIndex].lName.length));

                console.log("randomIndex: ", randomIndex);
                console.log("results.length", results.length);

                fs.readFile(shopFileName,'utf8',function(err, data){
		  			var searchedName = properFname.concat(' ', properLname);
		  			var pos = data.indexOf( searchedName );
		  			console.log('searched name: ', searchedName);
		  			console.log("pos: ", pos);

		  			console.log("results[",randomIndex,"].can_work_day: ", results[randomIndex].can_work_day);

		  			for (var i=0;i < (results[randomIndex].can_work_day + 1);i++)
		      			pos = data.indexOf(',',pos) + 1;

		  			var shiftInfoString =
		      			` ${body.shopAMtimes[results[randomIndex].can_work_day]}-${body.shopPMtimes[results[randomIndex].can_work_day]}, `;

		  			fs.writeSync(shopFD,shiftInfoString,pos);
				});


			});
	}

	if(body.shopAMbools[4]){

		getProcessor.getEmployeesWithShiftTypes(
			scheduleDays[4],body.shopAMtimes[4], body.shopPMtimes[4], 'S', function(err,results){
				console.log(results);
				var randomIndex = Math.floor(Math.random() * results.length);
				var properFname = results[randomIndex].fName.charAt(0).toString().toUpperCase().concat(
                  results[randomIndex].fName.substring(1,results[randomIndex].fName.length));
                var properLname = results[randomIndex].lName.charAt(0).toString().toUpperCase().concat(
                  results[randomIndex].lName.substring(1,results[randomIndex].lName.length));

                fs.readFile(shopFileName,'utf8',function(err, data){
		  			var searchedName = properFname.concat(' ', properLname);
		  			var pos = data.indexOf( searchedName );
		  			console.log('searched name: ', searchedName);
		  			console.log("pos: ", pos);

		  			for (var i=0;i < (results[randomIndex].can_work_day+1);i++)
		      			pos = data.indexOf(',',pos) + 1;

		  			var shiftInfoString =
		      			` ${body.shopAMtimes[results[randomIndex].can_work_day]}-${body.shopPMtimes[results[randomIndex].can_work_day]}, `;

		  			fs.writeSync(shopFD,shiftInfoString,pos);
				});


			});
	}

	if(body.shopAMbools[1]){

		getProcessor.getEmployeesWithShiftTypes(
			scheduleDays[1],body.shopAMtimes[1], body.shopPMtimes[1], 'S', function(err,results){
				console.log(results);
				var randomIndex = Math.floor(Math.random() * results.length);
				var properFname = results[randomIndex].fName.charAt(0).toString().toUpperCase().concat(
                  results[randomIndex].fName.substring(1,results[randomIndex].fName.length));
                var properLname = results[randomIndex].lName.charAt(0).toString().toUpperCase().concat(
                  results[randomIndex].lName.substring(1,results[randomIndex].lName.length));

                fs.readFile(shopFileName,'utf8',function(err, data){
		  			var searchedName = properFname.concat(' ', properLname);
		  			var pos = data.indexOf( searchedName );
		  			console.log('searched name: ', searchedName);
		  			console.log("pos: ", pos);

		  			for (var i=0;i < (results[randomIndex].can_work_day+1);i++)
		      			pos = data.indexOf(',',pos) + 1;

		  			var shiftInfoString =
		      			` ${body.shopAMtimes[results[randomIndex].can_work_day]}-${body.shopPMtimes[results[randomIndex].can_work_day]}, `;

		  			fs.writeSync(shopFD,shiftInfoString,pos);
				});


			});
	}

	if(body.shopAMbools[3]){

		getProcessor.getEmployeesWithShiftTypes(
			scheduleDays[3],body.shopAMtimes[3], body.shopPMtimes[3], 'S', function(err,results){
				console.log(results);
				var randomIndex = Math.floor(Math.random() * results.length);
				var properFname = results[randomIndex].fName.charAt(0).toString().toUpperCase().concat(
                  results[randomIndex].fName.substring(1,results[randomIndex].fName.length));
                var properLname = results[randomIndex].lName.charAt(0).toString().toUpperCase().concat(
                  results[randomIndex].lName.substring(1,results[randomIndex].lName.length));

                fs.readFile(shopFileName,'utf8',function(err, data){
		  			var searchedName = properFname.concat(' ', properLname);
		  			var pos = data.indexOf( searchedName );
		  			console.log('searched name: ', searchedName);
		  			console.log("pos: ", pos);

		  			for (var i=0;i < (results[randomIndex].can_work_day+1);i++)
		      			pos = data.indexOf(',',pos) + 1;

		  			var shiftInfoString =
		      			` ${body.shopAMtimes[results[randomIndex].can_work_day]}-${body.shopPMtimes[results[randomIndex].can_work_day]}, `;

		  			fs.writeSync(shopFD,shiftInfoString,pos);
				});


			});
	}

	if(body.shopAMbools[5]){

		getProcessor.getEmployeesWithShiftTypes(
			scheduleDays[5],body.shopAMtimes[5], body.shopPMtimes[5], 'S', function(err,results){
				console.log(results);
				var randomIndex = Math.floor(Math.random() * results.length);
				var properFname = results[randomIndex].fName.charAt(0).toString().toUpperCase().concat(
                  results[randomIndex].fName.substring(1,results[randomIndex].fName.length));
                var properLname = results[randomIndex].lName.charAt(0).toString().toUpperCase().concat(
                  results[randomIndex].lName.substring(1,results[randomIndex].lName.length));

                fs.readFile(shopFileName,'utf8',function(err, data){
		  			var searchedName = properFname.concat(' ', properLname);
		  			var pos = data.indexOf( searchedName );
		  			console.log('searched name: ', searchedName);
		  			console.log("pos: ", pos);

		  			for (var i=0;i < (results[randomIndex].can_work_day+1);i++)
		      			pos = data.indexOf(',',pos) + 1;

		  			var shiftInfoString =
		      			` ${body.shopAMtimes[results[randomIndex].can_work_day]}-${body.shopPMtimes[results[randomIndex].can_work_day]}, `;

		  			fs.writeSync(shopFD,shiftInfoString,pos);
				});


			});
	}

	if(body.shopAMbools[6]){

		getProcessor.getEmployeesWithShiftTypes(
			scheduleDays[6],body.shopAMtimes[6], body.shopPMtimes[6], 'S', function(err,results){
				console.log(results);
				var randomIndex = Math.floor(Math.random() * results.length);
				var properFname = results[randomIndex].fName.charAt(0).toString().toUpperCase().concat(
                  results[randomIndex].fName.substring(1,results[randomIndex].fName.length));
                var properLname = results[randomIndex].lName.charAt(0).toString().toUpperCase().concat(
                  results[randomIndex].lName.substring(1,results[randomIndex].lName.length));

                fs.readFile(shopFileName,'utf8',function(err, data){
		  			var searchedName = properFname.concat(' ', properLname);
		  			var pos = data.indexOf( searchedName );
		  			console.log('searched name: ', searchedName);
		  			console.log("pos: ", pos);

		  			for (var i=0;i < (results[randomIndex].can_work_day+1);i++)
		      			pos = data.indexOf(',',pos) + 1;

		  			var shiftInfoString =
		      			` ${body.shopAMtimes[results[randomIndex].can_work_day]}-${body.shopPMtimes[results[randomIndex].can_work_day]}\n `;

		  			fs.writeSync(shopFD,shiftInfoString,pos);
				});


			});
	}

	if(body.shopAMbools[0]){

		getProcessor.getEmployeesWithShiftTypes(
			scheduleDays[0],body.shopAMtimes[0], body.shopPMtimes[0], 'S', function(err,results){
				console.log(results);
				var randomIndex = Math.floor(Math.random() * results.length);
				var properFname = results[randomIndex].fName.charAt(0).toString().toUpperCase().concat(
                  results[randomIndex].fName.substring(1,results[randomIndex].fName.length));
                var properLname = results[randomIndex].lName.charAt(0).toString().toUpperCase().concat(
                  results[randomIndex].lName.substring(1,results[randomIndex].lName.length));

                fs.readFile(shopFileName,'utf8',function(err, data){
		  			var searchedName = properFname.concat(' ', properLname);
		  			var pos = data.indexOf( searchedName );
		  			console.log('searched name: ', searchedName);
		  			console.log("pos: ", pos);

		  			for (var i=0;i < (results[randomIndex].can_work_day+1);i++)
		      			pos = data.indexOf(',',pos) + 1;

		  			var shiftInfoString =
		      			` ${body.shopAMtimes[results[randomIndex].can_work_day]}-${body.shopPMtimes[results[randomIndex].can_work_day]}, `;

		  			fs.writeSync(shopFD,shiftInfoString,pos);
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

/*    if(i === 2) i = 4;
      else if(i === 4) i = 1;
        else if(i === 1) i = 3;
          else if(i === 3) i = 5;
            else if(i === 5) i = 6;
              else if(i === 6) i = 0;
                else if(i === 0) i = 7;

*/

}

