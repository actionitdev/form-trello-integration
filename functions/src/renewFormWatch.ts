import * as functions from 'firebase-functions';
import * as googleForms from '@googleapis/forms';
import { getOAuthClient } from './utils';
const environment = functions.config();

/**
 * Firebase scheduler function which runs every 6 days to renew the Form
 * watch for new submission (the watch will expire after 7 days by default)
 */
export const renewFormWatch = functions.pubsub
  .schedule('every 23 hours')
  .onRun(async (context) => {
    const authClient = await getOAuthClient();
    const forms = googleForms.forms({
      version: 'v1beta',
      auth: authClient,
    });

    const res = await forms.forms.watches.renew({
      formId: environment.form.form_id,
      watchId: environment.form.watch_id,
    });

    functions.logger.info(res.data);
    return res.data;
  });
