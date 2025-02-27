import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" (click)="close()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <button class="close-button" (click)="close()">×</button>
        <img [src]="image.link" [alt]="image.title || 'Image'" class="modal-image">
        <div class="image-info">
          <h3>{{ image.title || 'Untitled' }}</h3>
          <p *ngIf="image.description">{{ image.description }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      padding: 20px;
      box-sizing: border-box;
    }
    
    .modal-content {
      position: relative;
      max-width: 90%;
      max-height: 90%;
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
    }
    
    .modal-image {
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
    }
    
    .image-info {
      padding: 15px;
      background-color: white;
    }
    
    .image-info h3 {
      margin: 0 0 10px 0;
      font-size: 18px;
    }
    
    .image-info p {
      margin: 0;
      font-size: 14px;
      color: #666;
    }
  `]
})
export class ImageModalComponent {
  @Input() image: any;
  @Output() closeModal = new EventEmitter<void>();
  
  close() {
    this.closeModal.emit();
  }
} 