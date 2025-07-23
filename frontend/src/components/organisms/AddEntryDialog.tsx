import React from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import AddEntryFloatingButton from '@/components/atoms/AddEntryFloatingButton';
import AddEntryDialogContent from '@/components/organisms/AddEntryDialogContent';

const AddEntryDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <AddEntryFloatingButton/>
      </DialogTrigger>
      <AddEntryDialogContent/>
    </Dialog>
  );
};

export default AddEntryDialog;