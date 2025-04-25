import React from 'react';
import { render, screen } from '@testing-library/react';
import InjuryDataForm from '../../src/pages/MainContent/Account/components/InjuryDataForm';
import { expect } from 'vitest';
import { within } from '@testing-library/react';
import '@testing-library/jest-dom';


describe('InjuryDataForm Component', () => {
  const mockInjuryDetails = {
    type_of_injury: 'shoulder',
    injury_occured: 'TWO_WEEKS_TO_1_MONTH',
    diagnosed_by_medical_professional: true,
    has_pain_during_daily_activities: false,
    is_get_physiotherapy_before: true,
    physiothrtapy_description: 'Resistance band exercises',
    pain_level: 7,
    stiffness: 4,
    swelling: 2,
    had_surgery: true,
    surgery_date: '2024-03-01T00:00:00.000Z',
  };

  beforeEach(() => {
    render(<InjuryDataForm injuryDetails={mockInjuryDetails} />);
  });

  it('displays the selected injury type', () => {
    const dropdown = screen.getByDisplayValue('shoulder');
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toBeDisabled();
  });

  it('displays the correct injury occurrence checkbox as checked and disabled', () => {
    const checkedBox = screen.getByLabelText('2 weeks to 1 month');
    expect(checkedBox).toBeChecked();
    expect(checkedBox).toBeDisabled();
  });

  it('displays diagnosed checkbox (Yes) as checked and disabled', () => {
    const diagnosedSection = screen.getByText(/diagnosed by a medical professional/i).closest('div');
    const yesBox = within(diagnosedSection).getByLabelText('Yes');
    expect(yesBox).toBeChecked();
    expect(yesBox).toBeDisabled();
  });

  it('displays physiotherapy section with text field', () => {
    expect(screen.getByLabelText(/Please specify the type of exercises or therapy/i)).toBeDisabled();
    expect(screen.getByDisplayValue('Resistance band exercises')).toBeInTheDocument();
  });

  it('renders pain, stiffness, and swelling sliders with correct values and disabled', () => {
    expect(screen.getByDisplayValue('7')).toBeDisabled();
    expect(screen.getByDisplayValue('4')).toBeDisabled();
    expect(screen.getByDisplayValue('2')).toBeDisabled();
  });

  it('displays surgery date when surgery is true', () => {
    expect(screen.getByDisplayValue('2024-03-01')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2024-03-01')).toBeDisabled();
  });

  it('all checkboxes are disabled', () => {
    const allCheckboxes = screen.getAllByRole('checkbox');
    allCheckboxes.forEach(checkbox => {
      expect(checkbox).toBeDisabled();
    });
  });
});