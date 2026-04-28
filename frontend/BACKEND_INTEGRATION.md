# Backend API Integration

Your frontend is now configured to connect to your backend at `http://localhost:3000/api`.

## Configuration

The API URL is set in `.env.local`:
```
VITE_API_URL=http://localhost:3000/api
```

## API Service

Use the `api` object from `src/services/api.ts` to make requests:

```typescript
import { api } from '../services/api'

// Example usage:
const coins = await api.coins.get()
const login = await api.auth.login({ email, password })
const spin = await api.spin.execute()
```

## Available Endpoints

### Health
- `GET /api/health` - Health check

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Coins
- `GET /api/coins` - Get user coins
- `PUT /api/coins` - Update user coins

### Inventory
- `GET /api/inventory` - Get user inventory
- `POST /api/inventory` - Add item to inventory
- `DELETE /api/inventory/:itemId` - Remove item from inventory

### Spin
- `POST /api/spin` - Execute spin
- `GET /api/spin/history` - Get spin history

### Content
- `GET /api/content` - Get content
- `PUT /api/content` - Update content

## Testing

Visit `/api-demo` in your app to test the connection to your backend.

## Backend Requirements

Your backend should return responses in this format:

```json
{
  "success": true,
  "data": { /* your data */ },
  "message": "Optional message"
}
```

For errors:
```json
{
  "success": false,
  "error": "Error message"
}
```