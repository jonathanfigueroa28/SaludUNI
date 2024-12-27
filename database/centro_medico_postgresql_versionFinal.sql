--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2024-12-27 18:28:48

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 20468)
-- Name: citas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.citas (
    id integer NOT NULL,
    estudiante_id integer,
    especialidad_id integer,
    horarios_id integer,
    fecha timestamp without time zone NOT NULL,
    estado character varying(50) NOT NULL
);


ALTER TABLE public.citas OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 20467)
-- Name: citas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.citas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.citas_id_seq OWNER TO postgres;

--
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 222
-- Name: citas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.citas_id_seq OWNED BY public.citas.id;


--
-- TOC entry 221 (class 1259 OID 20456)
-- Name: doctores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctores (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    especialidad_id integer
);


ALTER TABLE public.doctores OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 20455)
-- Name: doctores_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.doctores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.doctores_id_seq OWNER TO postgres;

--
-- TOC entry 3420 (class 0 OID 0)
-- Dependencies: 220
-- Name: doctores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.doctores_id_seq OWNED BY public.doctores.id;


--
-- TOC entry 217 (class 1259 OID 20442)
-- Name: especialidades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.especialidades (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    url text
);


ALTER TABLE public.especialidades OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 20441)
-- Name: especialidades_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.especialidades_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.especialidades_id_seq OWNER TO postgres;

--
-- TOC entry 3421 (class 0 OID 0)
-- Dependencies: 216
-- Name: especialidades_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.especialidades_id_seq OWNED BY public.especialidades.id;


--
-- TOC entry 215 (class 1259 OID 20429)
-- Name: estudiantes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estudiantes (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    dni character varying(15) NOT NULL,
    correo character varying(100) NOT NULL,
    telefono character varying(15) NOT NULL,
    saldo numeric(10,2) NOT NULL,
    flg_autoseguro boolean NOT NULL,
    "contraseña" text NOT NULL
);


ALTER TABLE public.estudiantes OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 20428)
-- Name: estudiantes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estudiantes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.estudiantes_id_seq OWNER TO postgres;

--
-- TOC entry 3422 (class 0 OID 0)
-- Dependencies: 214
-- Name: estudiantes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estudiantes_id_seq OWNED BY public.estudiantes.id;


--
-- TOC entry 219 (class 1259 OID 20449)
-- Name: horarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.horarios (
    id integer NOT NULL,
    hora_inicio character varying(10) NOT NULL,
    hora_fin character varying(10) NOT NULL
);


ALTER TABLE public.horarios OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 20448)
-- Name: horarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.horarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.horarios_id_seq OWNER TO postgres;

--
-- TOC entry 3423 (class 0 OID 0)
-- Dependencies: 218
-- Name: horarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.horarios_id_seq OWNED BY public.horarios.id;


--
-- TOC entry 225 (class 1259 OID 20490)
-- Name: medicamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.medicamentos (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    stock integer NOT NULL,
    precio numeric(10,2) NOT NULL,
    imagen text,
    subcategoria character varying(50) NOT NULL
);


ALTER TABLE public.medicamentos OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 20489)
-- Name: medicamentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.medicamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.medicamentos_id_seq OWNER TO postgres;

--
-- TOC entry 3424 (class 0 OID 0)
-- Dependencies: 224
-- Name: medicamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.medicamentos_id_seq OWNED BY public.medicamentos.id;


--
-- TOC entry 229 (class 1259 OID 20518)
-- Name: receta_medicamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.receta_medicamentos (
    id integer NOT NULL,
    receta_id integer,
    medicamento_id integer,
    cantidad integer NOT NULL
);


ALTER TABLE public.receta_medicamentos OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 20517)
-- Name: receta_medicamentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.receta_medicamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.receta_medicamentos_id_seq OWNER TO postgres;

--
-- TOC entry 3425 (class 0 OID 0)
-- Dependencies: 228
-- Name: receta_medicamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.receta_medicamentos_id_seq OWNED BY public.receta_medicamentos.id;


--
-- TOC entry 227 (class 1259 OID 20499)
-- Name: recetas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recetas (
    id integer NOT NULL,
    cita_id integer,
    doctor_id integer,
    fecha timestamp without time zone NOT NULL,
    observaciones text
);


ALTER TABLE public.recetas OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 20498)
-- Name: recetas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recetas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recetas_id_seq OWNER TO postgres;

--
-- TOC entry 3426 (class 0 OID 0)
-- Dependencies: 226
-- Name: recetas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recetas_id_seq OWNED BY public.recetas.id;


