class Scheduler{

	constructor(body){

		this.fs = require('fs');
		var getSQLProcessor = require('./getSQLProcessor');

		this.getProcessor = new getSQLProcessor();

		this.body = body;
		this.scheduleDays = new Array(7);
		this.fileName='';
		this.shopFileName='';
		this.fileData='';
		this.shopFD=-1;

		//  Fixes data in dates array
  		for (var i=0;i<7;i++){
    		this.scheduleDays[i] = new Date( this.body.dateStrings[i] );
		}
	}

	writeShopTemplate(){
		//  Writes template to csv file
  		this.fileName = (this.scheduleDays[0].getMonth() + 1).toString().concat("-",
                  (this.scheduleDays[0].getDate()).toString().concat("-"),
                   this.scheduleDays[0].getFullYear().toString());
  		this.shopFileName = `shop_schedule_${this.fileName}.csv`;

  		this.shopFD = this.fs.openSync(this.shopFileName,'w+');

  		var templateData = this.fs.readFileSync(__dirname + '/shop_schedule_template.txt');
  		this.fs.writeSync(this.shopFD,templateData,0);
	}

	fillFileWithShopShift(scheduleDay,shopStartTime,shopEndTime,shiftType,self){
		this.getProcessor.getEmployeesWithShiftTypes(
			scheduleDay,shopStartTime, shopEndTime, shiftType, function(err,results){
				var randomIndex = -1;
				var prevRandomIndexes = new Array();
				var properFname;
				var properLname;
				var searchedName;
				var emptyShift = false;

				for(var i=0;i<results.length;i++){
					do{
						randomIndex = Math.floor(Math.random() * results.length);
					}while(prevRandomIndexes.includes(randomIndex));
					properFname = results[randomIndex].fName.charAt(0).toString().toUpperCase().concat(
                  		results[randomIndex].fName.substring(1,results[randomIndex].fName.length));
                	properLname = results[randomIndex].lName.charAt(0).toString().toUpperCase().concat(
                  		results[randomIndex].lName.substring(1,results[randomIndex].lName.length));
					searchedName = properFname.concat(' ', properLname);

					// manipulate the boolean function here to not overschedule people
					// in accordance with their prefferred amount of shifts

					if(!self.checkIfWorkingOnDay(searchedName, scheduleDay.getDay(), self)) break;

					if(i === results.length-1){} emptyShift = true;

					prevRandomIndexes.push(randomIndex);
					console.log("prevRandomIndexes 2: ", prevRandomIndexes);
				}


                self.fs.readFile(self.shopFileName,'utf8',function(err, data){
		  			var pos = data.indexOf( searchedName );

		  			for (var i=0;i < (results[randomIndex].can_work_day + 1);i++)
		      			pos = data.indexOf(',',pos) + 1;

		  			var shiftInfoString =
		      			` ${shopStartTime}-${shopEndTime}`;

		      		if(emptyShift === true) shiftInfoString = '';

		  			self.fs.writeSync(self.shopFD,shiftInfoString,pos);
				});


			});
	}

	checkIfWorkingOnDay(nameString, scheduleDay, self){
		self.fs.readFile(self.shopFileName,'utf8',function(err, data){
			var pos1 = data.indexOf( nameString );
			pos1 = data.indexOf(',',pos1)+1;
			var pos2 = data.indexOf(',',pos1);
			var checkString=data.substring(pos1,pos2);
			console.log("name: ", nameString);
			console.log("scheduleDay: ", scheduleDay);
			console.log("checkString: ", checkString);
			console.log("checkString.length: ", checkString.length);
			console.log("has number? ", /\d/.test(checkString));
			for(var i=0;i<7;i++){
				if(/\d/.test(checkString)){
					if(i === scheduleDay) return true;
				}
				else{
					pos1 = pos2;
					pos2 = data.indexOf(',',pos2+1);
				}
			}

			return false;

		});
	}



}
module.exports = Scheduler;
