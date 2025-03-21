
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Trash2, ShoppingCart, Calendar, Lightbulb, CheckSquare, Pencil, Save, Plus } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ChecklistItemType } from '@/components/ChecklistEditor';

export type NotaCategoria = 'geral' | 'compras' | 'tarefas' | 'eventos' | 'ideias';

export interface NotaItemProps {
  id: string;
  texto: string;
  categoria: NotaCategoria;
  checklist?: ChecklistItemType[];
  data?: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, texto: string, checklist?: ChecklistItemType[]) => void;
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
      return 'bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:border-blue-800';
    case 'tarefas':
      return 'bg-green-50 border-green-200 dark:bg-green-950/40 dark:border-green-800';
    case 'eventos':
      return 'bg-purple-50 border-purple-200 dark:bg-purple-950/40 dark:border-purple-800';
    case 'ideias':
      return 'bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800';
    default:
      return 'bg-nota-light border-nota-border dark:bg-gray-800/60 dark:border-gray-700';
  }
};

const NotaItem = ({ id, texto, categoria, checklist, data, onDelete, onEdit, onChecklistItemToggle }: NotaItemProps) => {
  const categoriaIcon = getCategoriaIcon(categoria);
  const categoriaColor = getCategoriaColor(categoria);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTexto, setEditedTexto] = useState(texto);
  const [editedChecklist, setEditedChecklist] = useState<ChecklistItemType[] | undefined>(checklist);
  const [newItem, setNewItem] = useState('');

  const handleSaveEdit = () => {
    onEdit(id, editedTexto, editedChecklist);
    setIsEditing(false);
  };

  const handleChecklistItemEdit = (itemId: string, newText: string) => {
    if (!editedChecklist) return;
    
    setEditedChecklist(editedChecklist.map(item => {
      if (item.id === itemId) {
        return { ...item, texto: newText };
      }
      return item;
    }));
  };

  const handleAddItem = () => {
    if (newItem.trim() === '') return;
    
    const newChecklistItem: ChecklistItemType = {
      id: Date.now().toString(),
      texto: newItem.trim(),
      completo: false
    };
    
    const updatedChecklist = [...(editedChecklist || []), newChecklistItem];
    setEditedChecklist(updatedChecklist);
    onEdit(id, editedTexto, updatedChecklist);
    setNewItem('');
  };

  const showAddItemField = categoria === 'compras' || categoria === 'tarefas';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "nota-container p-4 my-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300",
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
          
          {isEditing ? (
            <Textarea
              value={editedTexto}
              onChange={(e) => setEditedTexto(e.target.value)}
              className="w-full mb-2 text-foreground bg-background/80 border-input"
              rows={2}
            />
          ) : (
            <div className="py-1">
              <h3 className="text-foreground text-lg font-semibold leading-relaxed">{texto}</h3>
              {texto && checklist && checklist.length > 0 && <Separator className="my-2" />}
            </div>
          )}
          
          {checklist && checklist.length > 0 && (
            <div className="mt-1 space-y-2">
              {(isEditing ? editedChecklist : checklist)?.map((item) => (
                <div key={item.id} className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-background/50">
                  {isEditing ? (
                    <Input 
                      value={item.texto}
                      onChange={(e) => handleChecklistItemEdit(item.id, e.target.value)}
                      className="flex-1 h-8 text-sm text-foreground"
                    />
                  ) : (
                    <>
                      <Checkbox 
                        id={`check-${item.id}`} 
                        checked={item.completo}
                        onCheckedChange={() => onChecklistItemToggle?.(id, item.id)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      />
                      <label 
                        htmlFor={`check-${item.id}`}
                        className={cn(
                          "text-sm cursor-pointer text-foreground flex-1",
                          item.completo && "line-through text-muted-foreground"
                        )}
                      >
                        {item.texto}
                      </label>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {!isEditing && showAddItemField && (
            <div className="mt-4 flex gap-2">
              <Input
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder={`Adicionar ${categoria === 'compras' ? 'produto' : 'tarefa'}...`}
                className="flex-1 h-8 text-sm"
                onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
              />
              <Button 
                size="sm" 
                variant="outline"
                className="h-8 px-2"
                onClick={handleAddItem}
                disabled={newItem.trim() === ''}
              >
                <Plus size={16} />
              </Button>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <button 
              onClick={handleSaveEdit}
              className="text-primary hover:text-primary/90 transition-colors p-1 rounded-full hover:bg-primary/10"
              aria-label="Salvar edição"
            >
              <Save size={16} />
            </button>
          ) : (
            <button 
              onClick={() => {
                setEditedTexto(texto);
                setEditedChecklist(checklist);
                setIsEditing(true);
              }}
              className="text-gray-400 hover:text-primary transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Editar nota"
            >
              <Pencil size={16} />
            </button>
          )}
          <button 
            onClick={() => onDelete(id)}
            className="text-gray-400 hover:text-destructive transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Excluir nota"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotaItem;
