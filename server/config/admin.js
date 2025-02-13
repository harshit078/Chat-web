module.exports = ({ env }) => ({
  auth: {
    // secret: env('ADMIN_JWT_SECRET')
    secret: '79h0/F94HL/uMGs8N2VqcQ==',
  },
  apiToken: {
    // salt: env('API_TOKEN_SALT'),
    salt: 'XmSiGu+Q9C037gYgNPUoyQ==',
  },
  transfer: {
    token: {
      // salt: env('TRANSFER_TOKEN_SALT'),
      salt: "pIWnWSdwreecXhsvzamy0A==",
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
