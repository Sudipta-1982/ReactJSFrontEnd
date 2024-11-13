import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5190/api/Squares";

const App = () => {
    const [squares, setSquares] = useState([]);
    const [lastColor, setLastColor] = useState("");
    console.log("Hellow")

    useEffect(() => {
        // Fetch saved squares on initial load
        axios.get(API_URL)
            .then(response => setSquares(response.data))
            .catch(error => console.error("Error fetching squares:", error));
    }, []);

    const generateRandomColor = () => {
        let color;
        do {
            color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        } while (color === lastColor);
        setLastColor(color);
        return color;
    };

    const addSquare = async () => {
        const newSquare = {
            id: squares.length + 1,
            color: generateRandomColor(),
            position: squares.length
        };

        try {
            // Send new square data to the backend
            await axios.post(API_URL, newSquare);
            setSquares([...squares, newSquare]);
        } catch (error) {
            console.error("Error adding square:", error);
        }
    };
    

    return (
        <div className="app">
            <button onClick={addSquare}>Add Box</button>
            <div className="squares-container">
                {squares.map((square) => (
                    <div
                        key={square.id}
                        style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: square.color,
                            margin: "5px"
                        }}
                    />
                    
                ))}
            </div>
            
        </div>
    );
};

export default App;