
import React from 'react';
import { NotaCategoria } from './NotaItem';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, FileText, Calendar, Lightbulb, CheckSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface CategoriaSeletorProps {
  categoriaAtiva: NotaCategoria;
  onCategoriaChange: (categoria: NotaCategoria) => void;
}

const CategoriaSeletor = ({ categoriaAtiva, onCategoriaChange }: CategoriaSeletorProps) => {
  return (
    <Tabs 
      defaultValue={categoriaAtiva} 
      onValueChange={(valor) => onCategoriaChange(valor as NotaCategoria)} 
      className="w-full mb-6"
    >
      <TabsList className="grid grid-cols-5 mb-4 w-full p-1 bg-muted/70 backdrop-blur-sm rounded-xl">
        <TabsTrigger 
          value="geral" 
          className="flex flex-col gap-1 py-3 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-md transition-all"
        >
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText className="h-4 w-4 mb-1 mx-auto" />
            <span className="text-xs">Geral</span>
          </motion.div>
        </TabsTrigger>
        <TabsTrigger 
          value="compras" 
          className="flex flex-col gap-1 py-3 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-md transition-all"
        >
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="h-4 w-4 mb-1 mx-auto" />
            <span className="text-xs">Compras</span>
          </motion.div>
        </TabsTrigger>
        <TabsTrigger 
          value="tarefas" 
          className="flex flex-col gap-1 py-3 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-md transition-all"
        >
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <CheckSquare className="h-4 w-4 mb-1 mx-auto" />
            <span className="text-xs">Tarefas</span>
          </motion.div>
        </TabsTrigger>
        <TabsTrigger 
          value="eventos" 
          className="flex flex-col gap-1 py-3 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-md transition-all"
        >
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar className="h-4 w-4 mb-1 mx-auto" />
            <span className="text-xs">Eventos</span>
          </motion.div>
        </TabsTrigger>
        <TabsTrigger 
          value="ideias" 
          className="flex flex-col gap-1 py-3 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-md transition-all"
        >
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Lightbulb className="h-4 w-4 mb-1 mx-auto" />
            <span className="text-xs">Ideias</span>
          </motion.div>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default CategoriaSeletor;
