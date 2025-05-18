# Food Recipe API Documentation

## User Endpoints

This documentation covers the API endpoints related to user management for the Food Recipe application.

## Base URL

```
https://recepku-backend.vercel.app/
```

## Authentication

The API uses JWT (JSON Web Token) authentication. For protected endpoints, include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### 1. Register User

Register a new user in the system.

- **URL**: `/users/register`
- **Method**: `POST`
- **Auth Required**: No

**Request Body**:

| Field       | Type   | Description          | Required |
| ----------- | ------ | -------------------- | -------- |
| email       | String | User's email address | Yes      |
| phoneNumber | String | User's phone number  | Yes      |
| userName    | String | Unique username      | Yes      |
| password    | String | User's password      | Yes      |

**Success Response**:

- **Code**: 201 Created
- **Content**:

```json
{
  "message": "Successfully Registerd",
  "status": 201,
  "data": {
    "_id": "user_id",
    "email": "user@example.com",
    "phoneNumber": "1234567890",
    "userName": "username",
    "profilePic": "default-profile.png"
  }
}
```

**Error Responses**:

- **Code**: 400 Bad Request
  - When fields are missing
  ```json
  {
    "message": "Please fill all required fields"
  }
  ```
  - When username or email already exists
  ```json
  {
    "message": "UserName or email is taken",
    "status": 400,
    "data": null
  }
  ```
- **Code**: 500 Internal Server Error
  ```json
  {
    "message": "Error message"
  }
  ```

### 2. Login User

Authenticate a user and receive an access token.

- **URL**: `/users/login`
- **Method**: `POST`
- **Auth Required**: No

**Request Body**:

| Field    | Type   | Description                      | Required |
| -------- | ------ | -------------------------------- | -------- |
| login    | String | User's email address or username | Yes      |
| password | String | User's password                  | Yes      |

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "message": "Login Succesfully",
  "status": 200,
  "data": {
    "_id": "user_id",
    "email": "user@example.com",
    "userName": "username",
    "profilePic": "profile_url"
    // Other user data
  },
  "token": "JWT_TOKEN"
}
```

**Error Responses**:

- **Code**: 400 Bad Request
  - When fields are missing
  ```json
  {
    "status": 400,
    "message": "Silakan isi semua kolom yang diperlukan."
  }
  ```
  - When credentials are invalid
  ```json
  {
    "status": 400,
    "message": "Email/username atau kata sandi salah."
  }
  ```
- **Code**: 500 Internal Server Error
  ```json
  {
    "status": 500,
    "message": "Kesalahan server internal"
  }
  ```

### 3. Get User Profile

Retrieve a user's profile information.

- **URL**: `/users/profile/:userId`
- **Method**: `GET`
- **Auth Required**: Yes
- **URL Parameters**: `userId=[string]` - ID of the user

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "_id": "user_id",
  "email": "user@example.com",
  "phoneNumber": "1234567890",
  "userName": "username",
  "firstName": "First",
  "lastName": "Last",
  "profilePic": "profile_url"
  // Other user data
}
```

**Error Responses**:

- **Code**: 404 Not Found
  ```json
  {
    "message": "Cannot find user"
  }
  ```
- **Code**: 500 Internal Server Error
  ```json
  {
    "message": "Error message"
  }
  ```

### 4. Edit User Profile

Update a user's profile information.

- **URL**: `/users/profile/:userId`
- **Method**: `PUT`
- **Auth Required**: Yes
- **URL Parameters**: `userId=[string]` - ID of the user
- **Content-Type**: `multipart/form-data`

**Request Body**:

