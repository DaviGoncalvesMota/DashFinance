import {
  Button,
  Dialog as DialogComponent,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Stack,
} from "@mui/material";

import Forms from "../../components/Forms/Forms";

interface IDialogProps {
  onClose: () => void;
}

const Dialog = ({ onClose }: IDialogProps) => {
  return (
    <DialogComponent
      open
      onClose={onClose}
      slotProps={{
        paper: {
          component: "form",
        }
      }}
      fullWidth
    >
      <DialogTitle sx={{ textAlign: "center" }}> Editar </DialogTitle>
      <DialogContent>
        <FormControl fullWidth variant="standard">
          <Stack spacing={2}>
            <Forms />
          </Stack>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button type="submit"> Concluir </Button>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </DialogComponent>
  );
};

export default Dialog;
