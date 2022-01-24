import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as googleForms from '@googleapis/forms';
import { getOAuthClient } from './utils';
import { formTrelloMap } from './utils';
const db = admin.firestore();
const environment = functions.config();
const Trello = require('trello');
const trello = new Trello(
  environment.trello.api_key,
  environment.trello.access_token,
);

/**
 * Endpoint triggered by the Pub/Sub Topic for form response submission
 */
export const formResponses = functions.pubsub
  .topic('ActionITFormResponses')
  .onPublish(async (message) => {
    try {
      functions.logger.info('message: ', message);
      const { eventType, formId } = message.attributes;
      if (eventType !== 'RESPONSES' || !formId) return;

      const lastFetchTime = (await db.doc(`forms/meta`).get()).data()
        ?.lastFetchTime;
      functions.logger.info('lastFetchTime: ', lastFetchTime);

      // Fetch new form responses
      const newResponses = await retrieveFormResponese(lastFetchTime, formId);
      const trelloPromises: Promise<void>[] = [];
      newResponses.responses?.forEach((response) => {
        trelloPromises.push(createNewApplicantCard(response));
      });
      await Promise.all(trelloPromises);

      // Update the last fetch time in Firestore
      const timestamp = new Date().toISOString();
      await db.doc(`forms/meta`).update({ lastFetchTime: timestamp });
    } catch (error) {
      functions.logger.error(error);
    }
  });

/**
 * Retrieve the new form responses from the last fetch time
 *
 * @param {string} lastFetchTime Last fetch timestamp in RFC3339 UTC format
 * @param {string} formId Google Form ID
 *
 * @return {!Object} An array of form responses
 */
async function retrieveFormResponese(lastFetchTime: string, formId: string) {
  const authClient = await getOAuthClient();
  const forms = googleForms.forms({
    version: 'v1beta',
    auth: authClient,
  });

  const res = await forms.forms.responses.list({
    formId: formId,
    filter: `timestamp >= ${lastFetchTime}`,
  });

  return res.data;
}

/**
 * 1. Parsing the Google Form response object and map each fields to a Custom
 * Field in the Trello board.
 * 2. Create a new card on the "New Applicant" list.
 * 3. Update each Custom Field on the newly created card with the responses.
 *
 * @param {googleForms.forms.Schema$FormResponse} response Google Form Response
 */
async function createNewApplicantCard(response: any) {
  const responseMap: any = { Email: response.respondentEmail };
  Object.keys(response.answers).forEach((key) => {
    const textAnswers = response.answers[key].textAnswers;
    if (textAnswers) responseMap[key] = textAnswers.answers[0].value;
    else {
      const fileUploadAnswers = response.answers[key].fileUploadAnswers;
      if (fileUploadAnswers) {
        responseMap[key] = fileUploadAnswers.answers[0].fileId;
      }
    }
  });
  functions.logger.info('responseMap: ', responseMap);

  const trelloCard = await trello.addCard('', '', environment.trello.list_id);
  const cardId = trelloCard.id;

  const promises: any[] = [];
  Object.keys(responseMap).forEach((key) => {
    if (formTrelloMap[key]) {
      if (formTrelloMap[key].customFieldId) {
        const type = formTrelloMap[key].type;

        let data = {};
        if (type === 'text') {
          data = { value: { text: responseMap[key] } };
        }

        if (type === 'list') {
          data = { idValue: formTrelloMap[key].options![responseMap[key]] };
        }

        promises.push(
          trello.setCustomFieldOnCard(
            cardId,
            formTrelloMap[key].customFieldId,
            data,
          ),
        );
      } else {
        promises.push(
          trello.addAttachmentToCard(
            cardId,
            `https://drive.google.com/open?id=${responseMap[key]}`,
          ),
        );
      }
    }
  });
  await Promise.all(promises);
}
