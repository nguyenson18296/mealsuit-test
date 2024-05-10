import React, { useCallback, useState } from 'react';

import { BASE_URL } from '../../constants';
import { useAppDispatch } from '../../hooks/useRedux';
import { addTicket, filterTicket } from '../../store/tickets/ticketsSlice';

type TTicketStatus = 'all' | 'complete' | 'incomplete';

export const FormTicket: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<TTicketStatus>('all');
  const dispatch = useAppDispatch();

  const onCreateTicket = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const formData = {
          description: name,
        };
        const response = await fetch(`${BASE_URL}/tickets`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        dispatch(addTicket(await response.json()));
        setName('');
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch, name]
  );

  const onCheckStatus = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value as TTicketStatus;
      setStatus(value);
      dispatch(filterTicket(value));
    },
    [dispatch]
  );

  return (
    <>
      <form
        className="max-w-lg py-4 w-full flex items-end"
        onSubmit={onCreateTicket}
      >
        <div className="flex-[0_0_70%]">
          <label
            htmlFor="ticket-name"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Ticket name
          </label>
          <input
            required
            value={name}
            type="text"
            id="ticket-name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create ticket
        </button>
      </form>
      <div className="mt-2">
        <div className="flex items-center mb-4">
          <input
            id="all"
            type="radio"
            value="all"
            onChange={onCheckStatus}
            checked={status === 'all'}
            name="default-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="all"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            All
          </label>

          <input
            id="complete"
            type="radio"
            value="complete"
            onChange={onCheckStatus}
            checked={status === 'complete'}
            name="default-radio"
            className="ml-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="complete"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Complete
          </label>

          <input
            id="incomplete"
            type="radio"
            onChange={onCheckStatus}
            value="incomplete"
            checked={status === 'incomplete'}
            name="default-radio"
            className="ml-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="incomplete"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Incomplete
          </label>
        </div>
      </div>
    </>
  );
};
