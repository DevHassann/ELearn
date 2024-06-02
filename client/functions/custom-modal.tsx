import React, { FC } from "react";
import { CustomModalProps } from "@/properties/functions.properties";
import { Modal, Box } from "@mui/material";

const CustomModal: FC<CustomModalProps> = ({
  open,
  setOpen,
  setRoute,
  component: Component,
}) => {
  return (
    <Modal
      open={open}
      setOpen={() => setOpen(false)}
      aria-labeledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 w-[450px] bg-white">

      </Box>
    </Modal>
  );
};

export default CustomModal;