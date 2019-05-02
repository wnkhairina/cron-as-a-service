function myFunction(argument){
    console.log(argument)
}

const myFunction2 = (argument) => {
    console.log(argument)
}

myFunction; // console.logs argument
myFunction2(); // console.logs argument

(function myFunction(argument){
    console.log(argument)
});