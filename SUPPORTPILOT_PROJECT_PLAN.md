# SupportPilot — Decision-Complete Product and API Plan

## Summary

SupportPilot is a multi-tenant AI customer-support and order-tracking SaaS for online fashion stores.

Demo workspace: `StyleCart`

Chosen decisions:

- Frontend: Next.js + TypeScript
- Backend: FastAPI + Python
- Database: PostgreSQL + SQLAlchemy + Alembic
- Authentication: JWT stored in HttpOnly secure cookies
- Customer access: customer login plus guest FAQ chat
- UI fidelity: role-wise wireframes
- API scope: freeze MVP and future AI/realtime/MCP contracts now
- Deliverables: Markdown specification plus Canva-ready wireframe brief
- Local AI: Ollama with `gemma3:1b`
- Cloud AI later: Gemini/OpenAI through a provider interface

The current repository contains only the learning `/chat` endpoint. It will be preserved as a development smoke test and then moved into the SupportPilot service structure.

## Product roles and permissions

| Capability | Owner | Agent | Customer | Guest |
|---|---:|---:|---:|---:|
| Manage workspace/settings | Yes | No | No | No |
| Manage team members | Yes | No | No | No |
| Create/update/delete products | Yes | Optional update | No | No |
| View workspace orders | Yes | Assigned/all permitted | Own orders only | No |
| Update order status | Yes | Yes | No | No |
| Create/support tickets | Yes | Yes | Own tickets | No |
| Assign tickets | Yes | Yes, according to policy | No | No |
| View all conversations | Yes | Assigned/team conversations | Own conversations | No |
| Start AI chat | Yes | Yes | Yes | FAQ only |
| Upload knowledge documents | Yes | Optional | No | No |
| Use order/product AI tools | Yes | Yes | Only through ownership checks | No |
| Manage AI prompt/settings | Yes | No | No | No |
| View usage/analytics | Yes | Limited | No | No |

Every tenant-owned table must contain `workspace_id` directly or through a secure relationship. Every protected query must filter by the authenticated workspace.

## Database tables

### `workspaces`

```text
id UUID primary key
name string
slug string unique
plan string            # free, starter, pro
ai_system_prompt text
created_at timestamp
updated_at timestamp
```

### `users`

```text
id UUID primary key
workspace_id UUID nullable/foreign key
name string
email string unique
password_hash string
role enum               # owner, agent, customer
is_active boolean
created_at timestamp
updated_at timestamp
```

### `workspace_members`

Use this if one user can belong to multiple workspaces.

```text
id UUID primary key
workspace_id UUID foreign key
user_id UUID foreign key
role enum
created_at timestamp
unique(workspace_id, user_id)
```

### `products`

```text
id UUID primary key
workspace_id UUID foreign key
name string
slug string
description text
category string
price decimal
stock_quantity integer
sizes JSON
colors JSON
image_url string nullable
is_active boolean
created_at timestamp
updated_at timestamp
```

### `customers`

```text
id UUID primary key
workspace_id UUID foreign key
user_id UUID nullable       # set when customer creates an account
name string
email string
phone string nullable
created_at timestamp
updated_at timestamp
```

### `orders`

```text
id UUID primary key
workspace_id UUID foreign key
customer_id UUID foreign key
order_number string
status enum                 # pending, paid, processing, shipped,
                            # delivered, cancelled, returned, refunded
total_amount decimal
shipping_address JSON
tracking_number string nullable
estimated_delivery date nullable
created_at timestamp
updated_at timestamp
unique(workspace_id, order_number)
```

### `order_items`

```text
id UUID primary key
order_id UUID foreign key
product_id UUID foreign key
product_name string         # snapshot at purchase time
selected_size string nullable
selected_color string nullable
quantity integer
unit_price decimal          # snapshot at purchase time
```

### `tickets`

```text
id UUID primary key
workspace_id UUID foreign key
customer_id UUID foreign key
order_id UUID nullable
assigned_agent_id UUID nullable
subject string
description text
status enum                 # open, in_progress, waiting_customer,
                            # resolved, closed
priority enum               # low, medium, high, urgent
created_at timestamp
updated_at timestamp
```

### `conversations`

