import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  videoUrl?: string | null;
  pdfData?: string | null;
  pdfName?: string | null;
  progress?: number;
}

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCardComponent {
  @Input() course!: Course;
  @Output() selectCourse = new EventEmitter<string>();

  onSelect(): void {
    if (this.course?.id) {
      this.selectCourse.emit(this.course.id);
    }
  }
}