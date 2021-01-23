import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function FavButton({ onClick, active }) {
    return (
        <span
            className={`${active ? 'active' : ''} fav-btn`}
            onClick={onClick}
            onKeyPress={onClick}
            role="button"
            tabIndex="0"
        >
            {active ? '-' : '+'}
        </span>
    );
}

FavButton.propTypes = {
    onClick: PropTypes.func,
    active: PropTypes.bool,
};

export default FavButton;
