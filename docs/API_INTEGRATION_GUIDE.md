# Backend API Integration Guide

**Last Updated:** July 1, 2026 | **Status:** Complete Contract Reference

---

## Overview

This guide defines the API contracts between the KhelSetu frontend and backend. Use these specifications to implement backend endpoints that frontend expects.

**Base URL:** `VITE_API_URL` (default: `http://localhost:8080`)  
**WebSocket URL:** `VITE_WS_URL` (default: `ws://localhost:8080`)  
**Authentication:** Bearer token in `Authorization` header

---

## Authentication Endpoints

### POST /api/auth/login

**Purpose:** User login with email and password

**Request:**

```json
{
  "email": "user@example.com",
  "password": "REPLACE_WITH_ACTUAL_PASSWORD"
}
```

**Response (200 OK):**

```json
{
  "token": "REPLACE_WITH_ACTUAL_JWT_TOKEN",
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "admin",
    "organizationId": "org-1"
  }
}
```

**Errors:**

- `400 Bad Request` - Missing email or password
- `401 Unauthorized` - Invalid credentials
- `429 Too Many Requests` - Rate limit exceeded

---

### POST /api/auth/register

**Purpose:** New user registration

**Request:**

```json
{
  "email": "newuser@example.com",
  "password": "REPLACE_WITH_ACTUAL_PASSWORD",
  "name": "Jane Doe"
}
```

**Response (201 Created):**

```json
{
  "token": "REPLACE_WITH_ACTUAL_JWT_TOKEN",
  "user": {
    "id": "user-456",
    "email": "newuser@example.com",
    "name": "Jane Doe",
    "role": "user",
    "organizationId": "org-1"
  }
}
```

**Errors:**

- `400 Bad Request` - Invalid email format or weak password
- `409 Conflict` - Email already registered
- `422 Unprocessable Entity` - Validation failed

---

### POST /api/auth/logout

**Purpose:** Invalidate user session

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**

```json
{
  "message": "Logged out successfully"
}
```

---

### POST /api/auth/refresh

**Purpose:** Refresh expired token

**Request:**

```json
{
  "token": "expired-token"
}
```

**Response (200 OK):**

```json
{
  "token": "new-jwt-token"
}
```

**Errors:**

- `401 Unauthorized` - Invalid or non-refreshable token

---

### GET /api/auth/user

**Purpose:** Get current authenticated user

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**

```json
{
  "id": "user-123",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "admin",
  "organizationId": "org-1",
  "createdAt": "2026-01-15T10:30:00Z"
}
```

---

## Tournament Endpoints

### GET /api/tournaments

**Purpose:** List all tournaments for organization

**Query Parameters:**

```
?page=1&limit=20&status=active&sport=cricket
```

**Response (200 OK):**

```json
{
  "tournaments": [
    {
      "id": "tour-123",
      "name": "Kathmandu Cricket League 2026",
      "sport": "cricket",
      "status": "active",
      "startDate": "2026-07-15T10:00:00Z",
      "endDate": "2026-08-30T18:00:00Z",
      "teams": [],
      "matches": [],
      "createdBy": "user-123",
      "createdAt": "2026-07-01T10:00:00Z"
    }
  ],
  "total": 15,
  "page": 1,
  "limit": 20
}
```

---

### GET /api/tournaments/:id

**Purpose:** Get tournament details

**Response (200 OK):**

```json
{
  "id": "tour-123",
  "name": "Kathmandu Cricket League 2026",
  "sport": "cricket",
  "status": "active",
  "startDate": "2026-07-15T10:00:00Z",
  "endDate": "2026-08-30T18:00:00Z",
  "teams": [
    {
      "id": "team-1",
      "name": "Kathmandu Warriors",
      "players": 11
    }
  ],
  "matches": [
    {
      "id": "match-1",
      "team1": "team-1",
      "team2": "team-2",
      "status": "scheduled",
      "startTime": "2026-07-20T15:00:00Z"
    }
  ]
}
```

---

### POST /api/tournaments

**Purpose:** Create new tournament

**Request:**

```json
{
  "name": "Kathmandu Cricket League 2026",
  "sport": "cricket",
  "startDate": "2026-07-15T10:00:00Z",
  "endDate": "2026-08-30T18:00:00Z",
  "format": "round-robin",
  "totalTeams": 8
}
```

**Response (201 Created):**

```json
{
  "id": "tour-123",
  "name": "Kathmandu Cricket League 2026",
  "sport": "cricket",
  "status": "created",
  "createdAt": "2026-07-01T10:00:00Z"
}
```

---

### PUT /api/tournaments/:id

**Purpose:** Update tournament

**Request:**

```json
{
  "name": "Updated Name",
  "status": "active"
}
```

**Response (200 OK):**

```json
{
  "id": "tour-123",
  "name": "Updated Name",
  "status": "active"
}
```

