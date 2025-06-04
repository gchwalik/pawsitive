const requiredEnvVars = ['VITE_BACKEND_API'];

const missing = requiredEnvVars.filter(varName => !process.env[varName]);

if (missing.length > 0) {
  console.error('❌ Missing required environment variables:');
  missing.forEach(varName => {
    console.error(`  - ${varName}`);
  });
  console.error('\nBuild failed. Please set all required environment variables.');
  process.exit(1);
}

console.log('✅ All required environment variables are set');
