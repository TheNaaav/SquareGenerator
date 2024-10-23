import React from 'react';

type Square = {
    id: number;
    color: string;
};

interface SquareColumnProps {
    squares: Square[];
}

const SquareColumn: React.FC<SquareColumnProps> = ({ squares }) => {
    return (
        <div className="flex flex-col">
            {squares.map((square) => (
                <div
                    key={square.id}
                    style={{ backgroundColor: square.color }}
                    className="w-16 h-16 m-1 border border-black rounded-md flex items-center justify-center"
                >
                    <span>{square.id}</span>
                </div>
            ))}
        </div>
    );
};

export default SquareColumn;
