
import React from 'react';
import { NotaCategoria } from './NotaItem';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, FileText, Calendar, Lightbulb, CheckSquare } from 'lucide-react';

interface CategoriaSeletorProps {
  categoriaAtiva: NotaCategoria;
  onCategoriaChange: (categoria: NotaCategoria) => void;
}

const CategoriaSeletor = ({ categoriaAtiva, onCategoriaChange }: CategoriaSeletorProps) => {
  return (
    <Tabs defaultValue={categoriaAtiva} onValueChange={(valor) => onCategoriaChange(valor as NotaCategoria)} className="w-full">
      <TabsList className="grid grid-cols-5 mb-4 w-full">
        <TabsTrigger value="geral" className="flex flex-col gap-1 py-2 items-center">
          <FileText className="h-4 w-4" />
          <span className="text-xs">Geral</span>
        </TabsTrigger>
        <TabsTrigger value="compras" className="flex flex-col gap-1 py-2 items-center">
          <ShoppingCart className="h-4 w-4" />
          <span className="text-xs">Compras</span>
        </TabsTrigger>
        <TabsTrigger value="tarefas" className="flex flex-col gap-1 py-2 items-center">
          <CheckSquare className="h-4 w-4" />
          <span className="text-xs">Tarefas</span>
        </TabsTrigger>
        <TabsTrigger value="eventos" className="flex flex-col gap-1 py-2 items-center">
          <Calendar className="h-4 w-4" />
          <span className="text-xs">Eventos</span>
        </TabsTrigger>
        <TabsTrigger value="ideias" className="flex flex-col gap-1 py-2 items-center">
          <Lightbulb className="h-4 w-4" />
          <span className="text-xs">Ideias</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default CategoriaSeletor;
