const db=require('../dbConfig');

exports.up=async()=>{
    await db.none(`CREATE TABLE users_tokens(
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        token VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id)
    );`);
};

exports.down=async()=>{
    await db.none('DROP TABLE users_tokens;');
};
