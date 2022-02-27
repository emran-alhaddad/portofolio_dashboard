const express = require('express');
const server = express();

// Get All Routes in Handel 
const userInfoRoute = require('./Routes/userInfoRoutes');
const skillsRoute = require('./Routes/skillsRoutes');
const experiencesRoute = require('./Routes/experiencesRoutes');
const prevWorksRoute = require('./Routes/prevWorksRoutes');
const servicesRoute = require('./Routes/servicesRoutes');
const ordersRoute = require('./Routes/ordersRoutes');
const contaciInfoRoute = require('./Routes/contactInfoRoutes');
const loginRoute = require('./Routes/loginRoutes');
const { isLogedIn, logOut } = require('./controller/loginController');


// Server Configurations
const PORT = process.env.PORT || 8000;
server.set('view engine', 'ejs');
server.use(express.static('Assets'));
server.use(express.urlencoded({ extended: true }))
server.use(express.json());
server.listen(PORT, console.log(`Server started on port ${PORT}`));


// Works with Routes 
server.use('/login', loginRoute);
server.use('/logout', logOut);
server.use(isLogedIn);
server.use('/', userInfoRoute);
server.use('/skills/', skillsRoute);
server.use('/experiences/', experiencesRoute);
server.use('/services/', servicesRoute);
server.use('/prevWorks/', prevWorksRoute);
server.use('/contact/', contaciInfoRoute);
server.use('/orders/', ordersRoute);