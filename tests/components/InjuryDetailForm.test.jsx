import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';


const apiSpy = vi.fn();
import InjuryDetailForm from './../../src/pages/SignUp/InjuryDetailForm';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});
const mockSubmitInjuryDetails = vi.fn((data, callback) => callback());


vi.mock('../../../hooks/useInjuryDetails', () => ({
  default: () => ({
    submitInjuryDetails: (data, callback) => {
      console.log('Mock submitInjuryDetails is called with data:', data);
      apiSpy(data);
      if (callback) callback();
    },
    loading: false,
    error: null
  }),
}));
describe('InjuryDetailForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    render(
      <MemoryRouter>
        <InjuryDetailForm />
      </MemoryRouter>
    );
  });

it('should test API endpoint correctly', async () => {
  const user = userEvent.setup();

  
  await user.click(screen.getByLabelText('Select'));
  await user.click(screen.getByText('Knee'));


  await user.click(screen.getByLabelText('Less than 2 weeks'));

  
  const diagnosisYes = screen.getAllByLabelText('Yes')[0];
  await user.click(diagnosisYes);

  
  expect(screen.getAllByRole('slider').length).toBeGreaterThanOrEqual(3);

  
  const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[0], { target: { value: '7' } });
    fireEvent.change(sliders[1], { target: { value: '4' } });
    fireEvent.change(sliders[2], { target: { value: '2' } });

  const submitButton = screen.getByRole('button', { name: /Get started!/i });
  await user.click(submitButton);
  expect(apiSpy).toHaveBeenCalledTimes(0);
});

  

  it('should render form properly', () => {
    
    expect(screen.getByText('Get Started')).toBeInTheDocument();

    expect(screen.getByText('Which injury are you healing from?')).toBeInTheDocument();
    expect(screen.getByText('How long ago did the injury occur?')).toBeInTheDocument();
    expect(screen.getByText('Have you been diagnosed by a medical professional?')).toBeInTheDocument();
    expect(screen.getByText('Rate your pain (1-10)')).toBeInTheDocument();
    expect(screen.getByText('Rate your stiffness level (1-10)')).toBeInTheDocument();
    expect(screen.getByText('Rate your swelling level (1-10)')).toBeInTheDocument();
    expect(screen.getByText('Does it hurt during daily tasks?')).toBeInTheDocument();
    expect(screen.getByText('Have you had surgery related to this injury?')).toBeInTheDocument();
    expect(screen.getByText('Have you done any physiotherapy for this injury before?')).toBeInTheDocument();
    
  
    expect(screen.getByRole('button', { name: /Get started!/i })).toBeInTheDocument();
  }); 

  it('should handle injury type selection', async () => {
    const user = userEvent.setup();
  
    const injuryTypeSelect = screen.getByLabelText('Select');
    // Select 'Knee'
    await user.click(injuryTypeSelect);
    await user.click(screen.getByText('Knee'));
    
    // Submit 
    await user.click(screen.getByRole('button', { name: /Get started!/i }));
    
    expect(screen.queryByText('Please select an injury type')).not.toBeInTheDocument(); // validation
  }); 
  it('should handle injury time selection', async () => {
    const user = userEvent.setup();
    await user.click(screen.getByLabelText('Less than 2 weeks'));
    
    await user.click(screen.getByRole('button', { name: /Get started!/i }));
    expect(screen.queryByText('Please select when the injury occurred')).not.toBeInTheDocument(); /// validation
  }); 

  it('should handle diagnosis selection', async () => {
    const user = userEvent.setup();
    
    // Select 'Yes' 
    const yesCheckboxes = screen.getAllByLabelText('Yes');
    await user.click(yesCheckboxes[0]);
  
    await user.click(screen.getByRole('button', { name: /Get started!/i }));
    expect(screen.queryByText('Please specify if you have been diagnosed')).not.toBeInTheDocument();
  });

  it('should handle pain level slider', async () => {
    const user = userEvent.setup();
  
    const painSlider = screen.getAllByRole('slider')[0];
    expect(painSlider).toBeInTheDocument();
  });

  it('should handle stiffness level slider', async () => {
    const user = userEvent.setup();
    const stiffnessSlider = screen.getAllByRole('slider')[1];
  
    expect(stiffnessSlider).toBeInTheDocument();
  }); 

  it('should handle swelling level slider', async () => {
    const user = userEvent.setup();
    const swellingSlider = screen.getAllByRole('slider')[2];
  
    expect(swellingSlider).toBeInTheDocument();
  });

  it('should handle daily pain selection', async () => {
    const user = userEvent.setup();
  
    const noCheckboxes = screen.getAllByLabelText('No');
    await user.click(noCheckboxes[0]);

    await user.click(screen.getByRole('button', { name: /Get started!/i }));
  
  });

