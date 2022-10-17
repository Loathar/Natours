const fs = require('fs');
const express = require('express');

const app = express();

//MIDDELWARE
app.use(express.json());

// Testing api

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello form the sever side!', app: 'natours' });
// });

// app.post('/', (req, res) => {
//   res.status(200).send('You can post to this endpoint...');
// });

// Setting up API and reading data from JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// GET ALL REQUEST
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Sucess',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// GET SPECIFIC TOUR REQUEST
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // Simple way to check if id exists
  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'Success',

    data: {
      tour,
    },
  });
});

// POST REQUEST

app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      });
    }
  );
});

const port = 3000;
app.listen(port, () => console.log(`App running on port ${port}...`));
