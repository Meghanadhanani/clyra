 app/
├── routers/        # API URLs, e.g. auth.py
├── schemas/        # request/response validation
├── models/         # database tables
├── services/       # main business logic
├── dependencies/   # login/role/database checks
├── utils/          # JWT, password hashing, errors
├── config.py       # env settings
├── database.py     # PostgreSQL connection
└── main.py         # app start point


/dashboard  → owner
/agent      → support agent
/account    → customer


1. POST   /api/v1/auth/signup
2. POST   /api/v1/auth/login
3. GET    /api/v1/auth/me
4. POST   /api/v1/auth/refresh
5. POST   /api/v1/auth/logout

6. GET    /api/v1/workspaces/current
7. PATCH  /api/v1/workspaces/current

8. GET    /api/v1/workspaces/current/members
9. POST   /api/v1/workspaces/current/members/invite
10. PATCH /api/v1/workspaces/current/members/{user_id}
11. DELETE /api/v1/workspaces/current/members/{user_id}

12. POST   /api/v1/products
13. GET    /api/v1/products
14. GET    /api/v1/products/{product_id}
15. PATCH  /api/v1/products/{product_id}
16. DELETE /api/v1/products/{product_id}
17. POST   /api/v1/products/{product_id}/stock-adjustments

18. POST   /api/v1/customers
19. GET    /api/v1/customers
20. GET    /api/v1/customers/{customer_id}
21. PATCH  /api/v1/customers/{customer_id}
22. DELETE /api/v1/customers/{customer_id}
23. GET    /api/v1/customers/me

24. POST   /api/v1/orders
25. GET    /api/v1/orders
26. GET    /api/v1/orders/{order_id}
27. PATCH  /api/v1/orders/{order_id}
28. POST   /api/v1/orders/{order_id}/cancel
29. POST   /api/v1/orders/{order_id}/return-request

30. POST   /api/v1/tickets
31. GET    /api/v1/tickets
32. GET    /api/v1/tickets/{ticket_id}
33. PATCH  /api/v1/tickets/{ticket_id}
34. POST   /api/v1/tickets/{ticket_id}/messages

35. POST   /api/v1/conversations
36. GET    /api/v1/conversations
37. GET    /api/v1/conversations/{conversation_id}
38. GET    /api/v1/conversations/{conversation_id}/messages
39. POST   /api/v1/conversations/{conversation_id}/messages
40. PATCH  /api/v1/conversations/{conversation_id}

41. POST   /api/v1/conversations/{conversation_id}/ai-message
42. POST   /api/v1/conversations/{conversation_id}/ai-stream
43. POST   /api/v1/ai/classify

44. POST   /api/v1/knowledge/documents
45. POST   /api/v1/knowledge/documents/upload
46. GET    /api/v1/knowledge/documents
47. GET    /api/v1/knowledge/documents/{document_id}
48. DELETE /api/v1/knowledge/documents/{document_id}
49. POST   /api/v1/knowledge/documents/{document_id}/reindex
50. GET    /api/v1/knowledge/search

51. GET    /api/v1/analytics/overview
52. GET    /api/v1/analytics/ai-usage

53. WS     /api/v1/ws/conversations/{conversation_id}