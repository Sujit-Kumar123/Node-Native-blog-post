const db=require('../dbConfig');

exports.up=async()=>{
    await db.none(`CREATE TABLE blog_tables(
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id)
    );`);
};

exports.down=async()=>{
    await db.none('DROP TABLE blog_tables;');
};