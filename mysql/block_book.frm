CREATE DATABASE block_book_posts

GO
	/* ======================= TABLES ========================*/

CREATE TABLE post_information(
    post_id INT NOT NULL AUTO_INCREMENT,
    post_author VARCHAR(64) NOT NULL, 
    post_topic VARCHAR(50) NOT NULL,
    post_contents VARCHAR(280) NOT NULL,
    post_time_stamp TIMESTAMP NOT NULL,
    PRIMARY KEY(post_id)
);

CREATE TABLE post_likes(
    post_like_id INT NOT NULL AUTO_INCREMENT,
    post_id INT NOT NULL,
    post_author VARCHAR(64) NOT NULL,
    post_liker VARCHAR(64) NOT NULL,
    PRIMARY KEY (post_interaction_id),
    FOREIGN KEY (post_id) REFERENCES post_information(post_id)
);

CREATE TABLE post_comments(
    post_comment_id INT NOT NULL AUTO_INCREMENT,
    post_id INT NOT NULL,
    post_author VARCHAR(64) NOT NULL,
    post_commenter VARCHAR(64) NOT NULL,
    post_comment VARCHAR(280) NOT NULL,
    PRIMARY KEY (post_comment_id),
    FOREIGN KEY (post_id) REFERENCES post_information(post_id)
);