--
-- TOC entry 231 (class 1259 OID 20535)
-- Name: solicitudes_reembolso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.solicitudes_reembolso (
    id integer NOT NULL,
    estudiante_id integer,
    medicamento_id integer,
    fecha_compra timestamp without time zone NOT NULL,
    monto_gastado numeric(10,2) NOT NULL,
    estado character varying(50) NOT NULL,
    descripcion text
);


ALTER TABLE public.solicitudes_reembolso OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 20534)
-- Name: solicitudes_reembolso_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.solicitudes_reembolso_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.solicitudes_reembolso_id_seq OWNER TO postgres;

--
-- TOC entry 3427 (class 0 OID 0)
-- Dependencies: 230
-- Name: solicitudes_reembolso_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.solicitudes_reembolso_id_seq OWNED BY public.solicitudes_reembolso.id;


--
-- TOC entry 3217 (class 2604 OID 20471)
-- Name: citas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citas ALTER COLUMN id SET DEFAULT nextval('public.citas_id_seq'::regclass);


--
-- TOC entry 3216 (class 2604 OID 20459)
-- Name: doctores id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctores ALTER COLUMN id SET DEFAULT nextval('public.doctores_id_seq'::regclass);


--
-- TOC entry 3214 (class 2604 OID 20445)
-- Name: especialidades id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.especialidades ALTER COLUMN id SET DEFAULT nextval('public.especialidades_id_seq'::regclass);


--
-- TOC entry 3213 (class 2604 OID 20432)
-- Name: estudiantes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiantes ALTER COLUMN id SET DEFAULT nextval('public.estudiantes_id_seq'::regclass);


--
-- TOC entry 3215 (class 2604 OID 20452)
-- Name: horarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horarios ALTER COLUMN id SET DEFAULT nextval('public.horarios_id_seq'::regclass);


--
-- TOC entry 3218 (class 2604 OID 20493)
-- Name: medicamentos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicamentos ALTER COLUMN id SET DEFAULT nextval('public.medicamentos_id_seq'::regclass);


--
-- TOC entry 3220 (class 2604 OID 20521)
-- Name: receta_medicamentos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_medicamentos ALTER COLUMN id SET DEFAULT nextval('public.receta_medicamentos_id_seq'::regclass);


--
-- TOC entry 3219 (class 2604 OID 20502)
-- Name: recetas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recetas ALTER COLUMN id SET DEFAULT nextval('public.recetas_id_seq'::regclass);


--
-- TOC entry 3221 (class 2604 OID 20538)
-- Name: solicitudes_reembolso id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes_reembolso ALTER COLUMN id SET DEFAULT nextval('public.solicitudes_reembolso_id_seq'::regclass);


--
-- TOC entry 3405 (class 0 OID 20468)
-- Dependencies: 223
-- Data for Name: citas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.citas (id, estudiante_id, especialidad_id, horarios_id, fecha, estado) FROM stdin;
6	2	1	1	2025-01-15 00:00:00	Pendiente
7	3	2	2	2025-01-16 00:00:00	Pendiente
8	4	3	3	2025-01-17 00:00:00	Pendiente
9	5	4	4	2025-01-18 00:00:00	Pendiente
10	6	5	5	2025-01-19 00:00:00	Pendiente
11	2	1	2	2024-12-10 00:00:00	Realizada
\.


--
-- TOC entry 3403 (class 0 OID 20456)
-- Dependencies: 221
-- Data for Name: doctores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctores (id, nombre, apellido, especialidad_id) FROM stdin;
1	Luis	Fernandez	1
2	Sofia	Martinez	2
3	Ricardo	Diaz	3
4	Elena	Rojas	4
5	Jorge	Alvarez	5
6	Jonathan	Figueroa	1
\.


