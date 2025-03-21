
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { NotaCategoria } from '@/components/NotaItem';
import { ChecklistItemType } from '@/components/ChecklistEditor';

export interface Nota {
  id: string;
  texto: string;
  categoria: NotaCategoria;
  checklist?: ChecklistItemType[];
  data?: string;
}

export function useNotas() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState<NotaCategoria>('geral');
  const [dataEvento, setDataEvento] = useState<Date | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<string>('notas');

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

  useEffect(() => {
    localStorage.setItem('notafacil_notas', JSON.stringify(notas));
  }, [notas]);

  useEffect(() => {
    if (categoriaAtiva === 'eventos' && activeTab === 'calendario') {
      setActiveTab('notas');
    }
  }, [categoriaAtiva, activeTab]);

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
  };

  const eventosCalendario = notas
    .filter(nota => nota.categoria === 'eventos' && nota.data)
    .map(nota => ({
      id: nota.id,
      date: format(new Date(nota.data!.split('/').reverse().join('-')), 'yyyy-MM-dd'),
      title: nota.texto
    }));

  return {
    notas,
    categoriaAtiva,
    dataEvento,
    activeTab,
    eventosCalendario,
    setActiveTab,
    setCategoriaAtiva,
    setDataEvento,
    adicionarNota,
    excluirNota,
    editarNota,
    toggleChecklistItem,
    handleDateSelect
  };
}
