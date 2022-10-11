const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedhelper');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
})


const sample = (array) => array[Math.floor(Math.random() * array.length)];




const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 696);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '630389ecd4cf69425e895435',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      price,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit beatae nulla at sapiente ducimus, blanditiis temporibus facere hic! Exercitationem id cupiditate, odio veniam maiores aspernatur tenetur reprehenderit repellat esse officia. Molestiae ea, quasi harum quod quae sequi perferendis ut animi sapiente esse consectetur corrupti perspiciatis excepturi laudantium temporibus repellat deleniti nulla amet cum expedita odit? Ex dolor molestiae at! Vel! Distinctio hic vel assumenda voluptatem dolores cum corporis obcaecati, maiores, iste molestias doloribus neque nisi totam eligendi iure eveniet! Ex reiciendis non inventore corrupti nobis labore dolores ipsa architecto temporibus. Necessitatibus fugiat assumenda doloremque soluta velit quas minus aliquid. Atque illum, voluptate facilis illo repellendus, error eum doloremque omnis provident, veritatis consequatur tempore minima sint! Odio, nisi laudantium? Culpa, a. Iste voluptatum iure, voluptates veniam quidem tempora vitae ratione quia ex. Quibusdam sequi, ullam commodi provident, laudantium cum architecto accusamus sit maiores nobis voluptas quia mollitia eligendi atque distinctio numquam!',
      geometry: {
        'type': 'Point',
        'coordinates':
          [cities[random1000].longitude,
          cities[random1000].latitude,
          ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/duwjyj50j/image/upload/v1661884990/YelpCamp/ywotvuw0tyhivwssg2tg.jpg',
          filename: 'YelpCamp/ywotvuw0tyhivwssg2tg',

        },
        {
          url: 'https://res.cloudinary.com/duwjyj50j/image/upload/v1661884990/YelpCamp/tr0nuzyfdxb7ouvndn3r.jpg',
          filename: 'YelpCamp/tr0nuzyfdxb7ouvndn3r',

        }
      ],
    })
    await camp.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close()
})



