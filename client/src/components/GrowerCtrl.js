import React, { useState} from 'react';
import { store } from '../redux/store';
import Slider from 'rc-slider';
import Tooltip from "rc-tooltip";
import '../style/rc-slider.css';
import "../style/bootstrap_white.css";
// PROJECT IMPORTS
import '../style/growerControl.css';
import GrowerCtrlLabel from './GrowerCtrlLabel';
import PlantCtrl from './PlantCtrl';
import { plant } from '../redux/greenhouseSlice';

const INIT_GROW_CONDITIONS = {
    water: 10,
    fertilizer: 10,
    shade: 10,
}

const GrowerCtrl = ({ plantArr, handleIncSeason }) => {
    // LOCAL STATE
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [ growConditions, setGrowConditions ] = useState(INIT_GROW_CONDITIONS);

    // Handle image selection
    const nextImage = () => {
        let nextIndex = selectedIndex + 1;
        if (nextIndex > plantArr.length - 1) {
            nextIndex = 0;
        }
        setSelectedIndex(nextIndex)
    }
    const prevImage = () => {
        let nextIndex = selectedIndex - 1;
        if (nextIndex < 0) {
            nextIndex = plantArr.length - 1;
        }
        setSelectedIndex(nextIndex);
    }
    const getImage = () => {
        return plantArr[selectedIndex].image;
    }
    // Handle grow settings selection
    const updateWaterLevel = (value) => {
        setGrowConditions((pre) => {return {...pre, water:value}})
    }
    const updateFertilizerLevel = (value) => {
        setGrowConditions((pre) => {return {...pre, fertilizer:value}})
    }
    const updateShadeLevel = (value) => {
        setGrowConditions((pre) => {return {...pre, shade:value}})
    }
    // Place the selected into the greenhouse at the chosen index
    const plantSelection = (index) => {
        let newPlant = {
            name: plantArr[selectedIndex].name,
            water: growConditions.water,
            fertilizer: growConditions.fertilizer,
            shade: growConditions.shade,
            image: plantArr[selectedIndex].image,
            radius: plantArr[selectedIndex].radius,
            nutrition: plantArr[selectedIndex].nutrition,
        };
        store.dispatch(plant({index, plant: newPlant}));
    }
    // TBD: Break <Slider/> components out into seperate file
    return (
        <div className='grower_control_container'>
            <div className='grower_control_grid'>
                <div className='grower_control_image'><img src={getImage()} style={{ width: '85%', objectFit: 'cover' }} alt='tomatoes'/></div>
                <div className='grower_control_label'><GrowerCtrlLabel label={plantArr[selectedIndex].name} nextImage={nextImage} prevImage={prevImage}/></div>
                <div className='grower_control_water'>
                <Slider
                    id='water'
                    value={growConditions.water}
                    trackStyle={{ backgroundColor: '#C1FF9B', height: '2rem' }}
                    handleRender={(node, handleProps) => {
                        return (
                          <Tooltip
                            overlayInnerStyle={{ minHeight: "auto" }}
                            overlay={"score: " + handleProps.value}
                            placement="bottom"
                          >
                            {node}
                          </Tooltip>
                        );
                      }}
                    handleStyle={{
                    borderColor: 'gray',
                    height: '2rem',
                    width: 25,
                    marginLeft: 0,
                    marginTop: 0,
                    backgroundColor: 'white',
                    borderRadius: '1px',
                    }}
                    
                    onChange={updateWaterLevel}
                    railStyle={{ backgroundColor: '#CE8147', height: '2rem' }}
                    style={{ zIndex:100, opacity: 0.7, width: '100%', marginBottom: '20px', marginRight:'5px' }}
                >{growConditions.water}</Slider>
                <div className="noselect" style={{ zIndex:10, marginTop: '10px', position: 'absolute', userSelect: 'none' }}>WATER</div>
                </div>
                <div className='grower_control_fertilizer'>
                <Slider
                    value={growConditions.fertilizer}
                    trackStyle={{ backgroundColor: '#C1FF9B', height: '2rem' }}
                    handleRender={(node, handleProps) => {
                        return (
                          <Tooltip
                            overlayInnerStyle={{ minHeight: "auto" }}
                            overlay={"score: " + handleProps.value}
                            placement="bottom"
                          >
                            {node}
                          </Tooltip>
                        );
                      }}
                    handleStyle={{
                    borderColor: 'gray',
                    height: '2rem',
                    width: 25,
                    marginLeft: 0,
                    marginTop: 0,
                    backgroundColor: 'white',
                    borderRadius: '1px',
                    }}
                    onChange={updateFertilizerLevel}
                    railStyle={{ backgroundColor: '#CE8147', height: '2rem' }}
                    style={{ zIndex:100, opacity: 0.7, width: '100%', marginBottom: '20px', marginRight:'5px' }}
                />
                <div className="noselect" style={{ zIndex:10, marginTop: '10px', position: 'absolute', userSelect: 'none' }}>FERTILIZER</div>
                </div>
                <div className='grower_control_shade'>
                <Slider
                    value={growConditions.shade}
                    trackStyle={{ backgroundColor: '#C1FF9B', height: '2rem' }}
                    handleRender={(node, handleProps) => {
                        return (
                          <Tooltip
                            overlayInnerStyle={{ minHeight: "auto" }}
                            overlay={"score: " + handleProps.value}
                            placement="bottom"
                          >
                            {node}
                          </Tooltip>
                        );
                      }}
                    handleStyle={{
                    borderColor: 'gray',
                    height: '2rem',
                    width: 25,
                    marginLeft: 0,
                    marginTop: 0,
                    backgroundColor: 'white',
                    borderRadius: '1px',
                    }}
                    onChange={updateShadeLevel}
                    railStyle={{ backgroundColor: '#CE8147', height: '2rem' }}
                    style={{ zIndex:100, opacity: 0.7, width: '100%', marginBottom: '20px', marginRight:'5px' }}
                />
                <div className="noselect" style={{ zIndex:10, marginTop: '10px', position: 'absolute', userSelect: 'none' }}>SHADE</div>
                </div> 
                <div className='grower_control_plant'><PlantCtrl plantSelection={plantSelection} /></div>
                <button className='grower_control_advance' onClick={handleIncSeason}>ADVANCE SEASON</button>
            </div>
            
        </div>
    );
};

export default GrowerCtrl;