| Field       | Type   | Description       | Required |
| ----------- | ------ | ----------------- | -------- |
| userName    | String | New username      | No       |
| firstName   | String | User's first name | No       |
| lastName    | String | User's last name  | No       |
| email       | String | New email address | No       |
| phoneNumber | String | New phone number  | No       |
| profilePic  | File   | Profile picture   | No       |

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "message": "Profile is successfully updated",
  "status": 200,
  "data": {
    "_id": "user_id",
    "email": "user@example.com",
    "userName": "username",
    "firstName": "First",
    "lastName": "Last",
    "profilePic": "profile_url"
    // Other user data
  }
}
```

**Error Responses**:

- **Code**: 404 Not Found
  ```json
  {
    "message": "Cannot find user",
    "status": 404,
    "data": null
  }
  ```
- **Code**: 500 Internal Server Error
  ```json
  {
    "message": "Error message"
  }
  ```

### 5. Save/Unsave Recipe

Save a recipe to user's favorites or remove it if already saved.

- **URL**: `/users/save-recipe/:recipeId`
- **Method**: `POST`
- **Auth Required**: Yes
- **URL Parameters**: `recipeId=[string]` - ID of the recipe to save/unsave

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "message": "Recipe saved", // or "Recipe unsaved"
  "data": ["recipeId1", "recipeId2", "..."] // List of all saved recipe IDs
}
```

**Error Responses**:

- **Code**: 404 Not Found
  ```json
  {
    "message": "User not found"
  }
  ```
- **Code**: 500 Internal Server Error
  ```json
  {
    "message": "Error message"
  }
  ```

### 6. Get Saved Recipes

Retrieve all recipes saved by a user.

- **URL**: `/users/saved-recipes/:userId`
- **Method**: `GET`
- **Auth Required**: Yes
- **URL Parameters**: `userId=[string]` - ID of the user

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "message": "Saved recipes fetched",
  "data": [
    {
      "_id": "recipe_id1",
      "title": "Recipe Title",
      "ingredients": ["..."]
      // Other recipe data
    }
    // More recipes
  ]
}
```

**Error Responses**:

- **Code**: 404 Not Found
  ```json
  {
    "message": "User not found"
  }
  ```
- **Code**: 500 Internal Server Error
  ```json
  {
    "message": "Error message"
  }
  ```

## Error Handling

All endpoints may return the following error responses:

- **401 Unauthorized**: When no valid authentication token is provided
- **403 Forbidden**: When the user doesn't have permission to access the resource
- **500 Internal Server Error**: When an unexpected error occurs on the server

## Recipe Endpoints

This documentation covers the API endpoints related to recipe management for the Food Recipe application.

## Authentication

Most recipe endpoints require authentication. The API uses JWT (JSON Web Token) authentication. For protected endpoints, include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### 1. Create Recipe

Create a new recipe.

- **URL**: `/recipes/create-recipe`
- **Method**: `POST`
- **Auth Required**: Yes
- **Content-Type**: `multipart/form-data`

**Request Body**:

| Field            | Type        | Description                                  | Required |
| ---------------- | ----------- | -------------------------------------------- | -------- |
| title            | String      | Recipe title                                 | Yes      |
| shortDescription | String      | Brief description of the recipe              | No       |
| ingredients      | JSON String | List of ingredients (must be JSON parseable) | Yes      |
| instructions     | String      | Step-by-step cooking instructions            | Yes      |
| additionalInfo   | String      | Any additional information about the recipe  | No       |
| category         | String      | Recipe category                              | Yes      |
| thumbnail        | File        | Recipe image                                 | Yes      |

**Success Response**:

- **Code**: 201 Created
- **Content**:

```json
{
  "message": "New recipes is created successfully",
  "status": 201,
  "data": {
    "_id": "recipe_id",
    "title": "Recipe Title",
    "shortDescription": "Brief description",
    "ingredients": ["Ingredient 1", "Ingredient 2"],
    "instructions": "Step by step instructions",
    "additionalInfo": "Additional information",
    "category": "Category",
    "thumbnail": "image_url",
    "thumbnailAlias": "image_alias",
    "userId": "user_id"
  }
}
```

**Error Responses**:

- **Code**: 400 Bad Request
  - When required fields are missing
  ```json
  {
    "message": "Please fill all required fields",
    "status": 400,
    "data": null
  }
  ```
  - When image is not provided
  ```json
  {
    "message": "Image is required"
  }
  ```
- **Code**: 401 Unauthorized
  ```json
  {
    "message": "User authentication failed or invalid user data",
    "status": 401,
    "data": null
  }
  ```
- **Code**: 500 Internal Server Error
  ```json
  {
    "message": "Error message"
  }
  ```

### 2. Get Landing Page Recipes

Retrieve recipes for the landing page (public endpoint).

- **URL**: `/recipes/public/landing`
- **Method**: `GET`
- **Auth Required**: No

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "message": "Landing page recipes fetched successfully",
  "status": 200,
  "data": [
    {
      "_id": "recipe_id",
      "title": "Recipe Title",
      "shortDescription": "Brief description",
      "thumbnail": "image_url"
    }
    // More recipes
  ]
}
```

