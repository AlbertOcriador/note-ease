
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ShoppingCart, Calendar, Lightbulb, CheckSquare } from 'lucide-react';
import { NotaCategoria } from './NotaItem';

interface EmptyStateProps {
  categoria?: NotaCategoria;
}

const EmptyState = ({ categoria = 'geral' }: EmptyStateProps) => {
  const getMensagem = () => {
    switch (categoria) {
      case 'compras':
        return 'Nenhuma lista de compras';
      case 'tarefas':
        return 'Nenhuma tarefa adicionada';
      case 'eventos':
        return 'Nenhum evento programado';
      case 'ideias':
        return 'Nenhuma ideia anotada';
      default:
        return 'Nenhuma nota ainda';
    }
  };

  const getSubtitulo = () => {
    switch (categoria) {
      case 'compras':
        return 'Crie sua primeira lista de compras usando o campo acima.';
      case 'tarefas':
        return 'Adicione tarefas para organizar seu dia a dia.';
      case 'eventos':
        return 'Organize seus compromissos e eventos importantes.';
      case 'ideias':
        return 'Registre seus pensamentos e ideias brilhantes.';
      default:
        return 'Comece adicionando sua primeira nota usando o campo acima.';
    }
  };

  const getIcone = () => {
    switch (categoria) {
      case 'compras':
        return <ShoppingCart className="h-8 w-8 text-blue-500/70" />;
      case 'tarefas':
        return <CheckSquare className="h-8 w-8 text-green-500/70" />;
      case 'eventos':
        return <Calendar className="h-8 w-8 text-purple-500/70" />;
      case 'ideias':
        return <Lightbulb className="h-8 w-8 text-amber-500/70" />;
      default:
        return <FileText className="h-8 w-8 text-primary/70" />;
    }
  };

  const getCorFundo = () => {
    switch (categoria) {
      case 'compras':
        return 'bg-blue-100/50';
      case 'tarefas':
        return 'bg-green-100/50';
      case 'eventos':
        return 'bg-purple-100/50';
      case 'ideias':
        return 'bg-amber-100/50';
      default:
        return 'bg-secondary/50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="flex flex-col items-center justify-center py-12 mt-4"
    >
      <div className={`${getCorFundo()} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
        {getIcone()}
      </div>
      <h3 className="text-lg font-medium text-foreground">{getMensagem()}</h3>
      <p className="text-muted-foreground text-center mt-1 max-w-xs">
        {getSubtitulo()}
      </p>
    </motion.div>
  );
};

export default EmptyState;
