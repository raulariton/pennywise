import React from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';

const ForgotPasswordDialog = () => {
  return (
    <Dialog>
      <div className="flex w-full justify-end">
        <DialogTrigger>
          <div className="text-right text-sm text-cyan-400 transition-colors duration-200 hover:text-cyan-300">
            Forgot password?
          </div>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogTitle>Forgot password</DialogTitle>
        <div className="mx-auto my-7 justify-center">
          <p>Coming soon!</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
