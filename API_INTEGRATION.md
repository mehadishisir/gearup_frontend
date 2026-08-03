# API Integration — GearUp Frontend

Maps frontend routes/components to backend endpoints consumed from `gear-up-backend-one.vercel.app/api`.

## Auth
| Frontend | Backend Endpoint | Notes |
|---|---|---|
| `/auth/register` | `POST /auth/register` | Zod + RHF validated, sets httpOnly cookie |
| `/auth/login` | `POST /auth/login` | Sets `accessToken` httpOnly cookie |
| `AuthProvider` (on load) | `GET /auth/me` | Restores session from cookie |
| Logout button | clears cookie client-side | |

## Public Gear Browsing
| Frontend | Backend Endpoint | Notes |
|---|---|---|
| `/gear` | `GET /gear`, `GET /categories` | Search/filter by category |
| `/gear/[id]` | `GET /gear/:id` | Details + date-range rent flow |

## Customer
| Frontend | Backend Endpoint | Notes |
|---|---|---|
| `/gear/[id]` "Rent Now" | `POST /rentals` | Creates rental order (PLACED) |
| `/dashboard/rentals` | `GET /rentals` | Lists customer's rental orders |
| `/dashboard/rentals/[id]` | `GET /rentals/:id` | Order detail |
| "Pay Now" button | `POST /payments/create` | Creates Stripe Checkout Session, returns `paymentUrl` |
| `/payment-success` | `POST /payments/confirm` | Confirms session, marks order PAID |
| `/payment-cancel` | — | Static cancel page, no API call |

## Provider
| Frontend | Backend Endpoint | Notes |
|---|---|---|
| `/dashboard/provider/gear` | `GET /provider/gear` | Provider's own gear listings |
| `/dashboard/provider/add-gear` | `POST /provider/gear` | Create gear item |
| Edit gear | `PUT /provider/gear/:id` | |
| Delete gear | `DELETE /provider/gear/:id` | |
| `/dashboard/provider/orders` | `GET /provider/orders` | Rental requests for provider's gear |
| "Confirm" / status buttons | `PATCH /provider/orders/:id` | Advances order status (PLACED → CONFIRMED → PAID → PICKED_UP → RETURNED) |

## Admin
| Frontend | Backend Endpoint | Notes |
|---|---|---|
| `/dashboard/admin` | `GET /admin/users`, `GET /admin/gear`, `GET /admin/rentals` | Platform overview |
| Suspend/activate user | `PATCH /admin/users/:id` | |

## Auth Strategy
- httpOnly cookie (`accessToken`) set by backend on login/register.
- Client-side requests go through `/api/*` (proxied via Next.js `rewrites()` in `next.config.ts` to the deployed backend) to avoid cross-domain cookie blocking.
- Server actions (`"use server"` files under `services/`) manually read the cookie via `next/headers` and attach it as an `Authorization: Bearer` header, since server-side `fetch` does not automatically forward browser cookies.

## Payments
- Provider: Stripe (Checkout Session, test mode).
- Flow: `POST /rentals` → provider confirms via `PATCH /provider/orders/:id` → `POST /payments/create` returns `paymentUrl` → redirect to Stripe → on completion, Stripe redirects to `/payment-success?session_id=...` → frontend calls `POST /payments/confirm` to finalize.