--
-- TOC entry 3399 (class 0 OID 20442)
-- Dependencies: 217
-- Data for Name: especialidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.especialidades (id, nombre, descripcion, url) FROM stdin;
1	Consultorio General	La medicina general es la especialidad médica que se encarga de la atención integral del paciente y de la familia, abordando problemas de salud en cualquier etapa de la vida	https://magnetosur.com/wp-content/uploads/2021/11/Que-diferencias-existen-entre-la-medicina-general-y-la-medicina-interna.jpg'
2	Odontologia	La odontología es la especialidad médica que se encarga del estudio, diagnóstico, prevención y tratamiento de las enfermedades y trastornos de la cavidad oral y estructuras anexas.	https://www.teeth22.com/wp-content/uploads/2020/03/absceso-dental-800x399.png'
3	Psicologia	'La psicología es la ciencia que estudia la conducta y los procesos mentales de los individuos, así como sus relaciones con el entorno y la sociedad.	https://static.wikia.nocookie.net/psicologia/images/7/73/Que-es-psicologia.jpg/revision/latest?cb=20181002142724&path-prefix=es%27
4	Nutricion	El area de medicina fisica se encarga de la nutricion 	https://images.griddo.universitatcarlemany.com/la-importancia-de-la-nutricion-en-la-salud-1'
5	Dermatología	La dermatología es la especialidad médica que se encarga del estudio de la piel, sus estructuras, funciones y enfermedades, así como de la prevención y tratamiento de las mismas.	https://dermatologia.pe/wp-content/uploads/2023/12/Que-hay-que-estudiar-para-ser-dermatologo.jpg'
\.


--
-- TOC entry 3397 (class 0 OID 20429)
-- Dependencies: 215
-- Data for Name: estudiantes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estudiantes (id, nombre, apellido, dni, correo, telefono, saldo, flg_autoseguro, "contraseña") FROM stdin;
2	Juan	Perez	72345678	juan.perez@uni.pe	987654321	500.00	t	a82100a55b25cf3a14d11dbbf804e3db4903a39eddaccd738ee2c7b0b87e580e
3	Maria	Lopez	77654321	maria.lopez@uni.pe	987123456	600.00	t	afe6dbc71b97aecf9105e556e6859d91a60e987e733e36830dd724abeccf27aa
4	Carlos	Sanchez	75678912	carlos.sanchez@uni.pe	976543210	700.00	t	da114e93958eee73f1b2ec96f2c4df0d032cb565d735554ae3ee759b7f98983f
5	Ana	Gomez	78912345	ana.gomez@uni.pe	978654321	650.00	t	0492bcb60cb4e709c6ac1a1beb97a1e52cdcdcccb8dd17fb1922d0319eaa2812
6	Lucia	Ramirez	72165487	lucia.ramirez@uni.pe	986123456	550.00	t	b64bd7249a8a1311587e8c6ea83f45b9ae78fd3efa0c55d42950fea56ecf6b86
7	César	Pérez	12345678	cesar.perez@uni.pe	987654321	1000.00	t	$2b$10$ZYCOBf66m8LCzf6mhklPsO39VKSdTsdT24NOCQQTtXeLdMkB.6aim
\.


--
-- TOC entry 3401 (class 0 OID 20449)
-- Dependencies: 219
-- Data for Name: horarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.horarios (id, hora_inicio, hora_fin) FROM stdin;
1	8:00	9:00
2	9:00	10:00
3	10:00	11:00
4	11:00	12:00
5	12:00	13:00
6	13:00	14:00
7	14:00	15:00
\.


