export const generateRandomKey = () => {
    let key = Date.now();
    let characters = "ABCDEFGHIJKLMOPQURSTUVWXYZ1234567890abcdefghijklmbopqrstuvwxyz";
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) {
       key += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return key;
}