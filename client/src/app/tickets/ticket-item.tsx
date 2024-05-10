import React, { useCallback } from 'react';

import { Dropdown } from '../dropdown/dropdown';
import { ITicket } from '../../store/tickets/ticketsSlice';

import { IUser } from '../../store/users/usersSlice';
import { useAppSelector } from '../../hooks/useRedux';

export const TicketItem: React.FC<ITicket> = ({
  id,
  assigneeId,
  completed,
  description,
}) => {
  const users = useAppSelector((state) => state.users.users);

  const getAssignee = useCallback(
    (userId: number | null) => {
      if (userId) {
        return users.find((user) => user.id === userId)?.name;
      }
      return '';
    },
    [users]
  );

  return (
    <li className="block relative max-w-sm py-6 px-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <Dropdown
        ticketId={id}
        assigneeId={assigneeId}
        completed={completed}
        users={users}
      />
      <div className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
        Ticket ID: {id}
      </div>
      <p>{description}</p>
      <div className="mt-1">
        Status:
        {completed ? (
          <span className="ml-1 text-[#0E9F6E]">Completed</span>
        ) : (
          <span className="ml-1 text-[#E02424]">Incomplete</span>
        )}
      </div>
      <div className="mt-1">
        Assignee:
        <span className="text-[#F98080] font-semibold ml-1">
          {getAssignee(assigneeId)}
        </span>
      </div>
    </li>
  );
};
