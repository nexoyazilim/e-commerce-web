import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedFormProps {
  children: ReactNode;
}

export function AnimatedForm({ children }: AnimatedFormProps) {
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {children}
    </motion.form>
  );
}

