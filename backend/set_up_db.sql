create database if not exists dawgs_the_tee;

CREATE TABLE `availability` 
(  `id` int(11) NOT NULL,
  `can_work_day` tinyint(11) NOT NULL,
  `start_work_hour` time NOT NULL,
  `end_work_hour` time NOT NULL,
  `availabilityID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`availabilityID`),
  KEY `id_idx` (`id`),
  KEY `id_idc` (`id`),
  CONSTRAINT `idz` FOREIGN KEY (`id`) REFERENCES `employee_init` (`id`) ON DELETE CASCADE
  );
  

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `employeeType` enum('manager','admin','employee') NOT NULL,
  `email` varchar(89) NOT NULL,
  `gender` enum('M','F') NOT NULL,
  `prefNumOfShifts` int(11) DEFAULT '5',
  `prefWeekends` tinyint(4) DEFAULT '0',
  KEY `id_idx` (`id`),
  CONSTRAINT `id` FOREIGN KEY (`id`) REFERENCES `employee_init` (`id`) ON DELETE CASCADE
  );
  
  
CREATE TABLE `employee_init` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `fName` varchar(100) NOT NULL,
  `lName` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_employee_init_id` (`id`)
  );
  
CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `roleTrained` enum('ST','C','R','RR','T','S') NOT NULL,
  KEY `id_idx` (`id`),
  CONSTRAINT `WHY` FOREIGN KEY (`id`) REFERENCES `employee_init` (`id`) ON DELETE CASCADE
  );

CREATE TABLE `rto` (
  `id` int(11) NOT NULL,
  `reqOffStart` date NOT NULL,
  `reqOffEnd` date NOT NULL,
  `reqStatus` enum('accepted','denied','pending') NOT NULL DEFAULT 'pending',
  `reason` varchar(200) DEFAULT NULL,
  `reqNumber` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`reqNumber`),
  KEY `id_idx` (`id`),
  CONSTRAINT `idDe` FOREIGN KEY (`id`) REFERENCES `employee_init` (`id`) ON DELETE CASCADE
  );
  
  
CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `work_date` date NOT NULL,
  `start_work_hour` time NOT NULL,
  `end_work_hour` time NOT NULL,
  `role` enum('ST','C','R','RR','T','S') NOT NULL,
  KEY `id_idx` (`id`),
  CONSTRAINT `IDkey` FOREIGN KEY (`id`) REFERENCES `employee_init` (`id`) ON DELETE CASCADE
  );


/******************************** CREATE USER INFO *****************/
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA1', 123567, 'matt', 'peterson');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA2', 123567, 'john', 'crumbley');

insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA3', 123567, 'nathan', 'toburen');

insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA4', 123567, 'jackson', 'jones');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA5', 123567, 'griffin', 'rousseau');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA6', 123567, 'evan', 'verma');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA7', 123567, 'parker', 'brooks');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA8', 123567, 'robby', 'wells');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA9', 123567, 'zach', 'bibbs');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA10', 123567, 'brooke', 'unknown');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA11', 123567, 'carly', 'anderson');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA12', 123567, 'don', 'niepoth');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA13', 123567, 'jeff', 'unknown');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA14', 123567, 'jack', 'unknown');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA15', 123567, 'ron', 'unknown');

insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA16', 123567, 'mike', 'c');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA17', 123567, 'ernest', 'unknown');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA18', 123567, 'steve', 'unknown');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA19', 123567, 'clint', 'udell');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA20', 123567, 'mike', 'lockwood');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA21', 123567, 'patrick', 'unknown');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA22', 123567, 'Nathan', 'a');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA23', 123567, 'jake', 'lee');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA24', 123567, 'ethan', 'finney');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA25', 123567, 'avery', 'unknown');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA26', 123567, 'alex', 'weltz');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA27', 123567, 'cammie', 'unknown');	
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA28', 123567, 'asa', 'unknown');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA29', 123567, 'charles', 'canada');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA30', 123567, 'colton', 'unknown');

insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA31', 123567, 'tanner', 'unknown');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA32', 123567, 'riggs', 'unknown');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA33', 123567, 'andrew', 'stine');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA34', 123567, 'nevada', 'unknown');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA35', 123567, 'cannon', 'unknown');

insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA36', 123567, 'andrew', 'taylor');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA37', 123567, 'noah', 'unknown');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA38', 123567, 'juliana', 'unknown');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA39', 123567, 'joe', 'reichard');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA40', 123567, 'rusty', 'unknown');
	
insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA41', 123567, 'bob', 'unknown');

insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA42', 123567, 'hudson', 'unknown');

insert into employee_init(userName, password, fName, lName)
	values ('changemeUGA43', 123567, 'jake', 'edison');
	
/********* INSERT INTO EMPLOYEE TABLE ***************/

insert into employee (id, employeeType, email, gender)
	values (6,'admin','evan@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (3, 'admin','Nathan@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (1, 'manager','Matt@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (2, 'manager','John@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (4, 'manager','Jackson@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (19, 'manager','Clint@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (5, 'employee','Griffin@gmail.com','M');

insert into employee (id, employeeType, email, gender, prefNumOfShifts)
	values (7, 'employee','Parker@gmail.com','M', 3);

insert into employee (id, employeeType, email, gender, prefNumOfShifts)
	values (8, 'employee','Robby@gmail.com','M', 2);

insert into employee (id, employeeType, email, gender)
	values (9, 'employee','Zach@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (10, 'employee','Brooke@gmail.com','F');

insert into employee (id, employeeType, email, gender, prefNumOfShifts)
	values (11, 'employee','Carly@gmail.com','F', 3);

insert into employee (id, employeeType, email, gender)
	values (12, 'employee','Don@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (13, 'employee','Jeff@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (14, 'employee','Jack@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (15, 'employee','Ron@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (41, 'employee','Bob@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (16, 'employee','MikeC@gmail.com','M');

insert into employee (id, employeeType, email, gender, prefNumOfShifts)
	values (17, 'employee','Ernest@gmail.com','M', 2);

insert into employee (id, employeeType, email, gender)
	values (18, 'employee','Steve@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (20, 'employee','MikeL@gmail.com','M');

insert into employee (id, employeeType, email, gender, prefNumOfShifts)
	values (21, 'employee','Patrick@gmail.com','M', 2);

insert into employee (id, employeeType, email, gender)
	values (42, 'employee','Hudson','M');

insert into employee (id, employeeType, email, gender, prefNumOfShifts)
	values (43, 'employee','JakeE@gmail.com','M', 2);

insert into employee (id, employeeType, email, gender)
	values (22, 'employee','NathanA@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (23, 'employee','JakeL@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (24, 'employee','Ethan@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (25, 'employee','Avery@gmail.com','F');

insert into employee (id, employeeType, email, gender)
	values (26, 'employee','Alex','M');

insert into employee (id, employeeType, email, gender)
	values (27, 'employee','Cammie','F');

insert into employee (id, employeeType, email, gender)
	values (28, 'employee','Asa','M');

insert into employee (id, employeeType, email, gender)
	values (29, 'employee','Charles@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (30, 'employee','Colton@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (31, 'employee','Tanner@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (32, 'employee','Riggs@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (33, 'employee','AndrewS@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (34, 'employee','Nevada@gmail.com','F');

insert into employee (id, employeeType, email, gender)
	values (35, 'employee','Cannon','F');

insert into employee (id, employeeType, email, gender)
	values (36, 'employee','AndrewT@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (37, 'employee','Noah@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (38, 'employee','Juliana@gmail.com','F');

insert into employee (id, employeeType, email, gender)
	values (39, 'employee','Joe@gmail.com','M');

insert into employee (id, employeeType, email, gender)
	values (40, 'employee','Rusty','M');
	

	
	

/******************************** INSERT INTO AVAILABILITY TABLES *****************/

/* Evan availability*/

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(6, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(6, 1, '00:00:00', '09:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(6, 1, '17:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(6, 2, '00:00:00', '10:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(6, 2, '17:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(6, 3, '00:00:00', '09:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(6, 3, '15:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(6, 4, '00:00:00', '10:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(6, 4, '17:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(6, 5, '00:00:00', '09:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(6, 5, '15:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(6, 6, '00:00:00', '24:00:00');

/* Griffin Availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(5, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(5, 1, '00:00:00', '10:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(5, 1, '13:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(5, 2, '16:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(5, 3, '00:00:00', '10:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(5, 3, '13:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(5, 4, '16:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(5, 5, '00:00:00', '10:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(5, 5, '13:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(5, 6, '00:00:00', '24:00:00');

/* Parker availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(7, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(7, 1, '00:00:00', '14:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(7, 2, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(7, 3, '00:00:00', '14:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(7, 4, '00:00:00', '14:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(7, 5, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(7, 6, '00:00:00', '24:00:00');

/* Robby availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(8, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(8, 2, '00:00:00', '08:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(8, 2, '14:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(8, 4, '00:00:00', '08:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(8, 4, '14:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(8, 6, '00:00:00', '24:00:00');

/* Zach availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(9, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(9, 1, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(9, 2, '13:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(9, 3, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(9, 4, '13:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(9, 5, '13:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(9, 6, '00:00:00', '24:00:00');

/* Carly availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(11, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(11, 1, '00:00:00', '9:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(11, 1, '15:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(11, 2, '00:00:00', '13:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(11, 2, '17:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(11, 3, '17:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(11, 4, '00:00:00', '13:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(11, 4, '16:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(11, 5, '00:00:00', '11:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(11, 5, '15:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(11, 6, '00:00:00', '24:00:00');

/* Don availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(12, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(12, 1, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(12, 2, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(12, 3, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(12, 4, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(12, 5, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(12, 6, '00:00:00', '24:00:00');

/* Jack availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(14, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(14, 1, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(14, 2, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(14, 3, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(14, 4, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(14, 5, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(14, 6, '00:00:00', '24:00:00');

/* Bob availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(41, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(41, 1, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(41, 2, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(41, 3, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(41, 4, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(41, 5, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(41, 6, '00:00:00', '24:00:00');

/* Ernest availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(17, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(17, 1, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(17, 2, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(17, 3, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(17, 4, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(17, 5, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(17, 6, '00:00:00', '24:00:00');

/* Mike L availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(20, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(20, 1, '00:00:00', '11:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(20, 2, '00:00:00', '11:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(20, 2, '17:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(20, 3, '00:00:00', '11:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(20, 3, '14:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(20, 4, '00:00:00', '11:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(20, 4, '17:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(20, 5, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(20, 6, '00:00:00', '24:00:00');

/* Patrick availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(21, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(21, 1, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(21, 2, '00:00:00', '8:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(21, 2, '17:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(21, 3, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(21, 4, '00:00:00', '8:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(21, 4, '17:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(21, 5, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(21, 6, '00:00:00', '24:00:00');

/* Hudson availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(42, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(42, 6, '00:00:00', '24:00:00');

/* Jake E availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(43, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(43, 1, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(43, 2, '00:00:00', '08:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(43, 2, '17:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(43, 3, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(43, 4, '00:00:00', '08:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(43, 4, '17:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(43, 5, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(43, 6, '00:00:00', '24:00:00');

/* Jake L availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(23, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(23, 1, '00:00:00', '08:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(23, 1, '14:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(23, 2, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(23, 3, '00:00:00', '08:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(23, 3, '14:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(23, 4, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(23, 5, '00:00:00', '08:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(23, 5, '14:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(23, 6, '00:00:00', '24:00:00');

/* Ethan availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(24, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(24, 1, '00:00:00', '08:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(24, 1, '14:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(24, 2, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(24, 3, '00:00:00', '08:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(24, 3, '14:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(24, 4, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(24, 5, '00:00:00', '8:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(24, 5, '14:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(24, 6, '00:00:00', '24:00:00');

/* Alex availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(26, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(26, 1, '00:00:00', '08:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(26, 1, '15:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(26, 2, '00:00:00', '08:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(26, 2, '11:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(26, 3, '00:00:00', '8:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(26, 4, '00:00:00', '8:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(26, 4, '11:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(26, 5, '00:00:00', '08:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(26, 5, '15:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(26, 6, '00:00:00', '24:00:00');

/* Cammie availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(27, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(27, 1, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(27, 2, '14:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(27, 3, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(27, 4, '14:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(27, 5, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(27, 6, '00:00:00', '24:00:00');

/* Asa availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(28, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(28, 1, '00:00:00', '09:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(28, 1, '12:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(28, 2, '00:00:00', '08:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(28, 2, '17:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(28, 3, '00:00:00', '09:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(28, 3, '12:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(28, 4, '00:00:00', '08:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(28, 4, '17:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(28, 5, '00:00:00', '09:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(28, 5, '12:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(28, 6, '00:00:00', '24:00:00');



/* Charles availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(29, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(29, 1, '00:00:00', '08:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(29, 1, '12:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(29, 2, '00:00:00', '08:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(29, 2, '14:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(29, 3, '00:00:00', '08:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(29, 3, '12:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(29, 4, '00:00:00', '08:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(29, 4, '16:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(29, 5, '00:00:00', '08:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(29, 5, '12:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(29, 6, '00:00:00', '24:00:00');

/* Colton availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(30, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(30, 1, '00:00:00', '10:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(30, 1, '14:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(30, 2, '00:00:00', '08:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(30, 2, '13:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(30, 3, '00:00:00', '10:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(30, 3, '14:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(30, 4, '00:00:00', '08:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(30, 4, '13:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(30, 5, '00:00:00', '10:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(30, 5, '14:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(30, 6, '00:00:00', '24:00:00');

/* Tanner availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(31, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(31, 6, '00:00:00', '24:00:00');

/* Riggs availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(32, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(32, 4, '00:00:00', '13:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(32, 6, '00:00:00', '24:00:00');

/* Andrew S availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(33, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(33, 1, '00:00:00', '08:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(33, 1, '15:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(33, 2, '00:00:00', '08:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(33, 2, '13:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(33, 3, '00:00:00', '08:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(33, 3, '15:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(33, 4, '00:00:00', '08:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(33, 4, '13:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(33, 5, '00:00:00', '08:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(33, 5, '15:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(33, 6, '00:00:00', '24:00:00');

/* Nevada availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(34, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(34, 1, '00:00:00', '08:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(34, 1, '13:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(34, 2, '17:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(34, 3, '00:00:00', '08:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(34, 3, '13:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(34, 4, '13:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(34, 5, '00:00:00', '09:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(34, 5, '13:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(34, 6, '00:00:00', '24:00:00');

/* Cannon availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(35, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(35, 1, '00:00:00', '08:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(35, 1, '12:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(35, 2, '00:00:00', '11:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(35, 2, '17:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(35, 3, '00:00:00', '08:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(35, 3, '16:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(35, 4, '00:00:00', '11:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(35, 4, '17:30:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(35, 5, '00:00:00', '09:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(35, 5, '14:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(35, 6, '00:00:00', '24:00:00');

/* Andrew T availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(36, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(36, 1, '00:00:00', '12:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(36, 1, '15:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(36, 2, '00:00:00', '10:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(36, 2, '16:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(36, 3, '00:00:00', '12:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(36, 3, '15:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(36, 4, '00:00:00', '10:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(36, 4, '16:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(36, 5, '00:00:00', '12:45:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(36, 5, '15:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(36, 6, '00:00:00', '24:00:00');

/* Noah availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(37, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(37, 1, '00:00:00', '08:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(37, 1, '15:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(37, 2, '00:00:00', '13:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(37, 2, '16:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(37, 3, '00:00:00', '08:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(37, 3, '15:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(37, 4, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(37, 5, '00:00:00', '08:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(37, 5, '15:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(37, 6, '00:00:00', '24:00:00');

/* Juliana availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(38, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(38, 1, '13:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(38, 2, '00:00:00', '13:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(38, 3, '13:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(38, 4, '00:00:00', '13:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(38, 5, '13:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(38, 6, '00:00:00', '24:00:00');

/* Joe availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(39, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(39, 1, '00:00:00', '11:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(39, 1, '16:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(39, 2, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(39, 3, '00:00:00', '11:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(39, 3, '16:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(39, 4, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(39, 5, '00:00:00', '11:30:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(39, 5, '16:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(39, 6, '00:00:00', '24:00:00');

/* Rusty availability */

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(40, 0, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(40, 2, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(40, 4, '00:00:00', '24:00:00');

insert into availability (id, can_work_day, start_work_hour, end_work_hour)
  values(40, 6, '00:00:00', '24:00:00');


/**************************** INSERT INTO SHIFT_TYPE TABLE *****************************/
/* ENUM ('C', 'R','RR', 'S', 'ST', 'T') */

/* Evan */

insert into roles (id, roleTrained)
  values (6, 'S');

insert into roles (id, roleTrained)
  values (6, 'R');

insert into roles (id, roleTrained)
  values (6, 'RR');

insert into roles (id, roleTrained)
  values (6, 'C');

/* Griffin */

insert into roles (id, roleTrained)
  values (5, 'S');

insert into roles (id, roleTrained)
  values (5, 'C');

insert into roles (id, roleTrained)
  values (5, 'R');

insert into roles (id, roleTrained)
  values (5, 'RR');

/* Parker */

insert into roles (id, roleTrained)
  values (7, 'S');

insert into roles (id, roleTrained)
  values (7, 'C');

insert into roles (id, roleTrained)
  values (7, 'R');

insert into roles (id, roleTrained)
  values (7, 'RR');

/*Robby */

insert into roles (id, roleTrained)
  values (8, 'S');

insert into roles (id, roleTrained)
  values (8, 'C');

insert into roles (id, roleTrained)
  values (8, 'R');

insert into roles (id, roleTrained)
  values (8, 'RR');

/* Zach */

insert into roles (id, roleTrained)
  values (9, 'S');

insert into roles (id, roleTrained)
  values (9, 'C');

insert into roles (id, roleTrained)
  values (9, 'R');

insert into roles (id, roleTrained)
  values (9, 'RR');

/* Brooke */

insert into roles (id, roleTrained)
  values (10, 'S');

insert into roles (id, roleTrained)
  values (10, 'C');

insert into roles (id, roleTrained)
  values (10, 'R');

insert into roles (id, roleTrained)
  values (10, 'RR');

/* Carly */

insert into roles (id, roleTrained)
  values (11, 'S');

insert into roles (id, roleTrained)
  values (11, 'C');

insert into roles (id, roleTrained)
  values (11, 'R');

insert into roles (id, roleTrained)
  values (11, 'RR');

/* Don */

insert into roles (id, roleTrained)
  values (12, 'ST');

/* Jeff */

insert into roles (id, roleTrained)
  values (13, 'ST');

/* Jack */

insert into roles (id, roleTrained)
  values (14, 'ST');

/* Ron */

insert into roles (id, roleTrained)
  values (15, 'ST');

/* Bob */

insert into roles (id, roleTrained)
  values (41, 'ST');

/* Mike C */

insert into roles (id, roleTrained)
  values (16, 'ST');

/*Ernest*/

insert into roles (id, roleTrained)
  values (17, 'ST');

/* Steve */

insert into roles (id, roleTrained)
  values (18, 'ST');

/* Mike L */

insert into roles (id, roleTrained)
  values (20, 'C');

insert into roles (id, roleTrained)
  values (20, 'R');

insert into roles (id, roleTrained)
  values (20, 'RR');

/* Patrick */

insert into roles (id, roleTrained)
  values (21, 'C');

insert into roles (id, roleTrained)
  values (21, 'R');

insert into roles (id, roleTrained)
  values (21, 'RR');

/* Hudson */

insert into roles (id, roleTrained)
  values (42, 'C');

insert into roles (id, roleTrained)
  values (42, 'R');

/* Jake E */

insert into roles (id, roleTrained)
  values (43, 'C');

insert into roles (id, roleTrained)
  values (43, 'R');

/* Nathan A */

insert into roles (id, roleTrained)
  values (22, 'C');

insert into roles (id, roleTrained)
  values (22, 'R');

insert into roles (id, roleTrained)
  values (22, 'RR');

/* Jake L */

insert into roles (id, roleTrained)
  values (23, 'C');

insert into roles (id, roleTrained)
  values (23, 'R');

insert into roles (id, roleTrained)
  values (23, 'RR');

/* Ethan */

insert into roles (id, roleTrained)
  values (24, 'C');

insert into roles (id, roleTrained)
  values (24, 'R');

insert into roles (id, roleTrained)
  values (24, 'RR');

/* Avery */

insert into roles (id, roleTrained)
  values (25, 'C');

insert into roles (id, roleTrained)
  values (25, 'R');

insert into roles (id, roleTrained)
  values (25, 'RR');

/* Alex */

insert into roles (id, roleTrained)
  values (26, 'C');

insert into roles (id, roleTrained)
  values (26, 'R');

insert into roles (id, roleTrained)
  values (26, 'RR');

/* Cammie */

insert into roles (id, roleTrained)
  values (27, 'C');

insert into roles (id, roleTrained)
  values (27, 'R');

insert into roles (id, roleTrained)
  values (27, 'RR');

/* Asa */

insert into roles (id, roleTrained)
  values (28, 'C');

insert into roles (id, roleTrained)
  values (28, 'R');

insert into roles (id, roleTrained)
  values (28, 'RR');

/* Charles */

insert into roles (id, roleTrained)
  values (29, 'C');

insert into roles (id, roleTrained)
  values (29, 'R');

insert into roles (id, roleTrained)
  values (29, 'RR');

/* Colton */

insert into roles (id, roleTrained)
  values (30, 'C');

insert into roles (id, roleTrained)
  values (30, 'R');

insert into roles (id, roleTrained)
  values (30, 'RR');

/* Tanner */

insert into roles (id, roleTrained)
  values (31, 'C');

insert into roles (id, roleTrained)
  values (31, 'R');

insert into roles (id, roleTrained)
  values (31, 'RR');

/* Riggs */

insert into roles (id, roleTrained)
  values (32, 'C');

insert into roles (id, roleTrained)
  values (32, 'R');

/* Andrew S */

insert into roles (id, roleTrained)
  values (33, 'C');

insert into roles (id, roleTrained)
  values (33, 'R');

/* Nevada */

insert into roles (id, roleTrained)
  values (34, 'C');

insert into roles (id, roleTrained)
  values (34, 'R');

insert into roles (id, roleTrained)
  values (34, 'RR');

/* Cannon */

insert into roles (id, roleTrained)
  values (35, 'C');

insert into roles (id, roleTrained)
  values (35, 'R');

insert into roles (id, roleTrained)
  values (35, 'RR');

/* Andrew T */

insert into roles (id, roleTrained)
  values (36, 'C');

insert into roles (id, roleTrained)
  values (36, 'R');

/* Noah */

insert into roles (id, roleTrained)
  values (37, 'C');

insert into roles (id, roleTrained)
  values (37, 'R');

/* Juliana */

insert into roles (id, roleTrained)
  values (38, 'C');

insert into roles (id, roleTrained)
  values (38, 'R');

insert into roles (id, roleTrained)
  values (38, 'RR');

/* Joe */

insert into roles (id, roleTrained)
  values (39, 'T');

/* Rusty */

insert into roles (id, roleTrained)
  values (40, 'T');

















