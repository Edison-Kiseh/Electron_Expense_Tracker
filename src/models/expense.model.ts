export class ExpenseModel {
    categoryName: string
    color: string;
    value: number;
    percentages: number;
  
    constructor(color: string, value: number, category: string, percent = 0) {
      this.color = color;
      this.value = value;
      this.categoryName = category;
      this.percentages = percent;
    }
  }