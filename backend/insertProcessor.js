class insertProcessor {

  constructor() {

    var mysql = require('mysql');
    this.conn = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "root",
        database: "dawgs@thetee",
        connectionLimit : 1000
      }
    );
  }

// <=================testing===============>


//createEmployeeCredentials("KevGuy", 123456 , "kevin","linnane","admin","kevin@gmail.com", "M");//create employee works
//createEmployeeCredentials("ev12", 123 , "HelloNewMe","Verma","employee","evan@gmail.com", "M");
//createEmployeeCredentials("kv12", 123 , "newMe","linnane","manager","kevin@gmail.com", "M");//create employee works

//createEmployeeCredentials("pat33", 123 , "Patricio","Flores","employee","pat@gmail.com", "F");
//addAvailability("Evan", "Verma", "monday", dateString, dateString);
//addAvailability("Evan", "Verma", "friday", dateString, dateString);
//addAvailability("Evan", "Verma", "0", "11:20", "12:20");
//updateAvailability("3", "sunday", "11:20", "12:20");
//insertAvailabilityForNull("HiMe", "linnane", "3", "01:30:00", "09:20:00" );
//updateAvailability("HiMe", "linnane", "3", "02:30:00", "04:20:00");
//ddAvailability("kevin", "linnane", "1", "01:30:00", "09:20:00");// this works.
//addAvailability("ev", "linnane", "monday", "01:30:00", "09:20:00"); //this doesnt work because they dont exist
//addAvailability("Evan", "Verma", "monday", "02:30:00", "05:20:00");  //2nd test on insert,this works
//addAvailability("Evan", "Verma", "tuesday", "06:30:00", "05:20:00"); //this works, update availability works
//requestedDayOff("Evan", "Verma", "2000-07-21", "2000-08-29" , "I hate work."); //prior to coming here. make sure the date is valid range., works.
//adminUpdatePendingRTO("Evan","Verma", "2000-07-26", "2000-08-29", "accepted" ); //this is GLITCHY WHERE it doesnt check if date is same in SQL statement
//addAvailability("Evan", "Verma", "friday", "01:30:00", "05:20:00");  //2nd test on insert,this works
//adminUpdatePendingRTO("Evan","Verma", "2000-07-21", "2000-08-29", "accepted" );//accepted or denied or only adminAnswers.
//addSchedule("Patricio", "Flores", "2000-07-26", "01:30:00", "01:45:00", "ST");
//deleteUser("kevin", "linnane");
//updateEmployeePrefShifts("Evan", "Verma", 3);
//updateEmployeePrefWeekends("Evan", "Verma", 1);
//updateEmployeeType("Evan", "Verma", "admin");
//updatePassword("Evan", "Verma", "Newpass");
//updateUserName("Evan", "Verma", "EvanNewPass");
//rolesTrained("Evan", "Verma", "C");
//<===================testing complete=======>
//deleteUser("heaven", "linnane");
//used for admin to insert a NEW employee.


   createEmployeeCredentials(userName, password, fName, lName, employeeType, email, gender, prefNumShift = 5, prefWeekend = 0) {
    var sql = `INSERT INTO employee_init (userName, password, fName, lName) VALUES ('${userName}', '${password}', '${fName}', '${lName}')`;
    this.conn.getConnection(function(err, conn) {
      if(err) throw err;
      conn.query(sql, function (err) {
        if (err) throw err;
        console.log("1 record inserted into employee_init.");
        insertProcessor.prototype.createEmployeeInfo(fName, lName, employeeType, email, gender, prefNumShift, prefWeekend, conn);
      });
     }
   );
  }

