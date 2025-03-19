
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

interface NotaItemProps {
  id: string;
  texto: string;
  onDelete: (id: string) => void;
}

const NotaItem = ({ id, texto, onDelete }: NotaItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "nota-container p-4 my-2 rounded-xl bg-nota-light border border-nota-border",
        "shadow-sm hover:shadow-md transition-all duration-300"
      )}
    >
      <div className="flex justify-between items-start">
        <p className="text-foreground text-base leading-relaxed">{texto}</p>
        <button 
          onClick={() => onDelete(id)}
          className="ml-2 text-gray-400 hover:text-destructive transition-colors p-1 rounded-full hover:bg-gray-100"
          aria-label="Excluir nota"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default NotaItem;
