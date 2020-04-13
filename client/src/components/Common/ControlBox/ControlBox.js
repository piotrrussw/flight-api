import { Box } from '@material-ui/core';
import propTypes from 'prop-types';
import React from 'react';

function ControlBox({ children }) {
  return (
    <Box p={2} pl={4} pr={4}>
      {children}
    </Box>
  );
}

ControlBox.propTypes = {
  children: propTypes.node.isRequired,
};

export default ControlBox;
