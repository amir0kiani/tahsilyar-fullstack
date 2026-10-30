CREATE TABLE IF NOT EXISTS `study_assessments` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `subject` varchar(255) NOT NULL,
  `topic` text NOT NULL,
  `assessmentType` enum('practice','mock','school_exam') NOT NULL DEFAULT 'practice',
  `correctAnswers` int NOT NULL,
  `totalQuestions` int NOT NULL,
  `assessedAt` timestamp NOT NULL DEFAULT (now()),
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `study_assessments_id` PRIMARY KEY(`id`)
);
CREATE INDEX `study_assessments_user_assessed_idx` ON `study_assessments` (`userId`, `assessedAt`);
CREATE INDEX `study_assessments_user_subject_idx` ON `study_assessments` (`userId`, `subject`);
