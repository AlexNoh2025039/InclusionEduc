import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Report {
  id: string;
  title: string;
  date: string;
  status: 'PENDING' | 'RESOLVED' | 'IN_PROGRESS';
  description: string;
}

@Component({
  selector: 'app-report-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-card.html',
  styleUrl: './report-card.css'
})
export class ReportCardComponent {
  @Input() report!: Report;

  getStatusClass(): string {
    switch (this.report?.status) {
      case 'RESOLVED': return 'status-resolved';
      case 'IN_PROGRESS': return 'status-in-progress';
      default: return 'status-pending';
    }
  }

  getStatusText(): string {
    switch (this.report?.status) {
      case 'RESOLVED': return 'Resuelto';
      case 'IN_PROGRESS': return 'En Proceso';
      default: return 'Pendiente';
    }
  }
}