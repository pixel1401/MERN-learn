import { FC, ReactNode, useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


interface BasicModalProps  {
    isOpen : boolean,
    children? : ReactNode ,
    close : Function
}


const BasicModal : FC<BasicModalProps>  = ({isOpen , children , close})=> {
  
  const handleClose = () => {
    close()
  } 
  

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
      <Box sx={style}>
        {children}
      </Box>
      </Modal>
    </div>
  );
}


export default BasicModal;