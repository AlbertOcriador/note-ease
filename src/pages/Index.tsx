
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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

interface Nota {
  id: string;
  texto: string;
  categoria: NotaCategoria;
  checklist?: ChecklistItemType[];
  data?: string;
}

const Index = () => {
  const [nota, setNota] = useState('');
  const [notas, setNotas] = useState<Nota[]>([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState<NotaCategoria>('geral');
  const [dataEvento, setDataEvento] = useState<Date | undefined>(undefined);
  const [userName, setUserName] = useState<string>('');
  const [isUserSet, setIsUserSet] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('notas');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Load user and notes from localStorage
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
  }, []);

  // Save notes to localStorage when they change
  useEffect(() => {
    if (isUserSet) {
      localStorage.setItem('notafacil_notas', JSON.stringify(notas));
    }
  }, [notas, isUserSet]);

  // Handle category changes
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

  if (!isUserSet) {
    return <UserLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-background px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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
    </div>
  );
};

export default Index;
