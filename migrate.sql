
DROP TABLE IF EXISTS scans;
CREATE TABLE scans (
    ID SERIAL PRIMARY KEY,
    media VARCHAR,
    loc VARCHAR,
    time TIMESTAMP
);

INSERT INTO scans (media, loc, time)
  VALUES ('Mad Max: Fury Road', 'Waterfront AMC Theater', '2018-06-08 04:05:06');




DROP TABLE IF EXISTS events CASCADE;
CREATE TABLE events (
	ID SERIAL PRIMARY KEY,
	media VARCHAR,
	preview VARCHAR,
	loc VARCHAR,
	lat double precision,
	long double precision,
    imgurkey VARCHAR,
	descrip VARCHAR
);

DROP TABLE IF EXISTS eventtimes;
CREATE TABLE eventtimes (
    ID SERIAL PRIMARY KEY,
    time timestamp,
    event_id integer,
    constraint fk_eventtimes_events
        foreign key (event_id)
        REFERENCES events (ID)
);


CREATE OR REPLACE FUNCTION distance(lat1 double precision, long1 double precision,lat2 double precision, long2 double precision) RETURNS double precision LANGUAGE plpgsql AS $$
    DECLARE
    	latdiff double precision;
    	longdiff double precision;
    	earthr double precision;
    	xdist double precision;
    	ydist double precision;
    BEGIN
    	latdiff := abs(lat1 - lat2);
    	longdiff := abs(long1 - long2);
    	earthr = 6371000;
    	xdist := earthr * longdiff * cos(lat1);
    	ydist := earthr * latdiff;
    	RETURN sqrt(power(xdist,2.0) + power(ydist,2.0));
    END $$;


INSERT INTO events (media, preview, loc, lat, long, imgurkey, descrip)
  VALUES ('AcaPitt', '','Mellon Institute', 40.446172, -79.951027, "pCEoGjF.jpg", 'Come to the Acapella Concert on this Friday, October 26th!');


INSERT INTO eventtimes (time, event_id)
  VALUES (CURRENT_DATE, 1);