//this method may be nested within createEmployeeCredentials, if so, update the parameters of said function.


  createEmployeeInfo(fName, lName, employeeType, email, gender, prefNumShift, prefWeekend, conn) {
    var sqlUserID = `SELECT id FROM employee_init WHERE lName = '${lName}' AND fName = '${fName}'`;
      conn.query(sqlUserID, function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        var sqlEmployee = `INSERT INTO employee (id, employeeType, email, gender, prefNumOfShifts, prefWeekends) VALUES ('${result[0].id}', '${employeeType}', '${email}', '${gender}', '${prefNumShift}', '${prefWeekend}')`;
        conn.query(sqlEmployee, function (err) {
          if (err) throw err;
          console.log("1 record inserted into employee.");
        });
      }
    });
  }



  updatePassword(fName, lName, newPass) {
    var sqlUserID = `SELECT id FROM employee_init WHERE lName = '${lName}' AND fName = '${fName}'`;
    this.conn.getConnection(function(err, conn) {
      conn.query(sqlUserID, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          var sqlEmployeeUpdate = `UPDATE employee_init SET password = '${newPass}' WHERE id = '${result[0].id}'`;
          conn.query(sqlEmployeeUpdate, function (err) {
            if (err) throw err;
            console.log("Updated password " + lName + " to " + newPass);
          });
        }
      });
    });
  }



  updateUserName(fName, lName, newUserName) {
    var sqlUserID = `SELECT id FROM employee_init WHERE lName = '${lName}' AND fName = '${fName}'`;
    this.conn.getConnection(function(err, conn) {
      conn.query(sqlUserID, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          var sqlEmployeeUpdate = `UPDATE employee_init SET userName = '${newUserName}' WHERE id = '${result[0].id}'`;
          conn.query(sqlEmployeeUpdate, function (err) {
            if (err) throw err;
            console.log("Updated username of " + lName + " to " + newUserName);
          });
        }
      });
    });
  }

