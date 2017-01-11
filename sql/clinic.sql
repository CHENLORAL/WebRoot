# Host: 127.0.0.1  (Version: 5.6.22-enterprise-commercial-advanced-log)
# Date: 2017-01-02 11:28:19
# Generator: MySQL-Front 5.3  (Build 4.13)

/*!40101 SET NAMES utf8 */;

#
# Source for table "drug"
#

DROP TABLE IF EXISTS `drug`;
CREATE TABLE `drug` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) DEFAULT NULL,
  `firstCost` double DEFAULT NULL,
  `salePrice` double DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

#
# Source for table "druglist"
#

DROP TABLE IF EXISTS `druglist`;
CREATE TABLE `druglist` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `personId` int(11) DEFAULT NULL,
  `treatmentId` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `listRevenue` double DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

#
# Source for table "drugrecord"
#

DROP TABLE IF EXISTS `drugrecord`;
CREATE TABLE `drugrecord` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `drugListId` int(11) DEFAULT NULL,
  `drugId` int(11) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `recordRevenue` double DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

#
# Source for table "person"
#

DROP TABLE IF EXISTS `person`;
CREATE TABLE `person` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) DEFAULT NULL,
  `password` varchar(25) DEFAULT NULL,
  `sex` varchar(2) DEFAULT NULL,
  `telephone` varchar(25) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Source for table "registration"
#

DROP TABLE IF EXISTS `registration`;
CREATE TABLE `registration` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `personId` int(11) DEFAULT NULL,
  `registrationFee` double DEFAULT NULL,
  `healthDescription` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Source for table "revenue"
#

DROP TABLE IF EXISTS `revenue`;
CREATE TABLE `revenue` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `treatmentId` int(11) DEFAULT NULL,
  `registrationFee` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `revenue` double DEFAULT NULL,
  `totalCost` double DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Source for table "treatedvisit"
#

DROP TABLE IF EXISTS `treatedvisit`;
CREATE TABLE `treatedvisit` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `treatmentId` int(11) DEFAULT NULL,
  `personId` int(11) DEFAULT NULL,
  `treatedDescription` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

#
# Source for table "treatment"
#

DROP TABLE IF EXISTS `treatment`;
CREATE TABLE `treatment` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `personId` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `healthDescription` varchar(255) DEFAULT NULL,
  `registrationId` int(11) DEFAULT NULL,
  `suggestion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
