const { Recipe, Person } = require('./models');
const db = require('./db');
beforeAll(() => {
  // clear the database before all tests
  return db
    .sync({ force: true })
    .then(() => {
      return Recipe.bulkCreate([
        {
          name: 'salad',
          cookTime: 10,
          vegan: true,
          foodGroup: 'vegetable',
        },
        {
          name: 'steak',
          cookTime: 20,
          vegan: false,
          foodGroup: 'meat',
        },
        {
          name: 'bread',
          cookTime: 50,
          vegan: true,
          foodGroup: 'grain',
        },
        {
          name: 'watermelon',
          cookTime: 2,
          vegan: true,
          foodGroup: 'fruit',
        },
      ]);
    })
    .then(() => Person.bulkCreate([{ name: 'Charles' }, { name: 'Francis' }]));
});
describe('Recipes and People', () => {
  test('Person and Recipe have a one to many relationship.', async () => {
    const charles = await Person.findOne({ where: { name: 'Charles' } });
    const steak = await Recipe.findOne({ where: { name: 'steak' } });
    const updatedSteak = await steak.update({ PersonId: charles.id });

    expect(updatedSteak.PersonId).toBe(charles.id);
  });
  test('Add a method to eagerly load recipes that belong to a person.', async () => {
    const eagerPeople = await Person.findWithRecipes();
    eagerPeople.forEach((person) => {
      if (person.name === 'Charles') {
        return expect(person.Recipes.length).toBe(1);
      }
    });
  });
  test('Add a method to create a recipe for person.', async () => {
    const Francis = await Person.findOne({ where: { name: 'Francis' } });

    await Francis.writeRecipe({
      name: 'Avocado Toast',
      cookTime: 5,
      vegan: true,
      foodGroup: 'vegetable',
    });

    const eagerPeople = await Person.findWithRecipes();
    eagerPeople.forEach((person) => {
      if (person.name === 'Francis') {
        return expect(person.Recipes[0].name).toBe('Avocado Toast');
      }
    });
  });
});
