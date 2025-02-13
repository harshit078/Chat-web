module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'http://localhost:1337'),
  proxy: env.bool('IS_PROXIED', true),
  app: {
    keys: [
      "6ab58c87f97e6ca52b32de02af2acb95da9367bcf1429950fbc2c3e5f5f15f5a",
      "ab6dc28795537ebe4e03e61fcd20bdfeeb91ae8ccf51f9855fb7bbb416c8259c"
    ],
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});