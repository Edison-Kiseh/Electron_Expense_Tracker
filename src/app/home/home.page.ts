import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRouterOutlet, IonButton, IonRouterLink, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { PieChartComponent } from "../pie-chart/pie-chart.component";
import { ColourPickerComponent } from '../colour-picker/colour-picker.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseModel } from 'src/models/expense.model';
import { ExpenseListComponent } from "../expense-list/expense-list.component";
import { Router } from '@angular/router';
import { TabsComponent } from "../tabs/tabs.component";
import { addIcons } from 'ionicons';
import { add, triangle, ellipse } from 'ionicons/icons';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab, IonLabel, IonIcon, IonTabButton, IonTabBar, IonTabs, IonRouterLink, IonButton, ExpenseListComponent, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonContent, PieChartComponent, ColourPickerComponent, CommonModule, FormsModule, ExpenseListComponent, TabsComponent],
  providers: []
})
export class HomePage {
  showColorPicker: boolean = false;
  buttonText: string = 'Show color picker';
  expenseList: ExpenseModel[] = [];
  
  constructor(private router: Router) {
    addIcons({triangle,ellipse,add});
  }

  toggleColorPicker(): void{
    this.showColorPicker = !this.showColorPicker;

    if(this.showColorPicker) {
      this.buttonText = 'Hide color picker';
    }
    else{
      this.buttonText = 'Show color picker';
    }
  }

  addExpense() {
    // Logic to add a new expense, for example, open a modal or redirect to a form
    console.log("FAB Clicked! Time to add an expense."); 
    // Here, you could trigger a form or a modal for adding expenses
  }

  onClickFAB() {
    this.router.navigate(['/input-details']);
  }
}
