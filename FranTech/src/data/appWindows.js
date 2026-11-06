// Projects shown in the "Live workspace" section.
// Edit text/URLs here. Layout values are fractions of the desktop stage (0-1).
// Set `embed: false` for any site that blocks iframes (X-Frame-Options / frame-ancestors)
// and it will show the designed static preview instead of trying to load.
export const appWindows = [
  {
    id: 'resume-builder',
    title: 'FRANZOR Resume Builder',
    url: 'https://franzor-resume-builder.vercel.app',
    monogram: 'FR',
    accent: '#22d3ee',
    category: 'Web application',
    description: 'A resume builder that turns your details into a clean, downloadable CV.',
    embed: true,
    layout: {
      desktop: { x: 0.02, y: 0.04, w: 0.38, h: 0.5 },
      tablet: { x: 0.03, y: 0.03, w: 0.58, h: 0.48 },
    },
  },
  {
    id: 'frantech-portfolio',
    title: 'FranTech Portfolio',
    url: 'https://fran-tech-nine.vercel.app',
    monogram: 'FT',
    accent: '#60a5fa',
    category: 'Full-stack portfolio',
    description: 'This portfolio: React front end, Express and MongoDB API, admin CMS and analytics.',
    embed: true,
    layout: { desktop: { x: 0.33, y: 0.3, w: 0.36, h: 0.46 } },
  },
  {
    id: 'zare-beauty',
    title: 'Zare Beauty Ventures',
    url: 'https://zare-beauty-ventures.vercel.app',
    monogram: 'ZB',
    accent: '#f472b6',
    category: 'E-commerce',
    description: 'A cosmetics storefront with product browsing, cart and Paystack checkout.',
    embed: true,
    layout: {
      desktop: { x: 0.6, y: 0.04, w: 0.38, h: 0.52 },
      tablet: { x: 0.36, y: 0.3, w: 0.6, h: 0.5 },
    },
  },
  {
    id: 'rpro-apply',
    title: 'R-Pro Apply',
    url: 'https://frontend-smoky-one-yh0v07otke.vercel.app',
    monogram: 'RP',
    accent: '#a78bfa',
    category: 'Education platform',
    description: 'A Pan-African higher-education platform connecting students, institutions and partners.',
    embed: true,
    layout: {
      desktop: { x: 0.06, y: 0.46, w: 0.34, h: 0.44 },
      tablet: { x: 0.1, y: 0.52, w: 0.52, h: 0.4 },
    },
  },
  {
    id: 'kenaoliea-mfb',
    title: 'Kenaoliea MFB',
    url: 'https://kenaoliea-mfb.vercel.app',
    monogram: 'KM',
    accent: '#34d399',
    category: 'Fintech',
    description: 'A microfinance bank website presenting services, trust and ways to get in touch.',
    embed: true,
    layout: { desktop: { x: 0.62, y: 0.52, w: 0.34, h: 0.4 } },
  },
];

export const hostOf = url => {
  try { return new URL(url).host; } catch { return url; }
};
