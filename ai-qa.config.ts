module.exports = {
  stages: [
    {
      name: 'Homepage Exploration',
      instructions: [
        'Visit the homepage like a first-time user',
        'Check if the hero section is clear and compelling',
        'Verify all navigation links work',
        'Click the main CTA button',
        'Report any broken links, missing images, or confusing text',
      ],
    },
    {
      name: 'Authentication Flow',
      instructions: [
        'Navigate to the login page',
        'Try logging in with invalid credentials',
        'Verify error messages are clear and helpful',
        'Navigate to the registration page',
        'Try registering with missing fields',
        'Verify form validation works correctly',
        'Check password visibility toggle',
        'Report any UX issues with the auth flow',
      ],
    },
    {
      name: 'Dashboard Navigation',
      instructions: [
        'Log in with valid credentials',
        'Check if dashboard stats cards load correctly',
        'Verify recent matches section displays data',
        'Test quick action buttons',
        'Navigate to different dashboard sections',
        'Check loading states and empty states',
        'Report any broken interactions or missing feedback',
      ],
    },
    {
      name: 'Settings Management',
      instructions: [
        'Navigate to settings page',
        'Test theme toggle (light/dark mode)',
        'Try updating profile information',
        'Test form validation on settings forms',
        'Verify save/cancel buttons work correctly',
        'Check for unsaved changes warning',
        'Report any UX issues',
      ],
    },
    {
      name: 'Tournament Browsing',
      instructions: [
        'Navigate to tournaments page',
        'Check if tournament cards display correctly',
        'Test search/filter functionality',
        'Click on a tournament to view details',
        'Verify tournament detail page loads correctly',
        'Check responsive design on mobile viewport',
        'Report any visual or functional issues',
      ],
    },
  ],
  browser: {
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  llm: {
    provider: 'ollama',
    model: 'qwen3',
    baseUrl: 'http://localhost:11434',
  },
  output: {
    format: 'markdown',
    directory: '../reports/ai-qa',
    includeScreenshots: true,
    includeTraces: true,
  },
};
