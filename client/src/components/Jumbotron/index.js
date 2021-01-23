import React from 'react';
import PropTypes from 'prop-types';

function Jumbotron({ children }) {
    return (
        <div
            style={{
                height: 300,
                clear: 'both',
                paddingTop: 120,
                textAlign: 'center',
            }}
            className="jumbotron"
        >
            {children}
        </div>
    );
}

Jumbotron.propTypes = {
    fluid: PropTypes.bool,
    children: PropTypes.any,
};

export default Jumbotron;
