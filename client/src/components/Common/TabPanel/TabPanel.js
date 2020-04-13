import { Typography } from '@material-ui/core';
import propTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    overflow: 'auto',
    margin: '16px 0',
  },
});

function TabPanel({
  children, value, index, ...rest
}) {
  const classes = useStyles();
  return (
    value === index && (
      <Typography
        className={classes.root}
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...rest}
      >
        {value === index && children}
      </Typography>
    )
  );
}

TabPanel.propTypes = {
  children: propTypes.node.isRequired,
  value: propTypes.string.isRequired,
  index: propTypes.string.isRequired,
};

export default TabPanel;
