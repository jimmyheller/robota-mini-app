// lib/telegram-api-client.ts

import WebApp from '@twa-dev/sdk';

class TelegramApiClient {
    private static isInitialized = false;

    static async ensureInitialized() {
        if (typeof window === 'undefined') {
            throw new Error('TelegramApiClient can only be used in the browser');
        }

        if (!this.isInitialized) {
            // Use WebApp.ready() to ensure the app is initialized
            await new Promise<void>((resolve) => {
                WebApp.ready();
                this.isInitialized = true;
                resolve();
            });
        }
    }

    static getInitData(): string {
        return WebApp.initData;
    }

    static async getUserId(): Promise<string> {
        await this.ensureInitialized();
        return WebApp.initDataUnsafe?.user?.id.toString() || '';
    }

    // Add other Telegram-specific methods as needed
}

export default TelegramApiClient;