CREATE TABLE words (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text        TEXT NOT NULL UNIQUE,
    created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE poems (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    word_ids    TEXT[] NOT NULL,
    title       TEXT,
    is_public   BOOLEAN DEFAULT true,
    created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_poems_user_id ON poems(user_id);
CREATE INDEX idx_poems_created_at ON poems(created_at DESC);
CREATE INDEX idx_poems_is_public ON poems(is_public) WHERE is_public = true;

