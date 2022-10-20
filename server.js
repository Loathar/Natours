const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
console.log(process.env.NODE_ENV);
const app = require('./app');

// SETTING UP WEB SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running on ${port}...`));
