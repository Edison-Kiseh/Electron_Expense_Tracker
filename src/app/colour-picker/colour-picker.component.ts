import { Component, OnInit } from '@angular/core';
import { IonCol, IonTitle, IonHeader, IonToolbar, IonGrid, IonRow, IonButton, IonContent, IonModal, IonButtons } from "@ionic/angular/standalone";
import { ColorPickerService } from '../color-picker.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular'

@Component({
  selector: 'app-colour-picker',
  templateUrl: './colour-picker.component.html',
  styleUrls: ['./colour-picker.component.scss'],
  imports: [IonButtons, IonModal, IonContent, IonButton, IonCol, IonGrid, IonRow, FormsModule, CommonModule, IonHeader, IonToolbar, IonTitle],
  standalone: true,
  providers: [ModalController] 
})
export class ColourPickerComponent  implements OnInit {
  showColorPicker = false;
  selectedColor: string = ''; 

  constructor(private modalController: ModalController, private colorService: ColorPickerService) {}

  ngOnInit() {}

  setColor(color: string) {
    this.selectedColor = color;
    this.colorService.setColour(color);
    this.closeModal(color);
    console.log("Selected colour: " + color);
  }

  //dismiss the modal and return the selected color
  closeModal(color: string) {
    this.modalController.dismiss({
      selectedColor: color
    });
  }

  //closing without selecting the color
  cancel() {
    this.modalController.dismiss();
  }
}
