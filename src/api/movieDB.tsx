import axios from "axios";

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: 'e933d6c0b89ce34866f1f34f5c6fb492',
        language: 'es-ES'
    },
});

export default movieDB;