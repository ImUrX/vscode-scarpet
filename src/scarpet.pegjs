expression "expression"
	= Literal Return LineTerminator? expression?
    / Literal LineTerminator?

//Grammar
SourceChar 
	= .

LineTerminator
    = [\n\r\u2028\u2029]

Comment "comment"
    = "//" SourceChar*

//Operators
Unary
	= [+-]
Not
	= "!"
Return
    = ";"

//Literals
Literal "literal"
	= Null / Boolean / Number / String

Null
	= "null" { return null; }

// Booleans
Boolean "boolean"
	= not:Not? bool:(True / False) { return not ? !bool : bool; }

True
	= "true" { return true; }
    
False
	= "false" { return false; }
    
// Numbers
Number "number"
    = Hex { return parseInt(text(), 16); }
    / Unary? Int Frac? Exp? { return parseFloat(text()); }
    / "pi" { return Math.PI; }
    / "euler" { return Math.E; }
    
Hex = Unary? "0x" HEXDIG+
Exp = "e" Unary? DIGIT+
Frac = "." DIGIT+
Int = DIGIT+
    
DIGIT = [0-9]
HEXDIG = [0-9a-f]

// Strings
String "string"
	= "'" chars:Char* "'" { return chars.join(""); }

Char
    = Unescaped
    / "\\"
      sequence:(
      	"'"
        / "\\"
        / "b" { return "\b"; }
        / "f" { return "\f"; }
        / "n" { return "\n"; }
        / "r" { return "\r"; }
        / "t" { return "\t"; }
      ) { return sequence; }

Unescaped = [^\0-\x1F'\x5C]