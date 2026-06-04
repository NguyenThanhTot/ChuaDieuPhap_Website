USE buddhist_website;

ALTER TABLE users
    ADD COLUMN password_reset_token VARCHAR(255) NULL
        AFTER email_verification_token_expiry;

ALTER TABLE users
    ADD COLUMN password_reset_token_expiry DATETIME NULL
        AFTER password_reset_token;
DESCRIBE users;