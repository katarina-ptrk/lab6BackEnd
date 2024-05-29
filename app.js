const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const carbrandsRouter = require('./routes/carbrands');
const carsRouter = require('./routes/cars');
const cartypesRouter = require('./routes/cartypes');
const customersRouter = require('./routes/customers');
const discountsRouter = require('./routes/discounts');
const penaltyRouter = require('./routes/penalty');
const rentalRouter = require('./routes/rental');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/carbrands', carbrandsRouter);
app.use('/cars', carsRouter);
app.use('/cartypes', cartypesRouter);
app.use('/customers', customersRouter);
app.use('/discounts', discountsRouter);
app.use('/penalty', penaltyRouter);
app.use('/rental', rentalRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
