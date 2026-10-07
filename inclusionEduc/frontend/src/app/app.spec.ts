import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the educational login view', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Accede a tu espacio educativo');
    expect(compiled.querySelector('app-login-card')).toBeTruthy();
  });

  it('should show the registration form from the login card', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    const registerButton = compiled.querySelector<HTMLButtonElement>('[data-action="show-register"]');
    expect(registerButton).toBeTruthy();

    registerButton!.click();
    await fixture.whenStable();

    expect(compiled.textContent).toContain('Crear cuenta');
    expect(compiled.querySelector('form[data-form="register"]')).toBeTruthy();
  });
});
