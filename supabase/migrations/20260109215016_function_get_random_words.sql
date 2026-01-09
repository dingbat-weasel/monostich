-- create function to get random subset of words for PoemCreator

CREATE FUNCTION get_random_tiles(count INT)
RETURNS SETOF tiles
AS $$
    SELECT * FROM tiles ORDER BY random() LIMIT count;
$$ LANGUAGE sql;