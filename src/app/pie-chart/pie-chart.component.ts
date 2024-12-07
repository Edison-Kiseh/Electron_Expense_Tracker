import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerService } from '../color-picker.service';
import { ExpenseListService } from '../expense-list.service';
import { IonButton, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  imports: [IonIcon, IonFabButton, IonFab, IonButton, FormsModule, CommonModule],
  standalone: true,
})
export class PieChartComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  sum: number = 0;
  values: number[] = [];
  colors: string[] = [];
  startAngle: number = 0;
  outerRadius = 100;
  innerRadius = 150; 
  x: number = 0;
  y: number = 0;

  constructor(private listService: ExpenseListService) {}

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    this.x = this.canvasRef.nativeElement.width / 2;
    this.y = this.canvasRef.nativeElement.height / 2;

    // Fetch values and colors from the service
    this.listService.ReadFileData().then(() => {
      this.values = this.listService.getValues();
      this.colors = this.listService.getColors();

      this.calculateSum();
      this.setPiechartSlices();
      this.drawCenterText();
    }).catch((error) => {
      console.error('Error fetching values and colors:', error);
    });    
  }

  calculateSum(): void {
    this.sum = this.values.reduce((acc, val) => acc + val, 0);
  }

  setPiechartSlices(): void {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

    this.startAngle = 0; // Reset start angle
    this.values.forEach((val, index) => {
      const sliceAngle = (val / this.sum) * 2 * Math.PI;

      // Draw the doughnut slice
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.arc(this.x, this.y, this.outerRadius, this.startAngle, this.startAngle + sliceAngle);
      this.ctx.arc(this.x, this.y, this.innerRadius, this.startAngle + sliceAngle, this.startAngle, true);
      this.ctx.closePath();

      // Fill with color
      this.ctx.fillStyle = this.colors[index % this.colors.length];
      this.ctx.fill();

      // Update the start angle for the next slice
      this.startAngle += sliceAngle;
    });

    // Draw center text after clearing and redrawing slices
    this.drawCenterText();
  }

  drawCenterText(): void {
    this.ctx.font = '24px Arial';
    this.ctx.fillStyle = 'black';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(`Total: ${this.sum}`, this.x, this.y);
  }

  ionViewDidEnter() {
    this.print();
  }

  print() {
    console.log("Hello world");
  }
}
