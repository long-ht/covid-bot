const fetch = require('node-fetch');
const covidTracking = {
    async summary() {
        const endpoint = `https://api.covid19api.com/summary`;
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const jsonResponse = await response.json();
                let result = "\n" + "Date: " + jsonResponse.Date + "\n";
                Object.keys(jsonResponse.Global).forEach(key => {
                    result += key + ": " + jsonResponse.Global[key] + "\n";
                });
                return result;
            }
        } catch (error) {
            return "Server Error!";
        }
    },
    async country(message) {
        let temp = message.replace("#dl ", "");
        temp = temp.toLowerCase();
        temp.trim();
        const endpoint = `https://api.covid19api.com/summary`;
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const jsonResponse = await response.json();
                let result = "\n";

                jsonResponse.Countries.forEach(element => {
                    if (element["Country"].toLowerCase().replace(" ", "") === temp) {
                        delete element.Premium;
                        delete element.Slug;
                        Object.keys(element).forEach(key => {
                            result += key + ": " + element[key] + "\n";
                        });
                        return;
                    }
                });
                if (result === "\n") {
                    return "Can't find country";
                } else {
                    return result;
                }
            }
        } catch (error) {
            console.log(error);
            return "Server Error!";
        }
    },
    help() {
        return "#help for the list of orders\n#dl {country} for information on a country\n#dlcovid for global stats";
    }
}
module.exports = covidTracking;

