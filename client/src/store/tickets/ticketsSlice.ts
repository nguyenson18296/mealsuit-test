import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ITicket {
  id: number;
  description: string;
  assigneeId: number | null;
  completed: boolean;
}

export interface TicketState {
  status: TTicketStatus;
  tickets: ITicket[];
}

type TTicketStatus = 'all' | 'complete' | 'incomplete';

const initialState: TicketState = {
  status: 'all',
  tickets: [],
};

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    getTickets(state, action: PayloadAction<ITicket[]>) {
      state.tickets = action.payload;
    },
    addTicket(state, action: PayloadAction<ITicket>) {
      state.tickets = state.tickets.concat(action.payload);
    },
    filterTicket(state, action: PayloadAction<TTicketStatus>) {
      state.status = action.payload;
    },
    markComplete(
      state,
      actions: PayloadAction<{
        ticketId: number;
        status: boolean;
      }>
    ) {
      const updatedTicketIdx = state.tickets.findIndex(
        (ticket) => ticket.id === actions.payload.ticketId
      );
      if (updatedTicketIdx !== -1) {
        state.tickets[updatedTicketIdx].completed = !actions.payload.status;
      }
    },
    assignUser(
      state,
      actions: PayloadAction<{
        ticketId: number;
        userId: number;
        action: 'assign' | 'unassign'
      }>
    ) {
      const updatedTicketIdx = state.tickets.findIndex(
        (ticket) => ticket.id === actions.payload.ticketId
      );
      if (updatedTicketIdx !== -1) {
        if (actions.payload.action === 'assign') {
          state.tickets[updatedTicketIdx].assigneeId = actions.payload.userId;
        }
        if (actions.payload.action === 'unassign') {
          state.tickets[updatedTicketIdx].assigneeId = null;
        }
      }
    },
  },
});

export const { getTickets, addTicket, filterTicket, markComplete, assignUser } =
  ticketsSlice.actions;

export default ticketsSlice.reducer;
