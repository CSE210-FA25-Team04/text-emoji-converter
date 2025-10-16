export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    rules: {
      semi: ["error", "always"],
      // Temporarily disable quotes rule to avoid conflict with Prettier
      // quotes: ["error", "double"],
    },
  },
];
