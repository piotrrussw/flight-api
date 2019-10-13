const FlightApi = require('../services/flightApi');

module.exports = app => {
    app.get('/live', async (req, res) => {
        const api = new FlightApi();
        const response = await api.get();
        // 1) Get Search parameters
        // 1) Call Api with parameters
        // 2) Get information
        // 3) Send response
    });

    app.get('/flight/:id', (req, res) => {
        // 1) Search for flight with given ID
        // 2) If exists -> return
        // 3) Else -> return Error
    });

    app.get('/flights', (req, res) => {
        // 1) Get all User saved flight from Flight model
        // 2) Return array of flights
        // 3) If empty return Error
    });

    app.post('/flight/save', (req, res) => {
        // 1) Validate req data
        // 2) Get User ID from accesToken
        // 3) Save flight to Flight model
        // 4) Return operation result
    });

    app.post('/flight/delete/:id', (req, res) => {
        // 1) Validate req data
        // 2) Get User ID from accesToken
        // 3) Check If User has flight with given ID
        // 4) If doesn't throw Error
        // 3) Delete flight from Flight model
        // 4) Return operation result
    });
};