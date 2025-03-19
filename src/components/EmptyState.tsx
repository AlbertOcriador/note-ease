
import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col items-center justify-center py-12 mt-4"
    >
      <div className="bg-secondary/50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
        <FileText className="h-8 w-8 text-primary/70" />
      </div>
      <h3 className="text-lg font-medium text-foreground">Nenhuma nota ainda</h3>
      <p className="text-muted-foreground text-center mt-1 max-w-xs">
        Comece adicionando sua primeira nota usando o campo acima.
      </p>
    </motion.div>
  );
};

export default EmptyState;
