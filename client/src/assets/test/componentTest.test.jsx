import { render, screen, fireEvent } from '@testing-library/react';
import Compteur from './componentTest';

describe('Test l\'environnement de test avec un component "test"' , () => {
  it('Rendre le component', () => {
    render(<Compteur />);
    const compteElement = screen.getByText('Compte: 0');
    expect(compteElement).toBeInTheDocument();
  });

  it('Rendre et click sur le component', () => {
    render(<Compteur />);
    const incrementButton = screen.getByText('Incrémenter');
    fireEvent.click(incrementButton);
    const compteElement = screen.getByText('Compte: 1');
    expect(compteElement).toBeInTheDocument();
  });
});