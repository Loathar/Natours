const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// SETTING UP WEB SERVER
const port = 3000;
app.listen(port, () => console.log(`App running on ${port}...`));

// Reading file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 1) Middelwares
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middelware! 👋🏻'), next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

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

// 3) Route handlers
const getAllTours = function (req, res) {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'Sucess',
    results: tours.length,
    requestTime: req.requestTime,
    data: {
      tours,
    },
  });
};

const getTour = function (req, res) {
  console.log(req.params);

  // JS trick to convert string to number
  const id = req.params.id * 1;
  // Check to find matching tour
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
};

const createTour = function (req, res) {
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
};

const updateTour = function (req, res) {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'Success',
    data: { message: '<Uppdated tour here...>' },
  });
};

const deleteTour = function (req, res) {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined' });
};

const createUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined' });
};

const getUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined' });
};

const updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined' });
};

const deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined' });
};

// GET ALL REQUEST
// app.get('/api/v1/tours', getAllTours);

// // GET SPECIFIC TOUR REQUEST
// app.get('/api/v1/tours/:id', getTour);

// // POST REQUEST

// app.post('/api/v1/tours', createTour);

// // PATCH REQUEST
// app.patch('/api/v1/tours/:id', updateTour);

// // DELETE REQUEST
// app.delete('/api/v1/tours/:id', deleteTour);

// 3) Routes
const tourRouter = express.Router();
const userRouter = express.Router();
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