--
-- TOC entry 3407 (class 0 OID 20490)
-- Dependencies: 225
-- Data for Name: medicamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.medicamentos (id, nombre, stock, precio, imagen, subcategoria) FROM stdin;
1	Gaseovet 80mg Tableta Masticable	50	1.84	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/228089X.jpg	Antiflatulentos
2	Avarino 300mg + 60mg Cápsula Blanda	50	4.74	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/071169X.jpg	Antiflatulentos
3	Bismuplus 87.33mg/5ml Suspensión Oral	50	0.07	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/072458X.jpg	Antiflatulentos
4	Gaseovet 80mg/ml Suspensión Gotas	50	1.55	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/228074X.jpg	Antiflatulentos
5	Gasless Flash 40mg Tableta Masticable	50	0.66	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/013879X.jpg	Antiflatulentos
6	Gaseovet CB 180mg Cápsulas blandas	50	4.43	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/008991X.jpg	Antiflatulentos
7	Gaseovet 80mg/ml Suspensión Gotas Anís	50	1.14	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/012755X.jpg	Antiflatulentos
8	Flatuzym Advance 50mg + 13mg + 24mg + 5mg + 50mg Cápsula	50	0.79	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/961320X.jpg	Antiflatulentos
9	QG5 166.6 mg Tableta	50	1.07	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/038367X.jpg	Antiflatulentos
10	Gaseovet CB 240mg Cápsula Blanda	50	5.65	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/010593X.jpg	Antiflatulentos
11	Aero om Forte-Sabor Anis 125mg Comprimido masticable	50	1.24	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/066537X.jpg	Antiflatulentos
12	Flatuzym Advance Cápsula	50	0.96	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/065665X.jpg	Antiflatulentos
13	Gaseovet 80mg/ml Suspensión Gotas Fresa	50	1.21	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/422541X.jpg	Antiflatulentos
14	Aero-OM 100mg/ml Suspensión Gotas Sabor Fresa - Frasco 60 ML	50	0.94	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/228002X.jpg	Antiflatulentos
15	Aero-OM 100mg/ml Suspensión Gotas Sabor Fresa - Frasco 15 ML	50	1.13	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/228003X.jpg	Antiflatulentos
16	Gaseovet MS 800mg-60mg / 10 mL Suspensión Oral - Frasco 220 ML	50	0.12	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/431541X.jpg	Antiflatulentos
17	Gaseovet 40mg Tableta masticable	50	1.65	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/228075X.jpg	Antiflatulentos
18	Metoclopramida 10mg Tableta	50	0.10	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/007307X.jpg	Antiflatulentos
19	Simeticona 80mg/ml Suspensión Oral	50	0.75	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/071502X.jpg	Antiflatulentos
20	Aerogest 40mg Tableta Masticable	50	0.94	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/366030X.jpg	Antiflatulentos
21	Digestase 80mg Tableta Masticable	50	1.72	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/012136X.jpg	Antiflatulentos
22	Aero-OM 100mg/ml Suspensión Gotas Sabor Anís - Frasco 15 ML	50	1.13	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/228065X.jpg	Antiflatulentos
23	Aero-OM 100mg/ml Suspensión Gotas Sabor Anís - Frasco 60 ML	50	0.94	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/228066X.jpg	Antiflatulentos
24	Aerogest 80mg/ml Suspensión Oral Gotas Sabor a Anís	50	0.89	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/366031X.jpg	Antiflatulentos
25	Gasless Max 80 mg Tableta Masticable	50	1.17	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/010228X.jpg	Antiflatulentos
26	Lisolac 35 Mg/ Ml Pediátrica Gotas Orales - Frasco 20 ML	50	2.76	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/228044X.jpg	Antiflatulentos
27	Gaseovet MS 800mg+ 40mg Tableta masticable	50	1.71	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/016136X.jpg	Antiflatulentos
28	Gaseovet Compositum Cápsula Blanda	50	5.51	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/034975X.jpg	Antiflatulentos
29	Metoclopramida 10mg Tabletas	50	0.11	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/422219X.jpg	Antiflatulentos
30	Gaseovet® Menta 80mg/5ml Suspensión Oral	50	0.45	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/424194X.jpg	Antiflatulentos
31	Nat Fasty Plus 100mg Tabletas recubiertas	50	5.60	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/025754X.jpg	Antiflatulentos
32	Aerogest 80mg/ml Suspensión Oral Gotas Sabor a Fresa	50	0.89	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/034037X.jpg	Antiflatulentos
33	Aerox Plus suspensión oral en gotas	50	0.94	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/020887X.jpg	Antiflatulentos
34	Evigax Forte 250mg Cápsula blanda	50	3.20	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/023822X.jpg	Antiflatulentos
35	Aerogest 125mg Cápsulas Blandas	50	1.60	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/026921X.jpg	Antiflatulentos
36	Evigax 100mg/ml Emulsión oral	50	0.78	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/026293X.jpg	Antiflatulentos
37	Aerogest Plus 100mg/ml Suspensión Oral Gotas Sabor a Fresa	50	0.74	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/026042X.jpg	Antiflatulentos
38	Metoclopram GEF 10mg/2ml Solución Inyectable	50	3.28	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/008112X.jpg	Antiflatulentos
39	Simeticona 80 mg/mL Suspensión Oral	50	0.71	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/035707X.jpg	Antiflatulentos
40	Simeticona 40mgTableta masticable - Caja 30 UN	50	0.33	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/228093X.jpg	Antiflatulentos
41	Aero-Sim 1mg-80mg/ml Gotas Orales Suspensión	50	1.42	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/020837X.jpg	Antiflatulentos
42	Rilaten 10mg Tabletas recubiertas	50	1.75	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/026303X.jpg	Antiflatulentos
43	Aeronase 10mg Tableta	50	0.80	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/426563X.jpg	Antiflatulentos
44	Simeticona 80mg Tableta Masticable	50	0.33	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/228094X.jpg	Antiflatulentos
45	Digestase 80mg/mL Suspensión Oral	50	1.17	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/037856X.jpg	Antiflatulentos
46	Gaseoplus fresa 80mg/ml Gotas Suspensión oral	50	0.67	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/007788X.jpg	Antiflatulentos
47	Himcocid Suspensión oral	50	0.16	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/028972X.jpg	Antiflatulentos
48	Gastroral 800mg+40mg Tableta Masticable	50	0.86	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/018913X.jpg	Antiflatulentos
49	Aero-Sim Suspensión Oral Gotas, Sabor Fresa	50	1.08	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/020838X.jpg	Antiflatulentos
50	Rilaten 20mg/2ml Solución inyectable	50	24.70	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/430632X.jpg	Antiflatulentos
51	Simeticona 80 mg Tableta Masticable	50	0.37	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/036011X.jpg	Antiflatulentos
52	Aero-Sim Suspensión Oral Gotas, Sabor Anís	50	1.21	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/020839X.jpg	Antiflatulentos
53	Evigax 125 Mg Cápsulas Blandas - Caja 10 UN	50	2.00	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/011189X.jpg	Antiflatulentos
54	Gaap Ofteno Solución Oftálmica - Frasco 3 ML	50	46.67	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/422046X.jpg	Antiglaucomatosos
55	Lumigan RC 0.01% Solución Oftálmica	50	52.90	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/011831X.jpg	Antiglaucomatosos
56	Azarga 10 mg/ml- 5mg|ml Suspensión Oftálmica	50	36.52	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/431496X.jpg	Antiglaucomatosos
57	Combigan Solución oftálmica estéril	50	29.56	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/422331X.jpg	Antiglaucomatosos
58	Latof 0.005% Solución Oftálmica	50	82.40	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/009868X.jpg	Antiglaucomatosos
59	Citol Brim 0.2 % Solución oftálmica esteril	50	14.08	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/067189X.jpg	Antiglaucomatosos
60	Monoprost 50 ug/ml Solución oftálmica	50	5.15	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/068977X.jpg	Antiglaucomatosos
61	Travof T SP 0.04mg/ml+5mg/mL Solución Oftálmica	50	95.25	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/067747X.jpg	Antiglaucomatosos
62	Namax en ocuvial 0,2% Solución oftálmica	50	4.16	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/067512X.jpg	Antiglaucomatosos
63	Latof SP. 0.005% Solución oftálmica	50	108.10	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/067748X.jpg	Antiglaucomatosos
64	Latof-T SP. 0.005% + 0.5% Solución oftálmica	50	100.90	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/067749X.jpg	Antiglaucomatosos
65	Hoprix en Ocuvial 0.005% Solución Oftálmica	50	3.93	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/010671X.jpg	Antiglaucomatosos
66	Xalatan 50mcg/ml Gotas Oftálmicas	50	91.25	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/502034X.jpg	Antiglaucomatosos
67	Travatan 0.004% Solución Oftálmica	50	61.67	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/502045X.jpg	Antiglaucomatosos
68	Alphagan P 0.15% Solución Oftálmica - Frasco 5 ML	50	18.78	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/502058X.jpg	Antiglaucomatosos
69	Glaucotensil T Solución Oftálmica	50	17.12	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/502048X.jpg	Antiglaucomatosos
70	Ganfort 0.3-5 mg/ml Solución Oftálmico - Frasco 3 ML	50	57.83	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/427567X.jpg	Antiglaucomatosos
71	Louten 0.005% Emulsión Oftálmica	50	54.90	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/033975X.jpg	Antiglaucomatosos
72	Duotrav solución oftálmica	50	111.40	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/426432X.jpg	Antiglaucomatosos
73	Brimodual-T SP Solución oftálmica	50	32.94	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/031663X.jpg	Antiglaucomatosos
74	Brimodual SP 0.15% Solución Oftálmica	50	26.00	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/028163X.jpg	Antiglaucomatosos
75	Glamax En Ocuvial Solución oftálmica	50	3.16	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/035117X.jpg	Antiglaucomatosos
76	Vistavit-L 0.005 % Solución Oftálmica	50	23.67	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/009605X.jpg	Antiglaucomatosos
77	Xenda Solución Oftálmica	50	39.63	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/030479X.jpg	Antiglaucomatosos
78	Trusomida 2% Solución Oftálmica - Frasco 5 ML	50	10.80	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/424685X.jpg	Antiglaucomatosos
79	Acetazolamida ACF 250mg Tableta	50	0.94	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/310075X.jpg	Antiglaucomatosos
80	Cosomidol Solución Oftálmica	50	10.12	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/426471X.jpg	Antiglaucomatosos
81	Unidorzo 2% Solución Oftálmica - Frasco 5 ML	50	15.50	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/502067X.jpg	Antiglaucomatosos
82	Brimopress T Solución Oftálmica - Frasco 5 ML	50	17.00	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/012187X.jpg	Antiglaucomatosos
83	Unitrav-t Solución Oftálmica	50	50.13	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/028164X.jpg	Antiglaucomatosos
84	Tidorzak 20 Mg-5Mg/Ml Solución Oftálmica - Frasco 5 ML	50	20.14	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/502057X.jpg	Antiglaucomatosos
85	Xalacom 50mcg-5mg Solución Oftálmica	50	109.50	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/502050X.jpg	Antiglaucomatosos
86	Unitrav 0.004% Solución Oftálmica	50	39.63	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/011873X.jpg	Antiglaucomatosos
87	Piodor-T SP Solución Oftálmica	50	24.28	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/034636X.jpg	Antiglaucomatosos
88	Agglad Ofteno 0.2% Solución Oftálmica	50	18.32	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/422202X.jpg	Antiglaucomatosos
89	Timolol 0.5 % Solución Oftálmica	50	3.06	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/502012X.jpg	Antiglaucomatosos
90	Vistaclof 0.005% Solución Oftálmica	50	34.67	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/012006X.jpg	Antiglaucomatosos
91	Brinzolan – T 1% - 0.5% Suspensión Oftálmica	50	27.88	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/024245X.jpg	Antiglaucomatosos
92	Timox 0.5% Solución Oftálmica - Frasco 5 ML	50	5.46	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/502038X.jpg	Antiglaucomatosos
93	Zebesten 0.09% Solución Oftálmica	50	17.96	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/035750X.jpg	Antiglaucomatosos
94	Latof-T Solución Oftálmica	50	100.00	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/009870X.jpg	Antiglaucomatosos
95	Acetak 250 mg Tabletas	50	2.68	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/310079X.jpg	Antiglaucomatosos
96	Locarpin F 2% Solución Oftálmica - Frasco 10 ML	50	6.15	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/502025X.jpg	Antiglaucomatosos
97	Mersolat-D 2% Solución Oftálmica	50	9.94	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/008772X.jpg	Antiglaucomatosos
98	Acetazolamida 250 Mg Tableta	50	0.80	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/310074X.jpg	Antiglaucomatosos
99	Optimol 0.5% Solución Oftálmica - Frasco 5 ML	50	8.90	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/502026X.jpg	Antiglaucomatosos
100	Latoprost Rt 0.005% Solución Oftalmica	50	38.25	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/035906X.jpg	Antiglaucomatosos
101	Tiof Plus Solución Oftálmica - Frasco 6 ML	50	17.83	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/424723X.jpg	Antiglaucomatosos
102	Glaucotensil D 2% Solución Oftálmica	50	12.40	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/502049X.jpg	Antiglaucomatosos
103	Unidorzo - T Solución Oftálmica - Frasco 5 ML	50	19.88	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/502068X.jpg	Antiglaucomatosos
104	Dorsof 2% Solución Oftálmica	50	16.16	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/425897X.jpg	Antiglaucomatosos
105	Brinolar 1% Suspensión Oftálmica	50	18.58	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/033172X.jpg	Antiglaucomatosos
106	Glaucolip 5mg/ml Solucion oftálmica	50	4.36	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/012473X.jpg	Antiglaucomatosos
107	Dorlip 2% Solucion Oftálmica	50	8.90	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/010294X.jpg	Antiglaucomatosos
108	Imot Ofteno 0.5% Solución oftálmica	50	4.39	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/422223X.jpg	Antiglaucomatosos
109	Travof SP 0.004% Solución Oftálmica	50	67.55	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/035455X.jpg	Antiglaucomatosos
110	Staturic 80 80mg Tableta recubierta	50	4.40	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/036578X.jpg	Antigotosos y Uricasuricos
111	Staturic 40 40mg Tableta recubierta	50	2.34	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/036577X.jpg	Antigotosos y Uricasuricos
112	Zyloric 300 Mg Tableta	50	3.58	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/268024X.jpg	Antigotosos y Uricasuricos
113	Zyloric 100mg Tableta	50	1.60	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/268023X.jpg	Antigotosos y Uricasuricos
114	Alopurinol IQ 100mg Tableta	50	0.32	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/031470X.jpg	Antigotosos y Uricasuricos
115	Colchicina 0.5 mg Tableta	50	0.48	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/268155X.jpg	Antigotosos y Uricasuricos
116	Alopurinol IQ 300mg Tableta	50	0.47	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/031478X.jpg	Antigotosos y Uricasuricos
117	Alopurinol 300 Mg Tableta - Caja 30 UN	50	0.47	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/268154X.jpg	Antigotosos y Uricasuricos
118	Colchicina 0.5mg Tableta	50	0.68	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/015829X.jpg	Antigotosos y Uricasuricos
119	Goturic 80mg Tableta recubierta	50	4.68	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/037959X.jpg	Antigotosos y Uricasuricos
120	Alopurinol 100 Mg Tableta - Caja 30 UN	50	0.33	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/268153X.jpg	Antigotosos y Uricasuricos
121	Colchicina 0.5mg Tableta	50	0.62	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/035634X.jpg	Antigotosos y Uricasuricos
122	Tussis Om Expectorante 2mg/ml + 200mg/mL Jarabe	50	0.22	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/300095X.jpg	Tos y Resfrío
123	Antitusin Expectorante (Dextrometorfano 10 mg+Guaifenesina 100mg/5mL) Solución oral	50	0.14	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/026083X.jpg	Tos y Resfrío
124	Dexabron NF Jarabe	50	0.12	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/303044X.jpg	Tos y Resfrío
125	Pulmol Compuesto Jarabe - Frasco 120 ML	50	0.17	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/012924X.jpg	Tos y Resfrío
126	Neo Silenai Expectorante Jarabe	50	0.36	https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/020273X.jpg	Tos y Resfrío
\.


