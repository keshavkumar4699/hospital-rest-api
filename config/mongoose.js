//require library
const mongoose = require('mongoose');

//connect to database
async function main() {
    const db = await mongoose.connect(`mongodb+srv://kumarkeshav4699:ORpSNGz3ZpVYspah@beginnercluster.k6gk8p2.mongodb.net/?retryWrites=true`);
    module.exports = db;
}

main()
.then(() => console.log('database connected')) //if connected
.catch(err => console.log(err)); //if error