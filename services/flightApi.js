class FlightApi {
    constructor() {
        // set Api rules
    }

    async get(params) {
        let data = [];

        if (!this.validate(params)) {
            return { data, status: 500, message: 'Parameters are not valid.' }
        }

        try {
            data = await this.call(params);
            return { data, status: 200, message: 'Success' };
        } catch(e) {
            return { data, status: 500, message: 'External API Error' };
        }
    }

    async call(params) {
        // Call External API with given parameters
    }

    validate(params) {
        const rules = [];
    }
}

module.exports = FlightApi;