--
-- TOC entry 3411 (class 0 OID 20518)
-- Dependencies: 229
-- Data for Name: receta_medicamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.receta_medicamentos (id, receta_id, medicamento_id, cantidad) FROM stdin;
1	1	12	2
2	1	15	2
\.


--
-- TOC entry 3409 (class 0 OID 20499)
-- Dependencies: 227
-- Data for Name: recetas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recetas (id, cita_id, doctor_id, fecha, observaciones) FROM stdin;
1	11	1	2024-12-10 00:00:00	Tomar cada 8h las dosis
\.


--
-- TOC entry 3413 (class 0 OID 20535)
-- Dependencies: 231
-- Data for Name: solicitudes_reembolso; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.solicitudes_reembolso (id, estudiante_id, medicamento_id, fecha_compra, monto_gastado, estado, descripcion) FROM stdin;
6	2	1	2024-01-01 09:00:00	18.40	Aprobado	Reembolso por tratamiento digestivo
7	3	2	2024-01-02 10:30:00	23.70	Pendiente	Compra de cápsulas para gases
8	4	3	2024-01-03 11:15:00	2.10	Rechazado	Error en la compra reportada
9	5	4	2024-01-04 12:45:00	3.10	Aprobado	Gotas para molestias estomacales
10	6	5	2024-01-05 13:30:00	4.62	Aprobado	Compra de tabletas masticables
\.


