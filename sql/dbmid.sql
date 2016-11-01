/*
Navicat MySQL Data Transfer

Source Server         : localhsot
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : douban

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2016-11-01 11:51:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for douban_movie_id
-- ----------------------------
DROP TABLE IF EXISTS `dbmid`;
CREATE TABLE `dbmid` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `douban_movie_id` int(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
