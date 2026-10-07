import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, of, catchError } from 'rxjs';
import { ApiService } from './shared/services/api.service';
import { SchoolCardComponent, School } from './shared/components/school-card/school-card';
import { CourseCardComponent, Course } from './shared/components/course-card/course-card';
import { ReportCardComponent, Report } from './shared/components/report-card/report-card';

interface EscuelaApi {
    escuela_id: number;
    nombre: string;
    direccion?: string;
    telefono?: string;
    usuarios?: unknown[];
    reportes?: unknown[];
}

interface CursoApi {
    curso_id: number;
    titulo: string;
    descripcion: string;
    duracion_min: number;
    nivel?: string;
    video_url?: string | null;
    pdf_data?: string | null;
    pdf_name?: string | null;
    inscripciones?: Array<{ porcentaje_progreso?: number }>;
}

interface UsuarioApi {
    usuario_id: number;
    nombre: string;
    email: string;
    rol_id: number;
    estado?: string;
    rol?: { nombre: string };
    escuela?: { escuela_id?: number; nombre?: string };
}

interface ReporteApi {
    reporte_id: number;
    titulo?: string;
    tipo_acoso: string;
    descripcion: string;
    nivel_prioridad?: string;
    estado?: string;
    fecha?: string | Date;
}

interface EventoApi {
    evento_id: number;
    titulo: string;
    fecha_evento: string | Date;
    lugar: string;
    escuela?: { nombre: string };
}

interface UsuarioForm {
    nombre: string;
    email: string;
    password: string;
    rol_id: number;
    escuela_id: string;
}

