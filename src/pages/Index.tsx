
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Notebook } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import NotaItem from '@/components/NotaItem';
import EmptyState from '@/components/EmptyState';

interface Nota {
  id: string;
  texto: string;
}

const Index = () => {
  const [nota, setNota] = useState('');
  const [notas, setNotas] = useState<Nota[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Carrega notas do localStorage ao iniciar
  useEffect(() => {
    const notasSalvas = localStorage.getItem('notafacil_notas');
    if (notasSalvas) {
      try {
        setNotas(JSON.parse(notasSalvas));
      } catch (e) {
        console.error('Erro ao carregar notas:', e);
      }
    }
  }, []);

  // Salva notas no localStorage quando mudam
  useEffect(() => {
    localStorage.setItem('notafacil_notas', JSON.stringify(notas));
  }, [notas]);

  const adicionarNota = () => {
    if (nota.trim() === '') return;
    
    const novaNota = {
      id: Date.now().toString(),
      texto: nota.trim()
    };
    
    setNotas([novaNota, ...notas]);
    setNota('');
    toast.success('Nota adicionada com sucesso!');
    
    // Foca no input novamente
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const excluirNota = (id: string) => {
    setNotas(notas.filter(nota => nota.id !== id));
    toast.success('Nota removida com sucesso!');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      adicionarNota();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-background px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl pt-8 sm:pt-12 pb-20"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-primary/10 p-2 rounded-full mb-3">
            <Notebook className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            NotaFácil
          </h1>
          <p className="text-muted-foreground mt-2">
            Suas anotações rápidas em um só lugar.
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border shadow-sm">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  ref={inputRef}
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Digite sua anotação..."
                  className="pr-4 py-6 text-base input-animation bg-background"
                  autoComplete="off"
                />
              </div>
              <Button 
                onClick={adicionarNota}
                className="button-shimmer h-auto py-6 px-6 bg-primary hover:bg-primary/90 text-white"
                disabled={nota.trim() === ''}
              >
                <Plus className="mr-2 h-5 w-5" />
                <span>Adicionar</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <AnimatePresence>
            {notas.length === 0 ? (
              <EmptyState />
            ) : (
              notas.map(item => (
                <NotaItem 
                  key={item.id} 
                  id={item.id} 
                  texto={item.texto} 
                  onDelete={excluirNota} 
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
