import AddEntryDialogContent from '@/components/organisms/AddEntryDialogContent';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

const AddEntryDialog = ({
  open,
  setOpen,
  trigger,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger?;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <AddEntryDialogContent setIsOpen={setOpen} />
    </Dialog>
  );
};

export default AddEntryDialog;
