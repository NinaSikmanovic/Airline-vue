import axios from 'axios';

const mainUrl = 'http://localhost:3000/flights';

export const FlightService = {
    async getFlights(locale) {
        return axios.get(`${mainUrl}` + '_' + locale);
    },

    async getFlightById(id, locale) {
        return axios.get(`${mainUrl}_${locale}/${id}`);
    }
};