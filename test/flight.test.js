const { expect } = require('chai');
const flightController = require('../controllers/flightController');

describe("Flight controller", () => {

    describe('getAirports test', () => {
        flightController.getAirports()
    });
});
