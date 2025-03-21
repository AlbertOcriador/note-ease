
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { NotaCategoria } from './NotaItem';
import NotaItem, { ChecklistItemType } from './NotaItem';
import EmptyState from './EmptyState';

interface Nota {
  id: string;
  texto: string;
  categoria: NotaCategoria;
  checklist?: ChecklistItemType[];
  data?: string;
}

interface NotaListProps {
  notas: Nota[];
  categoriaAtiva: NotaCategoria;
  onDelete: (id: string) => void;
  onEdit: (id: string, texto: string, checklist?: ChecklistItemType[]) => void;
  onChecklistItemToggle: (notaId: string, itemId: string) => void;
}

const NotaList = ({ notas, categoriaAtiva, onDelete, onEdit, onChecklistItemToggle }: NotaListProps) => {
  const notasFiltradas = notas.filter(nota => nota.categoria === categoriaAtiva);

  return (
    <div className="mt-6">
      <AnimatePresence>
        {notasFiltradas.length === 0 ? (
          <EmptyState categoria={categoriaAtiva} />
        ) : (
          notasFiltradas.map(item => (
            <NotaItem 
              key={item.id} 
              id={item.id} 
              texto={item.texto}
              categoria={item.categoria}
              checklist={item.checklist}
              data={item.data}
              onDelete={onDelete}
              onEdit={onEdit}
              onChecklistItemToggle={onChecklistItemToggle}
            />
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotaList;
