import { Component } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px) scale(0.95)' }),
        animate('500ms cubic-bezier(0.25, 1.25, 0.5, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(20px) scale(0.95)' }))
      ])
    ])
  ]
})
export class ContactComponent {
  submitted = false;
  revealForm = false;
  isSending = false;

  constructor(private http: HttpClient) {}
  
  onSubmit(form: NgForm) {
    if (!form.valid) return;

    this.isSending = true;

    const formData = new FormData();
    formData.append('email', form.value.email);
    formData.append('message', form.value.message);

    this.http
      .post('https://formspree.io/f/xkgjelga', formData, {
        headers: new HttpHeaders({ Accept: 'application/json' })
      })
      .subscribe({
        next: () => {
          this.submitted = true;
          this.isSending = false;
          form.reset();
          setTimeout(() => {
            this.submitted = false;
            this.revealForm = false;
          }, 4000);
        },
        error: () => {
          this.isSending = false;
          alert('Something went wrong. Please try again later.');
        }
      });
  }

  toggleForm() {
    this.revealForm = !this.revealForm;
    this.submitted = false;
  }
}