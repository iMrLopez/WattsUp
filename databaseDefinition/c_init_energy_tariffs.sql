CREATE TABLE tariffs (
  id SERIAL PRIMARY KEY,
  company VARCHAR NOT NULL,
  period  VARCHAR NOT NULL,   -- e.g. 'Punta', 'Valle', 'Nocturno'
  rate    NUMERIC NOT NULL    -- ₡ por kWh
);

INSERT INTO tariffs (company, period, rate) VALUES
  ('CNFL','Punta',   156.96),
  ('CNFL','Valle',    64.35),
  ('CNFL','Nocturno', 26.94),
  ('ICE','Punta',    152.53),
  ('ICE','Valle',    104.80),
  ('ICE','Nocturno',  76.45);


CREATE VIEW public.company_view
 AS
SELECT DISTINCT company FROM public.tariffs;

ALTER TABLE public.company_view
    OWNER TO "user";

CREATE VIEW public.period_view
 AS
SELECT DISTINCT period FROM public.tariffs;

ALTER TABLE public.period_view
    OWNER TO "user";