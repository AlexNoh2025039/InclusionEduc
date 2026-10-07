import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface AuthResponse {
    token: string;
    usuario: {
        usuario_id: number;
        nombre: string;
        email: string;
        rol_id: number;
    };
}

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = 'http://localhost:3000/api';

    login(email: string, password: string) {
        return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, { email, password });
    }

    register(name: string, email: string, password: string) {
        return this.http.post(`${this.baseUrl}/auth/register`, {
            nombre: name,
            email,
            password,
            rol_id: 3,
        });
    }

    get<T>(path: string) {
        return this.http.get<T>(`${this.baseUrl}${path}`, {
            headers: this.authHeaders(),
        });
    }

    post<T>(path: string, body: unknown) {
        return this.http.post<T>(`${this.baseUrl}${path}`, body, {
            headers: this.authHeaders(),
        });
    }

    patch<T>(path: string, body: unknown) {
        return this.http.patch<T>(`${this.baseUrl}${path}`, body, {
            headers: this.authHeaders(),
        });
    }

    delete<T>(path: string) {
        return this.http.delete<T>(`${this.baseUrl}${path}`, {
            headers: this.authHeaders(),
        });
    }

    private authHeaders(): HttpHeaders {
        if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
            return new HttpHeaders();
        }

        const token = localStorage.getItem('inclusionEduc-token');
        return token
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : new HttpHeaders();
    }
}
