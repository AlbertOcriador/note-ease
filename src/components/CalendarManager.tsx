
import React from 'react';
import { format } from 'date-fns';
import EventosCalendario from './EventosCalendario';

interface Evento {
  id: string;
  date: string;
  title: string;
}

interface CalendarManagerProps {
  eventos: Evento[];
  onDateSelect: (date: Date) => void;
  onVerEventos: () => void;
}

const CalendarManager = ({ eventos, onDateSelect, onVerEventos }: CalendarManagerProps) => {
  return (
    <EventosCalendario
      eventos={eventos}
      onDateSelect={onDateSelect}
      onVerEventos={onVerEventos}
    />
  );
};

export default CalendarManager;
