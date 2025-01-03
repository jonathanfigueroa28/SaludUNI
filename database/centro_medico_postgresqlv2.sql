PGDMP                         |            centro_medico_db2    15.3    15.3 O    X           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            Y           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            Z           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            [           1262    20427    centro_medico_db2    DATABASE     �   CREATE DATABASE centro_medico_db2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Peru.1252';
 !   DROP DATABASE centro_medico_db2;
                postgres    false            �            1259    20468    citas    TABLE     �   CREATE TABLE public.citas (
    id integer NOT NULL,
    estudiante_id integer,
    especialidad_id integer,
    horarios_id integer,
    fecha timestamp without time zone NOT NULL,
    estado character varying(50) NOT NULL
);
    DROP TABLE public.citas;
       public         heap    postgres    false            �            1259    20467    citas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.citas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.citas_id_seq;
       public          postgres    false    223            \           0    0    citas_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.citas_id_seq OWNED BY public.citas.id;
          public          postgres    false    222            �            1259    20456    doctores    TABLE     �   CREATE TABLE public.doctores (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    especialidad_id integer
);
    DROP TABLE public.doctores;
       public         heap    postgres    false            �            1259    20455    doctores_id_seq    SEQUENCE     �   CREATE SEQUENCE public.doctores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.doctores_id_seq;
       public          postgres    false    221            ]           0    0    doctores_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.doctores_id_seq OWNED BY public.doctores.id;
          public          postgres    false    220            �            1259    20442    especialidades    TABLE     l   CREATE TABLE public.especialidades (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL
);
 "   DROP TABLE public.especialidades;
       public         heap    postgres    false            �            1259    20441    especialidades_id_seq    SEQUENCE     �   CREATE SEQUENCE public.especialidades_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.especialidades_id_seq;
       public          postgres    false    217            ^           0    0    especialidades_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.especialidades_id_seq OWNED BY public.especialidades.id;
          public          postgres    false    216            �            1259    20429    estudiantes    TABLE     �  CREATE TABLE public.estudiantes (
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
    DROP TABLE public.estudiantes;
       public         heap    postgres    false            �            1259    20428    estudiantes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.estudiantes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.estudiantes_id_seq;
       public          postgres    false    215            _           0    0    estudiantes_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.estudiantes_id_seq OWNED BY public.estudiantes.id;
          public          postgres    false    214            �            1259    20449    horarios    TABLE     �   CREATE TABLE public.horarios (
    id integer NOT NULL,
    hora_inicio character varying(10) NOT NULL,
    hora_fin character varying(10) NOT NULL
);
    DROP TABLE public.horarios;
       public         heap    postgres    false            �            1259    20448    horarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.horarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.horarios_id_seq;
       public          postgres    false    219            `           0    0    horarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.horarios_id_seq OWNED BY public.horarios.id;
          public          postgres    false    218            �            1259    20490    medicamentos    TABLE     �   CREATE TABLE public.medicamentos (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    stock integer NOT NULL,
    precio numeric(10,2) NOT NULL,
    imagen text,
    subcategoria character varying(50) NOT NULL
);
     DROP TABLE public.medicamentos;
       public         heap    postgres    false            �            1259    20489    medicamentos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.medicamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.medicamentos_id_seq;
       public          postgres    false    225            a           0    0    medicamentos_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.medicamentos_id_seq OWNED BY public.medicamentos.id;
          public          postgres    false    224            �            1259    20518    receta_medicamentos    TABLE     �   CREATE TABLE public.receta_medicamentos (
    id integer NOT NULL,
    receta_id integer,
    medicamento_id integer,
    cantidad integer NOT NULL
);
 '   DROP TABLE public.receta_medicamentos;
       public         heap    postgres    false            �            1259    20517    receta_medicamentos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.receta_medicamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.receta_medicamentos_id_seq;
       public          postgres    false    229            b           0    0    receta_medicamentos_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.receta_medicamentos_id_seq OWNED BY public.receta_medicamentos.id;
          public          postgres    false    228            �            1259    20499    recetas    TABLE     �   CREATE TABLE public.recetas (
    id integer NOT NULL,
    cita_id integer,
    doctor_id integer,
    fecha timestamp without time zone NOT NULL,
    observaciones text
);
    DROP TABLE public.recetas;
       public         heap    postgres    false            �            1259    20498    recetas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.recetas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.recetas_id_seq;
       public          postgres    false    227            c           0    0    recetas_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.recetas_id_seq OWNED BY public.recetas.id;
          public          postgres    false    226            �            1259    20535    solicitudes_reembolso    TABLE        CREATE TABLE public.solicitudes_reembolso (
    id integer NOT NULL,
    estudiante_id integer,
    medicamento_id integer,
    fecha_compra timestamp without time zone NOT NULL,
    monto_gastado numeric(10,2) NOT NULL,
    estado character varying(50) NOT NULL,
    descripcion text
);
 )   DROP TABLE public.solicitudes_reembolso;
       public         heap    postgres    false            �            1259    20534    solicitudes_reembolso_id_seq    SEQUENCE     �   CREATE SEQUENCE public.solicitudes_reembolso_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.solicitudes_reembolso_id_seq;
       public          postgres    false    231            d           0    0    solicitudes_reembolso_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.solicitudes_reembolso_id_seq OWNED BY public.solicitudes_reembolso.id;
          public          postgres    false    230            �           2604    20471    citas id    DEFAULT     d   ALTER TABLE ONLY public.citas ALTER COLUMN id SET DEFAULT nextval('public.citas_id_seq'::regclass);
 7   ALTER TABLE public.citas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            �           2604    20459    doctores id    DEFAULT     j   ALTER TABLE ONLY public.doctores ALTER COLUMN id SET DEFAULT nextval('public.doctores_id_seq'::regclass);
 :   ALTER TABLE public.doctores ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            �           2604    20445    especialidades id    DEFAULT     v   ALTER TABLE ONLY public.especialidades ALTER COLUMN id SET DEFAULT nextval('public.especialidades_id_seq'::regclass);
 @   ALTER TABLE public.especialidades ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            �           2604    20432    estudiantes id    DEFAULT     p   ALTER TABLE ONLY public.estudiantes ALTER COLUMN id SET DEFAULT nextval('public.estudiantes_id_seq'::regclass);
 =   ALTER TABLE public.estudiantes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            �           2604    20452    horarios id    DEFAULT     j   ALTER TABLE ONLY public.horarios ALTER COLUMN id SET DEFAULT nextval('public.horarios_id_seq'::regclass);
 :   ALTER TABLE public.horarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            �           2604    20493    medicamentos id    DEFAULT     r   ALTER TABLE ONLY public.medicamentos ALTER COLUMN id SET DEFAULT nextval('public.medicamentos_id_seq'::regclass);
 >   ALTER TABLE public.medicamentos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224    225            �           2604    20521    receta_medicamentos id    DEFAULT     �   ALTER TABLE ONLY public.receta_medicamentos ALTER COLUMN id SET DEFAULT nextval('public.receta_medicamentos_id_seq'::regclass);
 E   ALTER TABLE public.receta_medicamentos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    229    229            �           2604    20502 
   recetas id    DEFAULT     h   ALTER TABLE ONLY public.recetas ALTER COLUMN id SET DEFAULT nextval('public.recetas_id_seq'::regclass);
 9   ALTER TABLE public.recetas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    227    227            �           2604    20538    solicitudes_reembolso id    DEFAULT     �   ALTER TABLE ONLY public.solicitudes_reembolso ALTER COLUMN id SET DEFAULT nextval('public.solicitudes_reembolso_id_seq'::regclass);
 G   ALTER TABLE public.solicitudes_reembolso ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    230    231            M          0    20468    citas 
   TABLE DATA           _   COPY public.citas (id, estudiante_id, especialidad_id, horarios_id, fecha, estado) FROM stdin;
    public          postgres    false    223   �_       K          0    20456    doctores 
   TABLE DATA           I   COPY public.doctores (id, nombre, apellido, especialidad_id) FROM stdin;
    public          postgres    false    221    `       G          0    20442    especialidades 
   TABLE DATA           4   COPY public.especialidades (id, nombre) FROM stdin;
    public          postgres    false    217   ~`       E          0    20429    estudiantes 
   TABLE DATA           x   COPY public.estudiantes (id, nombre, apellido, dni, correo, telefono, saldo, flg_autoseguro, "contraseña") FROM stdin;
    public          postgres    false    215   �`       I          0    20449    horarios 
   TABLE DATA           =   COPY public.horarios (id, hora_inicio, hora_fin) FROM stdin;
    public          postgres    false    219   �b       O          0    20490    medicamentos 
   TABLE DATA           W   COPY public.medicamentos (id, nombre, stock, precio, imagen, subcategoria) FROM stdin;
    public          postgres    false    225   �b       S          0    20518    receta_medicamentos 
   TABLE DATA           V   COPY public.receta_medicamentos (id, receta_id, medicamento_id, cantidad) FROM stdin;
    public          postgres    false    229   �n       Q          0    20499    recetas 
   TABLE DATA           O   COPY public.recetas (id, cita_id, doctor_id, fecha, observaciones) FROM stdin;
    public          postgres    false    227   �n       U          0    20535    solicitudes_reembolso 
   TABLE DATA           �   COPY public.solicitudes_reembolso (id, estudiante_id, medicamento_id, fecha_compra, monto_gastado, estado, descripcion) FROM stdin;
    public          postgres    false    231   o       e           0    0    citas_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.citas_id_seq', 11, true);
          public          postgres    false    222            f           0    0    doctores_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.doctores_id_seq', 6, true);
          public          postgres    false    220            g           0    0    especialidades_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.especialidades_id_seq', 5, true);
          public          postgres    false    216            h           0    0    estudiantes_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.estudiantes_id_seq', 6, true);
          public          postgres    false    214            i           0    0    horarios_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.horarios_id_seq', 7, true);
          public          postgres    false    218            j           0    0    medicamentos_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.medicamentos_id_seq', 126, true);
          public          postgres    false    224            k           0    0    receta_medicamentos_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.receta_medicamentos_id_seq', 2, true);
          public          postgres    false    228            l           0    0    recetas_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.recetas_id_seq', 1, true);
          public          postgres    false    226            m           0    0    solicitudes_reembolso_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.solicitudes_reembolso_id_seq', 10, true);
          public          postgres    false    230            �           2606    20473    citas citas_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.citas DROP CONSTRAINT citas_pkey;
       public            postgres    false    223            �           2606    20461    doctores doctores_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.doctores
    ADD CONSTRAINT doctores_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.doctores DROP CONSTRAINT doctores_pkey;
       public            postgres    false    221            �           2606    20447 "   especialidades especialidades_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.especialidades
    ADD CONSTRAINT especialidades_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.especialidades DROP CONSTRAINT especialidades_pkey;
       public            postgres    false    217            �           2606    20440 "   estudiantes estudiantes_correo_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_correo_key UNIQUE (correo);
 L   ALTER TABLE ONLY public.estudiantes DROP CONSTRAINT estudiantes_correo_key;
       public            postgres    false    215            �           2606    20438    estudiantes estudiantes_dni_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_dni_key UNIQUE (dni);
 I   ALTER TABLE ONLY public.estudiantes DROP CONSTRAINT estudiantes_dni_key;
       public            postgres    false    215            �           2606    20436    estudiantes estudiantes_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.estudiantes
    ADD CONSTRAINT estudiantes_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.estudiantes DROP CONSTRAINT estudiantes_pkey;
       public            postgres    false    215            �           2606    20454    horarios horarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.horarios
    ADD CONSTRAINT horarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.horarios DROP CONSTRAINT horarios_pkey;
       public            postgres    false    219            �           2606    20497    medicamentos medicamentos_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.medicamentos
    ADD CONSTRAINT medicamentos_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.medicamentos DROP CONSTRAINT medicamentos_pkey;
       public            postgres    false    225            �           2606    20523 ,   receta_medicamentos receta_medicamentos_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.receta_medicamentos
    ADD CONSTRAINT receta_medicamentos_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.receta_medicamentos DROP CONSTRAINT receta_medicamentos_pkey;
       public            postgres    false    229            �           2606    20506    recetas recetas_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.recetas
    ADD CONSTRAINT recetas_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.recetas DROP CONSTRAINT recetas_pkey;
       public            postgres    false    227            �           2606    20542 0   solicitudes_reembolso solicitudes_reembolso_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.solicitudes_reembolso
    ADD CONSTRAINT solicitudes_reembolso_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.solicitudes_reembolso DROP CONSTRAINT solicitudes_reembolso_pkey;
       public            postgres    false    231            �           2606    20479     citas citas_especialidad_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_especialidad_id_fkey FOREIGN KEY (especialidad_id) REFERENCES public.especialidades(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.citas DROP CONSTRAINT citas_especialidad_id_fkey;
       public          postgres    false    223    217    3229            �           2606    20474    citas citas_estudiante_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_estudiante_id_fkey FOREIGN KEY (estudiante_id) REFERENCES public.estudiantes(id) ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.citas DROP CONSTRAINT citas_estudiante_id_fkey;
       public          postgres    false    215    3227    223            �           2606    20484    citas citas_horarios_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.citas
    ADD CONSTRAINT citas_horarios_id_fkey FOREIGN KEY (horarios_id) REFERENCES public.horarios(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.citas DROP CONSTRAINT citas_horarios_id_fkey;
       public          postgres    false    223    3231    219            �           2606    20462 &   doctores doctores_especialidad_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.doctores
    ADD CONSTRAINT doctores_especialidad_id_fkey FOREIGN KEY (especialidad_id) REFERENCES public.especialidades(id) ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.doctores DROP CONSTRAINT doctores_especialidad_id_fkey;
       public          postgres    false    221    3229    217            �           2606    20529 ;   receta_medicamentos receta_medicamentos_medicamento_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.receta_medicamentos
    ADD CONSTRAINT receta_medicamentos_medicamento_id_fkey FOREIGN KEY (medicamento_id) REFERENCES public.medicamentos(id) ON DELETE CASCADE;
 e   ALTER TABLE ONLY public.receta_medicamentos DROP CONSTRAINT receta_medicamentos_medicamento_id_fkey;
       public          postgres    false    3237    225    229            �           2606    20524 6   receta_medicamentos receta_medicamentos_receta_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.receta_medicamentos
    ADD CONSTRAINT receta_medicamentos_receta_id_fkey FOREIGN KEY (receta_id) REFERENCES public.recetas(id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.receta_medicamentos DROP CONSTRAINT receta_medicamentos_receta_id_fkey;
       public          postgres    false    229    227    3239            �           2606    20507    recetas recetas_cita_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.recetas
    ADD CONSTRAINT recetas_cita_id_fkey FOREIGN KEY (cita_id) REFERENCES public.citas(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.recetas DROP CONSTRAINT recetas_cita_id_fkey;
       public          postgres    false    223    3235    227            �           2606    20512    recetas recetas_doctor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.recetas
    ADD CONSTRAINT recetas_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctores(id) ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.recetas DROP CONSTRAINT recetas_doctor_id_fkey;
       public          postgres    false    3233    227    221            �           2606    20543 >   solicitudes_reembolso solicitudes_reembolso_estudiante_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.solicitudes_reembolso
    ADD CONSTRAINT solicitudes_reembolso_estudiante_id_fkey FOREIGN KEY (estudiante_id) REFERENCES public.estudiantes(id) ON DELETE CASCADE;
 h   ALTER TABLE ONLY public.solicitudes_reembolso DROP CONSTRAINT solicitudes_reembolso_estudiante_id_fkey;
       public          postgres    false    215    231    3227            �           2606    20548 ?   solicitudes_reembolso solicitudes_reembolso_medicamento_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.solicitudes_reembolso
    ADD CONSTRAINT solicitudes_reembolso_medicamento_id_fkey FOREIGN KEY (medicamento_id) REFERENCES public.medicamentos(id) ON DELETE CASCADE;
 i   ALTER TABLE ONLY public.solicitudes_reembolso DROP CONSTRAINT solicitudes_reembolso_medicamento_id_fkey;
       public          postgres    false    231    225    3237            M   n   x�m�9�0D��>������&RRDBTT�+��h�|�O �:!���q���~8�SZ}ފxub*��
A�7���Q]0��$���6d��{Yp,���Y�ݾ\2^3"��(2~      K   n   x�̽
�`����b����At�����)	��C��o}�}+�6[�k:}���x�ۈ;s5/TK��^�1p6�h��eV'��rA+����4��%��XĹ~��m�4���<���!�      G   d   x�3�t��+.�)�/��WpO�K-J��2��O��+���O�L�2�(�L�rL8�RRR|SS2�3��2�҉\��A��I�9�%�ə�7�q��qqq mH �      E   �  x�M��nT1E�y�d'q�@,�P�l�؎C�:3Ք���$�i�����ӹ�&�/9�o~���Ɣ��~O�?-��r|�����)b � �	�"�F��sG쪣A��53$I콋Y���G�
ڪS�R�*�	w��%��ώ/�By�/]��r���D�K#�R��o^S�TZ��k̢n6b�r�$���s�!G�_Vu����W���B}��1;'��m�jt�2��>�C��Th�'�,��W�Z7nil>%|>�~�g� G�-�nn�i
�̐9�i��؊
��5�)Z��L[�X�"�8� �Hl��.6��.�����t���W����O�	�d]��4��Hs�f�e�ʤ,^��ɇ���`���Q����m�?`z�N      I   =   x�%Ƿ�0�_��A#�Z�$��v��;�&���jA���[��^6ݰ`�}OD9�3      O   �  x��[�r��>�O1��J�+h��M�-�nI��Ҧ��r�(H�� P%�r�;�	����7��$O��%$���{1-����?_�3�iі���XƧ�첸�ˮ`�E�U��Cbx"�L'�n�����z�� &���ӯާ��/�o?��Y�V��l獿^L:(eƳ�����mr4몛��u9�|�L&GwES�<S<�~�lx9~�m�.ꂽ���u�����s'�E̫�E�N�zѲ̥JMoʹf�v^����?3��)� ���Hm�� ����k�O}W���!;����M0^�m�N�}�4|�ZK{x�2�x����l5�-���o��kE��������gG��ߗ����B����>}����b6)��@��"u|1������r��
%�vLy��a��Բ!zP@eʺ��%��H����
�nr��Q�x���7]ypQ\��^�L���c?�7մ��l�Ɔ����9Cn&�8�9�
���Q�O!�4e��)H��F#��q��	�b���x-ډ�~��ϖΡ�'.`�L�%0�{E`Xꮐ�����yH��l��Ȥ|)G
�x0W�u�R�+�Xѱ�aɜ%�e���Me[�3�,�̉��)�n�\T���ϊ�U4�G�1'����,�_�v7qb�(k�B����*X����j�@���q�y�V�G�'F�R���1�f1��!U�<�+�ӌ�7b� l!z^�&�#�Q�>A���j}]L����=d�5{[^W�u�^:#��\������zr��F��t���|7�:ZW���Օ�h3B����t�:3D�J���|�/3R�ň�P8H�����ÛKJ�'CM�t-�ȑP"y]t�����j$���gM9Y\Ue�tdb_����b�x�d�����BV=���iW�� ���[��D��gf_'��[ �8009ʖ3k��RI��$��±�O���ø,�`s�𴲏O���^M�����ɨ�%6�)7<�P_���ݑ�\c�IMv��$�ӡ�|��DX��>��!+����5�ɂs6���T�6����Mj�GA�<.~-����=EW]X��~�? 8L�<�HY��◾X4Q�M`4�������.��i@Z������Y��OF�-���A�>�����Q�{���t��\f���sx\!���8�.�z�r�JD˰U�K���?�����<�Y���Q"vM쾽L�9�f�-r�,���7�oW4�M&�MA�#���}�y���Q�:u�:T�*$���^��R�\ 
��}��U'.c �nԓR�a��I��H<v#�r�bB`g[&�s��r¯����[=���<��㤶Tn����������O����l1��ػc�S.�ي(�2����V�569�T4���#����ו����!�(u�;�%0�^E���Ch��<���"w�<54您�ɒ3��M7xD2�j��2�l��ϓ��5{�@��T�oPg�K_MfO�F�2�3˹������g�^�oAӏ����,t3���eS�AD.�����Y�
$@�I%�s�#�������,�*�R���������3���Lԋ��f��!��w��h�Z݃8�\����'�Y@��I��l�bl�<�fw�4'd�P<(��\@�*3|:Y�y���~�j��J� \,�� �@�.����mPYrT����C�
$C�}: Ȩ[�����'��.t�:0
���p�'(6���t�u`�t�S�`�M%b\�ђUKg,JiN$g~d�X�5Қ���Uj�U^ ���A��#!�e�Pu*	�~��#����$y��]���A��J��ǒ����&�Fhl��D]A�i��'�M�Z�]qWug}2��P��=��F��\�P���<�Ħ��vh�λl��'+ro��������'0�~�u�st|�ܮ��W�l�8#���	���B�|Y(oޙH~������0����:NΙ��aބ��kG����p4*�&0�A�O��z�)
�4�N.cX��������oO�M�HN�1U����k��p��l�5yb8��>F�sz�+�K@j�$s���C|���mk��V����-�u��ށ�wHLE�)9*'�rt�k&�]�K���BC�c!��B�3>��P��@���D.e�B㘱����Z���~*D�J�-u	��%��!�_�Jwq�I5=:
��0k�R^��M�����t䛥�8�&��(Nn<�n���C�l��L--�QH��
�x�'E3�f����\<^"��mVH ��K��&\n�^bp�^�<k��9��5Q"q��H�@��;ϓ7�.P��aF8cP������n+SQf�]�29N���& �x�b�G���K �$ڽ��������w܏��*�����r7���(�Q�\'/=���NgX�8���rTX
nb#�ZmB�['�C�TJ�t!@��IQWsfV�U~sϭ�Gɐ�;�҅�O!��1��1.s��ϒ茶厵6<?�v]���2< �?v�r�[i@TڠmK�\tE�h�I8��(n�,�F]Z�V+�G��#�)��m��EP4_�C����� ���L~�X��D��>��%)m�v�����"�W]8����urT��"����M�:`q%�HDbLr����jR͊8m��� �Q-` �Ԧ4�V�`�bp��I��Mt�>��Ed�D�υ�d���<9��$����0���0�����z/e�J��sA����j���0~/ڶjٛ){u?/Ꮫb�j�z�9�|yI���)����$� ϗ�{�+ۛ��wPTD�-Z�GP�����?-፛b���0�OEuS��6����l�g^� �]>���L!xA}����-{}2�q��	�F�����Z�jɢl;�4�2�~Q��;�%�&�K�.����8D�OOU�0����[��ٳ�ѐ��      S      x�3�4�44�4�21L��=... #��      Q   <   x�3�44�4�4202�54�54P00�#ΐ���"��ĔD����b�����b�=... RC      U   �   x�E�MN�0���s"�%m��b�X��$V�g"۰�6���14�,Ycٟ�������F�S��,0��k8���^C�ϙq�%Q�xKa���������p;f���m�u�A�KX��&�#�5Nǟ�5̔q%9�PY�W�94�7�5FK��j���$MXp&��$`���	Zqvţ���W���3������EF�8�H2+�܉�K-�_�7��K�Z��9T6�xc��zk�R��.h     