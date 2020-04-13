import React from 'react';
import { Box, Card } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';

const useSkeletonStyles = makeStyles({
  root: {
    width: '100%',
    boxShadow: '0px 1px 3px #00000033',
    borderRadius: '4px',
    marginBottom: '20px',
  },
});

function ListSkeleton() {
  const classes = useSkeletonStyles();

  return (
    <>
      <Card className={classes.root}>
        <Skeleton variant="rect" width="100%" height={100} animation="wave" />
      </Card>
      <Card className={classes.root}>
        <Skeleton variant="rect" width="100%" height={100} animation="wave" />
      </Card>
      <Card className={classes.root}>
        <Skeleton variant="rect" width="100%" height={100} animation="wave" />
      </Card>
    </>
  );
}

const useListStyles = makeStyles({
  root: {
    overflow: 'auto',
  },
});

function List({
  component: Component, pending, items, deletable, onDeleted,
}) {
  const classes = useListStyles();
  return (
    <Box className={classes.root}>
      {pending ? (
        <ListSkeleton />
      ) : (
        items.map((item, index) => (
          <Component
            key={item._id || index}
            item={item}
            deletable={deletable}
            onDeleted={onDeleted}
          />
        ))
      )}
    </Box>
  );
}

List.propTypes = {
  items: propTypes.array.isRequired,
  pending: propTypes.bool.isRequired,
  component: propTypes.func.isRequired,
  deletable: propTypes.bool,
  onDeleted: propTypes.func,
};

List.defaultProps = {
  deletable: false,
  onDeleted: undefined,
};

export default List;
