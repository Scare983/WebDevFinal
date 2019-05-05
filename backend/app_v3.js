const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const util = require('util');
const async = require('async');
const fs = require('fs');
const getSQLProcessor = require('./getSQLProcessor');
const insertProcessor = require('./insertProcessor');
const Scheduler = require('./Scheduler.js');
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

app.post('/admin-set-schedule',function(req, res, next){
    res.json({msg: 'This is CORS-enabled for all origins!'});
    var scheduler = new Scheduler(req.body);
    scheduler.writeShopTemplate();

    for(var i=0;i<7;i++){
    	if(req.body.shopAMbools[i]) scheduler.fillFileWithShopShift(
    	scheduler.scheduleDays[i],req.body.shopAMtimes[i],req.body.shopPMtimes[i],'S',scheduler);

    	if(req.body.shopPMbools[i]) scheduler.fillFileWithShopShift(
    	scheduler.scheduleDays[i],req.body.shopPMtimes[i],'21:00','S',scheduler);

    	if(req.body.starterAMbools[i]) scheduler.fillFileWithShopShift(
    	scheduler.scheduleDays[i],req.body.starterAMtimes[i],req.body.starterPMtimes[2],'ST',scheduler);

    	if(req.body.starterPMbools[i]) scheduler.fillFileWithShopShift(
    	scheduler.scheduleDays[i],req.body.starterPMtimes[i],'18:00','ST',scheduler);
    }

/*
	fs.readFile(scheduler.shopFileName,'utf8',function(err,data){
		res.render('/admin-view-schedule',
	});
*/
});

app.listen(3000);



























