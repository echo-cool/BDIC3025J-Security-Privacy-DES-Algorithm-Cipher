let PC1;
let PC2;
let IP;
let E;
let S;
let P;
let IP_Inverse;
let NUM_OF_LEFT_SHIFTS;
// Permuted choice 1
PC1 = [
    57, 49, 41, 33, 25, 17, 9,
    1, 58, 50, 42, 34, 26, 18,
    10, 2, 59, 51, 43, 35, 27,
    19, 11, 3, 60, 52, 44, 36,
    63, 55, 47, 39, 31, 23, 15,
    7, 62, 54, 46, 38, 30, 22,
    14, 6, 61, 53, 45, 37, 29,
    21, 13, 5, 28, 20, 12, 4
];
// Permuted choice 2
PC2 = [
    14, 17, 11, 24, 1, 5,
    3, 28, 15, 6, 21, 10,
    23, 19, 12, 4, 26, 8,
    16, 7, 27, 20, 13, 2,
    41, 52, 31, 37, 47, 55,
    30, 40, 51, 45, 33, 48,
    44, 49, 39, 56, 34, 53,
    46, 42, 50, 36, 29, 32
];
// Initial permutation
IP = [
    58, 50, 42, 34, 26, 18, 10, 2,
    60, 52, 44, 36, 28, 20, 12, 4,
    62, 54, 46, 38, 30, 22, 14, 6,
    64, 56, 48, 40, 32, 24, 16, 8,
    57, 49, 41, 33, 25, 17, 9, 1,
    59, 51, 43, 35, 27, 19, 11, 3,
    61, 53, 45, 37, 29, 21, 13, 5,
    63, 55, 47, 39, 31, 23, 15, 7
];
// E BIT-SELECTION TABLE
E = [
    32, 1, 2, 3, 4, 5,
    4, 5, 6, 7, 8, 9,
    8, 9, 10, 11, 12, 13,
    12, 13, 14, 15, 16, 17,
    16, 17, 18, 19, 20, 21,
    20, 21, 22, 23, 24, 25,
    24, 25, 26, 27, 28, 29,
    28, 29, 30, 31, 32, 1
];
// S-Boxes for the DES algorithm
S = [
    [
        14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7,
        0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8,
        4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0,
        15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13
    ],
    [
        15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10,
        3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5,
        0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15,
        13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9
    ],
    [
        10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8,
        13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1,
        13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7,
        1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12
    ],
    [
        7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15,
        13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9,
        10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4,
        3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14
    ],
    [
        2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9,
        14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6,
        4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14,
        11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3
    ],
    [
        12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11,
        10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8,
        9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6,
        4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13
    ],
    [
        4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1,
        13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6,
        1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2,
        6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12
    ],
    [
        13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7,
        1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2,
        7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8,
        2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11
    ]
];
// The permutation function P used on the output of the S-boxes
P = [
    16, 7, 20, 21,
    29, 12, 28, 17,
    1, 15, 23, 26,
    5, 18, 31, 10,
    2, 8, 24, 14,
    32, 27, 3, 9,
    19, 13, 30, 6,
    22, 11, 4, 25
];
// The final permutation IP^-1
IP_Inverse = [
    40, 8, 48, 16, 56, 24, 64, 32,
    39, 7, 47, 15, 55, 23, 63, 31,
    38, 6, 46, 14, 54, 22, 62, 30,
    37, 5, 45, 13, 53, 21, 61, 29,
    36, 4, 44, 12, 52, 20, 60, 28,
    35, 3, 43, 11, 51, 19, 59, 27,
    34, 2, 42, 10, 50, 18, 58, 26,
    33, 1, 41, 9, 49, 17, 57, 25
];
// Number of shifts per round, shift table.
NUM_OF_LEFT_SHIFTS = [1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1];


function chunkString(str, len) {
    // Chunk a string into an array of n-sized chunks
    let match;
    match = str.match(new RegExp(`.{1,${len}}`, 'g'));
    return match;
}


function hexToBin(hex) {
    // Convert Hexadecimal to Binary
    let s = (`00000000${((parseInt(hex, 16)).toString(2))}`).substr(-8);
    return s;
}

function decToBin(dec) {
    // Convert Decimal to Binary
    let s = (`0000${((parseInt(dec, 10)).toString(2))}`).substr(-4);
    return s;
}

