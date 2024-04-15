import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilitiesService {

  /*
  * Returns the current timestamp in the format: dd-mm-yyyy hh:mm:ss
  */
  getCurrentTimestamp(): string {
    const now = new Date();
  
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // January is 0
    const year = now.getFullYear();
    
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
  
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  calculateAgeInYears(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
  
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }

  calculateAgeInYearsMonthsDays(birthDate: Date): { years: number, months: number, days: number } {
    const currentDate = new Date();
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();
  
    if (days < 0) {
      // Borrow days from previous month
      months--;
      const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      days += lastMonth.getDate();
    }
  
    if (months < 0) {
      // Borrow months from previous year
      years--;
      months += 12;
    }
  
    return { years, months, days };
  }
 
}