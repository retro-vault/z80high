// Z80.
const mnemonicRx = /\b(ADC|ADD|AND|BIT|CALL|CCF|CP|CPD|CPDR|CPI|CPIR|CPL|DAA|DEC|DI|DJNZ|EI|EX|EXX|HALT|IM|IN|INC|IND|INDR|INI|INIR|JP|JR|LD|LDD|LDDR|LDI|LDIR|NEG|NOP|OR|OTDR|OTIR|OUT|OUTD|OUTI|POP|PUSH|RES|RET|RETI|RETN|RL|RLA|RLC|RLCA|RLD|RR|RRA|RRCA|RRD|RST|SBC|SCF|SET|SLA|SRA|SRL|SUB|XOR)(?=[^\w])/gi;

// Tokens.
const stringRx = /"(.*?)"/g, charRx = /'(.+?)'/g;

// SDCC.
const commentRx = /(\;.*)/g;


// Find all <pre> <code> elements. 
var codeElements = document.querySelectorAll("pre code");
// Insert syntax tags.
codeElements.forEach(syntaxHighlight);
// The great replacement procedure.
function syntaxHighlight(e) {
    var code = e.innerHTML,
    parsed = code.replace(stringRx,'<span class="string">"$1"</span>');
    parsed = parsed.replace(charRx,"<span class=\"char\">'$1'</span>");
    parsed = parsed.replace(mnemonicRx,'<span class="mnemonic">$1</span>');
    // When parsing comment, remove all tags from it.
    parsed = parsed.replace(commentRx,'<span class="comment">$1</span>');
    // And assign back.    
    e.innerHTML = parsed;
}