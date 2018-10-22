
DROP TABLE IF EXISTS scans;
CREATE TABLE scans (
    ID SERIAL PRIMARY KEY,
    media VARCHAR,
    loc VARCHAR,
    time TIMESTAMP
);

INSERT INTO scans (media, loc, time)
  VALUES ('Mad Max: Fury Road', 'Waterfront AMC Theater', '2018-06-08 04:05:06');