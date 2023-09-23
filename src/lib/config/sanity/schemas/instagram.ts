// schemas/objects/instagramPost.js

export default {
    type: "object",
    name: "instagram",
    title: "Instagram Post",
    fields: [
      {
        name: "url",
        type: "url",
        description: "Visit an Instagram post in a browser and copy the URL."
      }
    ]
  };