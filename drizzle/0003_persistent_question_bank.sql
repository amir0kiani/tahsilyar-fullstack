CREATE TABLE IF NOT EXISTS `curriculum_chapters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `track` varchar(64) NOT NULL,
  `grade` varchar(32) NOT NULL,
  `subject` varchar(128) NOT NULL,
  `chapter` varchar(128) NOT NULL,
  `isActive` int NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `curriculum_subject_chapter_idx` (`subject`, `chapter`),
  KEY `curriculum_track_grade_idx` (`track`, `grade`)
);
CREATE TABLE IF NOT EXISTS `exam_questions` (
  `id` varchar(64) NOT NULL,
  `grade` varchar(32) NOT NULL,
  `track` varchar(64) NOT NULL,
  `subject` varchar(128) NOT NULL,
  `chapter` varchar(128) NOT NULL,
  `topic` varchar(128) NOT NULL,
  `difficulty` varchar(32) NOT NULL,
  `prompt` text NOT NULL,
  `options` json NOT NULL,
  `correctIndex` int NOT NULL,
  `explanation` text NOT NULL,
  `sourceStatus` varchar(32) NOT NULL DEFAULT 'sample-authored',
  `isActive` int NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `exam_questions_subject_chapter_idx` (`subject`, `chapter`),
  KEY `exam_questions_grade_track_idx` (`grade`, `track`),
  KEY `exam_questions_difficulty_idx` (`difficulty`)
);