function binToHex(bin) {
    // Convert Binary to Hexadecimal
    let s = parseInt(bin, 2).toString(16);
    return s;
}

function bin(key) {
    // Convert a string to binary
    return chunkString(key, 2).map(function (hex) {
        return hexToBin(hex);
    }).join("");
}

function shiftString(str, shift) {
    // Shift a string to the left by a given number of characters
    // Based on the shift table
    return str.slice(shift, str.length) + str.slice(0, shift);
}

function keySchedule(key) {
    // Generate the 16 keys for the 16 rounds
    // GeneratedSubKeys saves the 16 keys
    let GeneratedSubKeys = [];
    let perm = (PC1.map(function (index) {
        return key[index - 1];
    })).join("");
    // Split the permuted key into two halves
    // Left half
    let C0 = perm.substr(0, perm.length / 2);
    // Right half
    let D0 = perm.substr(perm.length / 2);
    let prevC0 = C0, prevD0 = D0;
    // Generate the 16 keys
    NUM_OF_LEFT_SHIFTS.forEach((shift, i) => {
        // Shift the left half
        C0 = shiftString(prevC0, shift);
        // Shift the right half
        D0 = shiftString(prevD0, shift);
        prevC0 = C0;
        prevD0 = D0;
        let pair = C0 + D0;
        // Generate the 16 keys
        GeneratedSubKeys.push(PC2.map(function (index) {
            return pair[index - 1];
        }).join(""));
    });

    return GeneratedSubKeys;
}

function expandBlock(block) {
    // Expand the 32-bit block to 48-bits
    return E.map(function (index) {
        // Return the 48-bit block
        return block[index - 1];
    }).join("");
}

const stringXOR = (str1, str2, len) => {
    // XOR two strings
    let xor = Array(len);
    // Loop through the strings
    for (let i = 0; i < len; i++) {
        // XOR the two strings
        xor[i] = (str1[i] === str2[i] ? 0 : 1);
    }
    return xor.join("");
}

function sBoxOutput(bits) {
    // Get the output of the S-Boxes and join them
    return chunkString(bits, 6).map(function (group, sBox) {
        // Get the row and column of the S-Box
        let row = parseInt(group[0] + group[5], 2);
        let col = parseInt(group.slice(1, 5), 2);
        // Get the output of the S-Box
        return decToBin(S[sBox][16 * row + col]);
    }).join("");
}

function DES(msg, key, keys) {
    // Encrypt the message
    let permutationVar = (IP.map(function (index) {
        return msg[index - 1];
    })).join(""); // init permute (IP)
    // Split the permuted message into two halves
    let R0 = permutationVar.substr(permutationVar.length / 2); // Right half
    let L0 = permutationVar.substr(0, permutationVar.length / 2); // Left half
    let prevL0 = L0, prevR0 = R0;
    for (let i = 0; i < 16; i++) {
        L0 = prevR0;
        // Get the output of the S-Boxes
        let sBoxOut = sBoxOutput(stringXOR(keys[i], expandBlock(R0), 48));
        // Perform Permutation using the P-Table
        let finalPerm = P.map(function (index) {
            return sBoxOut[index - 1];
        }).join("");
        // XOR the left half with the output of the S-Boxes
        R0 = stringXOR(prevL0, finalPerm, 32);
        prevL0 = L0;
        prevR0 = R0;
    }
    // Join the two halves
    let joinedPair = R0 + L0;
    // Perform the final permutation
    let encryptedData = (IP_Inverse.map(function (index) {
        return joinedPair[index - 1];
    })).join("");
    // Return the encrypted message
    return chunkString(encryptedData, 4).map(binToHex).join("").toUpperCase();
}

function DESEncrypt(msg, key) {
    // Encapsulate the encryption process
    return DES(msg, key, keySchedule(key));
}

function DESDecrypt(msg, key) {
    // Encapsulate the decryption process
    return DES(msg, key, keySchedule(key).reverse());
}

function bin2(x, length) {
    // Another function to convert a string to binary
    var a = [];
    for (let i = 0; i < length; i++) {
        // Loop through the string
        a.unshift(x & 1);
        x /= 2;
    }
    return a;
}