//if an employee becomes a manager
  /**
   * @param lName is used to find the userID
   * @param updatedType changing employee to a type from enum list:  manager or employee (admin is also an option which can cause injection. but shhhhhhhhh)
   */


  updateEmployeeType(fName, lName, updatedType) {
    var sqlUserID = `SELECT id FROM employee_init WHERE lName = '${lName}' AND fName = '${fName}'`;
    this.conn.getConnection(function(err, conn) {
      conn.query(sqlUserID, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          var sqlEmployeeUpdate = `UPDATE employee SET employeeType = '${updatedType}' WHERE id = '${result[0].id}'`;
          conn.query(sqlEmployeeUpdate, function (err) {
            if (err) throw err;
            console.log("Updated " + lName + " to " + updatedType);
          });
        }
      });
    });
  }

  /**
   * @param lName is used to find the userID
   * @param preferenceNumber changing days this person perfers to work weekends.  argument should be in format:  0 or 1 (false or true)
   */


  updateEmployeePrefWeekends(fName, lName, preferenceNumber) {
    var sqlUserID = `SELECT id FROM employee_init WHERE lName = '${lName}' AND fName = '${fName}'`;
    this.conn.getConnection(function(err, conn) {
      conn.query(sqlUserID, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          var sqlEmployeeUpdate = `UPDATE employee SET prefWeekends = '${preferenceNumber}' WHERE id = '${result[0].id}'`;
          conn.query(sqlEmployeeUpdate, function (err) {
            if (err) throw err;
            console.log("Updated " + lName + " to " + preferenceNumber);
          });
        }
      });
    });
  }

  /**
   * @param lName is used to find the userID
   * @param preferenceNumber changing days this person perfers to work.  Is taken into account for schedule algorithm
   */

  updateEmployeePrefShifts(fName, lName, preferenceNumber) {
    var sqlUserID = `SELECT id FROM employee_init WHERE lName = '${lName}' AND fName = '${fName}'`;
    this.conn.getConnection(function(err, conn) {
      conn.query(sqlUserID, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          var sqlEmployeeUpdate = `UPDATE employee SET prefNumOfShifts = '${preferenceNumber}' WHERE id = '${result[0].id}'`;
          conn.query(sqlEmployeeUpdate, function (err) {
            if (err) throw err;
            console.log("Updated " + lName + " to " + preferenceNumber);
          });
        }
      });
    });


  }

  /**
   * @param lName is used to find the userID
   * @param reqStartDate is in time format, used to find correct request in case there are multiple
   * @param reqEndDate just another protocol to find and ensure that we are looking at right person in time format.
   * @param reason is employee reason of reqOff
   */

  requestedDayOff(fName, lName, reqStartDate, reqEndDate, reason) {
    var sqlUserID = `SELECT id FROM employee_init WHERE lName = '${lName}' AND fName = '${fName}'`;
    this.conn.getConnection(function(err, conn) {
      conn.query(sqlUserID, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          //make sure this statement has default value 'pending' in reqAccpted.
          var sqlEmployeeUpdate = `INSERT INTO rto (id, reqOffStart, reqOffEnd, reason) VALUES ('${result[0].id}', '${reqStartDate}', '${reqEndDate}', '${reason}')`;
          conn.query(sqlEmployeeUpdate, function (err) {
            if (err) throw err;
            console.log("Inserted " + lName + " RTO from  " + reqStartDate + " to " + reqEndDate);
          });
        }
      });
    });
  }

  /**
   * @param lName is used to find the userID
   * @param reqStartDate is in time format, used to find correct request in case there are multiple
   * @param reqEndDate just another protocol to find and ensure that we are looking at right person
   * @param adminAnswer is either chosen from ENum as:  accepted or denied <= capitalization matters
   */

  adminUpdatePendingRTO(fName, lName, reqStartDate, reqEndDate, adminAnswer) {  //this is glitchy.  Updates ID and doesnt consider the dates being inputted.
    var sqlUserID = `SELECT id FROM employee_init WHERE lName = '${lName}' AND fName = '${fName}'`;
    this.conn.getConnection(function(err, conn) {
      conn.query(sqlUserID, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          //make sure this statement has default value 'pending' in reqAccpted.
          var sqlEmployeeUpdate = `UPDATE rto SET reqStatus = '${adminAnswer}' WHERE reqOffStart='${reqStartDate}' AND id='${result[0].id}' AND reqOffEnd='${reqEndDate}'`;
          conn.query(sqlEmployeeUpdate, function (err) {
            if (err) throw err;
            console.log("Updated " + lName + " reqOffStatus to " + adminAnswer);
          });
        }
      });
    });
  }

  /**
   * @param lName is used to find the userID
   * @param added is the single role trained in: ST, C, R, RR, T, TC, S
   */

  rolesTrained(fName, lName, added) { //before use this method, only pass through roles which the user already doesnt have. TO do this, a for loop, get results from select query and add the different ones within the for loop
    var sqlUserID = `SELECT id FROM employee_init WHERE lName = '${lName}' AND fName = '${fName}'`;
    this.conn.getConnection(function(err, conn) {
      conn.query(sqlUserID, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          //make sure this statement has default value 'pending' in reqAccpted.
          var sqlEmployeeUpdate = `INSERT INTO roles (id, roleTrained) VALUES ('${result[0].id}', '${added}')`;
          conn.query(sqlEmployeeUpdate, function (err) {
            if (err) throw err;
            console.log("Updated " + lName + " reqOffAccepted to " + added);
          });
        }
      });
    });
  }


  deleteTrainingRole() { //use this if training is a result in the roles Trained

  }

  /**
   * @param idPass passed by helper method which is ID of user looking to change
   * @param workableDay should be an enum of either monday, tuesday, wedneday, thursday, friday, saturday or sunday
   * @param newStartTime is the new startTime of that day which they wish to work
   * @param newEndTime is the new endTime on that day they wish to end the work day .
   */

  updateAvailability(fName, lName, workableDay, newStartTime, newEndTime) {  //change the days which they are available
    var sqlUserID = `SELECT id FROM employee_init WHERE lName = '${lName}' AND fName = '${fName}'`;
    this.conn.getConnection(function(err, conn) {
      conn.query(sqlUserID, function (err, result) {
        var sqlEmployeeUpdate = `UPDATE availability SET start_work_hour= '${newStartTime}', end_work_hour= '${newEndTime}' WHERE can_work_day = '${workableDay}' AND id = ${result[0].id}`;
        if (err) throw err;
        if (result.length > 0) {
          conn.query(sqlEmployeeUpdate, function (err) {
            if (err) throw err;
            console.log("Updated " + lName + " work availability on " + workableDay);

          });
        }
      });
    });
  }


  insertAvailabilityForNull(fName, lName, workableDay, startTime, endTime) {
    var sqlUserID = `SELECT id FROM employee_init WHERE lName = '${lName}' AND fName = '${fName}'`;
    this.conn.getConnection(function(err, conn) {
      conn.query(sqlUserID, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          var sqlEmployeeUpdate = `INSERT INTO availability (id, can_work_day, start_work_hour, end_work_hour) VALUES ('${result[0].id}', '${workableDay}', '${startTime}', '${endTime}')`;
          conn.query(sqlEmployeeUpdate, function (err) {
            if (err) throw err;
            console.log("Inserted " + lName + " work availability on " + workableDay);

          });
        }
      });
    });
  }

  /**
   * @param fName firstName, just idenitfier
   * @param lName identifier for finding ID
   * @param assignedWorkDay day this person will work in DATE format YYYY-MM-DD
   * @param startWorkTime time this person will work in TIME format HH:MM:SS ARMY time
   * @param endWorkTime time this person will end work in TIME format HH:MM:SS ARMY time
   * @param role is roll for worker to be on that work day chosen from ENUM: ST, C, R, RR, T, TC, S
   */
  insertScheduleForNull(fName, lName, assignedWorkDay, startWorkTime, endWorkTime, role) { //If the set from the select shwows that they are not working that day, add it otherwise, update their workdays.
    var sqlUserID = `SELECT id FROM employee_init WHERE lName = '${lName}' AND fName = '${fName}'`;
    this.conn.getConnection(function(err, conn) {
      conn.query(sqlUserID, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          //make sure this statement has default value 'pending' in reqAccpted.
          if (err) throw err;
          var sqlEmployeeUpdate = `INSERT INTO schedule (id, work_date, start_work_hour, end_work_hour, role) VALUES ('${result[0].id}', '${assignedWorkDay}', '${startWorkTime}', '${endWorkTime}', '${role}')`;
          conn.query(sqlEmployeeUpdate, function (err) {
            if (err) throw err;
          });
        }
      });
    });
  }

  /**
   * @param idPass is ID of person we are changing info for
   * @param assignedWorkDayToUpdate is the day which time is  being changed for this person
   * @param newStartWorkTime new TIme this person will work that day
   * @param newEndWorkTime new end Time this person will work that day.
   * @param role is roll for worker to be on that work day chosen from ENUM: ST, C, R, RR, T, TC, S
   *
   */
  updateSchedule(fName, lName, assignedWorkDayToUpdate, newStartWorkTime, newEndWorkTime, role) {  //change the days which they are available
    var sqlUserID = `SELECT id FROM employee_init WHERE lName = '${lName}' AND fName = '${fName}'`;
    this.conn.getConnection(function(err, conn) {
      conn.query(sqlUserID, function (err, result) {
        if (result.length > 0) {
          var sqlEmployeeUpdate = `UPDATE schedule SET work_date= '${newStartWorkTime}', end_work_hour= '${newEndWorkTime}', role= '${role}' WHERE work_date = '${assignedWorkDayToUpdate}' AND id = ${idPass}`;
          conn.query(sqlEmployeeUpdate, function (err) {
            if (err) throw err;
            console.log("Updated " + lName + " to work schedule on " + assignedWorkDayToUpdate);
          });
        }
      });
    });
  }

  deleteUser(fName, lName) { //deletes on cascade.  Which means the Database will remove the user from ALL tables this person is in because table is setup like that.
    this.conn.getConnection(function(err, conn) {
      var sqlUserID = `SELECT id FROM employee_init WHERE lName = '${lName}' AND fName = '${fName}'`;
      conn.query(sqlUserID, function (err, result) {
        var sqlDeleteUser = `DELETE FROM employee_init WHERE id='${result[0].id}'`;
        conn.query(sqlDeleteUser, function (err) {
          if (err) throw err;
        });
      });
    });
  }
};
module.exports = insertProcessor;


//might need to change DB tables where enums are the availibility preferences of students and not DATETIME because this info is static and reused.  
//reminder to self to work on roles insertion, rto, schedule and availability.

//Read through this looks good. Just wanted to put this in here because we had not talked about it at any of our meetings:
//roles needs to be able to add and delete. We may be able to do just one add function for roles that deletes based on
//what already exists (for instance, if their role was 'training' and you are going to add 'carts', the 'training' role
//would delete.
//Also schedule and availability need to delete the old schedule/availability when new is added.
//I don't remember what RTO stands for.
//Sorry if I sound pedantic I know you know what you are doing I am just here at work and bored and thinking about
//this so I pulled it up and wanted to add comments to be double sure.



//change date to be through from 0 through 6.
