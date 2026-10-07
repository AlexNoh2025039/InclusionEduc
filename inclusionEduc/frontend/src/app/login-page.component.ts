import { Component } from '@angular/core';
import { LoginCardComponent } from './shared/components/login-card/login-card';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginCardComponent],
  template: `
    <main class="app-shell">
      <section class="app-intro">
        <p class="eyebrow">Inclusión Educativa</p>
        <h1>Accede a tu espacio educativo</h1>
        <p>Inicio sesión para consultar escuelas, cursos y reportes.</p>
      </section>
      <app-login-card />
    </main>
  `,
  styles: [
    `
      :host { display: block; min-height: 100vh; background: #f4f7fb; color: #172033; font-family: Inter, system-ui, sans-serif; }
      .app-shell { display: grid; grid-template-columns: minmax(0, 1fr) minmax(320px, 440px); gap: 4rem; align-items: center; min-height: 100vh; padding: 3rem clamp(1.5rem, 6vw, 7rem); box-sizing: border-box; }
      .app-intro h1 { max-width: 650px; margin: .5rem 0 1rem; font-size: clamp(2.5rem, 5vw, 5rem); line-height: 1.05; }
      .app-intro > p:last-child { max-width: 560px; color: #59657a; font-size: 1.1rem; }
      .eyebrow { margin: 0; color: #1769aa; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
      @media (max-width: 760px) { .app-shell { grid-template-columns: 1fr; gap: 2rem; padding: 2rem 1.25rem; } }
    `,
  ],
})
export class LoginPageComponent { }
