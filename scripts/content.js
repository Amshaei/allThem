


// Turns all gendered pronouns into they/them neutral pronouns 
// They Them Theirs Theirs Themselves
function allThem(node) {
    const regexSubject = /\b(he|she)\b/i;
    const regexObject1 = /\b(him)\b/i;
    const regexObject2= /\b(her)\s+(?=.)\b/i;
    const regexAdjective1 = /\b(his)\s+(?=\w)\b/i;
    const regexAdjective2 = /\b(her)\s+(?=\w)\b/i;
    const regexPossesive1 = /\b(his)\s+(?=\w)/i;
    const regexPossesive2 = /\b(hers)\b/i;
    const regexReflexive = /\b(himself|herself)\b/i;
    const specialChars = /(?=[ .,:;?!<>@#$%&\n\*\(\)\~\`\/\^\"\'\\\[\]\=\+\_\-\{\}])|(?<=[ .,:;?!<>@#$%&\*\(\)\~\`\/\^\"\'\\\[\]\=\+\_\-\{\}])/g;
    if (node.innerText) {
        console.log(node.innerHTML);
        text = node.innerText;
        const textArray = text.split(specialChars);
        console.log(textArray);
        for(let i = 0; i<textArray.length; i++) 
        {
            // console.log(textArray[i]);
            if (regexSubject.test(textArray[i])) {
                // console.log("Subject");
                switch (checkCapitalization(textArray[i])) {
                    case 1: textArray[i] =  "they";
                    case 2: textArray[i] = "They";
                    case 3: textArray[i] = "THEY";
                    default: textArray[i] = "they";
                } 
            }
            if (regexObject1.test(textArray[i])||regexObject2.test(textArray[i])) {
                // console.log("Object");
                switch (checkCapitalization(textArray[i])) {
                    case 1: textArray[i] =  "them";
                    case 2: textArray[i] = "Them";
                    case 3: textArray[i] = "THEM";
                    default: textArray[i] = "them";
                } 
            }
            if (regexAdjective1.test(textArray[i])||regexAdjective2.test(textArray[i])) {
                console.log("Adjective");
                console.log(textArray[i])
                switch (checkCapitalization(textArray[i])) {
                    case 1: textArray[i] =  "their";
                    case 2: textArray[i] = "Their";
                    case 3: textArray[i] = "THEIR";
                    default: textArray[i] = "their";
                } 
            }
            if (regexPossesive1.test(textArray[i])||regexPossesive2.test(textArray[i]))  {
                console.log("Possesive");
                console.log(textArray[i])
                switch (checkCapitalization(textArray[i])) {
                    case 1: textArray[i] =  "theirs";
                    case 2: textArray[i] = "Theirs";
                    case 3: textArray[i] = "THEIRS";
                    default: textArray[i] = "theirs";
                } 
            }
            if (regexReflexive.test(textArray[i])) {
                // console.log("Reflexive");
                switch (checkCapitalization(textArray[i])) {
                    case 1: textArray[i] =  "themselves";
                    case 2: textArray[i] = "Themselves";
                    case 3: textArray[i] = "THEMSELVES";
                    default: textArray[i] = "themselves";
                } 
            }
        }
        text = textArray.join(' ');
        text.replace(/\s(?=[.,:;?!])/, "");
        node.innerText = text;
    }
}


// 1 - no capitalization, 2 - First Letter Capizalized, 3 - All Caps
function checkCapitalization(word) {
    if (/^[A-Z]/.test(word)) {
        if (/^[A-Z]+$/.test(word)){
            return 3;
        }
        return 2;
    }
    else {
        return 1;
    }
}

// Douglas Crockford's WalkTheDOM -
// For each node, the function will be executed.
function walkTheDom(node){
    allThem(node);
    node = node.firstChild;
    while(node){
        walkTheDom(node);
        node = node.nextSibling;
    }
}

walkTheDom(document.body);

