import CloseIcon from "@mui/icons-material/Close";
import {
  IconButton,
  Modal as MuiModal,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { ComponentProps, FC } from "react";

interface ModalProps extends ComponentProps<typeof MuiModal> {
  onClose: () => void;
  title: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "98%",
  maxWidth: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 2,
  borderRadius: 2,
  overflow: "auto",
  maxHeight: "98%",
};

const Modal: FC<ModalProps> = ({ onClose, children, title, ...props }) => {
  return (
    <MuiModal
      {...props}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            color="primary"
            aria-label="close"
            component="span"
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;
