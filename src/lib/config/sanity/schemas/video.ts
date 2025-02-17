export default {
    name: 'videoAnimation',
    title: 'Video animation',
    type: 'object',
    fields: [
      {
        name: 'webm',
        title: 'WebM format',
        type: 'file',
        options: {
          accept: 'video/webm'
        }
      },
      {
        name: 'fallback',
        title: 'Fallback format',
        type: 'file',
        options: {
          accept: 'video/mp4'
        }
      },
      {
        name: 'aspectratio',
        title: 'Aspect Ratio',
        type: 'number',
      },
      {
        name: 'caption',
        title: 'Caption',
        type: 'string',
        required: true,
        options: {
          isHighlighted: true
        }
      },
      {
        name: 'alt',
        title: 'Alternative text (for screen readers)',
        type: 'string',
        options: {
          isHighlighted: true
        }
      },
      { name: 'muted',
        title: 'Mute this video',
        type: 'boolean',
      }
    ]
  }