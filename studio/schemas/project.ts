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
      name: 'layoutStyle',
      title: 'Project Page Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Column (Single Vertical Stack)', value: 'column'},
          {title: 'Rows of 3 (Grid)', value: 'grid'},
        ],
        layout: 'radio', // or 'dropdown' if preferred
      },
      initialValue: 'column',
    },
     {
      name: 'mediaGallery',
      type: 'array',
      title: 'Project Page Gallery',
      of: [{type: 'image'}, {type: 'file'}],
    },
    {
      name: 'galleryRows',
      title: 'Project Page Rows (Max 3 images per row)',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Image Row',
          fields: [
            {
              name: 'images',
              title: 'Images in this Row',
              type: 'array',
              of: [{type: 'image'}],
              validation: (Rule) => Rule.max(3).error('Only up to 3 images are allowed per row.'),
            },
          ],
        },
      ],
    },
    {
      name: 'row1Images',
      type: 'array',
      title: 'Homepage Top Row',
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
      title: 'Homepage Bottom Row',
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

    {name: 'date', type: 'datetime'},
  ],
}
