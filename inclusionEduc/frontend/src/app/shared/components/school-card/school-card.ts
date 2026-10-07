import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface School {
  id: string;
  name: string;
  address: string;
  phone?: string;
  inclusiveFeatures: string[];
}

@Component({
  selector: 'app-school-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './school-card.html',
  styleUrl: './school-card.css'
})
export class SchoolCardComponent {
  @Input() school!: School;
  @Output() viewDetails = new EventEmitter<string>();

  onDetails(): void {
    if (this.school?.id) {
      this.viewDetails.emit(this.school.id);
    }
  }
} 