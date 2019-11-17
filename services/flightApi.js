const got = require("got");
const { api } = require("../config/keys");

/**
 * @class FlightApi - class handling request from external Skyscanner API
 */
class FlightApi {
  /**
   * FlightApi constructor
   * Init base header and url from config
   * @constructor
   */
  constructor() {
    this.baseUrl = api.url;
    this.headers = {
      "x-rapidapi-host": api.host,
      "x-rapidapi-key": api.key,
      "content-type": "application/x-www-form-urlencoded"
    };
  }

  /**
   *
   * @param {string} endpoint - external API endpoint
   * @param {Object} query - query structure (for more details see: https://rapidapi.com/skyscanner/api/skyscanner-flight-search)
   * @returns {Promise<*>}
   */
  async req(endpoint, query) {
    const { baseUrl, headers } = this;
    const url = baseUrl + endpoint;

    try {
      const { statusCode, body } = await got(url, { headers, query });
      return { statusCode, body };
    } catch ({ statusCode, body }) {
      return { statusCode, body };
    }
  }
}

module.exports = FlightApi;
