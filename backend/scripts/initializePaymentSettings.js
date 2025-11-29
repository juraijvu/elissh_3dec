import sequelize from '../config/database.js';
import '../models/index.js';
import PaymentSettings from '../models/PaymentSettings.js';

const initializePaymentSettings = async () => {
  try {
    console.log('🔗 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connected');

    console.log('💳 Initializing payment settings...');

    // Initialize Vault Payment settings
    const [vaultSettings, created] = await PaymentSettings.findOrCreate({
      where: { provider: 'vault' },
      defaults: {
        provider: 'vault',
        isEnabled: false,
        testMode: true,
        settings: {
          name: 'Vault Payment',
          description: 'UAE-based secure payment gateway',
          supportedCurrencies: ['AED', 'USD'],
          features: ['Local Cards', 'International Cards', 'Webhooks', 'Refunds']
        }
      }
    });

    if (created) {
      console.log('✅ Vault Payment settings created');
    } else {
      console.log('✅ Vault Payment settings already exist');
    }

    // Initialize Stripe settings (for future use)
    const [stripeSettings, stripeCreated] = await PaymentSettings.findOrCreate({
      where: { provider: 'stripe' },
      defaults: {
        provider: 'stripe',
        isEnabled: false,
        testMode: true,
        settings: {
          name: 'Stripe',
          description: 'Global payment platform',
          supportedCurrencies: ['AED', 'USD', 'EUR', 'GBP'],
          features: ['Global Cards', 'Apple Pay', 'Google Pay', 'Webhooks']
        }
      }
    });

    if (stripeCreated) {
      console.log('✅ Stripe settings created (disabled)');
    } else {
      console.log('✅ Stripe settings already exist');
    }

    console.log('\n📊 Current payment settings:');
    const allSettings = await PaymentSettings.findAll();
    allSettings.forEach(setting => {
      console.log(`- ${setting.provider}: ${setting.isEnabled ? 'Enabled' : 'Disabled'} (${setting.testMode ? 'Test' : 'Live'} mode)`);
    });

    console.log('\n🎉 Payment settings initialization completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

initializePaymentSettings();