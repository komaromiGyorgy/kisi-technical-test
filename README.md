# Kisi Technical Test

This project is a solution to the Kisi Marketing Technical Test, demonstrating a full-stack development approach. The goal of the test is to create a responsive mosaic layout web application that fetches data from a backend API and allows users to upload new images.

## Project Structure

The project consists of two main components: the frontend and the API server.

### Frontend

The frontend of the application is developed using [Nuxt.js 3](https://nuxt.com/). It includes three separate implementations of the requested layout:

1. `/` - This route displays the basic implementation of the mosaic layout.
2. `/masonry` - This route showcases an alternative implementation using a masonry layout.
3. `/basic` - This route demonstrates a basic implementation of the layout without any additional styling.

The frontend is deployed and can be accessed at [https://frontend.yorgsoft.com/](https://frontend.yorgsoft.com/).

### API Server

The API server is implemented using Node.js and provides an API endpoint to retrieve a list of images and associate them with articles. It also allows users to upload new images.

The API server is deployed and can be accessed at [https://api.yorgsoft.com/](https://api.yorgsoft.com/).

## API Documentation

The API server provides the following endpoints:

- `GET /images`: Retrieves a list of all images with associated articles.
- `POST /images`: Accepts an image file and saves it to the server.

Please refer to the API server code for detailed implementation and usage.

## Deployment

The frontend and API server are both deployed to Railway for easy access and testing.

- Frontend: [https://frontend.yorgsoft.com/](https://frontend.yorgsoft.com/)
- API Server: [https://api.yorgsoft.com/](https://api.yorgsoft.com/)

## Version Control

The project is maintained using Git and is hosted on GitHub. You can find the repository at [https://github.com/komaromiGyorgy/kisi-technical-test](https://github.com/komaromiGyorgy/kisi-technical-test).

## Notes

- The layout implementation in the frontend may slightly differ from the provided reference design material, but it aims to be as close as possible.
- For any issues or feedback related to the project, please create an issue on the GitHub repository.



