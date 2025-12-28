let point: [number, number] 
point = [10, 20] // OK
point = [10, 20, 30] // Error: Type '[number, number, number]' is not assignable to type '[number, number]'

let [x, y] = point // OK
let [a, b] = [10, 20] // OK     

point = [10, 20, 30] // Error: Type '[number, number, number]' is not assignable to type '[number, number]'
point = [10] // Error: Type '[number]' is not assignable to type '[number, number]' 
point = [10, 20, 30] // Error: Type '[number, number, number]' is not assignable to type '[number, number]'
point = [10, 20] // OK