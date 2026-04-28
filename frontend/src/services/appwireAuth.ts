type AppwireUserPayload = {
  displayName?: string
  email?: string
  age?: number
  bio?: string
  avatar?: string
  stats?: {
    races?: number
    wins?: number
    spins?: number
    cards?: number
  }
}

type AppwireAuthResponse = {
  user?: AppwireUserPayload
  token?: string
  refreshToken?: string
  message?: string
}

type AppwireRegisterPayload = AppwireUserPayload & {
  password: string
}

const projectId = import.meta.env.VITE_APPWIRE_PROJECT_ID
const endpoint = import.meta.env.VITE_APPWIRE_ENDPOINT

const getConfig = () => {
  if (!projectId || !endpoint) {
    throw new Error(
      'AppWire configuration is missing. Define VITE_APPWIRE_PROJECT_ID and VITE_APPWIRE_ENDPOINT in your .env file.',
    )
  }

  return {
    projectId,
    endpoint: endpoint.replace(/\/+$/, ''),
  }
}

const buildUrl = (path: string) => {
  const { endpoint } = getConfig()
  const normalPath = path.startsWith('/') ? path : `/${path}`
  return `${endpoint}${normalPath}`
}

const request = async <T>(path: string, body: Record<string, unknown>) => {
  const url = buildUrl(path)

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ projectId, ...body }),
  })

  const payload = (await response.json()) as T
  if (!response.ok) {
    throw new Error((payload as any)?.message || 'AppWire request failed.')
  }

  return payload
}

export const isAppwireConfigured = () => Boolean(projectId && endpoint)

export const loginWithAppwire = async (email: string, password: string) => {
  return request<AppwireAuthResponse>('/auth/login', { email, password })
}

export const registerWithAppwire = async (data: AppwireRegisterPayload) => {
  return request<AppwireAuthResponse>('/auth/register', data)
}
