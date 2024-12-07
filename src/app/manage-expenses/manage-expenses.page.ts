import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonButton, IonIcon, IonTabs, IonTab, IonTabBar, IonTabButton, IonModal, IonButtons } from '@ionic/angular/standalone';
import { ExpenseModel } from 'src/models/expense.model';
import { ExpenseListService } from '../expense-list.service';
import { TabsComponent } from "../tabs/tabs.component";
import { addIcons } from 'ionicons';
import { trashBin, home, list, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-manage-expenses',
  templateUrl: './manage-expenses.page.html',
  styleUrls: ['./manage-expenses.page.scss'],
  standalone: true,
  imports: [IonButtons, IonModal, IonTabButton, IonTabBar, IonTab, IonTabs, IonIcon, IonButton, IonItem, IonList, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TabsComponent, TabsComponent]
})
export class ManageExpensesPage implements OnInit {
  values: number[] = [];
  colors: string[] = [];
  categories: string[] = [];
  expenses: ExpenseModel[] = [];
  totalExpenses: number = 0;
  percentages: number[] = [];

  constructor(private expenseListService: ExpenseListService) {
    addIcons({trashOutline,home,list,trashBin});
  }

  ngOnInit() {
    // Fetch values and colors from the service
    this.expenseListService.ReadFileData().then(() => {
      this.updateExpenses();
      this.calculateSum();  
    }).catch((error) => {
      console.error('Error fetching values and colors:', error);
    });  

    //checking and fetching the new updates whenever an item is deleted
    this.expenseListService.updateList.subscribe(() => {
      this.updateExpenses();
      this.calculateSum();
    })
  }

  calculateSum(): void {
    this.totalExpenses = this.values.reduce((acc, val) => acc + val, 0);
  }

  updateExpenses() {
    this.expenseListService.updateData().subscribe(data => {
      this.expenses = data; 
      //sorting the expenses in descending order
      this.expenses.sort((a, b) => b.value - a.value);
      this.values = this.expenseListService.getValues(); 
      this.colors = this.expenseListService.getColors(); 
      this.categories = this.expenseListService.getCategoryNames();
      this.percentages = this.expenseListService.getPercentages();
      //sorting the percentages by descending order
      this.percentages = this.percentages.sort((a, b) => b - a);
      console.log('Updated expense data:', data);
    });
  }

  deleteField(expense: ExpenseModel) {
    console.log(expense);
    this.expenseListService.deleteFromFile(expense.categoryName);
  }
}
