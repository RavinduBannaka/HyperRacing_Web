// Backend API Service for 192.168.1.5:3000
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://192.168.1.5:3000/api'

let authToken: string | null = null

export const setAuthToken = (token: string | null) => {
  authToken = token
}

export const getAuthToken = () => authToken

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface UserData {
  id?: string
  email: string
  displayName: string
  coinBalance?: number
}

export interface AuthResponse {
  token: string
  user: UserData
}

export interface CoinBalanceResponse {
  coinBalance: number
}

export interface HealthResponse {
  status: string
  timestamp: string
}

export interface BootstrapResponse {
  cards: CardItem[]
  maps: MapItem[]
  channels: string[]
  chatSeed: ChatMessage[]
}

export interface CardItem {
  id: string
  name: string
  rarity: string
  price: number
  image: string
}

export interface MapItem {
  id: string
  name: string
  region: string
  description: string
  tier: string
  category: string
  rarity: string
  price: number
  image: string
}

export interface ChatMessage {
  id: string
  user: string
  avatar: string
  time: string
  content: string
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

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options.headers as Record<string, string>,
      }

      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`
      }

      const response = await fetch(url, {
        headers,
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
  health: () => apiService.get('/health'),

  auth: {
    login: (credentials: { email: string; password: string }) =>
      apiService.post('/auth/login', credentials),

    register: (userData: { email: string; password: string; displayName: string }) =>
      apiService.post('/auth/register', userData),

    logout: () => apiService.post('/auth/logout'),

    me: () => apiService.get('/auth/me'),
  },

  profile: {
    get: () => apiService.get('/profile'),
    update: (data: any) => apiService.put('/profile', data),
  },

  coins: {
    balance: () => apiService.get('/coins/balance'),
    packages: () => apiService.get('/coins/packages'),
    purchase: (data: { packageId: string; cardNumber: string; expiry: string; cvv: string }) =>
      apiService.post('/coins/purchase', data),
    spend: (data: { amount: number; reason?: string }) =>
      apiService.post('/coins/spend', data),
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
    bootstrap: () => apiService.get<BootstrapResponse>('/content/bootstrap'),
    cardsBuy: (data: { cardId: string }) =>
      apiService.post('/content/cards/buy', data),
    mapsBuy: (data: { mapId: string }) =>
      apiService.post('/content/maps/buy', data),
  },
}

export default apiService