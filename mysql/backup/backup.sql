-- --------------------------------------------------------
-- Host:                         myblog.cgwaxyps8mja.ca-central-1.rds.amazonaws.com
-- Server version:               8.0.23 - Source distribution
-- Server OS:                    Linux
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for myblog
CREATE DATABASE IF NOT EXISTS `myblog` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `myblog`;

-- Dumping structure for table myblog.blogcomments
CREATE TABLE IF NOT EXISTS `blogcomments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blog_comment` text,
  `blog_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `blog_id` (`blog_id`),
  CONSTRAINT `blogcomments_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogDataAdmin` (`blog_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table myblog.blogcomments: ~12 rows (approximately)
/*!40000 ALTER TABLE `blogcomments` DISABLE KEYS */;
INSERT IGNORE INTO `blogcomments` (`id`, `blog_comment`, `blog_id`, `createdAt`, `updatedAt`) VALUES
	(3, 'Look so nice!', 34, '2021-06-20 17:26:48', '2021-06-20 17:26:48'),
	(4, 'How adorable Doha, lol', 34, '2021-06-20 17:27:05', '2021-06-20 17:27:05'),
	(5, 'Happy new year. dude', 36, '2021-06-20 17:31:55', '2021-06-20 17:31:55'),
	(6, 'did you care yourself? Awesome!', 35, '2021-06-20 17:32:21', '2021-06-20 17:32:21'),
	(7, 'How beautiful lake!', 38, '2021-06-20 17:41:43', '2021-06-20 17:41:43'),
	(8, 'Give me a bunch of snacks!!', 35, '2021-06-20 17:42:19', '2021-06-20 17:42:19'),
	(9, 'Welcome to the Calgary!', 38, '2021-06-20 17:42:54', '2021-06-20 17:42:54'),
	(10, 'HAPPY BIRTHDAY !!', 39, '2021-06-20 17:43:17', '2021-06-20 17:43:17'),
	(11, 'Doha looks so excited, lol', 39, '2021-06-20 17:43:39', '2021-06-20 17:43:39'),
	(12, 'How beautiful family and flowers!', 37, '2021-06-20 17:44:20', '2021-06-20 17:44:20'),
	(13, 'Look so creepy!!', 35, '2021-06-20 17:55:03', '2021-06-20 17:55:03'),
	(14, 'Awesome lol', 35, '2021-06-20 17:55:21', '2021-06-20 17:55:21');
/*!40000 ALTER TABLE `blogcomments` ENABLE KEYS */;

