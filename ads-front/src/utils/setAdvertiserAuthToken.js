import axios from "axios";

const setAdvertiserAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["advertiserToken"] = token;
    } else {
        delete axios.defaults.headers.common["advertiserToken"];
    }
};

export default setAdvertiserAuthToken;
