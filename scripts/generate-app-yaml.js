const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const envVariables = {
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
};

const yamlContent = `
runtime: nodejs16
instance_class: F1
automatic_scaling:
  target_cpu_utilization: 0.65
  min_instances: 1
  max_instances: 3

env_variables:
  NODE_ENV: '${envVariables.NODE_ENV}'
  JWT_SECRET_KEY: '${envVariables.JWT_SECRET_KEY}'
  DB_HOST: '${envVariables.DB_HOST}'
  DB_USER: '${envVariables.DB_USER}'
  DB_PASSWORD: '${envVariables.DB_PASSWORD}'
  DB_NAME: '${envVariables.DB_NAME}'
  SENDGRID_API_KEY: '${envVariables.SENDGRID_API_KEY}'
  
beta_settings:
  cloud_sql_instances: YOUR_INSTANCE_CONNECTION_NAME
`;

fs.writeFileSync('app.yaml', yamlContent.trim());

console.log('app.yaml has been generated successfully.');
