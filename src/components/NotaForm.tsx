
import React, { useState, useRef } from 'react';
import { Plus, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { NotaCategoria } from './NotaItem';
import ChecklistEditor, { ChecklistItemType } from './ChecklistEditor';

interface NotaFormProps {
  categoriaAtiva: NotaCategoria;
  onAddNota: (texto: string, checklist?: ChecklistItemType[], data?: string) => void;
}

const NotaForm = ({ categoriaAtiva, onAddNota }: NotaFormProps) => {
  const [nota, setNota] = useState('');
  const [checklistItems, setChecklistItems] = useState<ChecklistItemType[]>([]);
  const [dataEvento, setDataEvento] = useState<Date | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const showChecklist = categoriaAtiva === 'compras' || categoriaAtiva === 'tarefas';
  const isEvento = categoriaAtiva === 'eventos';

  const resetForm = () => {
    setNota('');
    setChecklistItems([]);
    setDataEvento(undefined);
  };

  const adicionarNota = () => {
    if (nota.trim() === '') return;
    if (isEvento && !dataEvento) return;
    
    const dataFormatada = dataEvento ? format(dataEvento, 'dd/MM/yyyy') : undefined;
    
    onAddNota(
      nota.trim(), 
      checklistItems.length > 0 ? checklistItems : undefined,
      dataFormatada
    );
    
    resetForm();
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      adicionarNota();
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border shadow-sm">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="relative">
            <Input
              ref={inputRef}
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`${categoriaAtiva === 'geral' ? 'Digite sua anotação...' : 
                          categoriaAtiva === 'compras' ? 'Título da sua lista de compras...' : 
                          categoriaAtiva === 'tarefas' ? 'Título da sua lista de tarefas...' : 
                          categoriaAtiva === 'eventos' ? 'Título do seu evento...' : 
                          'Anote sua ideia...'}`}
              className="pr-4 py-6 text-base input-animation bg-background"
              autoComplete="off"
            />
          </div>

          {showChecklist && (
            <ChecklistEditor 
              items={checklistItems}
              onChange={setChecklistItems}
            />
          )}

          {isEvento && (
            <div className="flex items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="flex gap-2"
                    aria-label="Selecione uma data"
                  >
                    <Calendar className="h-4 w-4" />
                    {dataEvento ? format(dataEvento, 'dd/MM/yyyy') : 'Selecione uma data'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={dataEvento}
                    onSelect={setDataEvento}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          <Button 
            onClick={adicionarNota}
            className="button-shimmer w-full py-6 bg-primary hover:bg-primary/90 text-white"
            disabled={nota.trim() === '' || (isEvento && !dataEvento)}
          >
            <Plus className="mr-2 h-5 w-5" />
            <span>Adicionar {
              categoriaAtiva === 'geral' ? 'Nota' : 
              categoriaAtiva === 'compras' ? 'Lista de Compras' : 
              categoriaAtiva === 'tarefas' ? 'Lista de Tarefas' : 
              categoriaAtiva === 'eventos' ? 'Evento' : 'Ideia'
            }</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotaForm;