**Error Response**:

- **Code**: 500 Internal Server Error
  ```json
  {
    "message": "Error message"
  }
  ```

### 3. Get All Recipes

Retrieve all recipes with ratings and comments count.

- **URL**: `/recipes`
- **Method**: `GET`
- **Auth Required**: Yes

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "message": "All recipes retrieved successfully",
  "status": 200,
  "data": [
    {
      "_id": "recipe_id",
      "title": "Recipe Title",
      "shortDescription": "Brief description",
      "thumbnail": "image_url",
      "averageRating": 4.5,
      "totalComments": 10
    }
    // More recipes
  ]
}
```

**Error Responses**:

- **Code**: 401 Unauthorized
  ```json
  {
    "message": "User authentication failed or invalid user data",
    "status": 401,
    "data": null
  }
  ```
- **Code**: 500 Internal Server Error
  ```json
  {
    "message": "Error message"
  }
  ```

### 4. Get My Recipes

Retrieve recipes created by the currently authenticated user.

- **URL**: `/recipes/my-recipes/:userId`
- **Method**: `GET`
- **Auth Required**: Yes
- **URL Parameters**: `userId=[string]` - ID of the user

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "message": "My recipes retrieved successfully",
  "status": 200,
  "data": [
    {
      "_id": "recipe_id",
      "title": "Recipe Title",
      "shortDescription": "Brief description",
      "thumbnail": "image_url"
    }
    // More recipes
  ]
}
```

**Error Responses**:

- **Code**: 401 Unauthorized
  ```json
  {
    "message": "User authentication failed or invalid user data",
    "status": 401,
    "data": null
  }
  ```
- **Code**: 500 Internal Server Error
  ```json
  {
    "message": "Error message"
  }
  ```

### 5. Get Recipe Detail

Get detailed information about a specific recipe.

- **URL**: `/recipes/:recipeId`
- **Method**: `GET`
- **Auth Required**: Yes
- **URL Parameters**: `recipeId=[string]` - ID of the recipe

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "message": "Recipe detail successfully retrieved",
  "status": 200,
  "data": {
    "_id": "recipe_id",
    "title": "Recipe Title",
    "shortDescription": "Brief description",
    "ingredients": ["Ingredient 1", "Ingredient 2"],
    "instructions": "Step by step instructions",
    "additionalInfo": "Additional information",
    "category": "Category",
    "thumbnail": "image_url",
    "userId": {
      "_id": "user_id",
      "userName": "username",
      "profilePic": "profile_url"
    },
    "averageRating": 4.5,
    "totalComments": 10
  }
}
```

**Error Responses**:

- **Code**: 401 Unauthorized
  ```json
  {
    "message": "User authentication failed or invalid user data",
    "status": 401,
    "data": null
  }
  ```
- **Code**: 404 Not Found
  ```json
  {
    "message": "Recipe not found",
    "status": 404,
    "recipe": null
  }
  ```
- **Code**: 500 Internal Server Error
  ```json
  {
    "message": "Error message"
  }
  ```

### 6. Get My Recipe Detail

Get detailed information about a specific recipe created by the authenticated user.

- **URL**: `/recipes/my-recipes/:recipeId`
- **Method**: `GET`
- **Auth Required**: Yes
- **URL Parameters**: `recipeId=[string]` - ID of the recipe

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "message": "My recipe detail fetched successfully",
  "status": 200,
  "recipe": {
    "_id": "recipe_id",
    "title": "Recipe Title",
    "shortDescription": "Brief description",
    "ingredients": ["Ingredient 1", "Ingredient 2"],
    "instructions": "Step by step instructions",
    "additionalInfo": "Additional information",
    "category": "Category",
    "thumbnail": "image_url",
    "userId": "user_id"
  }
}
```