```text
id UUID primary key
workspace_id UUID foreign key
customer_id UUID nullable
assigned_agent_id UUID nullable
status enum                 # ai_active, waiting_agent, agent_active, closed
created_at timestamp
updated_at timestamp
```

### `messages`

```text
id UUID primary key
conversation_id UUID foreign key
sender_type enum            # customer, assistant, agent, system, tool
sender_user_id UUID nullable
content text
metadata JSON nullable      # model, tool name, citations, token usage
created_at timestamp
```

### `knowledge_documents`

```text
id UUID primary key
workspace_id UUID foreign key
title string
source_type enum            # faq, text, pdf
file_url string nullable
raw_text text
status enum                 # uploaded, processing, indexed, failed
created_by UUID foreign key
created_at timestamp
updated_at timestamp
```

### `document_chunks`

```text
id UUID primary key
document_id UUID foreign key
workspace_id UUID foreign key
content text
chunk_index integer
embedding vector
metadata JSON
created_at timestamp
```

### `refresh_sessions`

```text
id UUID primary key
user_id UUID foreign key
token_hash string
expires_at timestamp
revoked_at timestamp nullable
created_at timestamp
```

### `audit_logs`

```text
id UUID primary key
workspace_id UUID nullable
user_id UUID nullable
action string
resource_type string
resource_id UUID nullable
metadata JSON
created_at timestamp
```

## API conventions

Base URL:

```text
/api/v1
```

Authentication:

```text
HttpOnly access_token cookie
HttpOnly refresh_token cookie
```

Success format:

```json
{
  "data": {},
  "message": "Success"
}
```

