const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "image.tmdb.org" }],
  },
};

export default {
  images: {
    domains: ['image.tmdb.org', 'via.placeholder.com'], // Add 'via.placeholder.com' to the list of allowed domains
  },
  ...nextConfig
};
