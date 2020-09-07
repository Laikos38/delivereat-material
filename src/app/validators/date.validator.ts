import { AbstractControl } from '@angular/forms';


export function dateValidator(control: AbstractControl) : {[key : string] : boolean} | null {
  const today = new Date();

  const month = control.value.substring(0, 2);
  const year = control.value.substring(3, 7);
  

  let inputToday = new Date();
  inputToday.setMonth(month-1);
  inputToday.setFullYear(year);


  if (inputToday >= today) {
      return null;
  }
  return {'dateValidator' : true}
}