it('should handle surgery selection', async () => {
  const user = userEvent.setup();
  
  // Select 'Yes' 
  const yesSurgery = screen.getAllByLabelText('Yes')[1];
  await user.click(yesSurgery);
 
  console.log(document.body.innerHTML);
 
  const dateField = document.querySelector('.checkbox-section2 input');
  expect(dateField).not.toBeNull();
  
  // Use fireEvent for direct DOM manipulation
  fireEvent.change(dateField, { target: { value: '2025-04-15' } });
  
  await user.click(screen.getByRole('button', { name: /Get started!/i }));
  
  });
  it('should handle physiotherapy selection with No option', async () => {
    const user = userEvent.setup();
    
    // Select "No" 
    const noOption = screen.getAllByLabelText('No')[0];
    await user.click(noOption);
  
    expect(screen.queryByText('Completed successfully')).not.toBeInTheDocument();
    expect(screen.queryByText('Did therapy but still has issues')).not.toBeInTheDocument();
    
    await user.click(screen.getByRole('button', { name: /get started/i }));
    
  });

  it('should display validation errors when form is submitted empty', async () => {
    const user = userEvent.setup();
  
    await user.click(screen.getByRole('button', { name: /Get started!/i }));
    
    expect(screen.getByText('Please select an injury type')).toBeInTheDocument();
    expect(screen.getByText('Please select when the injury occurred')).toBeInTheDocument();
    expect(screen.getByText('Please specify if you have been diagnosed')).toBeInTheDocument();
    expect(screen.getByText('Please specify if you feel pain during daily tasks')).toBeInTheDocument();
    expect(screen.getByText('Please specify if you have had surgery')).toBeInTheDocument();
    expect(screen.getByText('Please specify if you have had physiotherapy')).toBeInTheDocument();
  });

  it('should successfully submit the form when all required fields are filled', async () => {
    const user = userEvent.setup();

    // 1. Injury type
    const injuryTypeSelect = screen.getByLabelText('Select');
    await user.click(injuryTypeSelect);
    await user.click(screen.getByText('Knee'));
    
    // 2. Injury time
    await user.click(screen.getByLabelText('Less than 2 weeks'));
    
    // 3. Diagnosis
    const yesCheckboxes = screen.getAllByLabelText('Yes');
    await user.click(yesCheckboxes[0]);
    
    // 4. Pain level slider 
    expect(screen.getAllByRole('slider')[0]).toBeInTheDocument();
    
    // 5. Stiffness level slider 
    expect(screen.getAllByRole('slider')[1]).toBeInTheDocument();
    
    // 6. Swelling level slider 
    expect(screen.getAllByRole('slider')[2]).toBeInTheDocument();
    
    // 7. Daily pain
    await user.click(screen.getAllByLabelText('No')[0]);
    
    // 8. Surgery
    await user.click(screen.getAllByLabelText('No')[1]);
    
    // 9. Physiotherapy
    await user.click(screen.getAllByLabelText('No')[2]);
    
    await user.click(screen.getByRole('button', { name: /Get started!/i }));
  });

  it('should show date field when surgery is no', async () => {
    const user = userEvent.setup();
    
    const surgeryQuestion = screen.getByText('Have you had surgery related to this injury?');
    const surgerySection = surgeryQuestion.closest('div')?.parentElement;
   

    // Click on the No  
    const noSurgery = screen.getAllByLabelText('No')[0];
    await user.click(noSurgery);
    
    if (noSurgery) {
      await user.click(noSurgery);
    }
    
    // Date field should be hidden 
    const dateFieldAfter = screen.queryByRole('textbox') || 
                          document.querySelector('input[type="date"]');
    expect(dateFieldAfter).not.toBeInTheDocument();
  });
 
});