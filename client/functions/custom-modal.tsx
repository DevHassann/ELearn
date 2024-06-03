import React, { FC } from "react";
import { CustomModalProps } from "@/properties/functions.properties";
import { Modal, Box } from "@mui/material";
import { motion } from "framer-motion";

const CustomModal: FC<CustomModalProps> = ({
  open,
  setOpen,
  setRoute,
  component: Component,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labeledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.1 }}
        className="outline-none absolute top-[50%] left-[50%]"
      >
        <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
          <Component setOpen={setOpen} setRoute={setRoute} />
        </Box>
      </motion.div>
    </Modal>
  );
};

export default CustomModal;
