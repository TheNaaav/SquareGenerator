import React, { useState, useEffect } from 'react';
import { addSquare, fetchSquares, clearSquares } from './API/SquareApi';
import SquareColumn from './components/SquareColumn';

type Square = {
    id: number;
    color: string;
};

const SquareGrid = () => {
    const [squares, setSquares] = useState<Square[]>([]);

    useEffect(() => {
        const loadSquares = async () => {
            const squaresFromApi = await fetchSquares();
            setSquares(squaresFromApi);
        };
        loadSquares();
    }, []);

    const addMoreSquares = async () => {
        const newSquare = {
            color: getRandomColor(),
        };
        const savedSquare = await addSquare(newSquare);
        setSquares((prev) => [...prev, savedSquare]);
    };

    const handleClearSquares = async () => {
        await clearSquares();
        setSquares([]);
    };

    const getRandomColor = (): string => {
        return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    };

    const fillColumns = () => {
         // Skapar en array som ska innehålla alla kolumner
        const columns: Square[][] = [];
         // Räkna ut det totala antalet kolumner baserat på kvadratroten av antalet kvadrater
        const totalColumns = Math.ceil(Math.sqrt(squares.length));

        // Skapar tomma kolumner för varje plats i den beräknade layouten
        for (let c = 0; c < totalColumns; c++) {
            columns[c] = [];
        }

        // Variabel för att hålla reda på hur många kvadrater som ska fyllas per kolumn i varje iteration
        let currentColumnCount = 1; 

        // Loopar igenom alla kvadrater och placerar dem i kolumner
        for (let i = 0; i < squares.length; ) {
            // Loopar från höger till vänster och fyller kolumnerna med kvadrater
            for (let j = currentColumnCount - 1; j >= 0; j--) {
                // För varje kolumn, fyll den med upp till currentColumnCount antal kvadrater
                for (let k = 0; k < currentColumnCount; k++) {
                    // Kontrollera om det finns kvadrater kvar att placera och om kolumnen har plats
                    if (i < squares.length && columns[j].length < currentColumnCount) {
                        // Lägg till kvadraten i den aktuella kolumnen
                        columns[j].push(squares[i]);
                         // Gå vidare till nästa kvadrat
                        i++; 
                    }
                }
            }

            // Öka antalet kvadrater som ska placeras i varje kolumn för nästa omgång
            currentColumnCount++;
        }
        // Returnerar den fyllda listan av kolumner med kvadrater
        return columns;
    };
    // Använd funktionen för att fylla kolumner och lagra resultatet
    const filledColumns = fillColumns();
    

    return (
        <div className="bg-gray-800 min-h-screen w-full flex flex-col items-center justify-center">
            <div className="flex flex-row gap-4 mb-8">
                <button
                    className="mt-4 px-4 py-2 bg-yellow-400 rounded-md text-black font-bold"
                    onClick={addMoreSquares}>
                    Add square
                </button>
                <button
                    className="mt-4 px-4 py-2 bg-red-400 rounded-md text-black font-bold"
                    onClick={handleClearSquares}>
                    Clear
                </button>
            </div>
            <div className="flex justify-center">
                {filledColumns.map((column, index) => (
                    <SquareColumn key={index} squares={column} />
                ))}
            </div>
        </div>
    );
};

export default SquareGrid;
