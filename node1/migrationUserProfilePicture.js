const db=require('./dbConfig');
const {up}=require('./migrations/users_profile_picture');
const runMigrations=async()=>{
    try{
        await db.none('BEGIN');
        await up();
        await db.none('COMMIT');
        console.log('Migration Successful');
        process.exit(0);

    }catch(error){
        await db.none('ROLLBACK');
        console.log('Migration failed: ',error);
        process.exit(1);
    }
};
runMigrations();