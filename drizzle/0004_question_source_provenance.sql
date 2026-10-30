ALTER TABLE `exam_questions`
  ADD COLUMN `sourceTitle` varchar(255) NULL,
  ADD COLUMN `sourceUrl` text NULL,
  ADD COLUMN `sourceYear` varchar(16) NULL,
  ADD COLUMN `sourceQuestionNumber` varchar(64) NULL,
  ADD COLUMN `verifiedAt` timestamp NULL,
  ADD COLUMN `reviewerNote` text NULL;
