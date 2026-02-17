
CREATE TABLE questionvote (
    id SERIAL PRIMARY KEY NOT NULL,
    userid INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    questionid INT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    vote_type INT NOT NULL CHECK (vote_type IN (1, -1)),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(userid, questionid)
)

