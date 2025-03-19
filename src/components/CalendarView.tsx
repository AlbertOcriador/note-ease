
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, isEqual, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  events?: Array<{
    id: string;
    date: string; // formato ISO
    title: string;
  }>;
  onDateSelect?: (date: Date) => void;
}

const CalendarView = ({ events = [], onDateSelect }: CalendarViewProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

  const previousMonth = () => {
    setCurrentMonth(prev => {
      const prevMonth = new Date(prev);
      prevMonth.setMonth(prev.getMonth() - 1);
      return prevMonth;
    });
  };

  const nextMonth = () => {
    setCurrentMonth(prev => {
      const nextMonth = new Date(prev);
      nextMonth.setMonth(prev.getMonth() + 1);
      return nextMonth;
    });
  };

  const hasEventOnDay = (day: Date) => {
    return events.some(event => {
      const eventDate = parseISO(event.date);
      return isEqual(new Date(eventDate.setHours(0, 0, 0, 0)), new Date(day.setHours(0, 0, 0, 0)));
    });
  };

  const getEventsForDay = (day: Date) => {
    return events.filter(event => {
      const eventDate = parseISO(event.date);
      return isEqual(new Date(eventDate.setHours(0, 0, 0, 0)), new Date(day.setHours(0, 0, 0, 0)));
    });
  };

  return (
    <Card className="w-full bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center text-xl">
          <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
          <span>{format(currentMonth, 'MMMM yyyy', { locale: ptBR })}</span>
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={previousMonth}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextMonth}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
            <div key={i} className="text-xs font-medium text-muted-foreground py-1">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 mt-1">
          {Array(firstDayOfMonth.getDay()).fill(null).map((_, i) => (
            <div key={`empty-start-${i}`} className="p-2" />
          ))}
          
          {daysInMonth.map(day => {
            const dayEvents = getEventsForDay(day);
            const hasEvents = dayEvents.length > 0;
            
            return (
              <Button
                key={day.toString()}
                variant="ghost"
                className={cn(
                  "h-10 w-full p-0 font-normal relative",
                  isToday(day) && "bg-accent text-accent-foreground",
                  !isSameMonth(day, currentMonth) && "text-muted-foreground opacity-50",
                  hasEvents && "font-medium"
                )}
                onClick={() => onDateSelect && onDateSelect(day)}
              >
                <time dateTime={format(day, 'yyyy-MM-dd')}>
                  {format(day, 'd')}
                </time>
                {hasEvents && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </Button>
            );
          })}
          
          {Array((7 - ((firstDayOfMonth.getDay() + daysInMonth.length) % 7)) % 7).fill(null).map((_, i) => (
            <div key={`empty-end-${i}`} className="p-2" />
          ))}
        </div>
        
        {onDateSelect && (
          <div className="mt-4 text-center">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDateSelect(new Date())}
            >
              Hoje
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CalendarView;
