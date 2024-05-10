import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Tickets from './tickets/tickets';
import { getTickets } from '../store/tickets/ticketsSlice';
import { getUsers } from '../store/users/usersSlice';
import { useAppDispatch } from '../hooks/useRedux';
import { TicketDetails } from './tickets/ticket-detail';

import './app.scss'

const App = () => {
  const dispatch = useAppDispatch();

  // Very basic way to synchronize state with server.
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).
  useEffect(() => {
    async function fetchTickets() {
      const data = await fetch('/api/tickets').then();
      dispatch(getTickets(await data.json()))
    }

    async function fetchUsers() {
      const data = await fetch('/api/users').then();
      dispatch(getUsers(await data.json()))
    }

    Promise.all([
      fetchTickets(),
      fetchUsers()
    ])
  }, [dispatch]);

  return (
    <div className='pt-[60px] max-w-[1280px] mx-auto'>
      <h1 className="text-4xl font-extrabold dark:text-white">Ticketing App</h1>
      <Routes>
        <Route path="/" element={<Tickets />} />
        {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
        <Route path="/:id" element={<TicketDetails />} />
      </Routes>
    </div>
  );
};

export default App;
