class getSQLProcessor {
  constructor() {
    var mysql = require('mysql');
    this.conn = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "Runescape3",
        database: "dawgs_the_tee",
        connectionLimit : 1000
      }
    );
    // this.conn.query = util.promisify(this.conn.query);
  }
//<====================TESTING===================>
//  dateTest = new Date(2000, 7, 14);
//getListOfEmployeeAvailableDaysAndTimes("evan", "verma", function(err, results) {
//    //within this function you use the results.
  // console.log(results); //for each value, access directly by its SQL name.
  // console.log(results[0].fName);
//});


//getListOfAllAvailableDaysAndTimes(function(err, results) {
//    console.log(results);
//});
//below is empty.  Test later RTO is inputted
//getListOfEmployeeRTO(function(err, results) {
//    console.log(results);
//});
//getListOfEmployees(function(err, results) {
//    console.log(results);
//});


//<===============DONE TESTING===================>
  /**returns a list containing:  sunday monday, tuesday, thursday, friday, saturday,  with what work they can do on each of those days.
   * @param fName is used to find the userID
   * @param lName is used to find the userID
   * @param callback used to return results to calling class.
   */


  getListOfEmployeeAvailableDaysAndTimes(fName, lName, callback) {

    this.conn.getConnection(function(err, conn) {
      var sqlSelectSingleEmployee = `SELECT fName, lName, can_work_day, start_work_hour, end_work_hour FROM employee_init JOIN availability ON employee_init.id = availability.id WHERE lName = '${lName}' AND fName = '${fName}'`;
      conn.query(sqlSelectSingleEmployee, function (err, results) {
        if (err) throw err;
        callback(err, results);
      });
    });

  }

  /**returns a list of all employees containing:  monday, tuesday, thursday, friday, saturday, sunday with what work they can do on each of those days.
   */

  getListOfAllAvailableDaysAndTimes(callback) {

    this.conn.getConnection(function(err, conn) {
      var sqlGetAllEmployeeAvail = `SELECT fName, lName, can_work_day, start_work_hour, end_work_hour FROM employee_init JOIN availability ON employee_init.id = availability.id `;
      conn.query(sqlGetAllEmployeeAvail, function (err, results) {
        if (err) throw err;
        callback(err, results);
      });
    });
  }

  /**Used by admin page to show Employee RequestedTIme off.  Returns fName, lName, time range, reason, onlyIF pending is reqStatus
   * @param fName is used to find the userID
   * @param lName is used to find the userID
   */

  getListOfEmployeeRTO(callback) {
    this.conn.getConnection(function(err, conn) {
      var getAllRTO = `SELECT fName, lName, reqOffStart, reqOffEnd, reason FROM employee_init JOIN rto ON employee_init.id = rto.id WHERE reqStatus = 'pending' `;
      conn.query(getAllRTO, function (err, results) {
        callback(err, results);
      });
    });
  }

  /**in case we need this, return fName and lName of all employees
   *
   */

  getListOfEmployees(callback) {
    this.conn.getConnection(function(err, conn) {
      var getListOfFnameLname = `SELECT fName, lName FROM employee_init `;
      conn.query(getListOfFnameLname, function (err, results) {
        if (err) throw err;
        callback(err, results);
      });
    });
  }

  /** return fName, lName, employeeType, email, gender,username, password, work preferences  of all employees
   *
   */
  getAllEmployeeInfo(callback) {
    this.conn.getConnection(function(err, conn) {
    /*  if (err) {
        callback(err, null);
        return;
      } */
      var showEmployees = `SELECT fName, lName, employeeType, email, gender, userName, password, prefWeekends, prefNumOfShifts FROM employee_init JOIN employee ON employee.id = employee_init.id`;
      conn.query(showEmployees, function (err, results) {
        callback(err, results);
      });
    });
  }

  /** this function should be used in junction with getAllEmployeeInfo.  Within for loop, pass through results of fName and LastName of tuple into here.  And iterate over this results to get all roles they are trained in.
   * @param fName used to find ID
   * @param lName used to find ID
   */


  getEmployeeRolesTrainedIn(fName, lName, callback) {
    this.conn.getConnection(function(err, conn) {
      var sqlSelectSingleEmployee = `SELECT roleTrained FROM employee_init JOIN employee ON employee_init.id = roleTrained.id WHERE lName = '${lName}' AND fName = '${fName}'`;
      conn.query(sqlSelectSingleEmployee, function (err, results) {
        if (err) throw err;
        callback(err, results);
      });
    });

  }


  /**return all employees working on day.
   * @param date is in date format:  2001-07-26
   */


  getScheduleForDay(date, callback) {
    this.conn.getConnection(function(err, conn) {
      var sqlGetSchedule = `SELECT fName, lName, start_work_hour, end_work_hour, role FROM schedule JOIN employee_init ON schedule.id = employee_init.id WHERE work_date ='${date}'`;
      conn.query(sqlGetSchedule, function (err, results) {
        if (err) throw err;
        callback(err, results);
      });
    });
  }

  /**return all employees availableToWork on each day.  Calculates if employee is RTO on said days and doesnt return those employees who cannot work.
   * @param date is in date format:  2001-07-26,
   */


  getAvailabilityForDay(date, callback) {
    this.conn.getConnection(function(err, conn) {
      if(err) throw err;
      var day = date.getDay();
      getSQLProcessor.prototype.getDayRTOEmployees(date, function (err, offEmployee) {
        var arrOfIndexesToRemove = [];
        var getEmployeeAvailableOnDay = `SELECT fName, lName, start_work_hour, end_work_hour FROM availability JOIN employee_init ON availability.id = employee_init.id WHERE can_work_day ='${day}'`;
        conn.query(getEmployeeAvailableOnDay, function (err, results) {
          if (err) throw err;
          if (offEmployee != undefined) {
            for (var employee in offEmployee) {
              for (var i = 0; i < results.length; i++) {

                if (employee.fName == results[i].fName && employee.lName == results[i].lName) {
                  arrOfIndexesToRemove.push(i);
                }

              }
            }
            //make sure this removes all unique.
            var uniqueIndexes = arrOfIndexesToRemove.filter(function (item, index) {
              return arrOfIndexesToRemove.indexOf(item) >= item;
            });
            for (var i = uniqueIndexes.length - 1; i >= 0; i--) {
              results.splice(uniqueIndexes[i], 1);
            }
          }
          callback(err, results);


        });
      }, conn);
    });
  }

  // helper method but can be used if needed.
  getDayRTOEmployees(date, callback, conn) {
    var getDayRTO = `SELECT fName, lName FROM employee_init  JOIN rto ON employee_init.id = rto.id WHERE reqStatus='accepted' AND '${date}' between reqOffStart AND reqOffEnd`;
    conn.query(getDayRTO, function (err, results) {
      if (err) throw err;
      callback(err, results, conn);
    });
  }
  //non helper
  /*getDayRTOEmployees(date, callback) {
    this.conn.getConnection(function(err, conn) {
      var getDayRTO = `SELECT fName, lName FROM employee_init  JOIN rto ON employee_init.id = rto.id WHERE reqStatus='accepted' AND '${date}' between reqOffStart AND reqOffEnd`;
      conn.query(getDayRTO, function (err, results) {
        if (err) throw err;
        callback(err, results);
      });
    });
  }*/

  /** day: (dateForm)
   * startOfSlotOfShift
   * endTimeSlotOfShift
   * shiftType ENUM from ST, C, R, RR, T, TC, S
   */
  getEmployeesWithShiftTypes(date,startOfSlotOfShift, endTimeSlotOfShift, shiftType, callback ) {
    this.conn.getConnection(function(err, conn) {
      if(err) throw err;
      var day = date.getDay();
      getSQLProcessor.prototype.getDayRTOEmployees(date, function (err, offEmployee) {
        var arrOfIndexesToRemove = [];
        var getEmployeeAvailableOnDay =
          `SELECT fName, lName, employee_init.id, employee.gender, can_work_day, start_work_hour, end_work_hour
            FROM availability
              JOIN employee_init ON availability.id = employee_init.id
              JOIN roles ON availability.id= roles.id
              JOIN employee ON availability.id = employee.id
                WHERE can_work_day ='${day}'
                  AND start_work_hour <= '${startOfSlotOfShift}'
                  AND end_work_hour >= '${endTimeSlotOfShift}'
                  AND roleTrained='${shiftType}'
          `;
        conn.query(getEmployeeAvailableOnDay, function (err, results) {
          if (err) throw err;
          if (offEmployee != undefined) {
            for (var employee in offEmployee) {
              for (var i = 0; i < results.length; i++) {

                if (employee.fName == results[i].fName && employee.lName == results[i].lName) {
                  arrOfIndexesToRemove.push(i);
                }

              }
            }
            //make sure this removes all unique.
            var uniqueIndexes = arrOfIndexesToRemove.filter(function (item, index) {
              return arrOfIndexesToRemove.indexOf(item) >= item;
            });
            for (var i = uniqueIndexes.length - 1; i >= 0; i--) {
              results.splice(uniqueIndexes[i], 1);
            }
          }

          callback(err, results);


        });
      }, conn);
    });
  }
  getAllRoles(callback) {
    this.conn.query(`SELECT *  FROM roles`, function (err, results) {
      callback(err, results);
    });
  }
  getAllEmployeeInfoExceptRoles(callback) {
    var showEmployees = `SELECT employee_init.id, fName, lName, employeeType, email, gender, userName, password, prefWeekends, prefNumOfShifts FROM employee_init JOIN employee ON employee.id = employee_init.id`;
    this.conn.query(showEmployees, function (err, results) {
      callback(err, results);
    });
  }
}
module.exports = getSQLProcessor;
