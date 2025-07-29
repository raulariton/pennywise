import React, { useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import AddEntryFloatingButton from '@/components/atoms/AddEntryFloatingButton';
import AddEntryDialogContent from '@/components/organisms/AddEntryDialogContent';

const AddEntryDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <AddEntryFloatingButton/>
      </DialogTrigger>
      <AddEntryDialogContent
        setIsOpen={setIsOpen}
      />
    </Dialog>
  );
};

export default AddEntryDialog;