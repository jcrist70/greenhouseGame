import React from 'react';
// PROJECT IMPORTS
import '../style/growerControlLabel.css';

const GrowerCtrlLabel = ({ label, nextImage, prevImage }) => {
    return (
        <div className='grower_control_label_container'>
        <div className='grower_control_label_grid'>
            <div className='grower_control_label_left_arrow' onClick={prevImage}>{String.fromCharCode(9664)}</div>
            <div className='grower_control_label_title'>{label}</div>
            <div className='grower_control_label_right_arrow' onClick={nextImage}>{String.fromCharCode(9664)}</div>
        </div>
        </div>
    );
};

export default GrowerCtrlLabel;