import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { home, add, list, barbellOutline, triangle, ellipse } from 'ionicons/icons';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonTab } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [IonLabel , IonIcon, IonTabButton, IonTabBar, IonTabs, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonTab, RouterLink],
  standalone: true,
})
export class TabsComponent  implements OnInit {

  constructor() { 
    addIcons({triangle,ellipse,home,list,barbellOutline,add});
  }

  ngOnInit() {}

}
