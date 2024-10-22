class PersonPhone {
    id;
    id_person;
    phone;
    phone_valid;
    status;
    user_id;
    change_date;
}

const PersonPhone = `
    CREATE TABLE person_phone (
        id int(11) NOT NULL AUTO_INCREMENT,
        id_person int(11) NOT NULL,
        phone varchar(15) NOT NULL,
        phone_valid char(1) NOT NULL DEFAULT '0',
        status char(1) NOT NULL DEFAULT '0',
        user_id int(11) NOT NULL,
        change_data datetime NOT NULL DEFAULT current_timestamp(),
        PRIMARY KEY (id)
    )
`;