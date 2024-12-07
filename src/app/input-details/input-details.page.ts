import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonList, IonButton, IonInput, IonCardContent, IonCardTitle, IonCardHeader, IonCard } from '@ionic/angular/standalone';
import { ColourPickerComponent } from '../colour-picker/colour-picker.component';
import { ColorPickerService } from '../color-picker.service';
import { ExpenseListService } from '../expense-list.service';
import { TabsComponent } from "../tabs/tabs.component";
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-details',
  templateUrl: './input-details.page.html',
  styleUrls: ['./input-details.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonButton, IonList, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ColourPickerComponent, TabsComponent, TabsComponent],
  providers: [ModalController] 
})
export class InputDetailsPage{
  inputForm: FormGroup;
  showColorPicker: boolean = false;
  buttonText: string = 'Choose colour';
  price: number | null = null;
  categoryName: string = '';
  color: string = '';
  selectedColor: string = '';
  selectedColorText: string = '';

  constructor(private router: Router, private fb: FormBuilder, private colourService: ColorPickerService, private listService: ExpenseListService, private modalController: ModalController) {
    this.inputForm = this.fb.group({
      categoryName: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    // Get color from color picker service if required
    this.color = this.colourService.getColour();
    
    console.log('Form Data:', {
      categoryName: this.categoryName,
      price: this.price,
      color: this.color
    });

    // Ensure values are defined before calling the service method
    if (this.categoryName && this.price !== null) {
      // Update the expense list with new data
      this.listService.setExpenseDetails(this.price, this.color, this.categoryName);

      this.resetData();
    }

    alert("Your expense has been added!");
    // this.router.navigate(['/home']);
  }

  // resetting form data
  resetData() {
    this.categoryName = '';
    this.price = null;
    this.color = '';
    this.showColorPicker = false;
    this.buttonText = 'Choose Color';
    this.selectedColor = '';
    this.selectedColorText = 'No colour selected';
  }

  //opening the color picker
  async openColorPicker() {
    try{
      const modal = await this.modalController.create({
        component: ColourPickerComponent,
        cssClass: 'color-picker-modal'
      });

      await modal.present();
      console.log("Modal opened");

      //Get the selected color from the modal when it is dismissed
      const { data } = await modal.onDidDismiss();
      if (data && data.selectedColor) {
        this.selectedColor = data.selectedColor;
        this.selectedColorText = this.selectedColor;
        // this.buttonText = `Color: ${data.selectedColor}`; //Updating button text
        this.colourService.setColour(data.selectedColor); //store the color
      }
    }
    catch(error) {
      console.error('An error occurred:', error);
    }
  }
}
