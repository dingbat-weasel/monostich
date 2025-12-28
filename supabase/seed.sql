INSERT INTO words (text) VALUES
    -- Articles & Pronouns
    ('a'), ('the'), ('this'), ('that'), ('these'), ('those'),
    ('I'), ('you'), ('we'), ('they'), ('it'), ('he'), ('she'),
    ('my'), ('your'), ('our'), ('their'), ('me'), ('us'),

    -- Verbs
    ('is'), ('are'), ('was'), ('were'), ('be'), ('been'), ('being'),
    ('have'), ('has'), ('had'), ('do'), ('does'), ('did'),
    ('will'), ('would'), ('could'), ('should'), ('can'), ('may'),
    ('go'), ('went'), ('gone'), ('come'), ('came'),
    ('see'), ('saw'), ('look'), ('watch'),
    ('make'), ('made'), ('take'), ('took'),
    ('think'), ('thought'), ('feel'), ('felt'),
    ('want'), ('need'), ('love'), ('like'), ('hate'),
    ('whisper'), ('scream'), ('sing'), ('dance'), ('dream'),
    ('cry'), ('laugh'), ('smile'), ('die'), ('live'),
    ('fall'), ('rise'), ('soar'), ('float'), ('swim'),
    ('run'), ('walk'), ('stay'), ('leave'), ('wait'),
    ('remember'), ('forget'), ('miss'), ('wish'),

    -- Nouns
    ('time'), ('day'), ('night'), ('morning'), ('evening'),
    ('sun'), ('moon'), ('star'), ('sky'), ('cloud'), ('rain'),
    ('wind'), ('storm'), ('snow'), ('light'), ('shadow'),
    ('ocean'), ('sea'), ('water'), ('wave'), ('river'),
    ('mountain'), ('forest'), ('tree'), ('flower'), ('garden'),
    ('heart'), ('soul'), ('mind'), ('body'), ('hand'),
    ('eye'), ('tear'), ('breath'), ('voice'), ('word'),
    ('love'), ('life'), ('death'), ('dream'), ('hope'),
    ('pain'), ('joy'), ('fear'), ('peace'), ('truth'),
    ('beauty'), ('silence'), ('music'), ('song'), ('poem'),
    ('world'), ('earth'), ('home'), ('place'), ('road'),
    ('man'), ('woman'), ('child'), ('friend'), ('stranger'),

    -- Adjectives
    ('beautiful'), ('gorgeous'), ('lovely'), ('pretty'),
    ('dark'), ('bright'), ('black'), ('white'), ('red'),
    ('blue'), ('green'), ('golden'), ('silver'),
    ('soft'), ('hard'), ('sweet'), ('bitter'), ('cold'),
    ('warm'), ('hot'), ('cool'), ('wet'), ('dry'),
    ('big'), ('small'), ('tiny'), ('huge'), ('great'),
    ('old'), ('new'), ('young'), ('ancient'),
    ('wild'), ('gentle'), ('quiet'), ('loud'), ('silent'),
    ('broken'), ('whole'), ('empty'), ('full'),
    ('lost'), ('found'), ('near'), ('far'), ('deep'),
    ('sad'), ('happy'), ('lonely'), ('together'),
    ('strange'), ('familiar'), ('foreign'), ('endless'),

    -- Prepositions & Conjunctions
    ('in'), ('on'), ('at'), ('by'), ('to'), ('from'),
    ('with'), ('without'), ('through'), ('under'), ('over'),
    ('between'), ('among'), ('before'), ('after'),
    ('and'), ('but'), ('or'), ('so'), ('yet'),
    ('if'), ('when'), ('where'), ('why'), ('how'),
    ('because'), ('though'), ('while'), ('until'),

    -- Adverbs & Other
    ('not'), ('never'), ('always'), ('sometimes'), ('still'),
    ('here'), ('there'), ('now'), ('then'), ('once'),
    ('again'), ('too'), ('very'), ('so'), ('just'),
    ('only'), ('almost'), ('maybe'), ('perhaps'),
    ('yes'), ('no')
  ON CONFLICT (text) DO NOTHING;