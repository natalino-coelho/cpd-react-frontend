class User {
    id;
    id_person;
    user;
    password;
    status;
    expire;
    user_id;
    change_date;
}

const User = `
    CREATE TABLE user (
        id int(11) NOT NULL,
        id_person int(11) DEFAULT NULL,
        user varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        status char(1) NOT NULL DEFAULT '0',
        expire date NOT NULL,
        user_id int(11) NOT NULL,
        change_data datetime NOT NULL DEFAULT current_timestamp(),
        PRIMARY KEY (id)
    ) 
`;