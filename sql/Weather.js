class Weather {
    constructor({ city, img, temp, descrip, wind }) {
        for (let i in arguments[0]) {
            if (typeof arguments[0][i] === 'undefined') {
                this.err = true;
                return;
            }
            this[i] = arguments[0][i];
        }
    }
}

module.exports = Weather;