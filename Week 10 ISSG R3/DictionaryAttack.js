const https = require("https");
const crypto = require("crypto");

// Target MD5 hash
const targetHash = "578ed5a4eecf5a15803abdc49f6152d6";

// URL of the wordlist
const wordlistUrl = "https://raw.githubusercontent.com/danielmiessler/SecLists/refs/heads/master/Passwords/500-worst-passwords.txt";

// Function to hash a password with MD5
const md5Hash = (password) => {
    return crypto.createHash("md5").update(password).digest("hex");
};

// Function to perform a dictionary attack
const dictionaryAttack = async () => {
    https.get(wordlistUrl, (res) => {
        let data = "";

        // Collect the data chunks
        res.on("data", (chunk) => {
            data += chunk;
        });

        // Process the wordlist once fully received
        res.on("end", () => {
            const passwords = data.split("\n").map((pwd) => pwd.trim());

            for (const password of passwords) {
                const hash = md5Hash(password);
                if (hash === targetHash) {
                    console.log(`Password found: ${password}`);
                    return;
                }
            }
            console.log("Password not found in the wordlist.");
        });
    }).on("error", (err) => {
        console.error("Error fetching the wordlist:", err.message);
    });
};

// Execute the dictionary attack
dictionaryAttack();
