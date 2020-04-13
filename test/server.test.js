const { expect } = require('chai');
const {app, db} = require('../server');
const { PORT } = require('../config/keys');

describe('Server', () => {
    it('tests that server is running current port', async () => {
        console.info(typeof app, typeof db)

        expect(db).to.be(Function);
    })
});
