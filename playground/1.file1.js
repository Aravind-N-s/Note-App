const city = 'Bangalore'
const greet = () => {
    console.log('Hello There')
}

module.exports = {
city,
greet
}
//es6 feature
//multiple values being exported should be done in an object
/*
module.export = {
    city: city,
    greet: greet
}
if the name are same es6 features are used
*/
// console.log(module)