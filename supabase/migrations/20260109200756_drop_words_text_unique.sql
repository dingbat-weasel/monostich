-- drop unique constraint on words.text to allow duplicate tile content

ALTER TABLE words DROP CONSTRAINT words_text_key;