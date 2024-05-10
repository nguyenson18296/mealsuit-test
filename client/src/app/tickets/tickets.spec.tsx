import { render } from '@testing-library/react';

import Tickets from './tickets';
import Wrapper from '../../utils/utils-for-tests';

describe('Tickets', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Tickets />, {
      wrapper: Wrapper,
    });
    expect(baseElement).toBeTruthy();
  });
});
