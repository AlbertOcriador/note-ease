
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import CategoriaSeletor from './CategoriaSeletor';
import NotaForm from './NotaForm';
import NotaList from './NotaList';
import { NotaCategoria } from './NotaItem';
import { ChecklistItemType } from './ChecklistEditor';

interface Nota {
  id: string;
  texto: string;
  categoria: NotaCategoria;
  checklist?: ChecklistItemType[];
  data?: string;
}

interface NotesManagerProps {
  notas: Nota[];
  categoriaAtiva: NotaCategoria;
  onCategoriaChange: (categoria: NotaCategoria) => void;
  onAddNota: (texto: string, checklist?: ChecklistItemType[], data?: string) => void;
  onDeleteNota: (id: string) => void;
  onEditNota: (id: string, novoTexto: string, novoChecklist?: ChecklistItemType[]) => void;
  onChecklistItemToggle: (notaId: string, itemId: string) => void;
}

const NotesManager = ({ 
  notas, 
  categoriaAtiva, 
  onCategoriaChange,
  onAddNota,
  onDeleteNota,
  onEditNota,
  onChecklistItemToggle
}: NotesManagerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div className="space-y-4">
      <CategoriaSeletor 
        categoriaAtiva={categoriaAtiva} 
        onCategoriaChange={onCategoriaChange} 
      />

      <NotaForm 
        categoriaAtiva={categoriaAtiva}
        onAddNota={onAddNota}
      />

      <NotaList
        notas={notas}
        categoriaAtiva={categoriaAtiva}
        onDelete={onDeleteNota}
        onEdit={onEditNota}
        onChecklistItemToggle={onChecklistItemToggle}
      />
    </motion.div>
  );
};

export default NotesManager;