interface EscuelaForm {
    nombre: string;
    codigo_distrito: string;
    direccion: string;
    telefono: string;
}

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, FormsModule, SchoolCardComponent, CourseCardComponent, ReportCardComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
    private readonly api = inject(ApiService);
    private readonly router = inject(Router);

    schools: School[] = [];
    courses: Course[] = [];
    reports: Report[] = [];
    events: EventoApi[] = [];
    users: UsuarioApi[] = [];
    activeSection: 'schools' | 'courses' | 'course-create' | 'reports' | 'events' | 'users' | 'schools-management' | 'profile' = 'schools';
    loading = true;
    error = '';
    user: UsuarioApi | null = this.readUser();

    reportForm = { escuela_id: '', tipo_acoso: '', descripcion: '', nivel_prioridad: 'Media' };
    eventForm = { escuela_id: '', titulo: '', fecha_evento: '', lugar: '' };
    profileForm = { nombre: '', email: '', password: '' };
    courseForm = {
        titulo: '',
        descripcion: '',
        duracion_min: '45',
        nivel: 'Básico',
        video_url: '',
        pdf: null as File | null,
        pdf_data: '',
        pdf_name: '',
    };
    editingReportId: number | null = null;
    userForm: UsuarioForm = { nombre: '', email: '', password: '', rol_id: 3, escuela_id: '' };
    schoolForm: EscuelaForm = { nombre: '', codigo_distrito: '', direccion: '', telefono: '' };
    editingCourseId: string | null = null;
    editingUserId: number | null = null;
    editingSchoolId: number | null = null;

    ngOnInit(): void {
        if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
            this.loading = false;
            return;
        }

        this.loadData();
        this.profileForm = {
            nombre: this.user?.nombre ?? '',
            email: this.user?.email ?? '',
            password: '',
        };
    }

    loadData(): void {
        if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
            this.loading = false;
            return;
        }

        this.loading = true;
        this.error = '';

        const emptyResult = <T>() => of([] as T);
        forkJoin({
            escuelas: this.api.get<EscuelaApi[]>('/escuelas').pipe(catchError(() => emptyResult<EscuelaApi[]>())),
            usuarios: this.isAdmin()
                ? this.api.get<UsuarioApi[]>('/usuarios').pipe(catchError(() => emptyResult<UsuarioApi[]>()))
                : of([] as UsuarioApi[]),
            cursos: this.api.get<CursoApi[]>('/cursos').pipe(catchError(() => emptyResult<CursoApi[]>())),
            reportes: this.api.get<ReporteApi[]>('/reportes').pipe(catchError(() => emptyResult<ReporteApi[]>())),
            eventos: this.api.get<EventoApi[]>('/eventos').pipe(catchError(() => emptyResult<EventoApi[]>())),
        }).subscribe({
            next: ({ escuelas, cursos, reportes, eventos, usuarios }) => {
                this.schools = escuelas.map((escuela) => ({
                    id: String(escuela.escuela_id),
                    name: escuela.nombre,
                    address: escuela.direccion ?? 'Sin dirección registrada',
                    phone: escuela.telefono,
                    inclusiveFeatures: ['Estudiantes', 'Reportes de incidencia'],
                }));
                this.courses = cursos.map((curso) => ({
                    id: String(curso.curso_id),
                    title: curso.titulo,
                    description: curso.descripcion,
                    category: curso.nivel ?? 'General',
                    videoUrl: curso.video_url ?? null,
                    pdfData: curso.pdf_data ?? null,
                    pdfName: curso.pdf_name ?? null,
                    progress: curso.inscripciones?.[0]?.porcentaje_progreso,
                }));
                this.reports = reportes.map((reporte) => ({
                    id: String(reporte.reporte_id),
                    title: reporte.titulo ?? reporte.tipo_acoso,
                    date: new Date(reporte.fecha ?? Date.now()).toLocaleDateString('es-ES'),
                    status: (reporte.estado ?? 'Pendiente').toUpperCase() as Report['status'],
                    description: reporte.descripcion,
                }));
                this.events = eventos;
                this.users = usuarios;
                this.loading = false;
            },
            error: () => this.setError('No se pudieron cargar los datos del dashboard.'),
        });
    }

    selectCourse(courseId: string): void {
        if (!this.isStudent()) {
            this.setError('La matrícula está disponible únicamente para estudiantes.');
            return;
        }

        this.api.post('/cursos/inscribir', { curso_id: Number(courseId) }).subscribe({
            next: () => {
                this.loadData();
                this.activeSection = 'courses';
            },
            error: () => this.setError('No se pudo inscribir al curso.'),
        });
    }

    async createCourse(): Promise<void> {
        if (!this.canManageCourses() || !this.courseForm.titulo || !this.courseForm.descripcion || !this.courseForm.duracion_min) {
            this.setError('Completa título, descripción y duración.');
            return;
        }
        if (this.editingCourseId !== null) {
            this.updateCourse(this.editingCourseId);
            return;
        }
        if (this.courseForm.pdf && this.courseForm.pdf.type !== 'application/pdf') {
            this.setError('Solo se permiten archivos PDF.');
            return;
        }

        if (this.courseForm.pdf && this.courseForm.pdf.size > 10 * 1024 * 1024) {
            this.setError('El PDF debe pesar menos de 10 MB.');
            return;
        }

        const pdfData = this.courseForm.pdf
            ? await this.readFileAsDataUrl(this.courseForm.pdf)
            : null;

        this.api.post('/cursos', {
            titulo: this.courseForm.titulo,
            descripcion: this.courseForm.descripcion,
            duracion_min: Number(this.courseForm.duracion_min),
            nivel: this.courseForm.nivel,
            video_url: this.courseForm.video_url || null,
            pdf_data: pdfData,
            pdf_name: this.courseForm.pdf?.name ?? null,
        }).subscribe({
            next: () => {
                this.courseForm = {
                    titulo: '',
                    descripcion: '',
                    duracion_min: '45',
                    nivel: 'Básico',
                    video_url: '',
                    pdf: null,
                    pdf_data: '',
                    pdf_name: '',
                };
                this.activeSection = 'courses';
                this.loadData();
            },
            error: () => this.setError('No se pudo crear el curso.'),
        });
    }

    selectPdf(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0] ?? null;
        this.courseForm.pdf = file;
        this.courseForm.pdf_name = file?.name ?? '';
        this.courseForm.pdf_data = '';
    }

    private readFileAsDataUrl(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
        });
    }

    createReport(): void {
        if (!this.reportForm.escuela_id || !this.reportForm.tipo_acoso || !this.reportForm.descripcion) {
            this.setError('Completa escuela, tipo de acoso y descripción.');
            return;
        }
        const body = {
            escuela_id: Number(this.reportForm.escuela_id),
            tipo_acoso: this.reportForm.tipo_acoso,
            descripcion: this.reportForm.descripcion,
            nivel_prioridad: this.reportForm.nivel_prioridad,
            es_anonimo: true,
        };
        const request = this.editingReportId === null
            ? this.api.post<ReporteApi>('/reportes', body)
            : this.api.patch<ReporteApi>(`/reportes/${this.editingReportId}`, body);
        request.subscribe({
            next: () => {
                this.editingReportId = null;
                this.reportForm = { escuela_id: '', tipo_acoso: '', descripcion: '', nivel_prioridad: 'Media' };
                this.loadData();
            },
            error: () => this.setError('No se pudo guardar el reporte.'),
        });
    }

    deleteReport(reportId: number): void {
        if (!this.canManageCourses()) return;
        this.api.delete(`/reportes/${reportId}`).subscribe({
            next: () => this.loadData(),
            error: () => this.setError('No se pudo eliminar el reporte.'),
        });
    }

    startEditReport(reportId: number): void {
        if (!this.canManageCourses()) return;
        const report = this.reports.find((item) => item.id === String(reportId));
        if (!report) return;
        this.editingReportId = reportId;
        this.reportForm = {
            escuela_id: '',
            tipo_acoso: report.title,
            descripcion: report.description,
            nivel_prioridad: 'Media',
        };
    }
    createEvent(): void {
        if (!this.eventForm.escuela_id || !this.eventForm.titulo || !this.eventForm.fecha_evento || !this.eventForm.lugar) {
            this.setError('Completa todos los datos del taller.');
            return;
        }
        this.api.post<EventoApi>('/eventos', {
            escuela_id: Number(this.eventForm.escuela_id),
            creador_id: this.user?.usuario_id ?? 0,
            titulo: this.eventForm.titulo,
            fecha_evento: this.eventForm.fecha_evento,
            lugar: this.eventForm.lugar,
        }).subscribe({
            next: () => {
                this.eventForm = { escuela_id: '', titulo: '', fecha_evento: '', lugar: '' };
                this.loadData();
            },
            error: () => this.setError('No se pudo crear el taller.'),
        });
    }

    deleteCourse(courseId: string): void {
        if (!this.canManageCourses()) return;
        this.api.delete(`/cursos/${courseId}`).subscribe({
            next: () => this.loadData(),
            error: () => this.setError('No se pudo eliminar el curso.'),
        });
    }

    startEditCourse(courseId: string): void {
        if (!this.canManageCourses()) return;
        const course = this.courses.find((item) => item.id === courseId);
        if (!course) return;
        this.editingCourseId = courseId;
        this.courseForm = {
            titulo: course.title,
            descripcion: course.description,
            duracion_min: '45',
            nivel: course.category,
            video_url: course.videoUrl ?? '',
            pdf: null,
            pdf_data: '',
            pdf_name: '',
        };
        this.activeSection = 'course-create';
    }

    deleteEvent(eventId: number): void {
        if (!this.isAdmin()) return;
        this.api.delete(`/eventos/${eventId}`).subscribe({
            next: () => this.loadData(),
            error: () => this.setError('No se pudo eliminar el taller.'),
        });
    }

    updateCourse(courseId: string): void {
        if (!this.canManageCourses()) return;
        this.api.patch(`/cursos/${courseId}`, {
            titulo: this.courseForm.titulo,
            descripcion: this.courseForm.descripcion,
            duracion_min: Number(this.courseForm.duracion_min),
            nivel: this.courseForm.nivel,
            video_url: this.courseForm.video_url || null,
        }).subscribe({
            next: () => {
                this.editingCourseId = null;
                this.courseForm = {
                    titulo: '', descripcion: '', duracion_min: '45', nivel: 'Básico',
                    video_url: '', pdf: null, pdf_data: '', pdf_name: '',
                };
                this.loadData();
            },
            error: () => this.setError('No se pudo editar el curso.'),
        });
    }

    saveProfile(): void {
        if (!this.user) return;

        const body: Record<string, unknown> = {};
        if (this.profileForm.nombre.trim()) body['nombre'] = this.profileForm.nombre.trim();
        if (this.profileForm.email.trim()) body['email'] = this.profileForm.email.trim();
        if (this.profileForm.password) body['password'] = this.profileForm.password;

        if (Object.keys(body).length === 0) return;

        this.api.patch<UsuarioApi>('/usuarios/me', body).subscribe({
            next: (updatedUser) => {
                this.user = updatedUser;
                localStorage.setItem('inclusionEduc-user', JSON.stringify(updatedUser));
                this.profileForm.password = '';
                this.setError('Perfil actualizado correctamente.');
            },
            error: () => this.setError('No se pudo actualizar el perfil.'),
        });
    }

    saveUser(): void {
        if (!this.isAdmin() || !this.userForm.nombre || !this.userForm.email) return;
        if (this.editingUserId === null && !this.userForm.password) return;
        const body = {
            nombre: this.userForm.nombre,
            email: this.userForm.email,
            password: this.userForm.password || undefined,
            rol_id: this.userForm.rol_id,
            escuela_id: this.userForm.escuela_id ? Number(this.userForm.escuela_id) : null,
        };
        const request = this.editingUserId === null
            ? this.api.post('/usuarios', body)
            : this.api.patch(`/usuarios/${this.editingUserId}`, body);
        request.subscribe({
            next: () => {
                this.userForm = { nombre: '', email: '', password: '', rol_id: 3, escuela_id: '' };
                this.editingUserId = null;
                this.loadData();
            },
            error: () => this.setError('No se pudo guardar el usuario.'),
        });
    }

    deleteUser(userId: number): void {
        if (!this.isAdmin()) return;
        this.api.delete(`/usuarios/${userId}`).subscribe({ next: () => this.loadData() });
    }

    saveSchool(): void {
        if (!this.isAdmin() || !this.schoolForm.nombre) return;
        const body = {
            nombre: this.schoolForm.nombre,
            codigo_distrito: this.schoolForm.codigo_distrito || null,
            direccion: this.schoolForm.direccion || null,
            telefono: this.schoolForm.telefono || null,
        };
        const request = this.editingSchoolId === null
            ? this.api.post('/escuelas', body)
            : this.api.patch(`/escuelas/${this.editingSchoolId}`, body);
        request.subscribe({
            next: () => {
                this.schoolForm = { nombre: '', codigo_distrito: '', direccion: '', telefono: '' };
                this.editingSchoolId = null;
                this.loadData();
            },
            error: () => this.setError('No se pudo guardar la escuela.'),
        });
    }

    deleteSchool(schoolId: number): void {
        if (!this.isAdmin()) return;
        this.api.delete(`/escuelas/${schoolId}`).subscribe({ next: () => this.loadData() });
    }

    logout(): void {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            localStorage.removeItem('inclusionEduc-token');
            localStorage.removeItem('inclusionEduc-user');
        }
        this.router.navigate(['/']);
    }

    canManageCourses(): boolean {
        return this.user?.rol_id === 1 || this.user?.rol_id === 2;
    }

    isAdmin(): boolean {
        return this.user?.rol_id === 1;
    }

    isStudent(): boolean {
        return this.user?.rol_id === 3;
    }

    parseInt(value: string, radix: number): number {
        return Number.parseInt(value, radix);
    }

    private loadReportsAndEvents(): void {
        this.api.get<ReporteApi[]>('/reportes').subscribe({
            next: (reportes) => {
                this.reports = reportes.map((reporte) => ({
                    id: String(reporte.reporte_id),
                    title: reporte.titulo ?? reporte.tipo_acoso,
                    date: new Date(reporte.fecha ?? Date.now()).toLocaleDateString('es-ES'),
                    status: (reporte.estado ?? 'Pendiente').toUpperCase() as Report['status'],
                    description: reporte.descripcion,
                }));
                this.api.get<EventoApi[]>('/eventos').subscribe({
                    next: (eventos) => {
                        this.events = eventos;
                        this.loading = false;
                    },
                    error: () => this.setError('No se pudieron cargar los talleres.'),
                });
            },
            error: () => this.setError('No se pudieron cargar los reportes.'),
        });
    }

    private readUser(): UsuarioApi | null {
        if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
            return null;
        }

        try {
            const user = localStorage.getItem('inclusionEduc-user');
            return user ? JSON.parse(user) as UsuarioApi : null;
        } catch {
            return null;
        }
    }

    private setError(message: string): void {
        this.error = message;
        this.loading = false;
    }
}





