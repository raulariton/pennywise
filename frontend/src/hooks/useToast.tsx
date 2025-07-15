import { toast } from 'sonner';
import React from 'react';

interface ToastProps {
  id: string | number;
  title: string;
  description: string;
  button: {
    label: string;
    onClick: () => void;
  };
}

const ToastTemplate = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center justify-center">{children}</div>;
};

function LoggedOutInfoToast(props: ToastProps) {
  const { title, description, button, id } = props;

  return (
    <div className="bg-popover flex w-full flex-row items-center justify-center gap-4.5 rounded-lg p-4 shadow-lg">
      <div className="text-popover-foreground flex flex-col gap-1">
        {title && <p className="flex-1 font-bold">{title}</p>}
        {description && <p className="flex-1">{description}</p>}
      </div>
      <button
        className="text-popover rounded-full bg-gray-300 px-3 py-1 text-sm font-medium whitespace-nowrap hover:bg-gray-400"
        onClick={() => {
          button.onClick();
          toast.dismiss(id);
        }}
      >
        {button.label}
      </button>
    </div>
  );
}

function ProtectedRouteWarningToast(props: ToastProps) {
  const { title, description, button, id } = props;

  return (
    <div className="flex w-full flex-row items-center justify-center gap-4.5 rounded-lg bg-yellow-100 p-4 shadow-lg">
      <div className="flex flex-col gap-1 text-yellow-800">
        {title && <p className="flex-1 font-bold">{title}</p>}
        {description && <p className="flex-1">{description}</p>}
      </div>
      <button
        className="rounded-full bg-yellow-200 px-3 py-1 text-sm font-medium whitespace-nowrap text-yellow-800 hover:bg-yellow-300"
        onClick={() => {
          button.onClick();
          toast.dismiss(id);
        }}
      >
        {button.label}
      </button>
    </div>
  );
}

export const useToast = () => {
  const defaultOptions = {
    closeButton: true,
    className: '!text-base',
  };
  // predefined toasts
  const success = (message: string) => {
    toast.success(message, defaultOptions);
  };

  const error = (message: string) => {
    toast.error(message, defaultOptions);
  };

  const info = (message: string) => {
    toast.info(message, defaultOptions);
  };

  const warning = (message: string) => {
    toast.warning(message, defaultOptions);
  };

  const loggedOutInfo = (tost: Omit<ToastProps, 'id'>) => {
    toast.custom(
      (id: string | number) => (
        <LoggedOutInfoToast
          id={id}
          title={tost.title}
          description={tost.description}
          button={{
            label: tost.button.label,
            onClick: () => console.log('Button clicked'),
          }}
        />
      ),
      {},
    );
  };

  // TODO: custom toast props, which some may be optional
  const protectedRouteWarning = (tost: Omit<ToastProps, 'id'>) => {
    toast.custom((id: string | number) => (
      <ProtectedRouteWarningToast
        id={id}
        title={tost.title}
        description={tost.description}
        button={{
          label: tost.button.label,
          onClick: () => console.log('Button clicked'),
        }}
      />
    ));
  };

  return { success, error, info, warning, loggedOutInfo, protectedRouteWarning };
};

export default useToast;
