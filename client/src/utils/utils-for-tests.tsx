import { Provider } from 'react-redux';
import type { ReactNode } from 'react';

import { store } from '../store';

export default function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}
