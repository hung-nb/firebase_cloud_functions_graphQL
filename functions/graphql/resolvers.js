const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);
const categoriesRef = admin.database().ref('categories');
module.exports = {
  Query: {
    categories() {
      return categoriesRef.once('value')
        .then(snapshot => {
          const categories = snapshot.val();
          if (categories === null) return [];
          return Object.keys(categories).map(o => Object.assign({ id: o }, categories[o]));
        });
    },
  },
  Mutation: {
    createCategory(_, { input }) {
      return (
        new Promise((resolve) => {
          const Category = categoriesRef.push(input, () => {
            resolve(Object.assign({ id: Category.key }, input)
            );
          });
        })
      );
    },
    updateCategory(_, { input }) {
      const CategoryRef = categoriesRef.child(input.id);
      return CategoryRef.once('value')
        .then(snapshot => {
          const Category = snapshot.val();
          if (Category === null) throw new Error('404');
          return Category;
        })
        .then((Category) => {
          const update = Object.assign(Category, input);
          delete update.id;
          return CategoryRef.set(update).then(() => (Object.assign({ id: input.id }, update)));
        });
    },
    deleteCategory(_, { input }) {
      const CategoryRef = categoriesRef.child(input.id);
      return CategoryRef.once('value')
        .then((snapshot) => {
          const Category = snapshot.val();
          if (Category === null) throw new Error('404');
          return Object.assign({ id: input.id }, Category);
        })
        .then(Category => CategoryRef.remove().then(() => (Category)));
    }
  }
};