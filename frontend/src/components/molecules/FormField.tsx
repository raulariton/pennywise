import { FormLabel } from '../atoms/FormLabel';

export const FormField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <FormLabel>{label}</FormLabel>
    {children}
  </div>
);
