import { render, screen } from '@testing-library/react';
import Todo from './Todo';

test('renders todo text', () => {
  render(<Todo text="Test Todo" done={false} />);
  expect(screen.getByText(/Test Todo/i)).toBeInTheDocument();
});
