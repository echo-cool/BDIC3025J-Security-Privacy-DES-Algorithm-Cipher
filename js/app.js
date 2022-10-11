//JQuery
// Local Variable
var encipherPlainText = "";
var encipherKey = "";
var encipherCipherText = "";
var decipherCipherText = "";
var decipherKey = "";
var decipherPlainText = "";
let decipherKeyBit = "";
let encipherTextBit = "";
let encipherTextChunks = "";
let encipherKeysGenerated = "";
let encipherKeyBit = "";
let decipherKeysGenerated = "";
let fileName = "";


function updateValueEncipher() {
    // Update Encipher Value
    console.log("updateValueEncipher");
    encipherPlainText = document.getElementById("encipherPlainText").value;
    encipherKey = document.getElementById("encipherKey").value;
}

function updateValueDecipher() {
    // Update Decipher Value
    console.log("updateValueDecipher");
    decipherCipherText = document.getElementById("decipherCipherText").value;
    decipherKey = document.getElementById("decipherKey").value;
}

function ShowEncipherLoading() {
    // Show Encipher Loading Animation
    console.log("ShowEncipherLoading");
    $('#encipherLoading')[0].style.display = "flex";
}

function HideEncipherLoading() {
    // Hide Encipher Loading Animation
    console.log("HideEncipherLoading");
    $('#encipherLoading')[0].style.display = "none";
}

function ShowDecipherLoading() {
    // Show Decipher Loading Animation
    console.log("ShowDecipherLoading");
    $('#decipherLoading')[0].style.display = "flex";
}

function HideDecipherLoading() {
    // Hide Decipher Loading Animation
    console.log("HideDecipherLoading");
    $('#decipherLoading')[0].style.display = "none";
}


function handleValueChange(type) {
    // Handle Value Change
    decipherPlainText = document.getElementById("decipherPlainText").value;
    decipherCipherText = document.getElementById("decipherCipherText").value;
    console.log(
        "encipherPlainText: " + encipherPlainText + "\n" +
        "encipherKey: " + encipherKey + "\n" +
        "encipherCipherText: " + encipherCipherText + "\n" +
        "decipherCipherText: " + decipherCipherText + "\n" +
        "decipherKey: " + decipherKey + "\n" +
        "decipherPlainText: " + decipherPlainText + "\n"
    );
    // Split the data and get the Filename
    fileName = document.getElementById("clearfile").value.split("\\").pop();
    console.log("fileName: " + fileName);
    console.log("FileName Base64: " + Base64.encode(fileName));
    // Use base64 to encode text, in order to handel special characters / chinese characters
    let EncodeEncipherPlainText = Base64.encode(encipherPlainText);
    if ((EncodeEncipherPlainText !== "" || encipherKey !== "") && type === "E") {
        // Chunk the data to length of 8
        encipherTextChunks = chunkString(EncodeEncipherPlainText, 8);
        document.getElementById("encipherTextChunks").value = encipherTextChunks;
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
        document.getElementById("encipherTextBit").value = textBit.join(", ");
        // Convert the key to binary
        encipherKeyBit = strToKeyBit(encipherKey);
        textBit = [];
        textBit.push(chunkString(encipherKeyBit.join(""), 8));
        document.getElementById("encipherKeyBit").value = textBit.join(", ");
        encipherKeysGenerated = keySchedule(encipherKeyBit);
        textBit = [];
        textBit.push(chunkString(encipherKeysGenerated.join(""), 8 * 8));
        document.getElementById("encipherKeysGenerated").value = textBit.join(", ");
        encipherCipherText = "";
        for (let i = 0; i < encipherTextChunks.length; i++) {
            let cipherBit = encrypt(encipherTextChunks[i], encipherKey);
            encipherCipherText += cipherBit + "; ";
        }
        document.getElementById("encipherCipherText").value = encipherCipherText;
        // Hide the loading animation
        HideEncipherLoading();
    }
    if ((decipherCipherText !== "" || decipherKey !== "") && type === "D") {
        // Convert the key to binary
        decipherKeyBit = strToKeyBit(decipherKey);
        let textBit = [];
        textBit.push(chunkString(decipherKeyBit.join(""), 8));
        document.getElementById("decipherKeyBit").value = textBit.join(", ");
        // Generate the keys, will be displayed in the debug area
        encipherKeysGenerated = keySchedule(decipherKeyBit).reverse();
        let CipherBitsChunks = decipherCipherText.split(";");
        decipherPlainText = "";
        textBit = [];
        textBit.push(chunkString(encipherKeysGenerated.join(""), 8 * 8));
        document.getElementById("decipherKeysGenerated").value = textBit.join(", ");
        for (let i = 0; i < CipherBitsChunks.length; i++) {
            if (CipherBitsChunks[i].length < 16 || CipherBitsChunks[i] === "") {
                continue;
            }
            let cipherBit = CipherBitsChunks[i].trim().replace(/\s/g, "");
            decipherPlainText += decrypt(cipherBit, decipherKey).trim();
        }
        // decode the base64 text
        let DecodeDecipherPlainText = Base64.decode(decipherPlainText);
        console.log("decipherPlainText: " + DecodeDecipherPlainText);
        document.getElementById("decipherPlainText").value = DecodeDecipherPlainText;
        // Hide the loading animation
        HideDecipherLoading();
    }

}

