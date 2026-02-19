
CREATE TABLE questiontag (
    tagid INT NOT NULL REFERENCES tags(id),
    questionid INT NOT NULL REFERENCES questions(id),
    PRIMARY KEY(tagid, questionid)
)