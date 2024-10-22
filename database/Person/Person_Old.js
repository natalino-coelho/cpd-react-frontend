class PersonOld {
    id;
    id_person;
    old_name;
    old_cpf;
    old_birthday;
    old_mother;
    old_user_id;
    change_date;
}

const PersonOld = `
    CREATE TABLE person_old (
        id int(11) NOT NULL AUTO_INCREMENT,
        id_person int(11) NOT NULL,
        old_name varchar(255) NOT NULL,
        old_cpf varchar(11) NOT NULL,
        old_birthday date NOT NULL,
        old_mother varchar(255) NOT NULL,
        old_user_id int(11) NOT NULL,
        change_data datetime NOT NULL DEFAULT current_timestamp(),
        PRIMARY KEY (id)
    ) 
`;