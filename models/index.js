const Person = require('./person');
const Recipe = require('./recipe');
//YOUR CODE HERE
Person.hasMany(Receipe);
Recipe.belongsTo(Person);

Person.findAll({
    include:{
        model:Receipe,
        where:{
            
        }
    }

})

module.exports = { Person, Recipe };
