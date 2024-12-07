import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ColorPickerService {
  selectedColour: string = '';

  constructor() { }

  setColour(colour: string): void {
    this.selectedColour = colour;
  }
  
  getColour(): string {
    return this.selectedColour;
  }
}