--
-- TOC entry 3428 (class 0 OID 0)
-- Dependencies: 222
-- Name: citas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.citas_id_seq', 11, true);


--
-- TOC entry 3429 (class 0 OID 0)
-- Dependencies: 220
-- Name: doctores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.doctores_id_seq', 6, true);


--
-- TOC entry 3430 (class 0 OID 0)
-- Dependencies: 216
-- Name: especialidades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.especialidades_id_seq', 5, true);


--
-- TOC entry 3431 (class 0 OID 0)
-- Dependencies: 214
-- Name: estudiantes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.estudiantes_id_seq', 7, true);


--
-- TOC entry 3432 (class 0 OID 0)
-- Dependencies: 218
-- Name: horarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.horarios_id_seq', 7, true);


--
-- TOC entry 3433 (class 0 OID 0)
-- Dependencies: 224
-- Name: medicamentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.medicamentos_id_seq', 126, true);


--
-- TOC entry 3434 (class 0 OID 0)
-- Dependencies: 228
-- Name: receta_medicamentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.receta_medicamentos_id_seq', 2, true);


--
-- TOC entry 3435 (class 0 OID 0)
-- Dependencies: 226
-- Name: recetas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recetas_id_seq', 1, true);


--
-- TOC entry 3436 (class 0 OID 0)
-- Dependencies: 230
-- Name: solicitudes_reembolso_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.solicitudes_reembolso_id_seq', 10, true);