Error format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Readable explanation",
    "details": {}
  }
}
```

IDs use UUIDs. List endpoints support:

```text
?page=1&page_size=20&search=&sort=
```

All protected endpoints verify authentication, workspace membership, role, and resource ownership.

# Complete API catalogue

## Authentication

### `POST /api/v1/auth/signup`

Creates a workspace owner and first workspace.

Request:

```json
{
  "name": "Megha",
  "email": "megha@example.com",
  "password": "StrongPassword123!",
  "workspace_name": "StyleCart"
}
```

Response `201`:

```json
{
  "data": {
    "user": {
      "id": "uuid",
      "name": "Megha",
      "email": "megha@example.com",
      "role": "owner"
    },
    "workspace": {
      "id": "uuid",
      "name": "StyleCart",
      "slug": "stylecart"
    }
  },
  "message": "Account created"
}
```

Sets HttpOnly authentication cookies.

### `POST /api/v1/auth/login`

Request:

```json
{
  "email": "megha@example.com",
  "password": "StrongPassword123!"
}
```

Response:

```json
{
  "data": {
    "user": {
      "id": "uuid",
      "name": "Megha",
      "email": "megha@example.com",
      "role": "owner"
    },
    "workspace": {
      "id": "uuid",
      "name": "StyleCart"
    }
  },
  "message": "Login successful"
}
```

### `POST /api/v1/auth/logout`

Revokes the refresh session and clears cookies.

Response:

```json
{
  "data": null,
  "message": "Logged out"
}
```

### `POST /api/v1/auth/refresh`

Rotates the refresh session and sets a new access cookie.

### `GET /api/v1/auth/me`

Returns the authenticated user and current workspace.

### `PATCH /api/v1/auth/me`

Updates the current user’s name or profile information.

### `POST /api/v1/auth/change-password`

Changes the authenticated user password after verifying the old password.

## Workspace and team

### `GET /api/v1/workspaces/current`

Returns current workspace settings and plan.

### `PATCH /api/v1/workspaces/current`

Owner-only workspace update.

Request:

```json
{
  "name": "StyleCart Fashion",
  "ai_system_prompt": "Be polite and answer using StyleCart policies only."
}
```

### `GET /api/v1/workspaces/current/members`

Owner gets team members.

### `POST /api/v1/workspaces/current/members/invite`

Request:

```json
{
  "email": "agent@example.com",
  "role": "agent"
}
```

### `PATCH /api/v1/workspaces/current/members/{user_id}`

Owner changes a member role or active state.

### `DELETE /api/v1/workspaces/current/members/{user_id}`

Owner removes a member from the workspace.

## Products

### `POST /api/v1/products`

Owner or permitted agent creates a product.

Request:

```json
{
  "name": "Classic Black Hoodie",
  "description": "Soft cotton hoodie",
  "category": "hoodies",
  "price": 1499.0,
  "stock_quantity": 25,
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["black"]
}
```

Response:

```json
{
  "data": {
    "id": "uuid",
    "name": "Classic Black Hoodie",
    "price": 1499.0,
    "stock_quantity": 25,
    "is_active": true
  },
  "message": "Product created"
}
```

### `GET /api/v1/products`

Lists workspace products with search, category, active state, pagination, and sorting.

### `GET /api/v1/products/{product_id}`

Returns one workspace product.

### `PATCH /api/v1/products/{product_id}`

Updates permitted product fields.

### `DELETE /api/v1/products/{product_id}`

Soft-deactivates a product rather than deleting historical order references.

### `POST /api/v1/products/{product_id}/stock-adjustments`

Request:

```json
{
  "quantity_change": 10,
  "reason": "New shipment received"
}
```

## Customers

### `POST /api/v1/customers`

Creates a customer record.

### `GET /api/v1/customers`

Lists customers with search and pagination.

### `GET /api/v1/customers/{customer_id}`

Returns a customer and permitted summary.

### `PATCH /api/v1/customers/{customer_id}`

Updates customer contact details.

### `DELETE /api/v1/customers/{customer_id}`

Owner-only anonymization/deactivation. Historical orders remain.

### `GET /api/v1/customers/me`

Customer-only endpoint returning their own profile.

## Orders

### `POST /api/v1/orders`

Creates an order with order items.

Request:

```json
{
  "customer_id": "uuid",
  "items": [
    {
      "product_id": "uuid",
      "selected_size": "M",
      "selected_color": "black",
      "quantity": 1
    }
  ],
  "shipping_address": {
    "line1": "Address",
    "city": "Delhi",
    "postal_code": "110001"
  }
}
```

Response includes order number, items, total, and status.

### `GET /api/v1/orders`

Owner/agent sees workspace orders. Customer sees only own orders.

Filters:

```text
?status=shipped&customer_id=uuid&search=SC-1001&page=1
```

### `GET /api/v1/orders/{order_id}`

Returns order details after workspace and ownership checks.

### `PATCH /api/v1/orders/{order_id}`

Owner/agent updates allowed operational fields.

Request:

```json
{
  "status": "shipped",
  "tracking_number": "TRK-123",
  "estimated_delivery": "2026-09-02"
}
```

### `POST /api/v1/orders/{order_id}/cancel`

Cancels an eligible order with a reason.

### `POST /api/v1/orders/{order_id}/return-request`

Customer requests a return.

Request:

```json
{
  "reason": "Wrong size received"
}
```

## Tickets

### `POST /api/v1/tickets`

Creates a support ticket manually or from AI tool calling.

Request:

```json
{
  "subject": "Wrong size received",
  "description": "I ordered M but received S.",
  "order_id": "uuid",
  "priority": "high"
}
```

### `GET /api/v1/tickets`

Role-aware ticket list.

Filters:

```text
?status=open&priority=high&assigned_to=me
```

### `GET /api/v1/tickets/{ticket_id}`

Returns ticket detail and related order/conversation.

### `PATCH /api/v1/tickets/{ticket_id}`

Updates status, priority, or assignment.

### `POST /api/v1/tickets/{ticket_id}/messages`

Adds an agent/customer ticket message.

## Conversations and messages

### `POST /api/v1/conversations`

Creates a customer conversation.

Request:

```json
{
  "channel": "web"
}
```

### `GET /api/v1/conversations`

Lists conversations according to role.

### `GET /api/v1/conversations/{conversation_id}`

Returns conversation metadata and recent messages.

### `GET /api/v1/conversations/{conversation_id}/messages`

Returns paginated messages.

### `POST /api/v1/conversations/{conversation_id}/messages`

Adds a customer or agent message.

Request:

```json
{
  "content": "I need help with my order."
}
```

### `PATCH /api/v1/conversations/{conversation_id}`

Updates status or assigns an agent.

## AI chat

### `POST /api/v1/conversations/{conversation_id}/ai-message`

Sends a message to the selected LLM provider and stores the assistant response.

Request:

```json
{
  "content": "Where is my order SC-1001?"
}
```

Response:

```json
{
  "data": {
    "message_id": "uuid",
    "reply": "Your order SC-1001 is shipped.",
    "intent": "order_status",
    "tool_used": "get_order_status"
  },
  "message": "AI response generated"
}
```

### `POST /api/v1/conversations/{conversation_id}/ai-stream`

Returns `text/event-stream` chunks.

Example events:

```text
data: {"type":"token","text":"Your"}
data: {"type":"token","text":" order"}
data: {"type":"tool_start","tool":"get_order_status"}
data: {"type":"token","text":" is shipped."}
data: {"type":"done","message_id":"uuid"}
```

### `POST /api/v1/ai/classify`

Internal/owner-authorized classification endpoint for intent detection. It returns structured JSON and never executes a business action.

## AI tools

These are backend functions, not public unrestricted endpoints. The model can request them; FastAPI validates and authorizes them.

### `get_order_status`

Input:

```json
{
  "order_number": "SC-1001"
}
```

Returns only safe status, tracking, and delivery information after ownership/workspace verification.

### `find_product`

Input:

```json
{
  "query": "black hoodie",
  "size": "M",
  "color": "black"
}
```

Returns matching active products and available stock.

### `get_return_policy`

Returns workspace-approved return-policy content.

### `create_support_ticket`

Input:

```json
{
  "subject": "Wrong size",
  "description": "Received size S instead of M",
  "order_number": "SC-1001"
}
```

Creates a ticket only after validating the conversation/customer context.

The LLM never writes SQL, calls arbitrary URLs, executes shell commands, or decides authorization.

## Knowledge base and RAG

### `POST /api/v1/knowledge/documents`

Creates FAQ/text knowledge.

### `POST /api/v1/knowledge/documents/upload`

Uploads a PDF or text file.

### `GET /api/v1/knowledge/documents`

Lists workspace documents.

### `GET /api/v1/knowledge/documents/{document_id}`

Returns document metadata and indexing status.

### `DELETE /api/v1/knowledge/documents/{document_id}`

Removes the document and its chunks.

### `POST /api/v1/knowledge/documents/{document_id}/reindex`

Re-extracts, chunks, embeds, and indexes a document.

### `GET /api/v1/knowledge/search?q=return+policy`

Returns relevant chunks for authorized workspace use.

## Analytics

### `GET /api/v1/analytics/overview`

Owner dashboard metrics:

```json
{
  "data": {
    "total_orders": 120,
    "open_tickets": 8,
    "ai_resolved_conversations": 74,
    "average_first_response_seconds": 42
  }
}
```

### `GET /api/v1/analytics/ai-usage`

Returns model calls, token estimates, tool usage, and errors.

## WebSockets

### `WS /api/v1/ws/conversations/{conversation_id}`

Used for live customer-agent communication.

Client events:

```json
{
  "type": "message",
  "content": "I need an agent."
}
```

Server events:

```json
{
  "type": "message",
  "sender_type": "agent",
  "content": "Hello, I can help."
}
```

Other event types:

```text
agent_joined
ticket_updated
typing_started
typing_stopped
conversation_closed
error
```

The connection verifies the authentication cookie, workspace membership, and conversation access before accepting messages.

## MCP

MCP is added only after direct tool calling works.

Planned MCP tools:

```text
get_order_status
find_product
get_return_policy
create_support_ticket
```

MCP transport:

- Local learning: stdio MCP server
- Deployment option: authenticated HTTP MCP server

MCP tools reuse the same service-layer authorization as normal FastAPI tools. MCP does not bypass workspace or customer ownership checks.

# Frontend routes

## Public routes

```text
/                         Landing page
/pricing                  Pricing
/login                    Login
/signup                   Signup
/forgot-password          Password reset request
/reset-password           Password reset form
/guest-chat               FAQ-only guest assistant
```

## Owner routes

```text
/dashboard
/dashboard/orders
/dashboard/orders/[id]
/dashboard/products
/dashboard/products/new
/dashboard/products/[id]/edit
/dashboard/customers
/dashboard/customers/[id]
/dashboard/tickets
/dashboard/tickets/[id]
/dashboard/conversations
/dashboard/conversations/[id]
/dashboard/knowledge
/dashboard/knowledge/upload
/dashboard/team
/dashboard/settings
/dashboard/analytics
```

## Agent routes

```text
/agent
/agent/tickets
/agent/tickets/[id]
/agent/conversations
/agent/conversations/[id]
/agent/orders
/agent/customers
```

## Customer routes

```text
/account
/account/orders
/account/orders/[id]
/account/tickets
/account/tickets/[id]
/account/chat
/account/profile
```

# Role-wise frontend functionality

## Owner dashboard

- Overview cards: orders, open tickets, AI-resolved chats
- Order management
- Product and stock management
- Customer directory
- Ticket assignment
- AI prompt and policy settings
- Knowledge-document upload
- Team management
- Analytics and usage

## Agent dashboard

- Assigned ticket queue
- Conversation inbox
- Customer/order context panel
- Live chat
- Ticket status and priority updates
- Order lookup
- AI suggested reply
- Escalation and handoff controls

## Customer portal

- Own order list
- Order detail and tracking
- Return request
- Support chat
- Ticket history
- Profile settings

## Guest experience

- FAQ and return-policy chat only
- No private order lookup
- Login prompt when user asks about personal order data

# Frontend UI wireframes

## Owner

```text
┌─────────────────────────────────────────────────────────────┐
│ SupportPilot / StyleCart        Search   Notifications  Me  │
├──────────────┬──────────────────────────────────────────────┤
│ Dashboard    │ Overview                                      │
│ Orders       │ ┌────────┐ ┌────────┐ ┌────────┐              │
│ Products     │ │ Orders │ │Tickets │ │AI chats│              │
│ Customers    │ └────────┘ └────────┘ └────────┘              │
│ Tickets      │                                                │
│ Conversations│ Recent orders      Open tickets              │
│ Knowledge    │ [order table]      [ticket table]             │
│ Team         │                                                │
│ Analytics    │                                                │
│ Settings     │                                                │
└──────────────┴──────────────────────────────────────────────┘
```

## Agent

```text
┌─────────────────────────────────────────────────────────────┐
│ SupportPilot / Agent                         Status: Online │
├──────────────┬───────────────────────┬──────────────────────┤
│ Ticket inbox │ Conversation           │ Customer context     │
│              │                       │                      │
│ High: #104   │ Customer: Where is...  │ Customer: Anika      │
│ Open: #103   │                       │ Order: SC-1001       │
│ Waiting #102 │ AI: Your order is...   │ Status: Shipped      │
│              │                       │                      │
│              │ [message input]       │ [Assign] [Ticket]    │
└──────────────┴───────────────────────┴──────────────────────┘
```

## Customer

```text
┌─────────────────────────────────────────────────────────────┐
│ StyleCart                         Orders  Tickets  Profile  │
├─────────────────────────────────────────────────────────────┤
│ Hello, Anika                                                   │
│                                                               │
│ My orders                                                     │
│ ┌─────────────────────────────────────────────────────────┐   │
│ │ SC-1001   Black Hoodie   Shipped   Track order          │   │
│ └─────────────────────────────────────────────────────────┘   │
│                                                               │
│ Need help?                                                    │
│ [Open AI support chat]                                        │
└─────────────────────────────────────────────────────────────┘
```

## Guest

```text
┌─────────────────────────────────────────────────────────────┐
│ StyleCart Support                                             │
├─────────────────────────────────────────────────────────────┤
│ Ask about shipping, returns, sizes, or products.              │
│                                                               │
│ AI: Hi! I can answer StyleCart's general questions.           │
│                                                               │
│ [Type your question.................................] [Send]  │
│                                                               │
│ Personal order tracking requires login.                       │
└─────────────────────────────────────────────────────────────┘
```

The Canva-ready brief will use these four wireframes, one page per role, with a consistent SaaS dashboard shell and labels for navigation, permissions, primary actions, and AI states.

# Implementation sequence

## Phase 1 — Foundation

1. Move the current learning endpoint into `app/services/ai_service.py`.
2. Create FastAPI application factory and versioned routers.
3. Add settings and `.env.example`.
4. Add PostgreSQL connection and SQLAlchemy session dependency.
5. Add Alembic migrations.
6. Add health and readiness endpoints.

## Phase 2 — Authentication

1. Create `users`, `workspaces`, `workspace_members`, and `refresh_sessions`.
2. Implement signup.
3. Implement password hashing.
4. Implement login and HttpOnly cookies.
5. Implement current-user dependency.
6. Implement logout and refresh rotation.
7. Add role and workspace authorization dependencies.

## Phase 3 — Business backend

1. Products.
2. Customers.
3. Orders and order items.
4. Tickets.
5. Conversations and messages.
6. Owner/agent/customer permission tests.
7. Seed StyleCart demo data.

## Phase 4 — Frontend MVP

1. Next.js app shell and route guards.
2. Login/signup pages.
3. Owner dashboard.
4. Product/order/customer pages.
5. Agent inbox.
6. Customer portal.
7. Guest FAQ chat.

## Phase 5 — AI

1. Provider interface.
2. Ollama provider.
3. Workspace system prompt.
4. Database-backed conversation history.
5. Basic AI message endpoint.
6. Structured intent output.
7. Tool calling.
8. Secure order/product/ticket tools.
9. Human handoff.

## Phase 6 — RAG and realtime

1. FAQ retrieval.
2. Embeddings.
3. Document chunking.
4. PDF upload and indexing.
5. SSE token streaming.
6. WebSocket agent chat.
7. Notifications and reconnection.

## Phase 7 — MCP and production

1. MCP server around existing tools.
2. Gemini/OpenAI provider adapters.
3. Rate limiting.
4. Audit logs.
5. Usage/token tracking.
6. AI evaluation tests.
7. Deployment and monitoring.

# Folder structure

```text
supportpilot/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── dependencies/
│   │   ├── ai/
│   │   │   ├── providers/
│   │   │   ├── prompts.py
│   │   │   ├── tools.py
│   │   │   └── rag.py
│   │   └── utils/
│   ├── alembic/
│   ├── tests/
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── app/
│   │   ├── (public)/
│   │   ├── (auth)/
│   │   ├── dashboard/
│   │   ├── agent/
│   │   └── account/
│   ├── components/
│   ├── lib/
│   ├── types/
│   └── package.json
├── mcp-server/
├── docker-compose.yml
├── README.md
└── SUPPORTPILOT_PROJECT_PLAN.md
```

# Testing and acceptance criteria

## Authentication

- Duplicate email is rejected.
- Passwords are hashed.
- Cookies are HttpOnly and secure in production.
- Invalid/expired tokens return `401`.
- Agent cannot access owner-only routes.

## Multi-tenancy

- Workspace A cannot read, update, or delete Workspace B data.
- Customer can only view their own orders and tickets.
- Agent can only access permitted workspace conversations.

## Orders

- Order items snapshot product name and price.
- Invalid product or insufficient stock is rejected.
- Invalid status transitions are rejected.
- Historical paid orders are not hard-deleted.

## AI

- Ollama unavailable returns a clear `503`.
- LLM output is parsed and validated.
- Invalid structured output never triggers a tool.
- AI cannot access raw SQL.
- Tool calls are logged.
- A customer cannot retrieve another customer’s order through AI.

## RAG

- Documents are isolated by workspace.
- Failed indexing exposes a visible failed state.
- Answers can include document source metadata.
- Deleted documents are not retrieved.

## Realtime

- Unauthorized WebSocket connection is rejected.
- Disconnect/reconnect does not duplicate messages.
- SSE sends a final completion event.
- WebSocket conversation access follows the same permission rules as REST.

## Success criteria

The MVP is complete when:

1. An owner can sign up and create StyleCart.
2. The owner can create products and orders.
3. A customer can log in and view only their own order.
4. A customer can ask the AI about that order.
5. The AI uses `get_order_status` after backend authorization.
6. A support agent can receive the conversation and respond.
7. The owner can upload a return-policy document.
8. The AI can answer policy questions using RAG.
9. AI replies stream to the UI.
10. Live agent/customer messages work through WebSockets.
11. The same tools can later be exposed through MCP.

## Next implementation lesson

Start with **Phase 1, Step 1: project structure and configuration**.

Then implement APIs in this exact order:

```text
1. POST /auth/signup
2. POST /auth/login
3. GET  /auth/me
4. POST /auth/logout
5. Workspace/member APIs
6. Product APIs
7. Customer APIs
8. Order APIs
9. Ticket APIs
10. Conversation/message APIs
11. AI chat
12. Tool calling
13. RAG
14. SSE
15. WebSockets
16. MCP
```

Each API will be taught and tested before moving to the next one.
