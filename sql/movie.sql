/*
Navicat MySQL Data Transfer

Source Server         : localhsot
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : douban

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2016-11-01 21:11:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for movie
-- ----------------------------
DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie` (
  `douban_movie_id` int(20) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `director` varchar(255) DEFAULT NULL,
  `writer` varchar(255) DEFAULT NULL,
  `actors` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `released` varchar(255) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `rate` float(10,0) DEFAULT NULL,
  `star` int(10) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8