-- Dumping structure for table myblog.blogDataAdmin
CREATE TABLE IF NOT EXISTS `blogDataAdmin` (
  `blog_id` int NOT NULL AUTO_INCREMENT,
  `writer` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `imagespath` text,
  `userID` varchar(255) DEFAULT NULL,
  `isLogedIn` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`blog_id`),
  KEY `userID` (`userID`),
  CONSTRAINT `blogdataadmin_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user_mywebsite` (`userID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table myblog.blogDataAdmin: ~6 rows (approximately)
/*!40000 ALTER TABLE `blogDataAdmin` DISABLE KEYS */;
INSERT IGNORE INTO `blogDataAdmin` (`blog_id`, `writer`, `title`, `description`, `imagespath`, `userID`, `isLogedIn`, `createdAt`, `updatedAt`) VALUES
	(34, 'admin0507', 'Winter Camping Awesome!', 'We went winter camping to Banff!, That was the first winter camping for us so Doha was worried that what if we freeze out and dead??!!\nHowever, she forgot about it after seeing the beautiful scenery at the camp site and we spent a really fun time!', 'https://dean-website.s3.ca-central-1.amazonaws.com/myblog/blogimages/1625419702547.JPG,https://dean-website.s3.ca-central-1.amazonaws.com/myblog/blogimages/1625419702554.JPG,https://dean-website.s3.ca-central-1.amazonaws.com/myblog/blogimages/1625419702570.JPG,https://dean-website.s3.ca-central-1.amazonaws.com/myblog/blogimages/1625419702589.JPG', 'admin0507', 1, '2021-06-20 17:20:38', '2021-07-04 17:28:22'),
	(35, 'admin0507', 'Happy Happy Halloween', 'Trick or Treating!', 'https://dean-website.s3.ca-central-1.amazonaws.com/myblog/blogimages/1625419638322.JPG,https://dean-website.s3.ca-central-1.amazonaws.com/myblog/blogimages/1625419638328.JPG,https://dean-website.s3.ca-central-1.amazonaws.com/myblog/blogimages/1625419638346.JPG', 'admin0507', 1, '2021-06-20 17:29:29', '2021-07-04 17:27:18'),
	(36, 'admin0507', 'Happy New Year!!', 'Happy New Year!!', 'https://dean-website.s3.ca-central-1.amazonaws.com/myblog/blogimages/1625419676687.JPG,https://dean-website.s3.ca-central-1.amazonaws.com/myblog/blogimages/1625419676700.JPG,https://dean-website.s3.ca-central-1.amazonaws.com/myblog/blogimages/1625419676718.JPG', 'admin0507', 1, '2021-06-20 17:31:33', '2021-07-04 17:27:56'),
	(37, 'admin0507', 'How beautiful Cherry blossom in Vancounver!', 'We visited Vancouver for some errands in the consulate. We were surprised that spring was already in Vancouver!! \nWe enjoyed beautiful cherry blossoms and delicious Korean food (That\'s the most exciting part!! lol).', 'https://dean-website.s3.ca-central-1.amazonaws.com/myblog/blogimages/1625419530765.JPG,https://dean-website.s3.ca-central-1.amazonaws.com/myblog/blogimages/1625419530777.JPG,https://dean-website.s3.ca-central-1.amazonaws.com/myblog/blogimages/1625419530809.JPG,https://dean-website.s3.ca-central-1.amazonaws.com/myblog/blogimages/1625419530824.JPG,https://dean-website.s3.ca-central-1.amazonaws.com/myblog/blogimages/1625419530833.JPG', 'admin0507', 1, '2021-06-20 17:37:14', '2021-07-04 17:25:31'),
	(38, 'admin0507', 'Forget me not a fond and Bowness park', 'Summer is coming! I\'m sooooo excited lol', 'https://dean-website.s3.ca-central-1.amazonaws.com/myblog/blogimages/1625419454172.JPG,https://dean-website.s3.ca-central-1.amazonaws.com/myblog/blogimages/1625419454207.JPG', 'admin0507', 1, '2021-06-20 17:38:43', '2021-07-04 17:24:14'),
	(39, 'admin0507', 'My Birthday Picnic', 'We went to our favourite place for celebrating my birthday! ', 'https://dean-website.s3.ca-central-1.amazonaws.com/myblog/blogimages/1625419416052.JPG,https://dean-website.s3.ca-central-1.amazonaws.com/myblog/blogimages/1625419416061.JPG', 'admin0507', 1, '2021-06-20 17:40:57', '2021-07-04 17:23:36');
/*!40000 ALTER TABLE `blogDataAdmin` ENABLE KEYS */;

-- Dumping structure for table myblog.emailAuth
CREATE TABLE IF NOT EXISTS `emailAuth` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `userID` varchar(255) NOT NULL,
  `ttl` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  CONSTRAINT `emailauth_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user_mywebsite` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table myblog.emailAuth: ~0 rows (approximately)
/*!40000 ALTER TABLE `emailAuth` DISABLE KEYS */;
/*!40000 ALTER TABLE `emailAuth` ENABLE KEYS */;

-- Dumping structure for table myblog.post_community
CREATE TABLE IF NOT EXISTS `post_community` (
  `id` int NOT NULL AUTO_INCREMENT,
  `writer` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table myblog.post_community: ~0 rows (approximately)
/*!40000 ALTER TABLE `post_community` DISABLE KEYS */;
INSERT IGNORE INTO `post_community` (`id`, `writer`, `title`, `desc`, `createdAt`, `updatedAt`) VALUES
	(11, 'Dean', 'Welcome to my blog!', 'This is an open place to everybody, share your awesome things and enjoy!', '2021-06-20 18:35:33', '2021-06-20 18:35:33');
/*!40000 ALTER TABLE `post_community` ENABLE KEYS */;

-- Dumping structure for table myblog.post_feedback
CREATE TABLE IF NOT EXISTS `post_feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `writer` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table myblog.post_feedback: ~0 rows (approximately)
/*!40000 ALTER TABLE `post_feedback` DISABLE KEYS */;
INSERT IGNORE INTO `post_feedback` (`id`, `writer`, `title`, `desc`, `createdAt`, `updatedAt`) VALUES
	(2, 'Feedback', 'Good Website', 'Test ', '2021-02-18 20:47:39', '2021-07-03 22:42:55');
/*!40000 ALTER TABLE `post_feedback` ENABLE KEYS */;

-- Dumping structure for table myblog.role_mywebsite
CREATE TABLE IF NOT EXISTS `role_mywebsite` (
  `roleID` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`roleID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table myblog.role_mywebsite: ~2 rows (approximately)
/*!40000 ALTER TABLE `role_mywebsite` DISABLE KEYS */;
INSERT IGNORE INTO `role_mywebsite` (`roleID`, `role`, `createdAt`, `updatedAt`) VALUES
	(1, 'admin', '2021-02-19 01:03:21', '2021-02-19 01:03:21'),
	(2, 'user', '2021-02-19 01:04:09', '2021-02-19 01:04:09');
/*!40000 ALTER TABLE `role_mywebsite` ENABLE KEYS */;

-- Dumping structure for table myblog.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table myblog.sequelizemeta: ~10 rows (approximately)
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT IGNORE INTO `sequelizemeta` (`name`) VALUES
	('20201203203926-modification-blogcomments-blog_id-column.js.js'),
	('20201204031202-modification-blogcomments-blogid.js.js'),
	('20201204031532-modification-blogcomments-bolg_id_type.js.js'),
	('20201223031338-add_userRole.js'),
	('20201223041248-user_column_delete.js'),
	('20210104005722-add_column_imagepath_to_usertable.js'),
	('20210118022946-add_colums_bloglist.js'),
	('20210118042356-add_colums_bloglist_second.js'),
	('20210218013327-setting_foreignKey.js'),
	('20210218015906-setting_foreignKey_blog_data_admin.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;

-- Dumping structure for table myblog.user_mywebsite
CREATE TABLE IF NOT EXISTS `user_mywebsite` (
  `userID` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `profile_img_path` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table myblog.user_mywebsite: ~0 rows (approximately)
/*!40000 ALTER TABLE `user_mywebsite` DISABLE KEYS */;
INSERT IGNORE INTO `user_mywebsite` (`userID`, `password`, `firstName`, `lastName`, `email`, `profile_img_path`, `createdAt`, `updatedAt`) VALUES
	('admin0507', '$2b$10$7heZIcj9pNAgSer7Vigu/eF/aGEvNLhKDBedvB.gxFJIyz0.dNb4W', 'dean', 'kim', 'poolup0000@gmail.com', 'https://dean-website.s3.ca-central-1.amazonaws.com/myblog/blogimages/1625419086739.jpg', '2021-06-29 01:51:13', '2021-07-04 17:18:23');
/*!40000 ALTER TABLE `user_mywebsite` ENABLE KEYS */;

-- Dumping structure for table myblog.user_mywebsite_role_mywebsite
CREATE TABLE IF NOT EXISTS `user_mywebsite_role_mywebsite` (
  `userID` varchar(255) NOT NULL,
  `roleID` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `user_mywebsite_role_mywebsite_roleID_userID_unique` (`userID`,`roleID`),
  KEY `roleID` (`roleID`),
  CONSTRAINT `user_mywebsite_role_mywebsite_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user_mywebsite` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_mywebsite_role_mywebsite_ibfk_2` FOREIGN KEY (`roleID`) REFERENCES `role_mywebsite` (`roleID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table myblog.user_mywebsite_role_mywebsite: ~0 rows (approximately)
/*!40000 ALTER TABLE `user_mywebsite_role_mywebsite` DISABLE KEYS */;
INSERT IGNORE INTO `user_mywebsite_role_mywebsite` (`userID`, `roleID`, `createdAt`, `updatedAt`) VALUES
	('admin0507', 1, '2021-04-03 21:20:57', '2021-04-03 21:20:57');
/*!40000 ALTER TABLE `user_mywebsite_role_mywebsite` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
