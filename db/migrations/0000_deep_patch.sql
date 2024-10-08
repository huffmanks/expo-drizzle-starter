CREATE TABLE `tags` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `timers` (
	`id` text PRIMARY KEY NOT NULL,
	`tag_id` text NOT NULL,
	`title` text DEFAULT 'Untitled' NOT NULL,
	`duration` integer NOT NULL,
	`time_remaining` integer NOT NULL,
	`is_running` integer DEFAULT true NOT NULL,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE cascade
);
