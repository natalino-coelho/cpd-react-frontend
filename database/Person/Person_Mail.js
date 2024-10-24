class PersonMail {
    id;
    id_person;
    email;
    email_valid;
    type;
    status;    
    user_i;
    change_date;
}

const PersonMail = `
    CREATE TABLE person_mail (
        id int(11) NOT NULL AUTO_INCREMENT,
        id_person int(11) NOT NULL,
        email varchar(200) NOT NULL,
        email_valid char(1) NOT NULL DEFAULT '0',
        type char(1) NOT NULL DEFAULT '0',
        status char(1) NOT NULL DEFAULT '0',
        user_id int(11) NOT NULL,
        change_data datetime NOT NULL DEFAULT current_timestamp(),
        PRIMARY KEY (id)
    ) 
`;