import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

const existingNames = ['JohnDoe', 'Subaru','Rewell Munene', 'Land Cruiser76' ,'JaneSmith', 'User123']; // Simulated database

export function asyncNameValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (existingNames.includes(control.value)) {
          resolve({ nameTaken: true }); // Validation error
        } else {
          resolve(null); // Valid name
        }
      }, 1000); // Simulated network delay
    });
  };
}
