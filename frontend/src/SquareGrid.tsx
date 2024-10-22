import React, { useState, useEffect } from 'react';
import { addSquare, fetchSquares, clearSquares } from './API/SquareApi';

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
        let color: string;
        const backgroundColor = '#2d3748';

        do {
            color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        } while (!isColorValid(color, backgroundColor));

        return color;
    };

    const isColorValid = (color: string, backgroundColor: string): boolean => {
        return !squares.some(square => square.color === color) && color !== backgroundColor;
    };

    const size = Math.ceil(Math.sqrt(squares.length));
    // Gruppera kvadraterna i en 2D array
    const rows: Square[][] = [];
    for (let i = 0; i < squares.length; i += size) {
        rows.push(squares.slice(i, i + size));
    }

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
                <div className="flex flex-col">
                    {rows.map((row, rowIndex) => (
                        <div className="flex flex-row" key={rowIndex}>
                            {row.map((square) => (
                                <div
                                    key={square.id}
                                    style={{ backgroundColor: square.color }}
                                    className="w-16 h-16 m-1 border border-black rounded-md flex items-center justify-center"
                                >
                                    <span>{square.id}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SquareGrid;
