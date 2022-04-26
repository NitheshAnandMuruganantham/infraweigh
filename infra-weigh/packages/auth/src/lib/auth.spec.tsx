import { render } from '@testing-library/react';

import Auth from './auth';

describe('Auth', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Auth role="admin">
        <div />
      </Auth>
    );
    expect(baseElement).toBeTruthy();
  });
});
