 import mongoose from 'mongoose'
// mongoose.connect('mongodb+srv://ruthi:asdf2453@cluster0.vvfzebk.mongodb.net/'); 

// const db = mongoose.connection;
// db.on('error',console.error.bind(console,'connection error:'));
// db.once('open',()=>{
//     console.log("mogo conected"); 
// });

// export default db;
//mongoose.set('scriptQuery',false)-במידה ומתרחשת שגיאה

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/buy_me')
   console.log("mongo connect");
}

export default mongoose;