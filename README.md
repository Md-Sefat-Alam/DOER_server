# Agrani DOER Backend

## Project Overview

The backend for Agrani DOER handles data management and operations for the gallery items. It is built using Express and MongoDB, providing endpoints for CRUD operations and file handling.

- **Frontend**: Built using Next.js 14 with internationalization support.
- **Backend**: Powered by Express and MongoDB, handling various CRUD operations.

## Live Demo

- **Frontend**: [Agrani DOER Frontend](https://doer-frontend.vercel.app/en)
- **Backend**: [Agrani DOER Backend](https://agrani-doer-backend.vercel.app/)


# API Endpoints

Welcome to our API! Here’s a simple guide to help you interact with our gallery and feature endpoints. 🌟

## Gallery Endpoints

### Get All Features

**GET** `/all_features`

- **Description:** Retrieve all feature items from the database.

### Add Gallery Item

**POST** `/gallery`

- **Description:** Add a new gallery item with an image upload.

### Get All Gallery Items

**GET** `/gallery`

- **Description:** Retrieve all gallery items with an active status.

### Get Gallery Image by ID

**GET** `/gallery/image/:id`

- **Description:** Retrieve a specific gallery image by its ID.

### Delete Gallery Item

**DELETE** `/gallery/:id`

- **Description:** Delete a gallery item by its ID.

### Update Gallery Item

**PUT** `/gallery/:id`

- **Description:** Update a gallery item by its ID. You can update the title, description, and image.

## General

### Health Check

**GET** `/`

- **Description:** Check if the server is up and running. 😊
