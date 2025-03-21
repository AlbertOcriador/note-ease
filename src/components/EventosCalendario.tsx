
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CalendarView from './CalendarView';

interface Evento {
  id: string;
  date: string;
  title: string;
}

interface EventosCalendarioProps {
  eventos: Evento[];
  onDateSelect: (date: Date) => void;
  onVerEventos: () => void;
}

const EventosCalendario = ({ eventos, onDateSelect, onVerEventos }: EventosCalendarioProps) => {
  return (
    <div className="space-y-4">
      <CalendarView 
        events={eventos}
        onDateSelect={onDateSelect}
      />
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Eventos Próximos</h3>
        <div className="space-y-2">
          {eventos.length === 0 ? (
            <p className="text-muted-foreground text-sm">Não há eventos programados.</p>
          ) : (
            eventos.map(evento => (
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
                  onClick={onVerEventos}
                >
                  Ver
                </Button>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EventosCalendario;
