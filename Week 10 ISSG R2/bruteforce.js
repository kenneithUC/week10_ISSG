const crypto = require('crypto');

// Target hash
const targetHash = "5531a5834816222280f20d1ef9e95f69";

// Brute force attack to find the PIN
function bruteForcePIN() {
    for (let i = 0; i <= 9999; i++) {
        const pin = i.toString().padStart(4, '0'); // Ensure it's 4 digits (e.g., 0001)
        const hash = crypto.createHash('md5').update(pin).digest('hex');
        if (hash === targetHash) {
            return pin;
        }
    }
    return null; // Return null if no match is found
}

// Run the brute force function
const result = bruteForcePIN();

if (result) {
    console.log(`Alice's PIN is: ${result}`);
} else {
    console.log('PIN not found.');
}
