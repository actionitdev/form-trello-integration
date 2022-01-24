import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { google, Auth } from 'googleapis';
const db = admin.firestore();
const environment = functions.config();

/**
 * Get Google OAuth client for the Forms API call
 *
 * @return {Promise<Auth.OAuth2Client>} Google OAuth2Client
 */
export async function getOAuthClient(): Promise<Auth.OAuth2Client> {
  // Get refresh token from Firestore
  const tokenRef = db.collection('tokens').doc(environment.oauth.token_id);
  const refreshToken = (await tokenRef.get()).data()?.oauth.refresh_token;

  // Initialize Google OAuth client
  const oauth2Client = new google.auth.OAuth2(
    environment.oauth.client_id,
    environment.oauth.client_secret,
    environment.oauth.redirect_uri,
  );

  // Get access token with refresh token & reset the token in Firestore
  oauth2Client.credentials.refresh_token = refreshToken;
  const response = await oauth2Client.getAccessToken();
  const credentials = response.res?.data;
  oauth2Client.setCredentials(credentials);
  await tokenRef.update({ oauth: credentials });
  return oauth2Client;
}
