import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Slider from 'rc-slider';
// PROJECT IMPORTS
import { store } from '../redux/store';
import { setGreenhouseFull, resetGreenhouse, setYieldSpring, setYieldSummer, setYieldFall, resetYield, resetPlanted } from '../redux/greenhouseSlice';
import Game from './Game';
import '../style/greenhouse9.css';

const Greenhouse = ({ season, plantSourceObj }) => {
    // REDUX STATE
    const plantedArray = useSelector(state => state.greenhouse.plantArray);
    const gameCount = useSelector(state => state.greenhouse.gameCount);
    const maxGameCount = useSelector(state => state.greenhouse.maxGameCount);
    const growing = useSelector(state => state.greenhouse.growing);
    const overallYield = useSelector(state => state.greenhouse.yield);
    // LOCAL STATE
    const [ cropYield, setCropYield ] = useState(0);
    // REFS
    const prevGrowing = useRef();
    const prevSeason = useRef('SPRING');
    const prevPrevSeason = useRef('SPRING');

    // Re-Initialize when done harvesting
    useEffect(() => {
        if (prevSeason.current === 'HARVEST') {
            setCropYield(0);
            store.dispatch(setGreenhouseFull(false));
            store.dispatch(resetGreenhouse());
            store.dispatch(resetYield());
            prevSeason.current = 'SPRING';
            prevPrevSeason.current = 'SPRING';
        }
    }, [season])
    // CALC Yield for each individual plant in the greenhouse taking
    // into account 1. season, 2. selected grow conditions 
    // 3. default best grow conditions
    // TBD: refactor
    useEffect(() => {
        if (growing) {
            prevGrowing.current = true;
            // console.log('GROWING')
            let curYield = 0;
            let scaler = 10;
            const populatedElements = plantedArray.filter((element) => element !== null);
            // CALC CROP YIELD PER PLANT, PER SEASON
            // SCALE CONTRIBUTION BASED ON GROWING ATTRIBUTE MATCHES
            if (prevSeason.current === 'SPRING') {
                scaler = .1;
                populatedElements.forEach((plant) => {
                    // const sourcePlant = plantSourceObj()[plant.name];
                    // let conditionsContribution = (Math.abs(sourcePlant.water-plant.water) + Math.abs(sourcePlant.fertilizer-plant.fertilizer) + Math.abs(sourcePlant.shade-plant.shade))/100;
                    // scaler = .10 - .10 * conditionsContribution;
                    curYield = Math.round(curYield + Math.random() * maxGameCount * scaler);
                })
            } else if (prevSeason.current === 'SUMMER') {
                scaler = .6;
                populatedElements.forEach((plant) => {
                    // const sourcePlant = plantSourceObj()[plant.name];
                    // let conditionsContribution = (Math.abs(sourcePlant.water-plant.water) + Math.abs(sourcePlant.fertilizer-plant.fertilizer) + Math.abs(sourcePlant.shade-plant.shade))/100;
                    // scaler = .60 - .60 * conditionsContribution; 
                    curYield = Math.round(curYield + Math.random() * maxGameCount * scaler);
                })
            } else if (prevSeason.current === 'FALL') {
                scaler = 1;
                populatedElements.forEach((plant) => {
                    // const sourcePlant = plantSourceObj()[plant.name];
                    // let conditionsContribution = (Math.abs(sourcePlant.water-plant.water) + Math.abs(sourcePlant.fertilizer-plant.fertilizer) + Math.abs(sourcePlant.shade-plant.shade))/100;
                    // scaler = 1 - 1 * conditionsContribution;
                    curYield = Math.round(curYield + Math.random() * maxGameCount * scaler);
                })
            }
            console.log('season:',season,'curYield:',curYield);
            if (curYield < 0) curYield = 0;
            setCropYield(curYield);

        }
        if (prevGrowing.current === true && !growing) {
            prevGrowing.current = false;
            if (prevSeason.current === 'SPRING') {
                store.dispatch(setYieldSpring(cropYield));
            } else if (prevSeason.current === 'SUMMER') {
                store.dispatch(setYieldSummer(cropYield));
            } else if (prevSeason.current === 'FALL') {
                store.dispatch(setYieldFall(cropYield));
            } else if (prevSeason.current === 'HARVEST') {
                store.dispatch(resetPlanted());
            }
            prevPrevSeason.current = prevSeason.current;
            prevSeason.current = season;
        }
    }, [growing])

    return (
        <div className='greenhouse_container'>
            <div className='greenhouse_grid'>
                <div className='greenhouse_row_1'><span>
                    <Slider
                        value={gameCount*(100/maxGameCount)}
                        trackStyle={{ backgroundColor: '#C1FF9B', height: '2rem' }}
                        handleStyle={{
                        borderColor: 'gray',
                        height: '2rem',
                        width: 0,
                        marginLeft: 0,
                        marginTop: 0,
                        backgroundColor: 'white',
                        borderRadius: '1px',
                        }}
                        railStyle={{ backgroundColor: '#CE8147', height: '2rem' }}
                        style={{ zIndex:100, opacity: 0.4, width: '29rem', marginBottom: '1.7rem', marginRight:'5px' }}
                    />
                    </span><Game season={season}/></div>
                <div className='greenhouse_row_2'></div>
                <div className='greenhouse_row_3'></div>
                <div className='greenhouse_row_4'></div>

                <div className='greenhouse_grow_row_1_col_1'>{plantedArray[1] ? <img src={plantedArray[1].image} style={{ width: '75%', objectFit: 'cover' }} alt={plantedArray[1].name} /> : 1}</div>
                <div className='greenhouse_grow_row_1_col_2'>{plantedArray[2] ? <img src={plantedArray[2].image} style={{ width: '75%', objectFit: 'cover' }} alt={plantedArray[2].name} /> : 2}</div>
                <div className='greenhouse_grow_row_1_col_3'>{plantedArray[3] ? <img src={plantedArray[3].image} style={{ width: '75%', objectFit: 'cover' }} alt={plantedArray[3].name} />  : 3}</div>

                <div className='greenhouse_grow_row_2_col_1'>{plantedArray[4] ? <img src={plantedArray[4].image} style={{ width: '75%', objectFit: 'cover' }} alt={plantedArray[4].name} />  : 4}</div>
                <div className='greenhouse_grow_row_2_col_2'>{plantedArray[5] ? <img src={plantedArray[5].image} style={{ width: '75%', objectFit: 'cover' }} alt={plantedArray[5].name} />  : 5}</div>
                <div className='greenhouse_grow_row_2_col_3'>{plantedArray[6] ? <img src={plantedArray[6].image} style={{ width: '75%', objectFit: 'cover' }} alt={plantedArray[6].name} />  : 6}</div>

                <div className='greenhouse_grow_row_3_col_1'>{plantedArray[7] ? <img src={plantedArray[7].image} style={{ width: '75%', objectFit: 'cover' }} alt={plantedArray[7].name} />  : 7}</div>
                <div className='greenhouse_grow_row_3_col_2'>{plantedArray[8] ? <img src={plantedArray[8].image} style={{ width: '75%', objectFit: 'cover' }} alt={plantedArray[8].name} />  : 8}</div>
                <div className='greenhouse_grow_row_3_col_3'>{plantedArray[9] ? <img src={plantedArray[9].image} style={{ width: '75%', objectFit: 'cover' }} alt={plantedArray[9].name} />  : 9}</div>  

                <div className='greenhouse_row_6'>{prevPrevSeason.current} Yield: {cropYield}, Overall Yield: {overallYield.SPRING+overallYield.SUMMER+overallYield.FALL}</div>    
            </div>
            
        </div>
    );
};

export default Greenhouse;

