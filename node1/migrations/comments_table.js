const db=require('../dbConfig');

exports.up=async()=>{
    await db.none(`CREATE TABLE comments(
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users (id),
        blog_id INT NOT NULL REFERENCES blog_tables (id),
        name VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );`);
};

exports.down=async()=>{
    await db.none('DROP TABLE comments;');
};