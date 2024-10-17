import React, { useState, useEffect } from 'react';
import { addSquare, fetchSquares } from './API/SquareApi';

type Square = {
    id: number;     
    color: string;   
    position: number;
};

const SquareGrid = () => {
    const [squares, setSquares] = useState<Square[]>([]);

    useEffect(() => {

        // Definierar en asynkron funktion för att hämta kvadrater från API:t
        const loadSquares = async () => {
            // Anropar en funktion som hämtar kvadraterna från API:t
            const squaresFromApi = await fetchSquares();
            // Uppdaterar state med de hämtade kvadraterna, så de visas i gränssnittet
            setSquares(squaresFromApi);
        };
        // Anropar den asynkrona funktionen för att ladda kvadrater när komponenten laddas
        loadSquares();
        // Tom array [] innebär att detta endast körs en gång när komponenten först renderas
    }, []);

    const addMoreSquares = async () => {
        const newSquare = {
            // Tilldela positionen som kvadratens index
            position: squares.length,
            // Tilldela en slumpmässig färg
            color: getRandomColor(),  
        };
        // Spara den nya data via API:et
        const savedSquare = await addSquare(newSquare);
        // Uppdatera listan
        setSquares((prev) => [...prev, savedSquare]); 
        console.log('Square saved:', savedSquare);
    };

    // Funktion som genererar en slumpmässig färg
    const getRandomColor = (): string => {
        let color: string; 
        const backgroundColor = '#2d3748'; // Bakgrundsfärgen

        do {
            // Genererar en slumpmässig färg i hexadecimalt format
            color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        } while (!isColorValid(color, backgroundColor)); // Kontrollera om färgen är giltig

        return color; // Returnera den giltiga slumpmässiga färgen
    };

    
    const isColorValid = (color: string, backgroundColor: string): boolean => {
        // Kontrollera att färgen inte är en dubblett och inte är samma som bakgrundsfärgen
        return !squares.some(square => square.color === color) && color !== backgroundColor;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
            <div className="grid grid-cols-4 gap-4">
            {squares.map((square) => (
            <div 
                key={square.id} 
                style={{ backgroundColor: square.color }}
                className="w-20 h-20 m-2"
            />
            ))}
            </div>
            <button 
                className="bg-purple-500 text-white p-2 rounded mt-4 shadow-lg hover:bg-purple-700" 
                onClick={addMoreSquares}>
                Lägg till ruta
            </button>
        </div>
    );
};

export default SquareGrid;
