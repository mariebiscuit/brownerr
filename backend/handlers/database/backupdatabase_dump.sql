BEGIN TRANSACTION;
CREATE TABLE job (
	id INTEGER NOT NULL, 
	job INTEGER, 
	PRIMARY KEY (id), 
	FOREIGN KEY(job) REFERENCES service (id)
);
INSERT INTO "job" VALUES(1,1);
INSERT INTO "job" VALUES(2,2);
CREATE TABLE service (
	id INTEGER NOT NULL, 
	name VARCHAR(100) NOT NULL, 
	PRIMARY KEY (id), 
	UNIQUE (name)
);
INSERT INTO "service" VALUES(1,'plumber');
INSERT INTO "service" VALUES(2,'electrician');
INSERT INTO "service" VALUES(3,'landscaper');
CREATE TABLE "transaction" (
	id INTEGER NOT NULL, 
	service_id INTEGER, 
	provider_id INTEGER, 
	recipient_id INTEGER, 
	rating_provider FLOAT, 
	rating_recipient FLOAT, 
	review_provider TEXT, 
	review_provider_summary TEXT, 
	review_recipient TEXT, 
	review_recipient_summary TEXT, 
	transaction_timestamp DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	FOREIGN KEY(service_id) REFERENCES service (id), 
	FOREIGN KEY(provider_id) REFERENCES user (id), 
	FOREIGN KEY(recipient_id) REFERENCES user (id)
);
INSERT INTO "transaction" VALUES(1,1,2,1,3.7,4.7,'Could have been better',NULL,'Good job',NULL,'2023-05-02 15:09:56');
INSERT INTO "transaction" VALUES(2,1,2,1,3.9,4.9,'Could have been better, but okay.',NULL,'Good job, happy about this',NULL,'2023-05-02 15:09:56');
CREATE TABLE user (
	id INTEGER NOT NULL, 
	name VARCHAR(100) NOT NULL, 
	service INTEGER, 
	bio TEXT, 
	email VARCHAR(80) NOT NULL, 
	rating_provider FLOAT, 
	rating_recipient FLOAT, 
	num_ratings_provider INTEGER, 
	num_ratings_recipient INTEGER, 
	available_provider INTEGER, 
	created_at DATETIME DEFAULT (CURRENT_TIMESTAMP), 
	PRIMARY KEY (id), 
	CONSTRAINT rating_provider_range CHECK (rating_provider >= 0.0 AND rating_recipient <= 5.0), 
	CONSTRAINT rating_recipient_range CHECK (rating_recipient >= 0.0 AND rating_recipient <= 5.0), 
	FOREIGN KEY(service) REFERENCES service (id), 
	UNIQUE (email)
);
INSERT INTO "user" VALUES(1,'John Doe2',2,'I am a professional electrician','john.doe2@example.com',0.0,4.80000000000000071054e+00,0,2,1,'2023-05-02 15:03:58');
INSERT INTO "user" VALUES(2,'Jane Smith2',1,'I am a certified plumber','jane.smith2@example.com',3.8,0.0,2,0,1,'2023-05-02 15:03:58');
INSERT INTO "user" VALUES(3,'Bob Johnson2',3,'I am a professional landscaper','bob.johnson2@example.com',0.0,0.0,0,0,1,'2023-05-02 15:03:58');
COMMIT;
