CREATE TABLE `academic_goals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` varchar(64) NOT NULL,
	`target` text NOT NULL,
	`deadline` timestamp,
	`status` enum('active','completed','cancelled') NOT NULL DEFAULT 'active',
	`priority` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `academic_goals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `conversation_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`conversationId` int NOT NULL,
	`userId` int NOT NULL,
	`role` enum('user','assistant') NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `conversation_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `conversations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL DEFAULT 'گفت‌وگوی تحصیلی',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `conversations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `student_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`answers` json NOT NULL,
	`name` varchar(255),
	`email` varchar(320),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `student_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `student_profiles_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `study_plans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`summary` text NOT NULL,
	`focusTip` text NOT NULL,
	`inputSnapshot` json NOT NULL,
	`status` enum('draft','active','completed','archived') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `study_plans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `study_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`planId` int NOT NULL,
	`userId` int NOT NULL,
	`subject` varchar(255) NOT NULL,
	`topic` text NOT NULL,
	`day` varchar(32) NOT NULL,
	`start` varchar(16) NOT NULL,
	`end` varchar(16) NOT NULL,
	`duration` varchar(32) NOT NULL,
	`reason` text NOT NULL,
	`completed` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `study_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `academic_goals_user_id_idx` ON `academic_goals` (`userId`);--> statement-breakpoint
CREATE INDEX `conversation_messages_conversation_idx` ON `conversation_messages` (`conversationId`);--> statement-breakpoint
CREATE INDEX `conversation_messages_user_id_idx` ON `conversation_messages` (`userId`);--> statement-breakpoint
CREATE INDEX `conversations_user_id_idx` ON `conversations` (`userId`);--> statement-breakpoint
CREATE INDEX `student_profiles_user_id_idx` ON `student_profiles` (`userId`);--> statement-breakpoint
CREATE INDEX `study_plans_user_id_idx` ON `study_plans` (`userId`);--> statement-breakpoint
CREATE INDEX `study_sessions_user_id_idx` ON `study_sessions` (`userId`);--> statement-breakpoint
CREATE INDEX `study_sessions_plan_id_idx` ON `study_sessions` (`planId`);