$(document).ready(function () {
    // Register the event listener
    HideEncipherLoading();
    HideDecipherLoading();
    $("#encipherPlainText").donetyping(function () {
        ShowEncipherLoading();
        setTimeout(function () {
            let value = $("#encipherPlainText").val();
            encipherPlainText = value;
            handleValueChange("E");
        }, 100);
    })

    $("#encipherKey").donetyping(function () {
        ShowEncipherLoading();
        setTimeout(function () {
            let value = $("#encipherKey").val();
            encipherKey = value;
            handleValueChange("E");
        }, 100);
    })
    $("#decipherCipherText").donetyping(function () {
        ShowDecipherLoading();
        setTimeout(function () {
            let value = $("#decipherCipherText").val();
            decipherCipherText = value;
            handleValueChange("D");
        }, 100);
    })
    $("#decipherKey").donetyping(function () {
        ShowDecipherLoading();
        setTimeout(function () {
            let value = $("#decipherKey").val();
            decipherKey = value;
            handleValueChange("D");
        }, 100);

    });
    $("#clearfile").change(function () {
        // Read the file
        let file = this.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        ShowEncipherLoading();
        reader.onload = function () {
            let result = reader.result;
            fileName = document.getElementById("clearfile").value.split("\\").pop();
            encipherPlainText = Base64.encode(fileName) + "<->";
            encipherPlainText += result;
            $("#encipherPlainText").val(encipherPlainText);
            handleValueChange("E");
        }
    })
})

function dataURItoBlob(dataURI) {
    // handle download file, convert the base64 to blob
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // mime类型
    var byteString = atob(dataURI.split(',')[1]); //base64 解码
    var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
    var intArray = new Uint8Array(arrayBuffer); //创建视图

    for (var i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }
    HideDecipherLoading();
    return new Blob([intArray], {type: mimeString});
}

function clickDownloadclear(aLink) {
    // handle download file
    str = document.getElementById("decipherPlainText").value;
    fileName = str.split("<->")[0];
    fileContent = str.split("<->")[1];
    let blob = dataURItoBlob(fileContent);
    aLink.download = Base64.decode(fileName);
    aLink.href = URL.createObjectURL(blob);

}

function EncipherBtnClick() {
    // Manual encipher action
    updateValueEncipher();
    handleValueChange("E");
}

function DecipherBtnClick() {
    // Manual decipher action
    updateValueDecipher();
    handleValueChange("D");
}

// flag for debug info
let displayDebugInformation = false;

// action for debug info
function ToggleDebugInformation() {
    let itemList = document.getElementsByClassName("debug");
    displayDebugInformation = !displayDebugInformation;
    for (let i = 0; i < itemList.length; i++) {
        if (displayDebugInformation) {
            itemList[i].style.display = "block";
        } else {
            itemList[i].style.display = "none";
        }
    }

}

