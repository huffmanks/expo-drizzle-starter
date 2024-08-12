CREATE TABLE `groups` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `timers` (
	`id` integer PRIMARY KEY NOT NULL,
	`group_id` integer NOT NULL,
	`title` text NOT NULL,
	`duration` integer NOT NULL,
	`end_time` integer DEFAULT 0,
	`is_running` integer DEFAULT false,
	FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON UPDATE no action ON DELETE cascade
);
