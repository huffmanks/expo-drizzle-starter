CREATE TABLE `tags` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `timers` (
	`id` integer PRIMARY KEY NOT NULL,
	`tag_id` integer NOT NULL,
	`title` text DEFAULT 'Untitled' NOT NULL,
	`duration` integer NOT NULL,
	`is_running` integer DEFAULT true NOT NULL,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE cascade
);