--
-- TOC entry 3235 (class 2606 OID 20473)
-- Name: citas citas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_pkey PRIMARY KEY (id);


--
-- TOC entry 3233 (class 2606 OID 20461)
-- Name: doctores doctores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctores
    ADD CONSTRAINT doctores_pkey PRIMARY KEY (id);


--
-- TOC entry 3229 (class 2606 OID 20447)
-- Name: especialidades especialidades_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.especialidades
    ADD CONSTRAINT especialidades_pkey PRIMARY KEY (id);


--
-- TOC entry 3223 (class 2606 OID 20440)
-- Name: estudiantes estudiantes_correo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_correo_key UNIQUE (correo);


--
-- TOC entry 3225 (class 2606 OID 20438)
-- Name: estudiantes estudiantes_dni_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_dni_key UNIQUE (dni);


--
-- TOC entry 3227 (class 2606 OID 20436)
-- Name: estudiantes estudiantes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_pkey PRIMARY KEY (id);


--
-- TOC entry 3231 (class 2606 OID 20454)
-- Name: horarios horarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horarios
    ADD CONSTRAINT horarios_pkey PRIMARY KEY (id);


--
-- TOC entry 3237 (class 2606 OID 20497)
-- Name: medicamentos medicamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicamentos
    ADD CONSTRAINT medicamentos_pkey PRIMARY KEY (id);


