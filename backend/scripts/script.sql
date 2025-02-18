create table products (
    idproduct SERIAL primary key,
    codeproduct varchar(20) UNIQUE,
    descriptionproduct varchar(100),
    priceproduct decimal(10, 4),
    statusproduct boolean
)

create table customers (
    idcustomer SERIAL,
    documentcustomer varchar(20) UNIQUE,
    firstnamecustomer varchar(20),
    lastnamecustomer varchar(20),
    emailcustomer varchar(20)
    phonecustomer varchar(20)
    statuscustomer boolean
)





--Para alterar tablas, no puse unique al codigo :P
ALTER TABLE products
ADD CONSTRAINT unique_codeproduct UNIQUE (codeproduct);

--Renombrar campo
alter table customers rename documentocustomer to documentcustomer