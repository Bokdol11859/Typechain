interface Human {
  name: string;
  gender: string;
  age: number;
}

const person = {
  name: "Eric",
  gender: "male",
  age: 21,
};

const sayHi = (person: Human): string => {
  return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!!!`;
};

console.log(sayHi(person));

export {};
