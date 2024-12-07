import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExpenseListService } from '../expense-list.service';
import { ExpenseModel } from 'src/models/expense.model';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel } from "@ionic/angular/standalone";

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
  imports: [IonLabel, IonItem, IonList, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, CommonModule],
  standalone: true,
})
export class ExpenseListComponent implements OnInit {
  values: number[] = [];
  colors: string[] = [];
  categories: string[] = [];
  expenses: ExpenseModel[] = [];
  totalExpenses: number = 0;
  percentages: number[] = [];

  constructor(private expenseListService: ExpenseListService) {}

  ngOnInit() {
    // Fetch values and colors from the service
    this.expenseListService.ReadFileData().then(() => {
      this.updateExpenses();
      this.calculateSum();  
    }).catch((error) => {
      console.error('Error fetching values and colors:', error);
    });  
  }

  calculateSum(): void {
    this.totalExpenses = this.values.reduce((acc, val) => acc + val, 0);
  }

  updateExpenses() {
    this.expenseListService.updateData().subscribe(data => {
      this.expenses = data; 
      this.values = this.expenseListService.getValues(); 
      this.colors = this.expenseListService.getColors(); 
      this.categories = this.expenseListService.getCategoryNames();
      this.percentages = this.expenseListService.getPercentages();
      console.log('Updated expense data:', data);
    });
  }

  deleteField(categoryName: string) {
    this.expenseListService.deleteFromFile(categoryName);
  }
}

