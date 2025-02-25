create table products (
    idproduct SERIAL primary key,
    codeproduct varchar(20) UNIQUE,
    descriptionproduct varchar(100),
    priceproduct decimal(10, 4),
    statusproduct boolean
)

create table customers (
    idcustomer SERIAL primary key,
    documentcustomer varchar(20) UNIQUE,
    firstnamecustomer varchar(20),
    lastnamecustomer varchar(20),
    emailcustomer varchar(20)
    phonecustomer varchar(20)
    statuscustomer boolean
)

create table invoice(
idinvoice serial primary key,
idcustomer int references customers(idcustomer),
dateinvoice DATE NOT NULL,
totalinvoice decimal(10,4)
);

CREATE TABLE invoice_details (
    idinvoicedetail SERIAL PRIMARY KEY,
    idinvoice INTEGER NOT NULL,
    idproduct int references products(idproduct),
    quantity INTEGER NOT NULL,
    unitprice DECIMAL(10, 2) NOT NULL,
    totalprice DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (idinvoice) REFERENCES invoice(idinvoice)
);





--Para alterar tablas, no puse unique al codigo :P
ALTER TABLE products
ADD CONSTRAINT unique_codeproduct UNIQUE (codeproduct);

--Renombrar campo
alter table customers rename documentocustomer to documentcustomer