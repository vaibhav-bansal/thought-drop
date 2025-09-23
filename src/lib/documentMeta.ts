// Utility functions to update document meta tags and title dynamically

export const updateDocumentMeta = (config: {
  app: {
    name: string;
    displayName: string;
    subtitle: string;
    description: string;
    author: string;
  };
}) => {
  // Update document title
  document.title = config.app.name;

  // Update meta tags
  updateMetaTag('description', config.app.description);
  updateMetaTag('author', config.app.author);
};

const updateMetaTag = (name: string, content: string) => {
  let metaTag = document.querySelector(`meta[name="${name}"]`);
  
  if (metaTag) {
    metaTag.setAttribute('content', content);
  } else {
    // Create meta tag if it doesn't exist
    metaTag = document.createElement('meta');
    metaTag.setAttribute('name', name);
    metaTag.setAttribute('content', content);
    document.head.appendChild(metaTag);
  }
};
