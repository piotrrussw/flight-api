import React, { useState } from 'react';
import {
  Button, makeStyles, Box, Typography,
} from '@material-ui/core';
import propTypes from 'prop-types';
import Avatar from 'components/Common/Avatar';
import { Backup } from '@material-ui/icons';
import api from 'api';
import useAuthContext from 'hooks/useAuthContext';

const useDropZoneStyles = makeStyles({
  fileInput: {
    display: 'none',
  },
  dropZone: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '10rem',
    border: '2px dashed',
    borderColor: '#7E7E7E',
  },
  dropZoneLabel: {
    width: '100%',
    height: '100%',
  },
  uploadIcon: {
    fontSize: '4rem',
    color: '#7E7E7E',
  },
});

function DropZone({ handleChange }) {
  const classes = useDropZoneStyles();

  return (
    <Button component="label" className={classes.dropZoneLabel}>
      <Box className={classes.dropZone}>
        <Backup className={classes.uploadIcon} />
        <Typography>Upload avatar</Typography>
      </Box>
      <input
        className={classes.fileInput}
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
    </Button>
  );
}

DropZone.propTypes = {
  handleChange: propTypes.func.isRequired,
};

const useImageUploadStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    width: '8rem',
    height: '8rem',
  },
});

function ImageUpload({ onLoaded, onError }) {
  const classes = useImageUploadStyles();
  const [file, setFile] = useState(null);
  const {
    state: { token },
  } = useAuthContext();
  const handleChange = async (event) => {
    const image = event.target.files[0];
    const formData = new FormData();

    formData.append('image', image);

    try {
      const response = await api(token).post('/user/avatar', formData);
      const { path } = response.data.img;
      setFile(path);

      if (typeof onLoaded === 'function') onLoaded(path);
    } catch (err) {
      if (typeof onError === 'function') onError(err);
    }
  };

  return (
    <Box className={classes.root}>
      {file ? (
        <Box className={classes.avatarContainer}>
          <Avatar src={file} redirect={false} />
        </Box>
      ) : (
        <DropZone handleChange={handleChange} />
      )}
    </Box>
  );
}

ImageUpload.propTypes = {
  onLoaded: propTypes.func,
  onError: propTypes.func,
};

ImageUpload.defaultProps = {
  onLoaded: undefined,
  onError: undefined,
};

export default ImageUpload;
