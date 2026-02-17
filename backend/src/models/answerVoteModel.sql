
CREATE TABLE answervote (
    id SERIAL PRIMARY KEY NOT NULL,
    userid INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    answerid INT NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
    vote_type INT NOT NULL CHECK (vote_type IN (1, -1)),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(userid, answerid)
)

