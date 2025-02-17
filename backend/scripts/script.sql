create table products (
    idproduct SERIAL primary key,
    codeproduct varchar(20) UNIQUE,
    descriptionproduct varchar(100),
    priceproduct decimal(10, 4),
    statusproduct boolean
)







--Para alterar tablas, no puse unique al codigo :P
ALTER TABLE products
ADD CONSTRAINT unique_codeproduct UNIQUE (codeproduct);