const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const logger = require('./middleware/logger')
const members = require('./Members')

//Express object
const app = express()

//Body Parser Middleware
app.use(express.json())

//For handling form submissions
app.use(express.urlencoded({extended : false}))


//HandleBar middleware (A Handlebars view engine for Express which doesn't suck.
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//Render the data in the index.handlebars file in views folder (Homepage route : Will get rendered at the home page)
app.get('/', function (req, res) {
    res.render('index', {
        title: 'Members App',
        members
    });
});

//Init middleware
app.use(logger)

//Set static folder to load up files
app.use(express.static(path.join(__dirname,'public')))

//Members API routes (using routes to get data) 
app.use('/api/members',require('./routes/api/members'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Serveer running on port ${PORT}`)})