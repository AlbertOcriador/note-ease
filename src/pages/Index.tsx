
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppHeader from '@/components/AppHeader';
import UserLogin from '@/components/UserLogin';
import ConnectionStatus from '@/components/ConnectionStatus';
import SplashScreen from '@/components/SplashScreen';
import NotesManager from '@/components/NotesManager';
import CalendarManager from '@/components/CalendarManager';
import { useNotas } from '@/hooks/useNotas';
import { useUser } from '@/hooks/useUser';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  
  const { 
    userName, 
    isUserSet, 
    handleLogin, 
    handleLogout 
  } = useUser();
  
  const {
    notas,
    categoriaAtiva,
    activeTab,
    eventosCalendario,
    setActiveTab,
    setCategoriaAtiva,
    adicionarNota,
    excluirNota,
    editarNota,
    toggleChecklistItem,
    handleDateSelect
  } = useNotas();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleVerEventos = () => {
    setCategoriaAtiva('eventos');
    setActiveTab('notas');
  };
  
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
        {showSplash && isUserSet && <SplashScreen />}
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
              <NotesManager
                notas={notas}
                categoriaAtiva={categoriaAtiva}
                onCategoriaChange={setCategoriaAtiva}
                onAddNota={adicionarNota}
                onDeleteNota={excluirNota}
                onEditNota={editarNota}
                onChecklistItemToggle={toggleChecklistItem}
              />
            </TabsContent>
            
            <TabsContent value="calendario">
              <CalendarManager
                eventos={eventosCalendario}
                onDateSelect={handleDateSelect}
                onVerEventos={handleVerEventos}
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
