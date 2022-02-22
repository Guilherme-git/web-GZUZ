/* eslint-disable no-unused-vars */

import React, { memo } from 'react';

import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { Slide } from 'react-slideshow-image';

import { Images } from '../../contants';
import './ModalShowImages.scss';
import 'react-slideshow-image/dist/styles.css';

const ModalShowImages = ({ modalShowImages, handleModalShowImages }) => {
  const handleClose = () => handleModalShowImages(false);

  const slideImages = [
    {
      url: Images.box,
      caption: 'Slide 1',
    },
    {
      url: Images.box,
      caption: 'Slide 2',
    },
    {
      url: Images.box,
      caption: 'Slide 3',
    },
  ];

  return (
    <>
      <Modal
        open={modalShowImages}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="containerShowImages">
          <Slide easing="ease">
            {slideImages.map((slideImage, index) => (
              <div className="each-slide" key={index}>
                <div style={{ backgroundImage: `url(${slideImage.url})` }} />
              </div>
            ))}
          </Slide>
        </div>
      </Modal>
    </>
  );
};

ModalShowImages.propTypes = {
  modalShowImages: PropTypes.bool.isRequired,
  handleModalShowImages: PropTypes.func.isRequired,
};

const equal = (prevProps, nextProps) => {
  if (
    nextProps.modalShowImages !== prevProps.modalShowImages ||
    nextProps.handleModalShowImages !== prevProps.handleModalShowImages
  ) {
    return false;
  }

  return true;
};

export default memo(ModalShowImages);
