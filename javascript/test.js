let count = 0;

let test = {
    [count++]: 1
}

console.log(test);

for(let i = 0; i < 5; i++) {
    test = {
        ...test,
        [count++]: "ddd"
    }
}

console.log(test);