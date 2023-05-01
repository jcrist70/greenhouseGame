import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { store } from '../redux/store';
import { setGameCount, setSeason, startGrowing, stopGrowing } from '../redux/greenhouseSlice';
// PROJECT IMPORTS
import '../style/basePage.css';
import TOMATO from '../images/tomato1-istockphoto-589985234-612x612.jpeg';
import ZUCCINI from '../images/zuccini-istockphoto-112803355-612x612.jpeg';
import CUCUMBER from '../images/cucumber-istockphoto-140473888-612x612.jpeg';
import Greenhouse from '../components/Greenhouse';
import GrowerCtrl from '../components/GrowerCtrl';

// The following constants will normall be fetched into a 
// redux store via RTKQueue or a manual Axios call.  If I'm
// using RTKQ, I can then import the auto-generated hooks..
const SEASONS = [
    'SPRING',
    'SUMMER',
    'FALL',
    'HARVEST'
]
const PLANT_ARR = [
    {
        index: 0,
        name: 'TOMATO',
        water: 90,
        fertilizer:35,
        shade: 0,
        radius: 3,
        image: TOMATO,
        nutrition: 5,
        plantSeasons: ['SPRING'],
        harvestSeasons: ['SUMMER', 'FALL'],
    },
    {
        index: 1,
        name: 'ZUCCINI',
        water: 90,
        fertilizer:15,
        shade: 30,
        radius: 3,
        image: ZUCCINI,
        nutrition: 6,
        plantSeasons: ['SPRING'],
        harvestSeasons: ['SUMMER', 'FALL'],
    },
    {
        index: 2,
        name: 'CUCUMBER',
        water: 90,
        fertilizer:15,
        shade: 30,
        radius: 3,
        image: CUCUMBER,
        nutrition: 3,
        plantSeasons: ['SPRING','SUMMER'],
        harvestSeasons: ['SUMMER', 'FALL'],
    }
];

const BasePage = () => {
    // REDUX STATE
    const gameCounter = useSelector(state => state.greenhouse.gameCount);
    const maxGameCount = useSelector(state => state.greenhouse.maxGameCount);
    // LOCAL STATE
    const [ seasonIndex, setSeasonIndex ] = useState(0);
    
    // UPDATE STORE: set the season as it changes
    useEffect(() => {
        store.dispatch(setSeason(SEASONS[seasonIndex]));
    }, [seasonIndex])
    // UPDATE STORE: when the game counter reaches its
    // max value, stop growing for the respective season
    useEffect(() => {
        if (gameCounter >= maxGameCount) {
            store.dispatch(stopGrowing());
        }
    }, [gameCounter])
    
    // ADVANCE SEASON: handle special case for 'HARVEST'
    // Add small delay for user comfort.
    const handleIncSeason = () => {
        store.dispatch(setGameCount(0));
        setTimeout(() => {
            setSeasonIndex((prev) => prev < SEASONS.length-1 ? prev + 1 : 0);
            if (SEASONS[seasonIndex] !== 'HARVEST') {
                store.dispatch(startGrowing());
            } else {
                console.log('HARVEST TIME!!!')
                // TBD: Add write to DB for retaining score
            }
        }, 1000);   
    }
    // The greenhouse needs the source plant array in obj
    // format for looking up the 'best' grow conditions when 
    // calculating the seasonal yield and we don't want to 
    // be searching an array with every plant, every season.
    const getPlantSourceObj = () => {
        let object = {};
        PLANT_ARR.forEach((plant) => {
            object[plant.name] = plant;
        })
        return object;
    }

    // Basic css-grid formatting, added div's around to simplify 
    // the styling and improve mobility, not using media detection
    // for this interview project
    return (
        <div className="base_page_container">
            <div className='base_page_grid'>
                <div className='base_page_left_spacer'></div>
                <div className='base_page_row_1'></div>
                <div className='base_page_col_1'><GrowerCtrl plantArr={PLANT_ARR} handleIncSeason={handleIncSeason} /></div>
                <div className='base_page_col_2_to_3'><Greenhouse season={SEASONS[seasonIndex]} plantSourceObj={getPlantSourceObj} /></div>
                <div className='base_page_row_18'></div>
                <div className='base_page_right_spacer'></div>
            </div>
        </div>
    );
};

export default BasePage;