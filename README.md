# Giftick

Giftick is a web application designed to facilitate the purchase of gift cards for various gifts. The application features two types of users: businesses and customers. Businesses can add themselves to the site and pay for the ability to sell gift cards through the platform, while customers can purchase gift cards from these businesses and send them to friends along with a message and an email containing the gift card and a greeting.

## Features

- **Business Registration**: Businesses can register and add themselves to the platform.
- **User Registration**: User Registration using token's sacurity system.
- **Gift Card Purchase**: Customers can buy gift cards from registered businesses.
- **Email Notifications**: Customers can send gift cards via email to their friends, including a personalized message.
- **Image Upload**: The application supports image uploads.
- **Mock Payment System**: The project includes a mock payment system for processing transactions.

## Technologies Used

- **Client-Side**: JavaScript
- **Server-Side**: Node.js
- **DB**:MongoDB
- **Email Sending**: Node module email services
- **Image Upload**: Server-side image handling

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/giftick.git
    ```

2. Navigate to the project directory:
    ```bash
    cd giftick
    ```

3. Install server dependencies:
    ```bash
    npm install
    ```

4. Start the server:
    ```bash
    node server.js
    ```

## Usage

1. **Register as a Business**:
    - Navigate to the business registration page.
    - Fill out the registration form and submit.
    - Once approved, the business can start listing gift cards on the platform.

2. **Purchase a Gift Card**:
    - Browse the available gift cards from various businesses.
    - Select a gift card and proceed to checkout.
    - Enter the recipient's email and a personalized message.
    - Complete the purchase through the mock payment system.
    - The recipient will receive an email with the gift card and your message.

## Project Structure

- **client/**: Contains the client-side JavaScript code.
- **server/**: Contains the server-side Node.js code.
- **DB/**:please do not mind this directory.





