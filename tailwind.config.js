module.exports = {
  // CRITICAL: This array tells Tailwind where to look for class names
  content: [
    "./client/views/**/*.ejs", // Looks inside ALL EJS files in your views folder
    "./client/views/includes/*.ejs", // Looks inside ALL partials
    // Add any other files that use Tailwind classes here
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