---

### DELETE /api/tournaments/:id

**Purpose:** Delete tournament

**Response (200 OK):**

```json
{
  "message": "Tournament deleted"
}
```

---

## Team Endpoints

### GET /api/teams

**Purpose:** List teams in tournament

**Query:**

```
?tournamentId=tour-123&page=1&limit=20
```

**Response (200 OK):**

```json
{
  "teams": [
    {
      "id": "team-1",
      "name": "Kathmandu Warriors",
      "sport": "cricket",
      "players": [
        {
          "id": "player-1",
          "name": "Rajesh Kumar",
          "role": "batsman",
          "jerseyNumber": 1
        }
      ],
      "coach": "user-123",
      "captain": "player-1"
    }
  ],
  "total": 8,
  "page": 1
}
```

---

### POST /api/teams

**Purpose:** Create team

**Request:**

```json
{
  "name": "Kathmandu Warriors",
  "tournamentId": "tour-123",
  "sport": "cricket",
  "captainId": "player-1"
}
```

**Response (201 Created):**

```json
{
  "id": "team-1",
  "name": "Kathmandu Warriors",
  "tournamentId": "tour-123"
}
```

---

## Match & Scoring Endpoints

### GET /api/matches/:id/scores

**Purpose:** Get live match scores

**Response (200 OK):**

```json
{
  "matchId": "match-1",
  "tournament": "tour-123",
  "team1": {
    "id": "team-1",
    "name": "Kathmandu Warriors",
    "score": 185,
    "wickets": 7,
    "overs": 20
  },
  "team2": {
    "id": "team-2",
    "name": "Valley United",
    "score": 142,
    "wickets": 8,
    "overs": 20
  },
  "status": "live",
  "currentBatter": "player-5",
  "currentBowler": "player-12",
  "lastUpdated": "2026-07-20T15:45:30Z"
}
```

---

### PUT /api/matches/:id/scores

**Purpose:** Update match score

**Request:**

```json
{
  "team": 1,
  "runs": 4,
  "wicket": false,
  "batter": "player-5",
  "bowler": "player-12",
  "timestamp": "2026-07-20T15:45:30Z"
}
```

**Response (200 OK):**

```json
{
  "matchId": "match-1",
  "updated": true,
  "currentScore": {
    "team1": 185,
    "team2": 142
  }
}
```

---

## WebSocket Events

### Connection

```javascript
const socket = io(WS_URL, {
  auth: {
    token: 'jwt-token',
  },
});
```

### subscribe:match

**Direction:** Client → Server  
**Payload:**

```json
{
  "matchId": "match-1"
}
```

---

### match:score_update

**Direction:** Server → Client  
**Payload:**

```json
{
  "matchId": "match-1",
  "team1": { "score": 185, "wickets": 7 },
  "team2": { "score": 142, "wickets": 8 },
  "lastUpdated": "2026-07-20T15:45:30Z"
}
```

---

### match:status_change

**Direction:** Server → Client  
**Payload:**

```json
{
  "matchId": "match-1",
  "status": "completed",
  "winner": "team-1",
  "margin": "43 runs"
}
```

---

### notification:new

**Direction:** Server → Client  
**Payload:**

```json
{
  "id": "notif-1",
  "type": "match_started",
  "title": "Match Started",
  "message": "Kathmandu Warriors vs Valley United",
  "data": { "matchId": "match-1" }
}
```

---

## Error Response Format

All error responses follow this format:

```json
{
  "error": {
    "code": "AUTH_001",
    "message": "Invalid credentials",
    "details": "Email or password is incorrect"
  }
}
```

**Common Error Codes:**

- `AUTH_001` - Invalid credentials
- `AUTH_002` - Token expired
- `AUTH_003` - Unauthorized access
- `VAL_001` - Validation failed
- `NOT_FOUND` - Resource not found
- `CONFLICT` - Resource conflict
- `SERVER_ERROR` - Internal server error

---

## Rate Limiting

**Limits:**

- 100 requests/minute per IP
- 1000 requests/minute per authenticated user

**Response Headers:**

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1656057600
```

---

## Authentication Flow

1. User submits login form
2. Frontend calls `POST /api/auth/login`
3. Backend validates and returns JWT token
4. Frontend stores token in `authStore` (Zustand)
5. All subsequent requests include `Authorization: Bearer <token>`
6. Backend validates token and processes request
7. If token expired, frontend calls `POST /api/auth/refresh`
8. Backend returns new token
9. Frontend updates stored token and retries original request

---

## Testing the API

**Using curl:**

```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Get tournaments (with token)
curl -X GET http://localhost:8080/api/tournaments \
  -H "Authorization: Bearer <token>"
```

**Using frontend:**
See `src/features/auth/services/authService.ts` for implementation examples.

---

**Version:** 1.0 | **Status:** Ready for Backend Implementation
