@{%
  function makeObj(value, type, extraProps = {}) {
        return {
            ...{
                type, value,
                properties: {},
            }, 
            ...extraProps
        };
    }

    function makeNum(value) {
        return makeObj(value, "Number");
    }

    function makeString(value) {
        return makeObj(value, "String");
    }

    function makeIdent(name, value = 0) {
        return makeObj(value, "Identifier", { name });
    }

    function makeNull() {
      return makeObj(null, "Null");
    }
%}

exp -> _ multExp _ {% id %}

multExp 
  -> multExp _ ("*"|"/"|"%") _ expoExp
  | expoExp

expoExp 
  -> expoExp _ "^" _ unaryExp
  | unaryExp

unaryExp 
  -> (("+"|"-"|"!") _):? matchExp

matchExp 
  -> matchExp _ "~" _ getExp 
  | getExp

getExp 
  -> getExp _ ":" _ primaryExp
  | primaryExp

primaryExp
  -> #string {% id %}
   number {% id %}
  | nul {% id %}
  | identifier {% id %}
  | "(" exp ")" {% data => data[1] %}

#Everything after this is just a base that doesnt detect everything
#I can detect everything with better done tokenization (moo) because its regexp based
#This will be done with moo after i finish every other thing
#number related
number
  -> (hex {% data => parseInt(data.join(""), 16) %}
  | exp {% data => parseFloat(data.join("")) %}
  | decimal {% data => parseFloat(data.join("")) %}
  | int {% data => parseInt(data.join("")) %}
  | boolean  {% id %}
  | pi {% () => Math.PI %}
  | e {% () => Math.E %}) {% ([data]) => makeNum(data) %}

hex -> "0x"i hexdigit:+
exp -> decimal "e"i "-":? int
decimal -> int "." int
int -> digit:+

digit 
  -> [0-9]
  | unicodeDigit
hexdigit -> [0-9a-fA-F]

#string related
comment -> "//" sourceChar:*

string -> "'" strchar:* "'" {% data => makeString(data.join("").slice(1, -1)) %}

strchar 
  -> [^\n\r\\']
  | "\\n"
  | "\\'"

#keyword related
nul -> "null" {% () => makeNull() %}

pi -> "pi"
e -> "euler"

boolean -> true | false

true -> "true" {% 1 %}
false -> "false" {% 0 %}

#identifier stuff
identifier -> ident | readOnlyIdent {% data => makeIdent(data.flat(5).join(""))%}
readOnlyIdent -> "_" identPart:*
ident -> identStart identPart:*

identPart
  -> identStart
  | unicodeDigit

identStart
  -> unicodeLetter

#The start
sourceChar -> [^\n\r]

_
  -> ("\t"
  | "\f"
  | " "
  | lineTerminator):*

lineTerminator 
  -> "\n"
  | "\r"

#unicode things (this would be detected by moo)
unicodeLetter
  -> [a-zA-Z]

unicodeDigit -> [\d]