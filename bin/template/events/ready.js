module.exports = {
    name: "ready",
    once: true,
    async execute(client, args){
        console.log("I am ready!");
    }
}