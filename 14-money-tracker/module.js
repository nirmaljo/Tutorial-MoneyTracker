const person = ( function() {

    //Private

    const firstName = "John";
    const lastName = "Doe";

    //Public
    return {
         getFullName: function() {
             return firstName;
         }
    }




})();

const person2 = ( function() {

    //Private

    const firstName = "Jane";
    const lastName = "Doe";

    //Public
    return {
         getFullName: function() {
             return firstName;
         }
    }
})();

console.log(person.getFullName());
console.log(person2.getFullName());