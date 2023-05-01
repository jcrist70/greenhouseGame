import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// PROJECT IMPORTS
import '../style/plantControl.css';

const PlantCtrl = ({ plantSelection }) => {
    // REDUX STATE
    const sourceArrayLength = useSelector(state => state.greenhouse.sourceArrayLength);
    // LOCAL STATE
    const [ plantIndex, setPlantIndex ] = useState(1);

    // Handle manual update of plant index (i.e. via typing a number)
    const updatePlantIndex = (e) => {
        if (e.type === 'change') {
            if (e.target.value <= sourceArrayLength ) {
                setPlantIndex(e.target.value);
            } else {
                setPlantIndex(sourceArrayLength);
            }     
        } 
    }
    // Handle auto update of plant index (i.e. when cur plant is planted)
    const handlePlantSelection = (e) => {
        plantSelection(plantIndex);
        if (e.type === 'click') {
            let newValue = parseInt(plantIndex) + 1;
            if (newValue > sourceArrayLength) newValue = 1;
            setPlantIndex(newValue);
        }
    }
    
    return (
        <div className='plant_control_container'>
            <div className='plant_control_grid'>
                <input className='plant_control_index' type='number' min="1" max={sourceArrayLength} value={plantIndex} onChange={updatePlantIndex}/>
                <button className='plant_control_button' onClick={handlePlantSelection}>PLANT</button>
            </div>
        </div>
    );
};

export default PlantCtrl;