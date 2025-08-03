import AddBudgetDialogContent from '@/components/organisms/AddBudgetDialogContent';
import { Dialog } from '@/components/ui/dialog';
import { Dispatch, SetStateAction } from 'react';

const AddBudgetDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <AddBudgetDialogContent setIsOpen={setIsOpen} />
    </Dialog>
  );
};

export default AddBudgetDialog;
