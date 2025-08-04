export const APP_CONFIG = {
  name: 'Viral Shorts Generator',
  pricing: {
    amount: 29,
    scriptsPerMonth: 100
  }
};

export const ROUTES = {
  home: '/',
  signup: '/signup',
  register: '/register',
  login: '/login',
  dashboard: '/dashboard'
};

export const PLATFORMS = {
  tiktok: {
    name: 'TikTok',
    color: '#ff0050',
    maxLength: 60
  },
  instagram: {
    name: 'Instagram Reels',
    color: '#E1306C',
    maxLength: 60
  },
  youtube: {
    name: 'YouTube Shorts',
    color: '#FF0000',
    maxLength: 60
  },
  facebook: {
    name: 'Facebook Reels',
    color: '#1877F2',
    maxLength: 60
  }
};

export const CONTENT_TYPES = {
  educational: {
    name: 'Educational',
    description: 'Teach something valuable'
  },
  entertaining: {
    name: 'Entertaining',
    description: 'Make people laugh or smile'
  },
  storytelling: {
    name: 'Storytelling',
    description: 'Share a compelling story'
  },
  tutorial: {
    name: 'Tutorial',
    description: 'Step-by-step guide'
  },
  reaction: {
    name: 'Reaction',
    description: 'React to trends or content'
  },
  challenge: {
    name: 'Challenge',
    description: 'Create or participate in challenges'
  }
};

export const TONES = {
  engaging: {
    name: 'Engaging',
    description: 'Captivating and interesting'
  },
  casual: {
    name: 'Casual',
    description: 'Relaxed and friendly'
  },
  professional: {
    name: 'Professional',
    description: 'Formal and authoritative'
  },
  humorous: {
    name: 'Humorous',
    description: 'Funny and entertaining'
  },
  inspirational: {
    name: 'Inspirational',
    description: 'Motivating and uplifting'
  },
  urgent: {
    name: 'Urgent',
    description: 'Time-sensitive and compelling'
  }
};

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 }
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 }
  }
};
