-- Bridge table for poem-word relationship

CREATE TABLE poem_words (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    poem_id     UUID NOT NULL REFERENCES poems(id) ON DELETE CASCADE,
    word_id     UUID NOT NULL REFERENCES words(id) ON DELETE RESTRICT,
    position    INT  NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT now(),

    UNIQUE (poem_id, word_id),
    UNIQUE (poem_id, position)
);


CREATE INDEX idx_poem_words_word_id
    ON poem_words(poem_id, word_id);

CREATE INDEX idx_poem_words_poem_id
    ON poem_words(poem_id, position);


-- remove old array column from poems
ALTER TABLE poems DROP COLUMN word_ids;