**Error Responses**:

- **Code**: 401 Unauthorized
  ```json
  {
    "message": "User authentication failed or invalid user data",
    "status": 401,
    "data": null
  }
  ```
- **Code**: 404 Not Found
  ```json
  {
    "message": "Recipe not found or user unauthorized",
    "status": 404,
    "recipe": null
  }
  ```
- **Code**: 500 Internal Server Error
  ```json
  {
    "message": "Error message"
  }
  ```

### 7. Edit Recipe

Update an existing recipe.

- **URL**: `/recipes/my-recipes/:recipeId`
- **Method**: `PUT`
- **Auth Required**: Yes
- **Content-Type**: `multipart/form-data`
- **URL Parameters**: `recipeId=[string]` - ID of the recipe to update

**Request Body**:

| Field            | Type        | Description                                  | Required |
| ---------------- | ----------- | -------------------------------------------- | -------- |
| title            | String      | Recipe title                                 | No       |
| shortDescription | String      | Brief description of the recipe              | No       |
| ingredients      | JSON String | List of ingredients (must be JSON parseable) | No       |
| instructions     | String      | Step-by-step cooking instructions            | No       |
| additionalInfo   | String      | Any additional information about the recipe  | No       |
| category         | String      | Recipe category                              | No       |
| thumbnail        | File        | Recipe image                                 | No       |

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "message": "Recipe is updated successfully",
  "status": 200,
  "data": {
    "_id": "recipe_id",
    "title": "Updated Title",
    "shortDescription": "Updated description",
    "ingredients": ["Updated Ingredient 1", "Updated Ingredient 2"],
    "instructions": "Updated instructions",
    "additionalInfo": "Updated information",
    "category": "Updated Category",
    "thumbnail": "updated_image_url",
    "userId": "user_id"
  }
}
```

**Error Responses**:

- **Code**: 401 Unauthorized
  ```json
  {
    "message": "User authentication failed or invalid user data",
    "status": 401,
    "data": null
  }
  ```
- **Code**: 404 Not Found
  ```json
  {
    "message": "Recipe not found or user unauthorized",
    "status": 404,
    "recipe": null
  }
  ```
- **Code**: 500 Internal Server Error
  ```json
  {
    "message": "Error message"
  }
  ```

### 8. Delete Recipe

Delete a recipe.

- **URL**: `/recipes/my-recipes/:userId/:recipeId`
- **Method**: `DELETE`
- **Auth Required**: Yes
- **URL Parameters**:
  - `userId=[string]` - ID of the user
  - `recipeId=[string]` - ID of the recipe to delete

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "message": "Recipe deleted successfully",
  "status": 200,
  "data": {
    "_id": "recipe_id",
    "title": "Recipe Title"
    // Other recipe data
  }
}
```

**Error Responses**:

- **Code**: 400 Bad Request
  ```json
  {
    "message": "recipeId is required but not provided"
  }
  ```
- **Code**: 401 Unauthorized
  ```json
  {
    "message": "User authentication failed or invalid user data",
    "status": 401,
    "data": null
  }
  ```
- **Code**: 500 Internal Server Error
  ```json
  {
    "message": "Error message"
  }
  ```

### 9. Toggle Like Recipe

Like or unlike a recipe.

