class PersonAddress {
    id;
    id_person;
    address;
    number;
    sector;
    city;
    state;
    country;
    user_i;
    change_date;
}

const PersonAddress = `
    CREATE TABLE person_address (
        id int(11) NOT NULL AUTO_INCREMENT,
        id_person int(11) NOT NULL,
        address varchar(255) NOT NULL,
        number varchar(10) NOT NULL,
        sector varchar(200) NOT NULL,
        city varchar(200) NOT NULL,
        state varchar(2) NOT NULL,
        country varchar(100) NOT NULL,
        user_id int(11) NOT NULL,
        change_data datetime NOT NULL DEFAULT current_timestamp(),
        PRIMARY KEY (id)
    )
`;