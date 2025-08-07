# DevTinder APIS

# authRouter
- POST `/signup`
- POST `/login`
- POST `/logout`

# profileRouter
- PATCH `/profile/edit`
- GET `/profile/view`
- PATCH `/profile/password`

# connectionRequestRouter
- POST `/request/send/interested/:userId`
- POST `/request/send/ignored/:userId`
- POST `/request/review/accepted/:requestId`
- POST `/request/review/rejected/:requestId`

# userRouter
- GET `/user/connections`
- GET `/user/received/requests`
- GET `/user/feed` -> Gets you the profiles of other users of the platform.



# Status :
- Ignored
- Interested
- Accepted
- Rejected