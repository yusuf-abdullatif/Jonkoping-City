const {Pool} = require('pg');
const storesJson = require('./routes/store/stores.json')
const restaurantsJson = require('./routes/restaurant/restaurants.json')
const pool = new Pool({
  user: 'postgres',
  host: process.env.DB_HOST ||  "localhost",
  database: 'postgres',
  password: process.env.PGPASSWORD,
  port: 5431,
});

class ModelClass {
    constructor(){
        this.pool = new Pool({
            user: 'postgres',
            host: process.env.DB_HOST ||  "localhost",
            database: 'postgres',
            password: process.env.PGPASSWORD,
            port: 5431,
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

        //restaurants

        await this.pool.query(`
        CREATE TABLE IF NOT EXISTS public.restaurants
        (
            id SERIAL,
            name text,
            rating text,
            address text,
            restaurant_type text,
            website text,
            CONSTRAINT restaurants_pkey PRIMARY KEY (id)
        )`);
        await this.pool.query(`
        ALTER TABLE IF EXISTS public.restaurants
        OWNER to postgres;`);
    
    for (const restaurant of restaurantsJson){
        const { rows } = await this.pool.query(`
        SELECT * FROM public.restaurants WHERE name = $1
        `,[restaurant.name]); 
        
        if(rows.length === 0){
            await this.pool.query(`
                INSERT INTO public.restaurants(name,rating,address,restaurant_type,website)
                VALUES ($1,$2,$3,$4,$5)
                `, [restaurant.name,restaurant.rating,restaurant.address,restaurant.restaurant_type,restaurant.website]);   
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