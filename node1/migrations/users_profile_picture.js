const db=require('../dbConfig');

exports.up=async()=>{
    await db.none(`CREATE TABLE users_profile_picture(
        user_id INT NOT NULL,
        image VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id)
    );`);
};

exports.down=async()=>{
    await db.none('DROP TABLE users;');
};