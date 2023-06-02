require('dotenv').config();

CONFIG={}

CONFIG.db_host=process.env.DB_HOST;
CONFIG.db_name=process.env.DB_NAME;
CONFIG.db_user=process.env.DB_USER;
CONFIG.db_password=process.env.DB_PASSWORD;
CONFIG.db_port=process.env.DB_PORT;
CONFIG.db_dialect=process.env.DB_DIALECT;


CONFIG.max_pool_conn=2;
CONFIG.min_pool_conn=0;
CONFIG.conn_idle_time=6000000;


CONFIG.environment=process.env.ENVIRONMENT;
