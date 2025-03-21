import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import AppHeader from '@/components/AppHeader';
import UserLogin from '@/components/UserLogin';
import CategoriaSeletor from '@/components/CategoriaSeletor';
import NotaForm from '@/components/NotaForm';
import NotaList from '@/components/NotaList';
import ConnectionStatus from '@/components/ConnectionStatus';
import EventosCalendario from '@/components/EventosCalendario';
import { NotaCategoria } from '@/components/NotaItem';
import { ChecklistItemType } from '@/components/ChecklistEditor';
import ModernTitle from '@/components/ModernTitle';

interface Nota {
  id: string;
  texto: string;
  categoria: NotaCategoria;
  checklist?: ChecklistItemType[];
  data?: string;
}

const Splash = () => {
  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-background z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.2, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div 
          className="inline-flex items-center justify-center mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: 0, ease: "easeInOut" }}
            >
              <div className="p-4 rounded-full bg-primary/10">
                <div className="h-16 w-16 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary"
              animate={{ 
                scale: [1, 3, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{ duration: 1.5, repeat: 0, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
        <ModernTitle size="lg" colorful={true} />
      </motion.div>
    </motion.div>
  );
};

const Index = () => {
  const [nota, setNota] = useState('');
  const [notas, setNotas] = useState<Nota[]>([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState<NotaCategoria>('geral');
  const [dataEvento, setDataEvento] = useState<Date | undefined>(undefined);
  const [userName, setUserName] = useState<string>('');
  const [isUserSet, setIsUserSet] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('notas');
  const [showSplash, setShowSplash] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const userNameSalvo = localStorage.getItem('notafacil_username');
    if (userNameSalvo) {
      setUserName(userNameSalvo);
      setIsUserSet(true);
    }
    
    const notasSalvas = localStorage.getItem('notafacil_notas');
    if (notasSalvas) {
      try {
        setNotas(JSON.parse(notasSalvas));
      } catch (e) {
        console.error('Erro ao carregar notas:', e);
      }
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isUserSet) {
      localStorage.setItem('notafacil_notas', JSON.stringify(notas));
    }
  }, [notas, isUserSet]);

  useEffect(() => {
    if (categoriaAtiva === 'eventos' && activeTab === 'calendario') {
      setActiveTab('notas');
    }
  }, [categoriaAtiva, activeTab]);

  const handleLogin = (username: string) => {
    setUserName(username);
    setIsUserSet(true);
  };

  const handleLogout = () => {
    setIsUserSet(false);
    localStorage.removeItem('notafacil_username');
    toast.info('Você saiu da sua conta');
  };

  const adicionarNota = (texto: string, checklist?: ChecklistItemType[], data?: string) => {
    const novaNota: Nota = {
      id: Date.now().toString(),
      texto: texto,
      categoria: categoriaAtiva
    };

    if (checklist && checklist.length > 0) {
      novaNota.checklist = checklist;
    }

    if (data) {
      novaNota.data = data;
    }
    
    setNotas([novaNota, ...notas]);
    toast.success('Nota adicionada com sucesso!');
  };

  const excluirNota = (id: string) => {
    setNotas(notas.filter(nota => nota.id !== id));
    toast.success('Nota removida com sucesso!');
  };

  const editarNota = (id: string, novoTexto: string, novoChecklist?: ChecklistItemType[]) => {
    setNotas(notas.map(nota => {
      if (nota.id === id) {
        return {
          ...nota,
          texto: novoTexto,
          checklist: novoChecklist
        };
      }
      return nota;
    }));
    toast.success('Nota atualizada com sucesso!');
  };

  const toggleChecklistItem = (notaId: string, itemId: string) => {
    setNotas(notas.map(nota => {
      if (nota.id === notaId && nota.checklist) {
        const updatedChecklist = nota.checklist.map(item => {
          if (item.id === itemId) {
            return { ...item, completo: !item.completo };
          }
          return item;
        });
        
        return { ...nota, checklist: updatedChecklist };
      }
      return nota;
    }));
  };

  const handleDateSelect = (date: Date) => {
    setCategoriaAtiva('eventos');
    setDataEvento(date);
    setActiveTab('notas');
    
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const eventosCalendario = notas
    .filter(nota => nota.categoria === 'eventos' && nota.data)
    .map(nota => ({
      id: nota.id,
      date: format(new Date(nota.data!.split('/').reverse().join('-')), 'yyyy-MM-dd'),
      title: nota.texto
    }));

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, transition: { duration: 0.4 } }
  };

  if (!isUserSet) {
    return <UserLogin onLogin={handleLogin} />;
  }

  return (
    <>
      <AnimatePresence>
        {showSplash && isUserSet && <Splash />}
      </AnimatePresence>

      <motion.div 
        className="min-h-screen flex flex-col items-center bg-background px-4 sm:px-6"
        initial="initial"
        animate="animate"
        variants={pageVariants}
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: showSplash ? 2 : 0 }}
          className="w-full max-w-2xl pt-8 sm:pt-12 pb-20"
        >
          <AppHeader userName={userName} onLogout={handleLogout} />

          <Tabs defaultValue="notas" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="notas">Minhas Notas</TabsTrigger>
              <TabsTrigger value="calendario">Calendário</TabsTrigger>
            </TabsList>
            
            <TabsContent value="notas" className="space-y-4">
              <CategoriaSeletor 
                categoriaAtiva={categoriaAtiva} 
                onCategoriaChange={setCategoriaAtiva} 
              />

              <NotaForm 
                categoriaAtiva={categoriaAtiva}
                onAddNota={adicionarNota}
              />

              <NotaList
                notas={notas}
                categoriaAtiva={categoriaAtiva}
                onDelete={excluirNota}
                onEdit={editarNota}
                onChecklistItemToggle={toggleChecklistItem}
              />
            </TabsContent>
            
            <TabsContent value="calendario">
              <EventosCalendario
                eventos={eventosCalendario}
                onDateSelect={handleDateSelect}
                onVerEventos={() => {
                  setCategoriaAtiva('eventos');
                  setActiveTab('notas');
                }}
              />
            </TabsContent>
          </Tabs>
        </motion.div>
        
        <ConnectionStatus />
      </motion.div>
    </>
  );
};

export default Index;
