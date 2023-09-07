const userRoutes = require('../components/users/network');
const phoneNumberRoutes = require('../components/phoneNumbers/network');

const routes = (app) => {
    app.use('/api/user', userRoutes);
    app.use('/api/phoneNumber', phoneNumberRoutes);
   
};

module.exports = routes;