--
-- TOC entry 3241 (class 2606 OID 20523)
-- Name: receta_medicamentos receta_medicamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_medicamentos
    ADD CONSTRAINT receta_medicamentos_pkey PRIMARY KEY (id);


--
-- TOC entry 3239 (class 2606 OID 20506)
-- Name: recetas recetas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recetas
    ADD CONSTRAINT recetas_pkey PRIMARY KEY (id);


--
-- TOC entry 3243 (class 2606 OID 20542)
-- Name: solicitudes_reembolso solicitudes_reembolso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes_reembolso
    ADD CONSTRAINT solicitudes_reembolso_pkey PRIMARY KEY (id);


--
-- TOC entry 3245 (class 2606 OID 20479)
-- Name: citas citas_especialidad_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_especialidad_id_fkey FOREIGN KEY (especialidad_id) REFERENCES public.especialidades(id) ON DELETE CASCADE;


--
-- TOC entry 3246 (class 2606 OID 20474)
-- Name: citas citas_estudiante_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_estudiante_id_fkey FOREIGN KEY (estudiante_id) REFERENCES public.estudiantes(id) ON DELETE CASCADE;


--
-- TOC entry 3247 (class 2606 OID 20484)
-- Name: citas citas_horarios_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_horarios_id_fkey FOREIGN KEY (horarios_id) REFERENCES public.horarios(id) ON DELETE CASCADE;


--
-- TOC entry 3244 (class 2606 OID 20462)
-- Name: doctores doctores_especialidad_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctores
    ADD CONSTRAINT doctores_especialidad_id_fkey FOREIGN KEY (especialidad_id) REFERENCES public.especialidades(id) ON DELETE CASCADE;


--
-- TOC entry 3250 (class 2606 OID 20529)
-- Name: receta_medicamentos receta_medicamentos_medicamento_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_medicamentos
    ADD CONSTRAINT receta_medicamentos_medicamento_id_fkey FOREIGN KEY (medicamento_id) REFERENCES public.medicamentos(id) ON DELETE CASCADE;


--
-- TOC entry 3251 (class 2606 OID 20524)
-- Name: receta_medicamentos receta_medicamentos_receta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_medicamentos
    ADD CONSTRAINT receta_medicamentos_receta_id_fkey FOREIGN KEY (receta_id) REFERENCES public.recetas(id) ON DELETE CASCADE;


--
-- TOC entry 3248 (class 2606 OID 20507)
-- Name: recetas recetas_cita_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recetas
    ADD CONSTRAINT recetas_cita_id_fkey FOREIGN KEY (cita_id) REFERENCES public.citas(id) ON DELETE CASCADE;


--
-- TOC entry 3249 (class 2606 OID 20512)
-- Name: recetas recetas_doctor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recetas
    ADD CONSTRAINT recetas_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctores(id) ON DELETE CASCADE;


--
-- TOC entry 3252 (class 2606 OID 20543)
-- Name: solicitudes_reembolso solicitudes_reembolso_estudiante_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes_reembolso
    ADD CONSTRAINT solicitudes_reembolso_estudiante_id_fkey FOREIGN KEY (estudiante_id) REFERENCES public.estudiantes(id) ON DELETE CASCADE;


--
-- TOC entry 3253 (class 2606 OID 20548)
-- Name: solicitudes_reembolso solicitudes_reembolso_medicamento_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitudes_reembolso
    ADD CONSTRAINT solicitudes_reembolso_medicamento_id_fkey FOREIGN KEY (medicamento_id) REFERENCES public.medicamentos(id) ON DELETE CASCADE;


-- Completed on 2024-12-27 18:28:48

--
-- PostgreSQL database dump complete
--

