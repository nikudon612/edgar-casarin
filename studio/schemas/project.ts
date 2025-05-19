// /studio/schemas/project.ts
export default {
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'thumbnail', type: 'image', title: 'Cover Image or Video Thumbnail' },
    { name: 'thumbnailVideo', type: 'file', title: 'Cover Video (optional)' },
    { name: 'description', type: 'text' },
    {
      name: 'mediaGallery',
      type: 'array',
      title: 'Project Gallery',
      of: [{ type: 'image' }, { type: 'file' }]
    },
    { name: 'date', type: 'datetime' }
  ]
};
