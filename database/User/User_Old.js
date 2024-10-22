class UserOld{
    id;
    id_person;
    old_user;
    old_password;
    old_status;
    old_expire;
    old_user_id;
    change_date;
}

const UserOld = `
    CREATE TABLE user_old (
        id int(11) NOT NULL AUTO_INCREMENT,
        id_person int(11) NOT NULL,
        old_user varchar(255) NOT NULL,
        old_password varchar(255) NOT NULL,
        old_status char(1) NOT NULL,
        old_expire date NOT NULL,
        old_user_id int(11) NOT NULL,
        change_data datetime NOT NULL DEFAULT current_timestamp(),
        PRIMARY KEY (id)
    )
`;