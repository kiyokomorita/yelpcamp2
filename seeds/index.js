const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

// mongooseとmongodbのconnection setting
async function main() {
  await mongoose.connect('mongodb+srv://kiyoko:<password>@cluster0.zduqs.mongodb.net/yelp-camp2');
  console.log("Database connected!")
}
main().catch(err => {
  console.log("Connection error")
  console.log(err)
});
// the above is mongooseとmongodbのconnection setting

const sample = array=>array[Math.floor(Math.random() * array.length)];



const seedDB = async ()=>{
  await Campground.deleteMany({});
  for(let i=0; i<50; i++){
    const random1000 = Math.floor(Math.random()*1000);
    const price = Math.floor(Math.random()*20) +10;
    const camp = new Campground({
      author:'620d93f65b8063f612c809e0',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus, quidem blanditiis distinctio beatae a perferendis consectetur hic officiis dolorem optio ex ducimus tempora?',
      // short hand priceも変数price, 両方とも同じ場合は一つでよい
      price,
      images:[
        {
          url: 'https://res.cloudinary.com/damvlrgnf/image/upload/v1645827805/YelpCamp/agoleoo0eacqw6jyssuq.jpg',
          filename: 'YelpCamp/agoleoo0eacqw6jyssuq',
    
        },
        {
          url: 'https://res.cloudinary.com/damvlrgnf/image/upload/v1645827805/YelpCamp/eifazngxt3feofrhrowe.jpg',
          filename: 'YelpCamp/eifazngxt3feofrhrowe',
 
        },
        {
          url: 'https://res.cloudinary.com/damvlrgnf/image/upload/v1645827805/YelpCamp/kxpnxi9ho4o5gfyouive.jpg',
          filename: 'YelpCamp/kxpnxi9ho4o5gfyouive',
       
        }
      ]
    })
    await camp.save()

  }
  
}

seedDB().then(()=>{
  mongoose.connection.close()
})

