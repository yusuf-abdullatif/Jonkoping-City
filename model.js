const {Pool} = require('pg');
const storesJson = require('./routes/store/stores.json')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: process.env.PGPASSWORD,
  port: 5432,
});

class ModelClass {
    constructor(){
        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: process.env.PGPASSWORD,
            port: 5432,
        })
    }


    async connectDataBase() {
        await this.pool.connect();
    }

    async setupDatabase() {
        await this.pool.query(`
        CREATE TABLE IF NOT EXISTS public.stores
        (
            id SERIAL,
            name text,
            url text,
            district text,
            CONSTRAINT stores_pkey PRIMARY KEY (id)
        )`);
        await this.pool.query(`
        ALTER TABLE IF EXISTS public.stores
        OWNER to postgres;`);
    
    for (const store of storesJson){
        const { rows } = await this.pool.query(`
        SELECT * FROM public.stores WHERE name = $1
        `,[store.name]); //error Error.captureStackTrace(err);
        
        if(rows.length === 0){
            await this.pool.query(`
                INSERT INTO public.stores(name,url,district)
                VALUES ($1,$2,$3)
                `, [store.name,store.url,store.district]);   
            }
        }
    }
    async getAllStores(){
        const{rows} = await this.pool.query(`
        SELECT * FROM public.stores`);
        return rows;
    }
}

module.exports = ModelClass;