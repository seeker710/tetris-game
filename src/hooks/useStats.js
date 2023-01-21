import { useCallback, useEffect, useState } from "react";

const linePoints = [50, 100, 300, 500, 700, 900];

export const useStats = (rowsCleared) => {
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);


    const calcScore = useCallback(()=> {
        if(rowsCleared > 0) {
            setScore(prev => prev + linePoints[rowsCleared-1]*(level+1));
            setRows(prev => prev + rowsCleared);
        }
    }, [level, rowsCleared])

    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared, score]);
    
    return [score, setScore, rows, setRows, level, setLevel];

}