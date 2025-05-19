// /studio/schemas/about.ts
export default {
  name: 'about',
  type: 'document',
  title: 'About Page',
  fields: [
    { name: 'bio', type: 'array', of: [{ type: 'block' }] },
    { name: 'headshot', type: 'image' },
    { name: 'email', type: 'string' },
    { name: 'socialLinks', type: 'array', of: [{ type: 'url' }] }
  ]
};
