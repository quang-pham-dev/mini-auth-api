import * as mongoose from 'mongoose';
import { EmailService } from '@processors/helper/helper.service.email';
import * as APP_CONFIG from '@config/app.config';
import logger from '@utils/logger';

export const databaseProvider = [
  {
    inject: [EmailService],
    provide: 'DbConnectionToken',
    useFactory: async (emailService: EmailService) => {
      let reconnectionTask = null;
      const RECONNECT_INTERVAL = 6000;

      const sendAlarmMail = (error: string) => {
        emailService.sendMail({
          to: APP_CONFIG.EMAIL.admin,
          subject: `${APP_CONFIG.APP.NAME} An exception occurred in the database!`,
          text: error,
          html: `<pre><code>${error}</code></pre>`,
        });
      };

      // Connect to the database
      const connection = async (): Promise<void> => {
        try {
          await mongoose.connect(process.env.DB_HOST);
        } catch (error) {
          console.info(error);
        }
      };

      mongoose.connection.on('connecting', () => {
        logger.info('[MongoDB]', '🌨️ connecting...');
      });

      mongoose.connection.once('open', () => {
        logger.info('[MongoDB]', 'readied!');
        clearTimeout(reconnectionTask);
        reconnectionTask = null;
      });

      mongoose.connection.on('disconnected', () => {
        logger.error('[MongoDB]', `disconnected! try ${RECONNECT_INTERVAL / 1000}s Reconnect`);
        reconnectionTask = setTimeout(connection, RECONNECT_INTERVAL);
      });

      mongoose.connection.on('error', (error) => {
        logger.error('[MongoDB]', '❌ error!', error);
        mongoose.disconnect();
        sendAlarmMail(String(error));
      });

      return await connection();
    },
  },
];
