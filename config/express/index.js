const express = require('express');
const body_pa = require('body-parser');

function configureExpress(app) {
  app.use(
    express.urlencoded({
      extended: false,
    }),
  );
  app.use(express.json());
  app.use(body_pa.urlencoded({ extended: true }));
  app.set('trust proxy', 1);
}

module.exports = configureExpress;
