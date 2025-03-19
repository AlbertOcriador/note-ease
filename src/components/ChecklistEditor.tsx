
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ChecklistItemType {
  id: string;
  texto: string;
  completo: boolean;
}

interface ChecklistEditorProps {
  items: ChecklistItemType[];
  onChange: (items: ChecklistItemType[]) => void;
}

const ChecklistEditor = ({ items, onChange }: ChecklistEditorProps) => {
  const [novoItem, setNovoItem] = useState('');

  const adicionarItem = () => {
    if (novoItem.trim() === '') return;
    
    const item: ChecklistItemType = {
      id: Date.now().toString(),
      texto: novoItem.trim(),
      completo: false
    };
    
    onChange([...items, item]);
    setNovoItem('');
  };

  const removerItem = (id: string) => {
    onChange(items.filter(item => item.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      adicionarItem();
    }
  };

  return (
    <div className="mt-4 space-y-3">
      <div className="flex gap-2">
        <Input
          placeholder="Adicionar item à lista..."
          value={novoItem}
          onChange={(e) => setNovoItem(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button 
          onClick={adicionarItem}
          size="sm"
          disabled={novoItem.trim() === ''}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 bg-background/80 p-2 rounded-md"
          >
            <div className="flex-1 text-sm">{item.texto}</div>
            <Button
              variant="ghost" 
              size="sm"
              onClick={() => removerItem(item.id)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ChecklistEditor;
