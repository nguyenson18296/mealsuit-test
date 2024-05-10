import { render, FireObject, fireEvent, waitFor } from '@testing-library/react';

import { TicketItem } from './ticket-item';
import Wrapper from '../../utils/utils-for-tests';

const clickListItem = async (fireEvent: FireObject) => {
  const element = document.querySelector('#dropdownButton');
  if (element) {
    fireEvent.click(element);
  }
};

describe('TicketItem', () => {
  it('should render Incomplete status', () => {
    const { getByText } = render(
      <TicketItem
        id={1}
        completed={false}
        description="description"
        assigneeId={null}
      />,
      {
        wrapper: Wrapper,
      }
    );
    expect(getByText('Incomplete')).toBeInTheDocument();
  });

  it('should render Complete status', () => {
    const { getByText } = render(
      <TicketItem
        id={1}
        completed={true}
        description="description"
        assigneeId={null}
      />,
      {
        wrapper: Wrapper,
      }
    );
    expect(getByText('Completed')).toBeInTheDocument();
  });

  it('should render dropdown', async () => {
    const { getByTestId } = render(
      <TicketItem
        id={1}
        completed={true}
        description="description"
        assigneeId={null}
      />,
      {
        wrapper: Wrapper,
      }
    );
    await waitFor(async () => {
      clickListItem(fireEvent);
    });
    const dropdown = getByTestId('dropdown');
    expect(dropdown).toBeInTheDocument();
  });
});
