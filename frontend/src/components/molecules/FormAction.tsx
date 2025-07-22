import { Button } from '../atoms/FormButton';

export const FormActions = ({ onCancel, loading }: { onCancel: () => void; loading: boolean }) => (
  <div className="flex justify-end gap-3 pt-4">
    <Button type="button" onClick={onCancel} variant="secondary" disabled={loading}>
      Cancel
    </Button>
    <Button type="submit" disabled={loading}>
      {loading ? 'Saving...' : 'Add Entry'}
    </Button>
  </div>
);
