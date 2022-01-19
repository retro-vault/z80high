// Create an array of regular expressions and classes.
const tokens = [
    {
        rex : /"(.*?)"/,
        cls : "string"
    },
    {
        rex : /'(.+?)'/,
        cls : "char"
    },
    {
        rex : /(\;.*)/,
        cls : "comment"
    },
    {
        rex : /\s(ADC|ADD|AND|BIT|CALL|CCF|CP|CPD|CPDR|CPI|CPIR|CPL|DAA|DEC|DI|DJNZ|EI|EX|EXX|HALT|IM|IN|INC|IND|INDR|INI|INIR|JP|JR|LD|LDD|LDDR|LDI|LDIR|NEG|NOP|OR|OTDR|OTIR|OUT|OUTD|OUTI|POP|PUSH|RES|RET|RETI|RETN|RL|RLA|RLC|RLCA|RLD|RR|RRA|RRCA|RRD|RST|SBC|SCF|SET|SLA|SRA|SRL|SUB|XOR)(?=[^\w])/i,
        cls : "mnemonic"
    },
    {
        rex : /(\s|\,|\()(AF|BC|DE|HL|IX|IY|IR|SP|AF\'|BC\'|DE\'|HL\'|A|B|C|D|E|H|L|I|R)((\))|(?=[^\w]))/i,
        cls : "register"
    },
    {
        rex : /(\.\w*)/,
        cls : "directive"
    },
    {
        rex : /\w/,
        cls : "identifier"
    }
]

// Find all <pre lang="z80"> elements. 
var codeElements = document.querySelectorAll('pre[lang="z80"]');
// Insert syntax tags.
codeElements.forEach(syntaxHighlight);
// The great replacement procedure.
function syntaxHighlight(e) {
    // Get the source code, prepare highlighted code.
    var sourceCode = ""+e.innerHTML, highlightedCode="";
    // Now try to recognize the token at the beginning and annotate it.
    while(sourceCode.length > 0) {
        let found=false;
        tokens.forEach(function(token) {
            if (sourceCode.search(token.rex)==0) {
                let ts=sourceCode.match(token.rex)[0];
                sourceCode=sourceCode.substring(ts.length);
                highlightedCode+='<span class="' + token.cls + '">' + ts + '</span>';
                found=true;
            }            
        });
        // It's whitespace (space, tab, newline, etc.)!
        if (!found) {
            highlightedCode += sourceCode[0];
            sourceCode=sourceCode.substring(1);
        }
    }   
    e.innerHTML = highlightedCode;
}