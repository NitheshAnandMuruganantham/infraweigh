import { render } from '@testing-library/react';

import PrintTemplates from './print-templates';

describe('PrintTemplates', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PrintTemplates />);
    expect(baseElement).toBeTruthy();
  });
});
