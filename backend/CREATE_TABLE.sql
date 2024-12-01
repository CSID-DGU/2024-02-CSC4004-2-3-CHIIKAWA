use ricefriend;

CREATE TABLE `menucategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `foodcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `menuid` int NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`menuid`) REFERENCES `menucategory` (`id`)
);

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `state` varchar(255) DEFAULT NULL,
  `profileimg` longblob,
  `favfood_id1` int NOT NULL,
  `favfood_id2` int DEFAULT NULL,
  `favfood_id3` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`favfood_id1`) REFERENCES `foodcategory` (`id`),
  FOREIGN KEY (`favfood_id2`) REFERENCES `foodcategory` (`id`),
  FOREIGN KEY (`favfood_id3`) REFERENCES `foodcategory` (`id`)
);

CREATE TABLE `chatroom` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `limitednum` int NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `chatpart` (
  `userid` int NOT NULL,
  `roomid` int NOT NULL,
  `user` varbinary(255) NOT NULL,
  `chatroom` varbinary(255) NOT NULL,
  PRIMARY KEY (`userid`,`roomid`),
  FOREIGN KEY (`userid`) REFERENCES `user` (`id`),
  FOREIGN KEY (`roomid`) REFERENCES `chatroom` (`id`)
);

CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `roomid` int NOT NULL,
  `type` enum('CHAT','JOIN','LEAVE') DEFAULT NULL,
  `detail` text NOT NULL,
  `senttime` timestamp NOT NULL,
  PRIMARY KEY (`id`,`roomid`),
  FOREIGN KEY (`userid`) REFERENCES `user` (`id`),
  FOREIGN KEY (`roomid`) REFERENCES `chatroom` (`id`)
);

INSERT INTO menucategory (name)
VALUES ("분식");

INSERT INTO foodcategory (menuid, name)
VALUES (1, "떡볶이");

INSERT INTO user (email, password, name, favfood_id1)
VALUES ("admin@boss.com", "123", "정준혁", 1);