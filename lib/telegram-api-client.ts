// lib/telegram-api-client.ts

import WebApp from '@twa-dev/sdk';
import {MOCK_TELEGRAM_DATA, MOCK_TELEGRAM_USER} from '../';

class TelegramApiClient {
    private static isInitialized = false;

    static async ensureInitialized() {
        if (typeof window === 'undefined') {
            throw new Error('TelegramApiClient can only be used in the browser');
        }

        if (!this.isInitialized) {
            if (process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
                this.isInitialized = true;
                return;
            }
            // Use WebApp.ready() to ensure the app is initialized
            await new Promise<void>((resolve) => {
                WebApp.ready();
                this.isInitialized = true;
                resolve();
            });
        }
    }

    static getInitData(): string {
        if (process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
            return MOCK_TELEGRAM_DATA.initData;
        }
        return WebApp.initData;
    }

    static async getUserId(): Promise<string> {
        if (process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
            return MOCK_TELEGRAM_USER.telegramId;
        }
        await this.ensureInitialized();
        return WebApp.initDataUnsafe?.user?.id.toString() || '';
    }

    // Add other Telegram-specific methods as needed
}

export default TelegramApiClient;