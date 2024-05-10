import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { TicketItem } from './ticket-item';
import { ITicket } from '../../store/tickets/ticketsSlice';
import { BASE_URL } from '../../constants';

export const TicketDetails: React.FC = () => {
  const params = useParams<{ id: string }>();

  const [ticket, setTicket] = useState<ITicket>({} as ITicket);

  const fetchTicketDetail = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/tickets/${params.id}`);
      const data = await response.json();
      setTicket(data);
    } catch (e) {
      console.error(e);
    }
  }, [params]);

  useEffect(() => {
    fetchTicketDetail();
  }, [fetchTicketDetail]);

  return (
    <div>
      <TicketItem {...ticket} />
    </div>
  );
};
