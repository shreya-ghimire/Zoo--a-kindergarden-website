const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();
const port = 5000;

// Use CORS to allow requests from other origins
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Sample array of 6 YouTube video links
const videoLinks = [
  'https://www.youtube.com/embed/V712PnybKtI',
  'https://www.youtube.com/embed/V712PnybKtI',
  'https://www.youtube.com/embed/V712PnybKtI',
  'https://www.youtube.com/embed/V712PnybKtI',
  'https://www.youtube.com/embed/V712PnybKtI',
  'https://www.youtube.com/embed/V712PnybKtI'
];

// Route to handle GET request to '/course'
app.get('/course', (req, res) => {
  res.json(videoLinks);
});


const testimonials = [
    {
      name: 'ABC DEF',
      city: 'Pune',
      review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae iusto ea distinctio adipisci.',
      ratingImg: './images/rating.png'  
    },
    {
      name: 'XYZ GHI',
      city: 'Mumbai',
      review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae iusto ea distinctio adipisci.',
      ratingImg: './images/rating.png'
    },
   
   
  ];
  

  app.get('/testimonial', (req, res) => {
    res.json(testimonials);
  });

  app.post('/testimonial', (req, res) => {
    const { name, city, review, ratingImg } = req.body;
    
    if (name && city && review && ratingImg) {
      const newTestimonial = { name, city, review, ratingImg };
      testimonials.push(newTestimonial);  
      res.status(201).json({ message: 'Testimonial added successfully!', testimonial: newTestimonial });
    } else {
      res.status(400).json({ message: 'All fields are required!' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
