
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
  VALUES ('The Grinch', 'Bf6D-i8YpHg','AMC Waterfront 22', 40.24255, -79.55059, '8j3xs9b.jpg', 'The Grinch and his loyal dog, Max, live a solitary existence inside a cave on Mount Crumpet. His main source of aggravation comes during Christmastime when his neighbors in Whoville celebrate the holidays with a bang. When the Whos decide to make Christmas bigger and brighter, the disgruntled Grinch realizes there is one way to gain peace and quiet. With help from Max, the green grump hatches a scheme to pose as Santa Claus, steal Christmas and silence the Whos holiday cheer once and for all.'),
  ('Mad Max Fury Road', 'KELy4064dHw','Target', 40.468317, -79.922250, 'Opk9UNw.jpg', 'In a self-destructing world, a vengeful Australian policeman sets out to stop a violent motorcycle gang.'),
  ('Venom', 'xLCn88bfW1o','AMC Waterfront 22', 40.24255, -79.55059, 'BJKsSwg.jpg', 'Journalist Eddie Brock is trying to take down Carlton Drake, the notorious and brilliant founder of the Life Foundation. While investigating one of Drakes experiments, Eddies body merges with the alien Venom -- leaving him with superhuman strength and power. Twisted, dark and fueled by rage, Venom tries to control the new and dangerous abilities that Eddie finds so intoxicating.'),
  ('Job Expo', 'isYZ82GYI5M','', 40.418785, -80.059470, 'fyaqPIz.png', 'WHY YOU SHOULD ATTEND OUR PITTSBURGH CAREER FAIR

Open the doors of opportunity when you meet and interview with the top hiring companies in Pittsburgh. This career fair will allow you to learn about the businesses that are hiring and what their hiring needs are. Tired of sending your resume over the web to get no responses back? Put a face with a name and make a great first impression. Register today, and you could get hired live at our next career fair in Pittsburgh.



INDUSTRIES THAT HIRE AT OUR CAREER FAIRS

Accommodations, Accounting, Advertising, Aerospace, Agriculture & Agribusiness, Air Transportation, Apparel & Accessories, Auto, Banking, Beauty & Cosmetics, Biotechnology, Chemical, Communications, Computer, Construction, Consulting, Consumer Products, Education, Electronics, Employment, Energy, Entertainment & Recreation, Fashion, Financial Services, Fine Arts, Food & Beverage, Green Technology, Health, Information, Information Technology, Insurance, Journalism & News, Legal Services, Manufacturing, Media & Broadcasting, Medical Devices & Supplies, Motion Pictures & Video, Music, Pharmaceutical, Public Administration, Public Relations, Publishing, Real Estate, Retail, Service, Sports, Technology, Telecommunications, Tourism, Transportation, Travel, Utilities, Video Game, Web Services



BENEFIT PACKAGES OFFERED BY EMPLOYERS

Salaried Positions
Base Salary + Positions
Bonuses
Commission
Life Insurance
Paid Holidays
Paid Company Training
Management Training
Rapid Career Advancement


FREE FOR ALL JOB SEEKERS!

Be prepared to interview with hiring managers and recruiters from the top hiring companies in Pittsburgh. Dress to impress and bring plenty of resumes.



EMPLOYERS INTERESTED IN ATTENDING THIS EVENT?

We have received hundreds of job seeker registrations for this event contact us today to reserve a spot at this event for your company.');

--INSERT INTO eventtimes (time, event_id)
-- VALUES (CURRENT_DATE, 1);