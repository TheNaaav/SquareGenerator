import axios from 'axios';

// Definierar bas-URL:en för API:t som hanterar kvadrater
const API_URL = 'http://localhost:5000/api/squares';

// Asynkron funktion som hämtar kvadrater från API:t
export const fetchSquares = async () => {
    // Gör en GET-förfrågan till API_URL för att hämta alla kvadrater
    const response = await axios.get(API_URL);
     // Returnerar datan som API:t skickar tillbaka (lista med kvadrater)
    return response.data;
};

// Asynkron funktion som lägger till en ny kvadrat via API:t
export const addSquare = async (square) => {
    // Gör en POST-förfrågan till API_URL och skickar med en ny kvadrat som data
    const response = await axios.post(API_URL, square);
    // Returnerar datan som API:t skickar tillbaka (den skapade kvadraten)
    return response.data;
};
