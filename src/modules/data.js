const repository = {
  href: 'https://github.com/ntucakovic/loan-estimate',
  target: '_blank',
  rel: 'noopener noreferrer',
  title: 'Read code on GitHub'
};

const share = {
  url: process.env.REACT_APP_SHARE_URL || 'https://loan-estimator.ntmedia.me',
  title: 'Easily estimate a loan',
  hashtags: ['react', 'reactjs', 'frontend', 'ContextAPI'],
  hashtag: '#reactjs',
  via: '_ntucakovic'
};

export { repository, share };
