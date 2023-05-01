import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
// PROJECT IMPORTS
import { store } from '../redux/store';
import { incGameCount } from '../redux/greenhouseSlice';

const Game = ({ season }) => {
    // REDUX STATE
    const growing = useSelector(state => state.greenhouse.growing);
    const maxGameCount = useSelector(state => state.greenhouse.maxGameCount);
    const gameCount = useSelector(state => state.greenhouse.gameCount);
    // LOCAL STATE
    const [count, setCount] = useState(0)
    // REFS
    const requestRef = useRef();
    const previousTimeRef = useRef();
    const growingState = useRef();
    
    // Start animationframes 
    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
      }, []); // Make sure the effect runs only once
    // Manage game counter
    useEffect(() => {
        const value = Math.round(count);
        if (value % 1 === 0) {
            store.dispatch(incGameCount());
        }   
        if (gameCount >= maxGameCount) {
            setCount(0);
            console.log('CANCELING')
            cancelAnimationFrame(requestRef.current);
            growingState.current = false;
        }
    }, [count])
    // Manage animation frame start/stop for consecutive rounds
    useEffect(() => {
        if (!growing) {
            console.log('CANCELING')
            cancelAnimationFrame(requestRef.current);
            growingState.current = false;
        }
        if (growingState.current === false && growing) {
            requestRef.current = requestAnimationFrame(animate);
            growingState.current = true;
        }

    }, [growing, growingState])
    
    // handle animation counter 
    const animate = async (time) => {
        if (previousTimeRef.current != undefined) {
          const deltaTime = time - previousTimeRef.current;
          setCount(prevCount => (prevCount + deltaTime * 0.02) % maxGameCount);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }

    return (
        <span style={{ position: 'absolute' }}>
            {season}
        </span>
    );
};

export default Game;
