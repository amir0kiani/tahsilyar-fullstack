CREATE TABLE `student_lesson_progress` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `grade` varchar(32) NOT NULL,
  `track` varchar(32) NOT NULL,
  `subject` varchar(128) NOT NULL,
  `chapter` varchar(255) NOT NULL,
  `isCompleted` int NOT NULL DEFAULT 0,
  `completedAt` timestamp NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `student_lesson_progress_id` PRIMARY KEY(`id`),
  CONSTRAINT `student_lesson_progress_user_lesson_unique` UNIQUE(`userId`,`grade`,`track`,`subject`,`chapter`),
  INDEX `student_lesson_progress_user_idx`(`userId`)
);
