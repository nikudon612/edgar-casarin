import blockContent from './blockContent'

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
    {
      name: 'title',
      type: 'string',
      fieldset: 'general',
      validation: (Rule) => Rule.required().error('Title is required'),
    },
    {
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      fieldset: 'general',
      validation: (Rule) => Rule.required().error('Slug is required'),
    },
    {name: 'thumbnail', type: 'image', title: 'Image or Video Thumbnail', fieldset: 'general'},
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent', // ← use your rich-text schema here
      fieldset: 'general',
      validation: (Rule) => Rule.required().error('Description is required'),
    },
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

    // Top Row Images
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
            {
              name: 'type',
              type: 'string',
              title: 'Media Type',
              options: {
                list: [
                  {title: 'Image', value: 'image'},
                  {title: 'Video (Vimeo)', value: 'video'},
                  {title: 'Video File', value: 'file'},
                ],
                layout: 'radio',
              },
              initialValue: 'image',
              validation: (Rule) => Rule.required().error('Top Row media type is required'),
            },
            {
              name: 'image',
              type: 'image',
              title: 'Image',
              hidden: ({parent}) => parent?.type !== 'image',
            },
            {
              name: 'vimeoId',
              type: 'string',
              title: 'Vimeo Video ID',
              hidden: ({parent}) => parent?.type !== 'video',
              validation: (Rule) =>
                Rule.custom((id, context) => {
                  if (!id) return true
                  return /^\d+$/.test(id) ? true : 'Vimeo ID must be numeric (Top Row)'
                }),
            },
            {
              name: 'videoFile',
              type: 'file',
              title: 'Video File (MP4/WebM)',
              hidden: ({parent}) => parent?.type !== 'file',
              options: {
                accept: 'video/mp4,video/webm',
              },
            },
            {
              name: 'posterImage',
              type: 'image',
              title: 'Poster Image (Optional)',
              hidden: ({parent}) => parent?.type !== 'video',
            },
            {name: 'order', type: 'number', title: 'Order'},
          ],
        },
      ],
    },

    // Bottom Row Images
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
            {
              name: 'type',
              type: 'string',
              title: 'Media Type',
              options: {
                list: [
                  {title: 'Image', value: 'image'},
                  {title: 'Video (Vimeo)', value: 'video'},
                  {title: 'Video File', value: 'file'},
                ],
                layout: 'radio',
              },
              initialValue: 'image',
              validation: (Rule) => Rule.required().error('Bottom Row media type is required'),
            },
            {
              name: 'image',
              type: 'image',
              title: 'Image',
              hidden: ({parent}) => parent?.type !== 'image',
            },
            {
              name: 'vimeoId',
              type: 'string',
              title: 'Vimeo Video ID',
              hidden: ({parent}) => parent?.type !== 'video',
              validation: (Rule) =>
                Rule.custom((id) => {
                  if (!id) return true
                  return /^\d+$/.test(id) ? true : 'Vimeo ID must be numeric (Bottom Row)'
                }),
            },
            {
              name: 'videoFile',
              type: 'file',
              title: 'Video File (MP4/WebM)',
              hidden: ({parent}) => parent?.type !== 'file',
              options: {
                accept: 'video/mp4,video/webm',
              },
            },
            {
              name: 'posterImage',
              type: 'image',
              title: 'Poster Image (Optional)',
              hidden: ({parent}) => parent?.type !== 'video',
            },
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
      validation: (Rule) => Rule.required().error('Project layout selection is required'),
    },

    {
      name: 'columnImages',
      title: 'Column Layout Images',
      type: 'array',
      fieldset: 'projectPage',
      hidden: ({parent}) => parent?.layout !== 'column',
      of: [
        {
          type: 'object',
          initialValue: {type: 'image'},
          fields: [
            {
              name: 'type',
              type: 'string',
              title: 'Media Type',
              options: {
                list: [
                  {title: 'Image', value: 'image'},
                  {title: 'Video (Vimeo)', value: 'video'},
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required().error('Column layout media type is required'),
            },
            {
              name: 'image',
              type: 'image',
              title: 'Image',
              hidden: ({parent}) => parent?.type !== 'image',
            },
            {
              name: 'vimeoId',
              type: 'string',
              title: 'Vimeo Video ID',
              hidden: ({parent}) => parent?.type !== 'video',
              validation: (Rule) =>
                Rule.custom((id) =>
                  !id || /^\d+$/.test(id) ? true : 'Vimeo ID must be numeric (Column Layout)',
                ),
            },
            {
              name: 'posterImage',
              type: 'image',
              title: 'Poster Image (Optional)',
              hidden: ({parent}) => parent?.type !== 'video',
            },
            {
              name: 'playbackOption',
              title: 'Video Playback Option',
              type: 'string',
              hidden: ({parent}) => parent?.type !== 'video',
              options: {
                list: [
                  {title: 'Autoplay & Loop (No Controls)', value: 'autoplayLoop'},
                  {title: 'Playback Controls', value: 'controls'},
                ],
                layout: 'radio',
              },
              initialValue: 'autoplayLoop',
            },
          ],
        },
      ],
    },

    {
      name: 'galleryRows',
      title: 'Project Page Rows',
      type: 'array',
      fieldset: 'projectPage',
      hidden: ({parent}) => parent?.layout === 'column',
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
              validation: (Rule) => Rule.required().error('Row layout type is required'),
            },
            {
              name: 'images',
              title: 'Images or Videos in This Row',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'type',
                      type: 'string',
                      title: 'Media Type',
                      options: {
                        list: [
                          {title: 'Image', value: 'image'},
                          {title: 'Video (Vimeo)', value: 'video'},
                        ],
                        layout: 'radio',
                      },
                      validation: (Rule) => Rule.required().error('Row media type is required'),
                    },
                    {
                      name: 'image',
                      type: 'image',
                      title: 'Image',
                      hidden: ({parent}) => parent?.type !== 'image',
                    },
                    {
                      name: 'vimeoId',
                      type: 'string',
                      title: 'Vimeo Video ID',
                      hidden: ({parent}) => parent?.type !== 'video',
                      validation: (Rule) =>
                        Rule.custom((id) =>
                          !id || /^\d+$/.test(id) ? true : 'Vimeo ID must be numeric (Row)',
                        ),
                    },
                    {
                      name: 'posterImage',
                      type: 'image',
                      title: 'Poster Image (Optional)',
                      hidden: ({parent}) => parent?.type !== 'video',
                    },
                    {
                      name: 'playbackOption',
                      title: 'Video Playback Option',
                      type: 'string',
                      hidden: ({parent}) => parent?.type !== 'video',
                      options: {
                        list: [
                          {title: 'Autoplay & Loop (No Controls)', value: 'autoplayLoop'},
                          {title: 'Playback Controls', value: 'controls'},
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'autoplayLoop',
                    },
                    {
                      name: 'width',
                      type: 'string',
                      title: 'Image/Video Width (%)',
                      options: {
                        list: [
                          {title: 'Full (100%)', value: '100%'},
                          {title: 'Two Thirds (66%)', value: '66.66%'},
                          {title: 'Half (50%)', value: '50%'},
                          {title: 'One Third (33%)', value: '33.33%'},
                          {title: 'One Quarter (25%)', value: '25%'},
                        ],
                        layout: 'radio',
                      },
                      initialValue: '100%',
                    },
                  ],
                },
              ],
              validation: (Rule) => Rule.max(3).error('Maximum of 3 media items per row.'),
            },
            {
              name: 'disableGap',
              title: 'Disable Gap Below This Row',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
    },
  ],
}
