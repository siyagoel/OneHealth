const axios = require('axios');
const { google } = require('googleapis');

// Define your OAuth2 credentials here (client_id, client_secret, redirect_uris, etc.).
const oauth2Client = new google.auth.OAuth2(
  '478695287322-tdk2e1kv7sid8j9kkcok6ok5g0qo1h8c.apps.googleusercontent.com',
  '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',
  'http://localhost:3000/callback',
);

// Set the desired Chat API scope.
const SCOPES = ['https://www.googleapis.com/auth/chat.spaces.create'];

async function createChatSpace() {
  try {
    // Get the user's authorization.
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });

    // Redirect the user to the authorization URL and get the authorization code.

    // Exchange the authorization code for an access token and refresh token.

    // Set the access token in the OAuth2 client.

    // Make the HTTP POST request to create a Chat space.
    const response = await axios.post(
      'https://chat.googleapis.com/v1/spaces',
      {
        spaceType: 'ROOM', // Use 'ROOM' for a named space.
        displayName: 'API-made',
      },
      {
        headers: {
          Authorization: `Bearer ${oauth2Client.credentials.access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Handle the response from the API.
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the createChatSpace function to create the Chat space.
createChatSpace();
