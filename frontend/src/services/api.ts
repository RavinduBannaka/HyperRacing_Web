// Backend API Service for 192.168.1.5:3000
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://192.168.1.5:3000'

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

class ApiService {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL.replace(/\/+$/, '') // Remove trailing slashes
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `HTTP ${response.status}: ${response.statusText}`,
        }
      }

      return {
        success: true,
        data,
        message: data.message,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      }
    }
  }

  // GET request
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint
    return this.request<T>(url)
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    })
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }
}

// Create and export the API service instance
export const apiService = new ApiService(API_BASE_URL)

// Example usage functions for common endpoints
export const api = {
  // Health check
  health: () => apiService.get('/health'),

  // Authentication
  auth: {
    login: (credentials: { email: string; password: string }) =>
      apiService.post('/auth/login', credentials),

    register: (userData: { email: string; password: string; displayName: string }) =>
      apiService.post('/auth/register', userData),

    logout: () => apiService.post('/auth/logout'),

    refresh: () => apiService.post('/auth/refresh'),
  },

  // User profile
  profile: {
    get: () => apiService.get('/profile'),
    update: (data: any) => apiService.put('/profile', data),
  },

  // Game data
  coins: {
    get: () => apiService.get('/coins'),
    update: (amount: number) => apiService.put('/coins', { amount }),
  },

  inventory: {
    get: () => apiService.get('/inventory'),
    add: (item: any) => apiService.post('/inventory', item),
    remove: (itemId: string) => apiService.delete(`/inventory/${itemId}`),
  },

  spin: {
    execute: () => apiService.post('/spin'),
    history: () => apiService.get('/spin/history'),
  },

  content: {
    get: () => apiService.get('/content'),
    update: (data: any) => apiService.put('/content', data),
  },
}

export default apiService