// lib/telegram-api-client.ts

import WebApp from '@twa-dev/sdk';

class TelegramApiClient {
    static async getInitData(): Promise<string> {
        return WebApp.initData || '';
    }

    static async getUserId(): Promise<string> {
        return WebApp.initDataUnsafe?.user?.id.toString() || '';
    }

    // Add other Telegram-specific methods as needed
}

export default TelegramApiClient;