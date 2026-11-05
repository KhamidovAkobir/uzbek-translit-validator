/**
 * Mock/Adapter template for Uzbek SMS Gateways (Eskiz.uz, PlayMobile)
 */
class UzbekSMSClient {
  constructor(config = {}) {
    this.provider = config.provider || 'eskiz';
    this.apiKey = config.apiKey || process.env.SMS_API_KEY || '';
  }

  async sendOTP(phone, code) {
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone.startsWith('998') || cleanPhone.length !== 12) {
      throw new Error('Invalid Uzbekistan phone number for SMS delivery');
    }

    const message = `MulkFast tasdiqlash kodi: ${code}. Kodni hech kimga bermang!`;
    
    // Production integration hook for Eskiz / PlayMobile API
    // const response = await fetch('https://notify.eskiz.uz/api/message/sms/send', { ... });

    return {
      success: true,
      provider: this.provider,
      recipient: `+${cleanPhone}`,
      message,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = { UzbekSMSClient };
