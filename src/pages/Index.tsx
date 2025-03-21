import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Notebook, Calendar, User, LogOut, Download } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import NotaItem, { NotaCategoria } from '@/components/NotaItem';
import EmptyState from '@/components/EmptyState';
import CategoriaSeletor from '@/components/CategoriaSeletor';
import ChecklistEditor, { ChecklistItemType } from '@/components/ChecklistEditor';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import ThemeSelector from '@/components/ThemeSelector';
import UserProfile from '@/components/UserProfile';
import AppLogo from '@/components/AppLogo';
import CalendarView from '@/components/CalendarView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from "@/integrations/supabase/client";
import ModernTitle from '@/components/ModernTitle';

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
  const [showChecklist, setShowChecklist] = useState(false);
  const [checklistItems, setChecklistItems] = useState<ChecklistItemType[]>([]);
  const [dataEvento, setDataEvento] = useState<Date | undefined>(undefined);
  const [userName, setUserName] = useState<string>('');
  const [isUserSet, setIsUserSet] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('notas');
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isPwaInstallable, setIsPwaInstallable] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
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
    
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));
    
    return () => {
      window.removeEventListener('online', () => setIsOnline(true));
      window.removeEventListener('offline', () => setIsOnline(false));
    };
  }, []);

  useEffect(() => {
    if (isUserSet) {
      localStorage.setItem('notafacil_notas', JSON.stringify(notas));
    }
  }, [notas, isUserSet]);

  useEffect(() => {
    if (categoriaAtiva === 'compras' || categoriaAtiva === 'tarefas') {
      setShowChecklist(true);
    } else {
      setShowChecklist(false);
      setChecklistItems([]);
    }

    if (categoriaAtiva !== 'eventos') {
      setDataEvento(undefined);
    }
  }, [categoriaAtiva]);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsPwaInstallable(true);
    });
    
    return () => {
      window.removeEventListener('beforeinstallprompt', () => {
        setIsPwaInstallable(false);
      });
    };
  }, []);

  const handleSetUserName = () => {
    if (userName.trim()) {
      localStorage.setItem('notafacil_username', userName.trim());
      setIsUserSet(true);
      toast.success(`Bem-vindo, ${userName}!`);
    }
  };

  const handleLogout = () => {
    setIsUserSet(false);
    localStorage.removeItem('notafacil_username');
    toast.info('Você saiu da sua conta');
  };

  const adicionarNota = () => {
    if (nota.trim() === '') return;
    
    const novaNota: Nota = {
      id: Date.now().toString(),
      texto: nota.trim(),
      categoria: categoriaAtiva
    };

    if (checklistItems.length > 0) {
      novaNota.checklist = checklistItems;
    }

    if (categoriaAtiva === 'eventos' && dataEvento) {
      novaNota.data = format(dataEvento, 'dd/MM/yyyy');
    }
    
    setNotas([novaNota, ...notas]);
    setNota('');
    setChecklistItems([]);
    setDataEvento(undefined);
    toast.success('Nota adicionada com sucesso!');
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      adicionarNota();
    }
  };

  const eventosCalendario = notas
    .filter(nota => nota.categoria === 'eventos' && nota.data)
    .map(nota => ({
      id: nota.id,
      date: format(new Date(nota.data!.split('/').reverse().join('-')), 'yyyy-MM-dd'),
      title: nota.texto
    }));

  const notasFiltradas = notas.filter(nota => nota.categoria === categoriaAtiva);

  const ConnectionStatus = () => (
    <div className={`fixed bottom-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${isOnline ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}`}>
      {isOnline ? 'Online' : 'Offline'}
    </div>
  );

  if (!isUserSet) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 sm:px-6">
        <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6 pb-8 px-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center mb-4">
                <AppLogo size="lg" animated={true} />
              </div>
              <ModernTitle size="md" colorful={true} />
              <p className="text-muted-foreground mt-2">
                Por favor, digite seu nome para começar
              </p>
            </div>
            
            <div className="space-y-4">
              <Input
                autoFocus
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSetUserName()}
                placeholder="Seu nome"
                className="text-base py-6"
              />
              
              <Button 
                onClick={handleSetUserName}
                className="w-full button-shimmer py-6 bg-primary hover:bg-primary/90 text-white"
                disabled={!userName.trim()}
              >
                Continuar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-background px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl pt-8 sm:pt-12 pb-20"
      >
        <div className="text-center mb-6 relative">
          <div className="absolute right-0 top-0 flex items-center space-x-2">
            <UserProfile userName={userName} onLogout={handleLogout} />
            <ThemeSelector />
          </div>
          <div className="inline-flex items-center justify-center mb-3">
            <AppLogo size="md" animated={true} />
          </div>
          <ModernTitle size="md" colorful={true} />
          <p className="text-muted-foreground mt-2">
            Suas anotações organizadas em um só lugar.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {isPwaInstallable && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1 text-xs" 
                onClick={handleInstallPwa}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                  <line x1="16" y1="5" x2="22" y2="5"></line>
                  <line x1="19" y1="2" x2="19" y2="8"></line>
                  <circle cx="9" cy="9" r="2"></circle>
                  <path d="m21 15-3.4-3.4a2 2 0 0 0-2.8 0l-7.4 7.4"></path>
                </svg>
                Instalar App
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 text-xs" 
              onClick={downloadApk}
            >
              <Download size={14} />
              Baixar para Android
            </Button>
          </div>
        </div>

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

                  {categoriaAtiva === 'eventos' && (
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
                    disabled={nota.trim() === '' || (categoriaAtiva === 'eventos' && !dataEvento)}
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

            <div className="mt-6">
              <AnimatePresence>
                {notasFiltradas.length === 0 ? (
                  <EmptyState categoria={categoriaAtiva} />
                ) : (
                  notasFiltradas.map(item => (
                    <NotaItem 
                      key={item.id} 
                      id={item.id} 
                      texto={item.texto}
                      categoria={item.categoria}
                      checklist={item.checklist}
                      data={item.data}
                      onDelete={excluirNota}
                      onEdit={editarNota}
                      onChecklistItemToggle={toggleChecklistItem}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>
          </TabsContent>
          
          <TabsContent value="calendario">
            <div className="space-y-4">
              <CalendarView 
                events={eventosCalendario}
                onDateSelect={(date) => {
                  setCategoriaAtiva('eventos');
                  setDataEvento(date);
                  setActiveTab('notas');
                  
                  if (inputRef.current) {
                    setTimeout(() => {
                      inputRef.current?.focus();
                    }, 100);
                  }
                }}
              />
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Eventos Próximos</h3>
                <div className="space-y-2">
                  {eventosCalendario.length === 0 ? (
                    <p className="text-muted-foreground text-sm">Não há eventos programados.</p>
                  ) : (
                    eventosCalendario.map(evento => {
                      const nota = notas.find(n => n.id === evento.id);
                      return (
                        <Card key={evento.id} className="p-3 flex items-center justify-between">
                          <div>
                            <Badge variant="outline" className="mb-1">
                              {format(new Date(evento.date), 'dd/MM/yyyy')}
                            </Badge>
                            <h4 className="font-medium">{evento.title}</h4>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setCategoriaAtiva('eventos');
                              setActiveTab('notas');
                            }}
                          >
                            Ver
                          </Button>
                        </Card>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
      
      <ConnectionStatus />
    </div>
  );
};

export default Index;
