// /studio/schemas/project.ts
export default {
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    {name: 'title', type: 'string'},
    {name: 'slug', type: 'slug', options: {source: 'title', maxLength: 96}},
    {name: 'thumbnail', type: 'image', title: 'Cover Image or Video Thumbnail'},
    {name: 'thumbnailVideo', type: 'file', title: 'Cover Video (optional)'},
    {
      name: 'row1Images',
      type: 'array',
      title: 'Row 1 Images',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'image', type: 'image', title: 'Image'},
            {name: 'order', type: 'number', title: 'Order'},
          ],
        },
      ],
    },
    {
      name: 'row2Images',
      type: 'array',
      title: 'Row 2 Images',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'image', type: 'image', title: 'Image'},
            {name: 'order', type: 'number', title: 'Order'},
          ],
        },
      ],
    },
    {name: 'description', type: 'text'},
    {
      name: 'mediaGallery',
      type: 'array',
      title: 'Project Gallery',
      of: [{type: 'image'}, {type: 'file'}],
    },
    {name: 'date', type: 'datetime'},
  ],
}
