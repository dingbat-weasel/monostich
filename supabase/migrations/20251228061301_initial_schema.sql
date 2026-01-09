CREATE TABLE tiles (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text        TEXT NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE poems (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title       TEXT,
    is_public   BOOLEAN DEFAULT true,
    created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_poems_user_id ON poems(user_id);
CREATE INDEX idx_poems_created_at ON poems(created_at DESC);
CREATE INDEX idx_poems_is_public ON poems(is_public) WHERE is_public = true;


CREATE TABLE poem_tiles (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    poem_id     UUID NOT NULL REFERENCES poems(id) ON DELETE CASCADE,
    tile_id     UUID NOT NULL REFERENCES tiles(id) ON DELETE RESTRICT,
    position    INT  NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT now(),

    UNIQUE (poem_id, tile_id),
    UNIQUE (poem_id, position)
);

CREATE INDEX idx_poem_tiles_tile_id
    ON poem_tiles(poem_id, tile_id);

CREATE INDEX idx_poem_tiles_poem_id
    ON poem_tiles(poem_id, position);


