const express = require('express');

const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`/${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  console.log(`Tour id is ${val}}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    console.log('Hello from checkBody', req.body);
    return res
      .status(400)
      .json({ status: 'Fail', message: 'Missing name and price' });
  }
  next();
};

exports.getAllTours = function (req, res) {
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

exports.getTour = function (req, res) {
  console.log(req.params);

  // JS trick to convert string to number
  const id = req.params.id * 1;
  // Check to find matching tour
  const tour = tours.find((el) => el.id === id);

  // Simple way to check if id exists

  res.status(200).json({
    status: 'Success',

    data: {
      tour,
    },
  });
};

exports.createTour = function (req, res) {
  console.log('Hello from createTour', req.body);
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

exports.updateTour = function (req, res) {
  res.status(200).json({
    status: 'Success',
    data: { message: '<Uppdated tour here...>' },
  });
};

exports.deleteTour = function (req, res) {
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};
