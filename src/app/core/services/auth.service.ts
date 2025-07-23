import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isVerified: boolean;
  createdAt: Date;
  token?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  country?: string;
  zipCode?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  acceptTerms: boolean;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
  errors?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.tradeeu.com/auth'; // URL de API real (cambiar por tu API)
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  // Usuarios de prueba (eliminar cuando tengas BD real)
  private mockUsers = [
    {
      id: '1',
      firstName: 'Admin',
      lastName: 'TradeEU',
      email: 'admin@tradeeu.com',
      password: '123456',
      phone: '+1234567890',
      isVerified: true,
      createdAt: new Date()
    },
    {
      id: '2',
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo@tradeeu.com',
      password: 'Demo123!',
      phone: '+1987654321',
      isVerified: true,
      createdAt: new Date()
    }
  ];
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Verificar si hay un token guardado al inicializar
    this.checkStoredAuth();
  }

  private checkStoredAuth(): void {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        user.token = token;
        this.currentUserSubject.next(user);
      } catch (error) {
        this.logout();
      }
    }
  }

  register(registerData: RegisterRequest): Observable<AuthResponse> {
    // Simular llamada a API (eliminar cuando tengas BD real)
    return new Observable<AuthResponse>(observer => {
      setTimeout(() => {
        // Verificar si el email ya existe
        const emailExists = this.mockUsers.some(user => user.email === registerData.email);
        
        if (emailExists) {
          observer.next({
            success: false,
            message: 'Este email ya está registrado'
          });
        } else {
          // Crear nuevo usuario
          const newUser: User = {
            id: (this.mockUsers.length + 1).toString(),
            firstName: registerData.firstName,
            lastName: registerData.lastName,
            email: registerData.email,
            phone: registerData.phone,
            isVerified: true,
            createdAt: new Date()
          };
          
          // Agregar a la lista de usuarios mock
          this.mockUsers.push({
            ...newUser,
            password: registerData.password
          });
          
          // Simular token
          const mockToken = 'mock_jwt_token_' + Date.now();
          
          observer.next({
            success: true,
            user: newUser,
            token: mockToken,
            message: 'Usuario registrado exitosamente'
          });
        }
        observer.complete();
      }, 1500); // Simular delay de red
    }).pipe(
      catchError(this.handleError)
    );

    // Código original para API real (descomentar cuando tengas BD)
    /*
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, registerData, this.httpOptions)
      .pipe(
        map(response => {
          if (response.success && response.user) {
            if (response.token) {
              this.setAuthData(response.user, response.token);
            }
          }
          return response;
        }),
        catchError(this.handleError)
      );
    */
  }

  login(loginData: LoginRequest): Observable<AuthResponse> {
    // Simular llamada a API (eliminar cuando tengas BD real)
    return new Observable<AuthResponse>(observer => {
      setTimeout(() => {
        // Buscar usuario en la lista mock
        const mockUser = this.mockUsers.find(user => 
          user.email === loginData.email && user.password === loginData.password
        );
        
        if (mockUser) {
          // Login exitoso
          const user: User = {
            id: mockUser.id,
            firstName: mockUser.firstName,
            lastName: mockUser.lastName,
            email: mockUser.email,
            phone: mockUser.phone,
            isVerified: mockUser.isVerified,
            createdAt: mockUser.createdAt
          };
          
          const mockToken = 'mock_jwt_token_' + Date.now();
          
          // Guardar sesión
          this.setAuthData(user, mockToken, loginData.rememberMe);
          
          observer.next({
            success: true,
            user,
            token: mockToken,
            message: 'Login exitoso'
          });
        } else {
          // Login fallido
          observer.next({
            success: false,
            message: 'Credenciales incorrectas'
          });
        }
        observer.complete();
      }, 1000); // Simular delay de red
    }).pipe(
      catchError(this.handleError)
    );

    // Código original para API real (descomentar cuando tengas BD)
    /*
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginData, this.httpOptions)
      .pipe(
        map(response => {
          if (response.success && response.user && response.token) {
            this.setAuthData(response.user, response.token, loginData.rememberMe);
          }
          return response;
        }),
        catchError(this.handleError)
      );
    */
  }

  logout(): void {
    // Llamar al endpoint de logout si existe
    const token = this.getToken();
    if (token) {
      const headers = this.getAuthHeaders();
      this.http.post(`${this.apiUrl}/logout`, {}, { headers }).subscribe();
    }

    // Limpiar datos locales
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user_data');
    
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  verifyEmail(token: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/verify-email`, { token }, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  forgotPassword(email: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/forgot-password`, { email }, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  resetPassword(token: string, newPassword: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/reset-password`, 
      { token, newPassword }, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  changePassword(currentPassword: string, newPassword: string): Observable<AuthResponse> {
    const headers = this.getAuthHeaders();
    return this.http.post<AuthResponse>(`${this.apiUrl}/change-password`, 
      { currentPassword, newPassword }, { headers })
      .pipe(catchError(this.handleError));
  }

  updateProfile(userData: Partial<User>): Observable<AuthResponse> {
    const headers = this.getAuthHeaders();
    return this.http.put<AuthResponse>(`${this.apiUrl}/profile`, userData, { headers })
      .pipe(
        map(response => {
          if (response.success && response.user) {
            const currentUser = this.currentUserSubject.value;
            if (currentUser) {
              const updatedUser = { ...currentUser, ...response.user };
              this.currentUserSubject.next(updatedUser);
              localStorage.setItem('user_data', JSON.stringify(updatedUser));
            }
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

  checkEmailExists(email: string): Observable<{ exists: boolean }> {
    // Simular llamada a API (eliminar cuando tengas BD real)
    return new Observable<{ exists: boolean }>(observer => {
      setTimeout(() => {
        const exists = this.mockUsers.some(user => user.email === email);
        observer.next({ exists });
        observer.complete();
      }, 500); // Simular delay de red más corto para validación
    }).pipe(
      catchError(() => of({ exists: false }))
    );

    // Código original para API real (descomentar cuando tengas BD)
    /*
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}/check-email/${encodeURIComponent(email)}`)
      .pipe(catchError(this.handleError));
    */
  }

  refreshToken(): Observable<AuthResponse> {
    const token = this.getToken();
    if (!token) {
      return throwError('No token available');
    }

    const headers = this.getAuthHeaders();
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh-token`, {}, { headers })
      .pipe(
        map(response => {
          if (response.success && response.token) {
            localStorage.setItem('auth_token', response.token);
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

  // Métodos de utilidad
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  }

  private setAuthData(user: User, token: string, remember: boolean = false): void {
    const storage = remember ? localStorage : sessionStorage;
    
    storage.setItem('auth_token', token);
    storage.setItem('user_data', JSON.stringify(user));
    
    user.token = token;
    this.currentUserSubject.next(user);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  private handleError = (error: any): Observable<never> => {
    console.error('Auth Service Error:', error);
    
    let errorMessage = 'Ha ocurrido un error inesperado';
    
    if (error.error) {
      if (typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.error.message) {
        errorMessage = error.error.message;
      } else if (error.error.errors) {
        errorMessage = Object.values(error.error.errors).join(', ');
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    // Si es error 401, hacer logout
    if (error.status === 401) {
      this.logout();
    }

    return throwError({
      success: false,
      message: errorMessage,
      errors: error.error?.errors || null
    });
  }
}
