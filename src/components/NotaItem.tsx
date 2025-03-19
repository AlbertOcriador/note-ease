
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Trash2, ShoppingCart, Calendar, Lightbulb, CheckSquare } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

export type NotaCategoria = 'geral' | 'compras' | 'tarefas' | 'eventos' | 'ideias';

interface ChecklistItem {
  id: string;
  texto: string;
  completo: boolean;
}

export interface NotaItemProps {
  id: string;
  texto: string;
  categoria: NotaCategoria;
  checklist?: ChecklistItem[];
  data?: string;
  onDelete: (id: string) => void;
  onChecklistItemToggle?: (notaId: string, itemId: string) => void;
}

const getCategoriaIcon = (categoria: NotaCategoria) => {
  switch (categoria) {
    case 'compras':
      return <ShoppingCart size={16} />;
    case 'tarefas':
      return <CheckSquare size={16} />;
    case 'eventos':
      return <Calendar size={16} />;
    case 'ideias':
      return <Lightbulb size={16} />;
    default:
      return null;
  }
};

const getCategoriaColor = (categoria: NotaCategoria) => {
  switch (categoria) {
    case 'compras':
      return 'bg-blue-50 border-blue-200';
    case 'tarefas':
      return 'bg-green-50 border-green-200';
    case 'eventos':
      return 'bg-purple-50 border-purple-200';
    case 'ideias':
      return 'bg-amber-50 border-amber-200';
    default:
      return 'bg-nota-light border-nota-border';
  }
};

const NotaItem = ({ id, texto, categoria, checklist, data, onDelete, onChecklistItemToggle }: NotaItemProps) => {
  const categoriaIcon = getCategoriaIcon(categoria);
  const categoriaColor = getCategoriaColor(categoria);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "nota-container p-4 my-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300",
        categoriaColor
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {categoria !== 'geral' && (
            <div className="flex items-center mb-2 text-xs font-medium text-muted-foreground">
              {categoriaIcon}
              <span className="ml-1 capitalize">{categoria}</span>
              {data && <span className="ml-auto text-xs">{data}</span>}
            </div>
          )}
          
          <p className="text-foreground text-base leading-relaxed">{texto}</p>
          
          {checklist && checklist.length > 0 && (
            <div className="mt-3 space-y-2">
              {checklist.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`check-${item.id}`} 
                    checked={item.completo}
                    onCheckedChange={() => onChecklistItemToggle?.(id, item.id)}
                  />
                  <label 
                    htmlFor={`check-${item.id}`}
                    className={cn(
                      "text-sm cursor-pointer",
                      item.completo && "line-through text-muted-foreground"
                    )}
                  >
                    {item.texto}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
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
