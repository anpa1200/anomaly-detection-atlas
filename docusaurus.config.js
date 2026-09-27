// @ts-check
const config = {
  title: 'Anomaly Detection Atlas',
  tagline: 'Research, evidence, statistical models, telemetry, and detection engineering in one Atlas.',
  favicon: 'img/favicon.svg',

  url: 'https://1200km.com',
  baseUrl: '/anomaly-detection-atlas/',
  scripts: [{src: 'https://1200km.com/assets/docusaurus-ecosystem.js?v=20260614-3', defer: true}],
  organizationName: 'anpa1200',
  projectName: 'anomaly-detection-atlas',

  // Use the main site's consent-aware loader; do not start analytics unconditionally.
  headTags: [{tagName:'script',attributes:{src:'https://1200km.com/assets/site-performance.js','data-google-analytics-id':'G-TMTG21RVHM',defer:'true'}}],

  deploymentBranch: 'gh-pages',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: [require.resolve('./src/css/custom.css'), require.resolve('./src/css/unified.css')],
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card.svg',
    metadata: [
      {
        name: 'keywords',
        content:
          'anomaly detection, statistics, outliers, security telemetry, log sources, detection engineering',
      },
    ],
    navbar: {
      title: '1200km · Anomaly Atlas',
      logo: {
        alt: '',
        src: 'https://1200km.com/assets/ap-logo.png',
      },
      items: [
        { to: '/research', label: 'Research', position: 'left' },
        { to: '/families', label: 'Families', position: 'left' },
        { to: '/attack-statistical-anomaly-mapping', label: 'Models', position: 'left' },
        { to: '/visuals', label: 'Visuals', position: 'left' },
        {
          href: 'https://github.com/anpa1200/anomaly-detection-atlas',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://1200km.com/',
          label: '1200km home',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'References',
          items: [
            { label: 'ATT&CK Activities', to: '/attack-activity-log-source-catalog' },
            { label: 'Basic Detection Rules', to: '/attack-basic-detection-rule-catalog' },
            { label: 'Activity-Anomaly Mappings', to: '/attack-statistical-anomaly-mapping' },
            { label: 'Statistical Anomalies', to: '/statistical-anomaly-taxonomy' },
            { label: 'Security Log Sources', to: '/security-log-source-taxonomy' },
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'AdversaryGraph AI CTI Workbench',
              href: 'https://1200km.com/adversarygraph/',
            },
            {
              label: 'Medium',
              href: 'https://medium.com/@1200km',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Andrey Pautov. Anomaly Detection Atlas.`,
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: require('prism-react-renderer').themes.github,
      darkTheme: require('prism-react-renderer').themes.dracula,
    },
  },
};

module.exports = config;