- **URL**: `/recipes/:recipeId/like`
- **Method**: `PATCH`
- **Auth Required**: Yes
- **URL Parameters**: `recipeId=[string]` - ID of the recipe

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "liked": true, // or false if unliked
  "likeCount": 42
}
```

**Error Responses**:

- **Code**: 401 Unauthorized
  ```json
  {
    "message": "User authentication failed or invalid user data",
    "status": 401,
    "data": null
  }
  ```
- **Code**: 404 Not Found
  ```json
  {
    "message": "Recipe not found"
  }
  ```
- **Code**: 500 Internal Server Error
  ```json
  {
    "message": "Error message"
  }
  ```

### 10. Increment Share Count

Increment the share count for a recipe.

- **URL**: `/recipes/:recipeId/share`
- **Method**: `PATCH`
- **Auth Required**: No
- **URL Parameters**: `recipeId=[string]` - ID of the recipe

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "shareCount": 42
}
```

**Error Responses**:

- **Code**: 404 Not Found
  ```json
  {
    "status": 404,
    "message": "Recipe not found"
  }
  ```
- **Code**: 500 Internal Server Error
  ```json
  {
    "message": "Error message"
  }
  ```

## Error Handling

All endpoints may return the following error responses:

- **401 Unauthorized**: When no valid authentication token is provided
- **403 Forbidden**: When the user doesn't have permission to access the resource
- **500 Internal Server Error**: When an unexpected error occurs on the server

## Comment Endpoints

This documentation covers the API endpoints related to recipe comments for the Food Recipe application.

## Authentication

Most comment endpoints require authentication. The API uses JWT (JSON Web Token) authentication. For protected endpoints, include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### 1. Create Comment

Add a new comment to a recipe, including optional rating and image.

- **URL**: `/comments/:recipeId`
- **Method**: `POST`
- **Auth Required**: Yes
- **Content-Type**: `multipart/form-data`
- **URL Parameters**: `recipeId=[string]` - ID of the recipe to comment on

**Request Body**:

| Field       | Type   | Description                    | Required |
| ----------- | ------ | ------------------------------ | -------- |
| commentText | String | The comment text               | Yes      |
| rating      | Number | Rating between 1-5             | Yes      |
| image       | File   | Optional image for the comment | No       |

**Success Response**:

- **Code**: 201 Created
- **Content**:

```json
{
  "message": "New comment is successfully created",
  "status": 201,
  "data": {
    "_id": "comment_id",
    "userId": "user_id",
    "recipeId": "recipe_id",
    "commentText": "This recipe is amazing!",
    "rating": 5,
    "image": "image_url", // null if no image was uploaded
    "imageAlias": "image_public_id", // null if no image was uploaded
    "createdAt": "2025-05-18T10:00:00.000Z",
    "replies": []
  }
}
```

**Error Responses**:

- **Code**: 400 Bad Request
  - When required fields are missing
  ```json
  {
    "message": "Please fill all required fields",
    "status": 400,
    "data": null
  }
  ```
  - When rating is invalid
  ```json
  {
    "message": "Rating invalid",
    "status": 400,
    "data": null
  }
  ```
- **Code**: 401 Unauthorized
  ```json
  {
    "message": "User authentication failed or invalid user data",
    "status": 401,
    "data": null
  }
  ```
- **Code**: 500 Internal Server Error
  ```json
  {
    "message": "Error message"
  }
  ```

### 2. Get All Comments

Retrieve all comments for a specific recipe, including replies.

