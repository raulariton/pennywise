import { Dialog } from '@/components/ui/dialog';
import { Dispatch, SetStateAction } from 'react';
import AddGoalDialogContent from './AddGoalDialogContent';

const AddGoalDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <AddGoalDialogContent setIsOpen={setIsOpen} />
    </Dialog>
  );
};

export default AddGoalDialog;
