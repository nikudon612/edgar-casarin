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
      name: 'layout',
      title: 'Project Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Column Layout', value: 'column'},
          {title: 'Gallery Rows', value: 'rows'},
        ],
        layout: 'radio',
      },
      initialValue: 'column',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'columnImages',
      title: 'Column Layout Images',
      type: 'array',
      of: [{type: 'image'}],
      hidden: ({parent}) => parent?.layout !== 'column',
    },
    {
      name: 'galleryRows',
      title: 'Project Page Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Image Row',
          fields: [
            {
              name: 'rowLayout',
              title: 'Row Layout Type',
              type: 'string',
              options: {
                list: [
                  {title: '1 Image Row', value: 'one'},
                  {title: '2 Images Row', value: 'two'},
                  {title: '3 Images Row', value: 'three'},
                ],
                layout: 'radio',
              },
              initialValue: 'one',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'images',
              title: 'Images in This Row',
              type: 'array',
              of: [{type: 'image'}],
              validation: (Rule) => Rule.max(3).error('Maximum of 3 images per row.'),
            },
          ],
          preview: {
            select: {
              layout: 'rowLayout',
              imageCount: 'images.length',
            },
            prepare({layout, imageCount}) {
              const titleMap = {
                one: '1 Image Row',
                two: '2 Images Row',
                three: '3 Images Row',
              }
              return {
                title: titleMap[layout] || 'Image Row',
                subtitle: `${imageCount || 0} image${imageCount === 1 ? '' : 's'}`,
              }
            },
          },
        },
      ],
      hidden: ({parent}) => parent?.layout === 'column', // 👈 hide when in column mode
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
