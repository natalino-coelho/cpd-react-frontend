class Person {
  id;
  name;
  cpf;
  birthday;
  mother;
  create_date;
  user_i;
}

const Person = `
    CREATE TABLE person (
        id int(11) NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        cpf varchar(11) NOT NULL,
        birthday date NOT NULL,
        mother varchar(255) NOT NULL,
        create_data date NOT NULL DEFAULT current_timestamp(),
        user_id int(11) NOT NULL,
        PRIMARY KEY (id)
    )
`;
