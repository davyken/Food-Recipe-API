# REST API

This is a simple RESTful API built with Node.js, Express, and MongoDB. It allows you to perform CRUD (Create, Read, Update, Delete) operations on recipes.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and MongoDB installed on your machine.

### Installing

1. Clone the repository
```bash
git clone https://github.com/davyken/rest-api.git
```
2. Install dependencies
```bash
cd rest-api
npm install
```
3. Start the server
```bash
npm start
```
The server will start running at `http://localhost:3000`.

## API Endpoints

The API has the following endpoints:

- `GET /api/recipes`: Returns an array of all recipes.
- `POST /api/recipes`: Creates a new recipe.
- `PUT /api/recipes/:id`: Updates an existing recipe with the specified ID.
- `DELETE /api/recipes/:id`: Deletes the recipe with the specified ID.

## Using the API with a Frontend Application

You can use this API with any frontend application that can send HTTP requests, such as a React or Angular app.

Here's an example of how you can use the `fetch` API to get all recipes from a React component:

```jsx
componentDidMount() {
  fetch('http://localhost:3000/api/recipes')
    .then(response => response.json())
    .then(recipes => this.setState({ recipes }));
}
```

Please replace `'http://localhost:3000'` with your actual server address if your API is not running on your local machine.

## Error Handling

The API includes error handling middleware. If there's an error, the API will return a JSON response with a `something broke` field containing the error details.

## Validation

The API validates the `name` and `instructions` fields of the recipes. If the validation fails, it will return a 400 status code and a JSON response with the validation errors.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/davyken/rest-api/blob/main/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/davyken/rest-api/blob/main/LICENSE.md) file for details

