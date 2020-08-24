CREATE DATABASE db_deliverynow;

USE db_deliverynow;

-- TABLA USUARIOS
-- todas las contraseñas seran encriptadas usando SHA1
CREATE TABLE users (
  id INT(11) NOT NULL,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(60) NOT NULL  ,
  fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

/*DESCRIBE users;

INSERT INTO users (id, username, password, fullname) 
  VALUES (1, 'john', 'password1', 'John Carter');

SELECT * FROM users;*/

-- TABLA EMPRESAS
CREATE TABLE empresas (
  id INT(11) NOT NULL,
  nombre_empresa VARCHAR(150) NOT NULL,
  cif VARCHAR(30) NOT NULL,
  direccion VARCHAR(200) NOT NULL,
  encargado VARCHAR(100) NOT NULL,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE empresas
  ADD PRIMARY KEY (id);

ALTER TABLE empresas
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

/*DESCRIBE empresas;*/


-- TABLA COMERCIOS
CREATE TABLE comercios (
  id INT(11) NOT NULL,
  nombre_comercio VARCHAR(150) NOT NULL,
  codigo_postal VARCHAR(30) NOT NULL,
  movil VARCHAR(15) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  direccion VARCHAR(200) NOT NULL,
  provincia VARCHAR(200) NOT NULL,
  ciudad VARCHAR(200) NOT NULL,
  descripcion VARCHAR(200) NOT NULL,
  responsable VARCHAR(200) NOT NULL,
  activodescuento tinyint(1) NOT NULL,
  precioparadescontar decimal(20,6) NOT NULL,
  montodescuento decimal(20,6) NOT NULL,
  pedidoinferior decimal(20,6) NOT NULL,
  precioinferior decimal(20,6) NOT NULL,
  pedidosuperior decimal(20,6) NOT NULL,
  preciosuperior decimal(20,6) NOT NULL,
  entregadescripcion VARCHAR(200) NOT NULL,
  empresa_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_empresa FOREIGN KEY(empresa_id) REFERENCES empresas(id)
);

ALTER TABLE comercios
  ADD PRIMARY KEY (id);

ALTER TABLE comercios
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
  

/*DESCRIBE comercios;*/


-- TABLA CATALOGOPLANTILLA
CREATE TABLE catalogosplantilla (
  id INT(11) NOT NULL,
  nombre_producto VARCHAR(150) NOT NULL,
  descripcion_producto VARCHAR(200) NOT NULL,
  precio decimal(20,6) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  tipo tinyint(1) NOT NULL,
  empresa_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_cpempresa FOREIGN KEY(empresa_id) REFERENCES empresas(id)
);

ALTER TABLE catalogosplantilla
  ADD PRIMARY KEY (id);

ALTER TABLE catalogosplantilla
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
  


-- TABLA CATALOGOS
CREATE TABLE catalogos (
  id INT(11) NOT NULL,
  nombre_producto VARCHAR(150) NOT NULL,
  descripcion_producto VARCHAR(200) NOT NULL,
  precio decimal(20,6) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  tipo tinyint(1) NOT NULL,
  comercio_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_comercio FOREIGN KEY(comercio_id) REFERENCES comercios(id)
);

ALTER TABLE catalogos
  ADD PRIMARY KEY (id);

ALTER TABLE catalogos
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
  

-- TABLA TAGS
CREATE TABLE tags (
  id INT(11) NOT NULL,
  descripcion VARCHAR(150) NOT NULL,
  comercio_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_tcomercio FOREIGN KEY(comercio_id) REFERENCES comercios(id)
);

ALTER TABLE tags
  ADD PRIMARY KEY (id);

ALTER TABLE tags
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
  
  
-- TABLA HORARIOS
CREATE TABLE horarios (
  id INT(11) NOT NULL,
  dia VARCHAR(150) NOT NULL,
  hora_apertura VARCHAR(30) NOT NULL,
  hora_cierre VARCHAR(15) NOT NULL,
  comercio_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_hcomercio FOREIGN KEY(comercio_id) REFERENCES comercios(id)
);

ALTER TABLE horarios
  ADD PRIMARY KEY (id);

ALTER TABLE horarios
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
  
  
-- TABLA ZONASENTREGA
CREATE TABLE zonasentrega (
  id INT(11) NOT NULL,
  codigo_postal VARCHAR(150) NOT NULL,
  precio_minimo decimal(20,6) NOT NULL,
  coste_envio decimal(20,6) NOT NULL,
  tiempo_entrega VARCHAR(100) NOT NULL,
  comercio_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_zcomercio FOREIGN KEY(comercio_id) REFERENCES comercios(id)
);

ALTER TABLE zonasentrega
  ADD PRIMARY KEY (id);

ALTER TABLE zonasentrega
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
  
  
-- TABLA CATALOGODET
CREATE TABLE catalogodet (
  id INT(11) NOT NULL,
  nombre_producto VARCHAR(150) NOT NULL,
  precio decimal(20,6) NOT NULL,
  catalogo_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_ccatalogo FOREIGN KEY(catalogo_id) REFERENCES catalogos(id)
);

ALTER TABLE catalogodet
  ADD PRIMARY KEY (id);

ALTER TABLE catalogodet
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;