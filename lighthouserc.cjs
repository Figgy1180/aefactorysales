module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: ['http://localhost/', 'http://localhost/clearfold/', 'http://localhost/free-quote/'],
      numberOfRuns: 3,
      settings: { chromeFlags: '--no-sandbox --disable-dev-shm-usage' },
    },
    assert: {
      assertions: {
        'document-title': 'error',
        'meta-description': 'error',
        'http-status-code': 'error',
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
    upload: { target: 'filesystem', outputDir: './lighthouse-report' },
  },
};
