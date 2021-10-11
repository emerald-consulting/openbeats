## Working with tokens
### Create superuser or normal user via command line

`python manage.py createsuperuser`

OR

    curl --header "Content-Type: application/json" -X POST http://127.0.0.1:8000/api/user/create/ --data '{"email":"bob@gmail.com","username":"bob123","password":"abc12345"}'

  
**To get a refresh token and access token for the user you just created:**

```
curl --header "Content-Type: application/json" -X POST http://127.0.0.1:8000/api/token/obtain/ --data '{"username":"bob@gmail.com","password":"abc123"}'
```
**Example response. Contains refresh and access token.**
```
{"refresh":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYzMzgyNTc5OSwianRpIjoiNjMzMTkyMDZiMzEwNDk2OTlhNTUzMjg1NTQ2OWIyNmIiLCJ1c2VyX2lkIjoxfQ.XusFYFPWmbVbwSCk9K2UBVjEcg8ZJLVpe_I1vw5-sgg","access":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMyNjE2NDk5LCJqdGkiOiJmYzA2MjEyYjRkMWY0NWY3YmQ1ZTFiOGIyZjlkYjdkMSIsInVzZXJfaWQiOjF9.tSFbrbngEUgeRVZmBy8vcBxZwBTR0jNsyi5jiro_sCg"}
```

**To get a new access token, send the server your refresh token:**

```
curl --header "Content-Type: application/json" -X POST http://127.0.0.1:8000/api/token/refresh/ --data '{"refresh":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYzMzgyNTc5OSwianRpIjoiNjMzMTkyMDZiMzEwNDk2OTlhNTUzMjg1NTQ2OWIyNmIiLCJ1c2VyX2lkIjoxfQ.XusFYFPWmbVbwSCk9K2UBVjEcg8ZJLVpe_I1vw5-sgg"}'
```

  

**Example response. Contains the new access token.**

  

```

{"access":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMyNjc5MDM2LCJqdGkiOiI3YjBkNGJmM2U1Y2M0Yjk2OTgzNGQ4YWU4ZWQ1N2FkNyIsInVzZXJfaWQiOjF9.dithlWLG8yc76z4DafH1MpoxRv8J-StlK2p4p-KSMfo"}

```

  

## To view the content of the tokens go to https://jwt.io/

  

1. Put the refresh token into the decoder

```
// Refresh Token
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYzMzgyNTc5OSwianRpIjoiNjMzMTkyMDZiMzEwNDk2OTlhNTUzMjg1NTQ2OWIyNmIiLCJ1c2VyX2lkIjoxfQ.Wq2I-LTq32ihtKzkoY3xFd0iBwkJMk4apiGhQ3dsHFs
```

  

 - See how the payload includes the user_id? You can add any information you want with the token, you just have to modify the claim

  
	

        /* Payload of refresh token */
        {
            "token_type": "refresh",
            "exp": 1633825799,
            "jti": "63319206b31049699a5532855469b26b",
            "user_id": 1
        }
-   The `jti  (JWT ID)` in the payload is a unique identifier; can be used to prevent the JWT from being replayed (allows a token to be used only once)

## Accessing protected routes

If you send a request to a route that requires credentials, you'll get this message
```
/* send request to protected route */
curl --header "Content-Type: application/json" -X GET http://127.0.0.1:8000/api/hello/

/* response */
{"detail":"Authentication credentials were not provided."}
```

To fix this send a token in the request (normally React does this for us but this is how to it manually with `curl`)

 1. Get the **access token**
	 ```
	 /* Request token */
	curl --header "Content-Type: application/json" -X POST http://127.0.0.1:8000/api/token/obtain/ --data '{"username":"bob123","password":"abc12345"}'
	
	/* Response contains refresh and access token */
	{"refresh":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYzMzg5NDM2NCwianRpIjoiNjUyMzEzMGE5ZDI2NDQ3MmE5MjE3NGYyNGRkZWZhOWIiLCJ1c2VyX2lkIjo0LCJmYXZfY29sb3IiOiIifQ.-I8kG-EhOGflmcKSrM8CccpdU7Pp0x3h-WBIiOOd1As","access":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMyNjg1MDY0LCJqdGkiOiIxZWQ3ZmQ3NTg5MmI0MWZkYTc5MDNlYWYwODY2NTM2NyIsInVzZXJfaWQiOjQsImZhdl9jb2xvciI6IiJ9.tELqIMS8j18xNBCNl4C2TbVQ60yg13WWTlBgjDl4DUQ"}
	```
 2. Add an **authorization header** in the request that contains the **access token** and you s
	 ```
	curl --header "Content-Type: application/json" --header "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMyNjg1NjMzLCJqdGkiOiI0NzI2YjY4ZDZkOWI0YTlkYTllNjhlMzNlOTNjMzI2NyIsInVzZXJfaWQiOjQsImZhdl9jb2xvciI6IiJ9.ZF_Vtyo-S9b5_0xsKDwBZOOjYS2e6PhWpcN93FhFoWU"  -X GET http://127.0.0.1:8000/api/hello/
	```
