# Modern Weather App

A clean, responsive weather dashboard built with Node.js, Express, and vanilla JavaScript. Search for any city to see its current temperature, weather condition, and OpenWeather icon, with a built-in light and dark theme toggle.

## Features

- Search current weather by city name
- Temperature displayed in Celsius
- Weather condition and icon from OpenWeather
- Light and dark theme toggle
- Loading spinner while weather data is requested
- Clear validation and error messages
- Responsive layout for desktop and mobile
- Ready for deployment on Vercel

## Tech Stack

- **Frontend:** HTML, CSS, and vanilla JavaScript
- **Backend:** Node.js and Express 5
- **Weather data:** [OpenWeather Current Weather API](https://openweathermap.org/current)
- **Deployment:** Vercel serverless function rewrite

## Project Structure

```text
weather-app-seid/
├── api/
│   └── index.js       # Vercel serverless entry point
├── public/
│   ├── index.html     # Application markup
│   ├── script.js      # Form submission and UI behavior
│   └── style.css      # Responsive themes and layout
├── app.js             # Express server and weather API route
├── package.json
└── vercel.json        # Vercel routing configuration
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- An OpenWeather API key from [openweathermap.org](https://home.openweathermap.org/users/sign_up)

### Installation

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   cd weather-app-seid
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your API key.

   In PowerShell:

   ```powershell
   $env:OPENWEATHER_API_KEY="your_openweather_api_key"
   ```

   On macOS or Linux:

   ```bash
   export OPENWEATHER_API_KEY="your_openweather_api_key"
   ```

4. Start the development server:

   ```bash
   node app.js
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

For automatic restarts during development, run `npx nodemon app.js` instead. The existing `npm start` script also uses Nodemon when it is available in your environment.

## API

The application sends a URL-encoded `POST` request to `/`:

```http
POST /
Content-Type: application/x-www-form-urlencoded

city=London
```

Successful response:

```json
{
  "city": "London",
  "temp": 14.8,
  "condition": "overcast clouds",
  "image": "https://openweathermap.org/img/wn/04d@2x.png"
}
```

Invalid cities and upstream failures return a JSON error response, for example:

```json
{
  "error": "city not found"
}
```

## Deploying to Vercel

1. Push the project to GitHub.
2. Import the repository into [Vercel](https://vercel.com/new).
3. Add the environment variable `OPENWEATHER_API_KEY` in the project settings.
4. Deploy the project.

The included `vercel.json` routes requests through `api/index.js`, which loads the Express application as the Vercel entry point.

## Environment Variables

| Variable | Required | Description |
| --- | :---: | --- |
| `OPENWEATHER_API_KEY` | Yes | API key used to request current weather data |

Never commit your API key to GitHub. For local development, use a local environment configuration and keep secrets out of tracked files.

## License

This project is available under the [ISC License](https://opensource.org/license/isc-license-txt/), as declared in `package.json`.

## Author

Created by **Seid Mohammed**.