function str2Bit(str) {
    // Convert a string to binary
    let bt = []; // Binary array
    for (let i = 0; i < str.length; i++) {
        // Get the binary representation of the character
        let k = str.charCodeAt(i);
        // Convert the character to binary
        bt = bt.concat(bin2(k, 8));
    }
    return bt;
}

function bit2Str(bits) {
    // console.log(bits)
    // Convert binary to a string
    var str = "";
    for (let i = 0; i < bits.length / 8; i++) {
        // Loop through the binary
        var k = 0;
        for (let j = 0; j < 8; j++) {
            // Convert the binary to a character
            k = k << 1;
            k += bits[8 * i + j];
        }
        // Convert the character to a string
        str += String.fromCharCode(k);
    }
    return str;
}


function strToKeyBit(str) {
    // Key preparation
    var l = str.length;
    if (l < 8) {
        // Pad the key with 0 if it is less than 8 characters
        str = str.padEnd(8, "0");
    }
    if (l > 8) {
        // Truncate the key if it is more than 8 characters
        str = str.substring(0, 8);
    }
    // Convert the key to binary
    return str2Bit(str);
}

function encrypt(str, key) {
    // Convert the key to binary
    let keyBit = strToKeyBit(key);
    if (str.length < 8) {
        // Pad the message with space if it is less than 8 characters
        str = str.padEnd(8, " ");
    }
    if (str.length > 8) {
        // throw an error if the message is more than 8 characters
        throw new Error("String too long, length must be less than 8");
    }
    // Convert the message to binary
    let MsgBit = str2Bit(str);
    // Encrypt the message
    return DESEncrypt(MsgBit, keyBit);
}

function decrypt(enc, key) {
    // Convert the key to binary
    let keyBit = strToKeyBit(key);
    // Convert Hex enc to binary
    let EncBit = bin(enc);
    // Decrypt the message
    let res = bin(DESDecrypt(EncBit, keyBit)).split("")
    //Convert to string list to int list
    for (let i = 0; i < res.length; i++) {
        // Loop through the binary
        res[i] = parseInt(res[i]);
    }
    return bit2Str(res);
}

// Testing
let key = "aabbccdd"
let msg = "a"
let enc = encrypt(msg, key);
console.log("Encrypted: " + enc);
let dec = decrypt(enc, key);
console.log("Decrypted: " + dec);


function encryptLong(str, key){
    encipherTextChunks = chunkString(str, 8);
    encipherTextBit = [];
    // Convert the data to binary
    for (let i = 0; i < encipherTextChunks.length; i++) {
        let textBit = str2Bit(encipherTextChunks[i]);
        encipherTextBit.push(textBit);
    }
    let textBit = [];
    for (let i = 0; i < encipherTextBit.length; i++) {
        textBit.push(chunkString(encipherTextBit[i].join(""), 8));
    }
    encipherKeyBit = strToKeyBit(key);
    encipherKeysGenerated = keySchedule(encipherKeyBit);
    encipherCipherText = "";
    for (let i = 0; i < encipherTextChunks.length; i++) {
        let cipherBit = encrypt(encipherTextChunks[i], key);
        encipherCipherText += cipherBit + "; ";
    }
    return encipherCipherText;
}

function decryptLong(enc, key){
    decipherKeyBit = strToKeyBit(key);
    let textBit = [];
    textBit.push(chunkString(decipherKeyBit.join(""), 8));
    // Generate the keys, will be displayed in the debug area
    encipherKeysGenerated = keySchedule(decipherKeyBit).reverse();
    let CipherBitsChunks = enc.split(";");
    decipherPlainText = "";
    textBit = [];
    textBit.push(chunkString(encipherKeysGenerated.join(""), 8 * 8));
    for (let i = 0; i < CipherBitsChunks.length; i++) {
        if (CipherBitsChunks[i].length < 16 || CipherBitsChunks[i] === "") {
            continue;
        }
        let cipherBit = CipherBitsChunks[i].trim().replace(/\s/g, "");
        decipherPlainText += decrypt(cipherBit, key).trim();
    }
    return decipherPlainText;
}

console.log(encryptLong("ddddddddddddddddddddddddddddddddddd", "dfsd"))
console.log(decryptLong(encryptLong("ddddddddddddddddddddddddddddddddddd", "dfsd"), "dfsd"))
