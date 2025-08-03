import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const AddEntryFloatingButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-(--theme) cursor-pointer shadow-lg"
      onClick={onClick}
    >
      <Plus />
    </motion.div>
  );
};

export default AddEntryFloatingButton;
