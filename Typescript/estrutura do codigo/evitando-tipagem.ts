function sendSpaceship(spaceship: {pilot: string, copilot?: string}) {

} 

sendSpaceship({pilot: 'John Doe', copilot: 'Jane Doe'})

sendSpaceship({pilot : 'Luke'}) // Error: Argument of type '{ pilot: string; }' is not assignable to parameter of type '{ pilot: string; copilot: string; }'.

let input : unknown
input = 10
input = '10'
input = true

let input2 : any
input2 = 10
input2 = '10'
input2 = true

let text : string
text = input // Error: Type 'unknown' is not assignable to type 'string'.
text = input2 // OK

function verification(test) {
    if (test) {

    } else {
        let check: never

        let text = check

        text = '10' // Error: Type 'string' is not assignable to type 'never'.
        
        return check
    }
}



