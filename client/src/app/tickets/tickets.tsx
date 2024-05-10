import { useMemo } from 'react';
import { useAppSelector } from '../../hooks/useRedux';
import { Link } from 'react-router-dom';

import { FormTicket } from './form-ticket';
import { TicketItem } from './ticket-item';

export interface IUser {
  id: number;
  name: string;
}

export function Tickets() {
  const tickets = useAppSelector((state) => state.tickets.tickets);
  const status = useAppSelector((state) => state.tickets.status);

  const renderedTickets = useMemo(() => {
    if (status === 'complete') {
      return tickets.filter((t) => t.completed);
    }
    if (status === 'incomplete') {
      return tickets.filter((t) => !t.completed);
    }
    return tickets;
  }, [tickets, status]);

  return (
    <div className="mt-2">
      <FormTicket />
      <h2 className="text-3xl font-bold dark:text-white">Tickets</h2>
      {tickets ? (
        <ul className="py-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {renderedTickets.map((t) => (
            <Link to={`${t.id}`}>
              <TicketItem key={t.id} {...t} />
            </Link>
          ))}
        </ul>
      ) : (
        <span>...</span>
      )}
    </div>
  );
}

export default Tickets;
