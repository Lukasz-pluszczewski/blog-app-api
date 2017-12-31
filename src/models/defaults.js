// here are the defaults values for entities in given collections, they will be recursively merged with given object when inserting or replacing
export default {
  posts: {
    title: '', // string
    description: '', // string
    content: '', // markdown string
    hidden: true,
    tags: [], // array of strings
    comments: [], // array of objects: { author: string, content: string, timestamp: number [ms] }
  },
};