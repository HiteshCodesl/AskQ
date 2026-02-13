
CREATE TABLE questions(
    id SERIAL PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    userId INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)