- **URL**: `/comments/:recipeId`
- **Method**: `GET`
- **Auth Required**: No
- **URL Parameters**: `recipeId=[string]` - ID of the recipe

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "comments": [
    {
      "commentId": "comment_id",
      "userName": "username",
      "profilePic": "profile_url",
      "commentText": "This recipe is amazing!",
      "rating": 5,
      "replies": [
        {
          "commentText": "Thank you for your feedback!",
          "createdAt": "2025-05-18T10:30:00.000Z",
          "userName": "recipe_author",
          "profilePic": "author_profile_url"
        }
        // More replies
      ]
    }
    // More comments
  ]
}
```

**Error Response**:

- **Code**: 500 Internal Server Error
  ```json
  {
    "message": "Error message"
  }
  ```

### 3. Reply to Comment

Add a reply to an existing comment.

- **URL**: `/comments/:commentId/reply`
- **Method**: `POST`
- **Auth Required**: Yes
- **URL Parameters**: `commentId=[string]` - ID of the comment to reply to

**Request Body**:

| Field       | Type   | Description    | Required |
| ----------- | ------ | -------------- | -------- |
| commentText | String | The reply text | Yes      |

**Success Response**:

- **Code**: 201 Created
- **Content**:

```json
{
  "message": "Reply is successfully created"
}
```

**Error Responses**:

- **Code**: 400 Bad Request
  ```json
  {
    "message": "Please fill all required fields"
  }
  ```
- **Code**: 401 Unauthorized
  ```json
  {
    "message": "User authentication failed or invalid user data",
    "status": 401,
    "data": null
  }
  ```
- **Code**: 404 Not Found
  ```json
  {
    "message": "Comment not found",
    "status": 404,
    "data": null
  }
  ```
- **Code**: 500 Internal Server Error
  ```json
  {
    "message": "Error message"
  }
  ```

## Error Handling

All endpoints may return the following error responses:

- **401 Unauthorized**: When no valid authentication token is provided
- **403 Forbidden**: When the user doesn't have permission to access the resource
- **500 Internal Server Error**: When an unexpected error occurs on the server

## Authentication

Some endpoints require authentication via a JWT token. The token should be included in the request headers as:

```
Authorization: Bearer <token>
```

## Endpoints

### Create a Review

Creates a new review in the system.

**Endpoint:** `POST /reviews/create-review`

**Authentication Required:** Yes

**Request Body:**

| Field   | Type   | Description                                | Required |
| ------- | ------ | ------------------------------------------ | -------- |
| content | String | The text content of the review             | Yes      |
| rating  | Number | The rating score (must be between 1 and 5) | Yes      |

**Success Response:**

- **Status Code:** 201 (Created)
- **Response Body:**

```json
{
  "message": "New review is successfully created",
  "status": 201,
  "data": {
    "_id": "reviewId",
    "userId": "userId",
    "content": "Review content",
    "rating": 5,
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Error Responses:**

- **Status Code:** 400 (Bad Request)

  - When required fields are missing:

  ```json
  {
    "message": "Please fill all required fields"
  }
  ```

  - When rating is outside valid range:

  ```json
  {
    "message": "Rating must between 1 and 5"
  }
  ```

- **Status Code:** 401 (Unauthorized)

  ```json
  {
    "message": "User authentication failed or invalid user data",
    "status": 401,
    "data": null
  }
  ```

- **Status Code:** 500 (Internal Server Error)
  ```json
  {
    "message": "Error message"
  }
  ```

### Get All Reviews

Retrieves all reviews in the system with associated user information.

**Endpoint:** `GET /reviews/`

**Authentication Required:** No

**Success Response:**

- **Status Code:** 200 (OK)
- **Response Body:**

```json
{
  "reviews": [
    {
      "userName": "User Name",
      "profilePic": "profile_picture_url",
      "content": "Review content",
      "rating": 5
    }
    // Additional reviews...
  ]
}
```

**Error Response:**

- **Status Code:** 500 (Internal Server Error)
  ```json
  {
    "message": "Error message"
  }
  ```

## Data Models

### Review Model

| Field     | Type     | Description                       |
| --------- | -------- | --------------------------------- |
| userId    | ObjectId | Reference to the user             |
| content   | String   | The text content of the review    |
| rating    | Number   | The rating score (1-5)            |
| createdAt | Date     | Timestamp when review was created |
| updatedAt | Date     | Timestamp when review was updated |
