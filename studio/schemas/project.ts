// /studio/schemas/project.ts
export default {
  name: 'project',
  type: 'document',
  title: 'Project',
  fieldsets: [
    {name: 'general', title: '📝 General Info', options: {collapsible: true, collapsed: false}},
    {name: 'homepage', title: '🏠 Homepage Layout', options: {collapsible: true, collapsed: true}},
    {
      name: 'projectPage',
      title: '📄 Project Page Layout',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    {name: 'title', type: 'string', fieldset: 'general'},
    {name: 'slug', type: 'slug', options: {source: 'title', maxLength: 96}, fieldset: 'general'},
    {name: 'thumbnail', type: 'image', title: 'Image or Video Thumbnail', fieldset: 'general'},
    {name: 'description', type: 'text', fieldset: 'general'},
    {name: 'date', type: 'datetime', fieldset: 'general'},

    {
      name: 'homepageSections',
      title: 'Homepage Row Settings',
      type: 'object',
      fieldset: 'homepage',
      fields: [
        {
          name: 'showRow1',
          type: 'boolean',
          title: 'Enable Top Homepage Row',
          initialValue: false,
        },
        {
          name: 'showRow2',
          type: 'boolean',
          title: 'Enable Bottom Homepage Row',
          initialValue: false,
        },
      ],
    },
    {
      name: 'row1Images',
      type: 'array',
      title: 'Homepage Top Row',
      fieldset: 'homepage',
      hidden: ({parent}) => !parent?.homepageSections?.showRow1,
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
      fieldset: 'homepage',
      hidden: ({parent}) => !parent?.homepageSections?.showRow2,
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
      name: 'layout',
      title: 'Project Layout',
      type: 'string',
      fieldset: 'projectPage',
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
      fieldset: 'projectPage',
      of: [{type: 'image'}],
      hidden: ({parent}) => parent?.layout !== 'column',
    },
    {
      name: 'galleryRows',
      title: 'Project Page Rows',
      type: 'array',
      fieldset: 'projectPage',
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
            {
              name: 'disableGap',
              title: 'Disable Gap Below This Row',
              type: 'boolean',
              initialValue: false,
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
  ],
}
