## Usage

To use example-sfmc-app in a production environment, follow the steps below:

1. Clone the repository:

   ```shell
   git clone https://github.com/tcrennSolganeo/ExampleSfmcApp.git
   ```

2. Install the dependencies:

   ```shell
   cd ExampleSfmcApp
   npm install
   ```

3. Configure the application by setting the required environment variables:
   - `appSecret`: The secret key used for session management in the application.
   - `clientId`: The client ID for your SFMC API integration.
   - `clientSecret`: The client secret for your SFMC API integration.
   - `redirectUri`: The redirect URI for the application.
   - `subdomain`: The SFMC subdomain for your account.

   You can set these environment variables in your hosting environment or use a tool like [dotenv](https://www.npmjs.com/package/dotenv) to load them from a file.

   If you are running the app locally, you can simply uncomment the values inside the .env.dev file and change the credentials

4. Configure the SSL certificcates:
   https://akshitb.medium.com/how-to-run-https-on-localhost-a-step-by-step-guide-c61fde893771


5. Start the application:

   ```shell
   nodemon app.js
   ```

6. Deploy the application to your production server or platform of choice. Make sure to set the appropriate environment variables in your production environment.

7. Access the application using the provided URL or the one associated with your production server.

   **Note:** Ensure that the application is accessible over HTTPS in a production environment, as SFMC requires secure connections for authentication.

## Configuration

The following environment variables are required for configuring the application:

- `appSecret`: The secret key used for session management in the application.
- `clientId`: The client ID for your SFMC API integration.
- `clientSecret`: The client secret for your SFMC API integration.
- `redirectUri`: The redirect URI for the application.
- `subdomain`: The SFMC subdomain for your account.

You can set these environment variables in your hosting environment
