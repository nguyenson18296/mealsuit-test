/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, useState } from 'react';
import cx from 'classnames';
import { BASE_URL } from '../../constants';

import { useAppDispatch } from '../../hooks/useRedux';
import { markComplete, assignUser } from '../../store/tickets/ticketsSlice';
import { IUser } from '../tickets/tickets';

interface IDropdown {
  assigneeId: number | null;
  ticketId: number;
  completed: boolean;
  users: IUser[];
}

export const Dropdown: React.FC<IDropdown> = ({
  assigneeId,
  ticketId,
  completed,
  users,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openAssignee, setOpenAssignee] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onToggleDropdown = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const onToggleAssignee = useCallback(() => {
    setOpenAssignee((open) => !open);
  }, []);

  const markTicketAsComplete = useCallback(async () => {
    try {
      await fetch(`${BASE_URL}/tickets/${ticketId}/complete`, {
        method: completed ? 'DELETE' : 'PUT',
      });
      dispatch(
        markComplete({
          ticketId,
          status: completed,
        })
      );
    } catch (e) {
      console.error(e);
    }
    setOpen(false);
  }, [ticketId, completed, dispatch]);

  const onAssignUser = useCallback(
    async (userId: number) => {
      try {
        const isAssignAction = userId !== assigneeId;
        const fetchUrl = isAssignAction
          ? `${BASE_URL}/tickets/${ticketId}/assign/${userId}`
          : `${BASE_URL}/tickets/${ticketId}/unassign`;
        await fetch(fetchUrl, {
          method: 'PUT',
        });
        dispatch(
          assignUser({
            userId,
            ticketId,
            action: isAssignAction ? 'assign' : 'unassign',
          })
        );
      } catch (e) {
        console.error(e);
      }
    },
    [ticketId, assigneeId, dispatch]
  );

  return (
    <div className="absolute top-[12px] right-[12px] flex justify-end">
      <button
        id="dropdownButton"
        onClick={onToggleDropdown}
        data-dropdown-toggle="dropdown"
        className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm relative"
        type="button"
      >
        <span className="sr-only">Open dropdown</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>
      <div
        id="dropdown"
        className={cx(
          'z-10 absolute top-[100%] text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700',
          {
            hidden: !open,
          }
        )}
      >
        <ul className="py-2" aria-labelledby="dropdownButton">
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              onClick={markTicketAsComplete}
            >
              {completed ? 'Mark as incomplete' : 'Mark as complete'}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block relative px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white flex items-center justify-between"
              onClick={onToggleAssignee}
            >
              Assignee
              <svg
                className="w-2.5 h-2.5 ms-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </a>
            <div
              id="doubleDropdown"
              className={cx(
                'z-10 bg-white absolute left-full top-1/2 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700',
                {
                  hidden: !openAssignee,
                }
              )}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="doubleDropdownButton"
              >
                {users.map((user) => (
                  <li key={user.id}>
                    <a
                      href="#"
                      className={cx(
                        'block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white',
                        {
                          'font-bold': assigneeId === user.id,
                        }
                      )}
                      onClick={() => onAssignUser(user.id)}
                    >
                      {user.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
