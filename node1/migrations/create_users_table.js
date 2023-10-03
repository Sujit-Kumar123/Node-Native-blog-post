const db=require('../dbConfig');

exports.up=async()=>{
    await db.none(`CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        email_verified_at TIMESTAMPTZ DEFAULT NULL,
        password VARCHAR(255) NOT NULL,
        remember_token VARCHAR(100) DEFAULT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );`);
};

exports.down=async()=>{
    await db.none('DROP TABLE users;');
};
