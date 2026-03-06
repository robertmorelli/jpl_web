// ============================================================================
// JPL Lexer — Chevrotain
//
// JPL has significant newlines (they terminate commands/statements), so we
// can't just skip them. We also need to:
//   - Squash consecutive newlines into one NEWLINE token
//   - Treat newline-escapes (backslash + newline) as whitespace
//   - NOT emit newline tokens for newlines inside block comments
//   - Emit a newline token for the newline at the end of a line comment
//
// We use a post-processing step to squash consecutive newlines.
// ============================================================================

import { createToken, Lexer } from "chevrotain";

// ---------------------------------------------------------------------------
// Token Definitions
// ---------------------------------------------------------------------------

// Whitespace (spaces only — NOT newlines)
export const WhiteSpace = createToken({
    name: "WhiteSpace",
    pattern: / +/,
    group: Lexer.SKIPPED,
});

// Newline escape: backslash immediately followed by newline → skip
export const NewlineEscape = createToken({
    name: "NewlineEscape",
    pattern: /\\\n/,
    group: Lexer.SKIPPED,
    line_breaks: true,
});

// Block comment: /* ... */ (may contain newlines, which do NOT produce tokens)
export const BlockComment = createToken({
    name: "BlockComment",
    pattern: /\/\*[\s\S]*?\*\//,
    group: Lexer.SKIPPED,
    line_breaks: true,
});

// Line comment: // to end of line (does NOT consume the newline)
export const LineComment = createToken({
    name: "LineComment",
    pattern: /\/\/[^\n]*/,
    group: Lexer.SKIPPED,
});

// Newline (significant — terminates commands)
export const Newline = createToken({
    name: "Newline",
    pattern: /\n/,
    line_breaks: true,
});

// ---------------------------------------------------------------------------
// Keywords (must be defined before Identifier)
// ---------------------------------------------------------------------------
export const Array_kw = createToken({ name: "Array", pattern: /array/ });
export const Assert_kw = createToken({ name: "Assert", pattern: /assert/ });
export const Bool_kw = createToken({ name: "Bool", pattern: /bool/ });
export const Else_kw = createToken({ name: "Else", pattern: /else/ });
export const False_kw = createToken({ name: "False", pattern: /false/ });
export const Float_kw = createToken({ name: "Float", pattern: /float/ });
export const Fn_kw = createToken({ name: "Fn", pattern: /fn/ });
export const If_kw = createToken({ name: "If", pattern: /if/ });
export const Image_kw = createToken({ name: "Image", pattern: /image/ });
export const Int_kw = createToken({ name: "Int", pattern: /int/ });
export const Let_kw = createToken({ name: "Let", pattern: /let/ });
export const Print_kw = createToken({ name: "Print", pattern: /print/ });
export const Read_kw = createToken({ name: "Read", pattern: /read/ });
export const Return_kw = createToken({ name: "Return", pattern: /return/ });
export const Show_kw = createToken({ name: "Show", pattern: /show/ });
export const Struct_kw = createToken({ name: "Struct", pattern: /struct/ });
export const Sum_kw = createToken({ name: "Sum", pattern: /sum/ });
export const Then_kw = createToken({ name: "Then", pattern: /then/ });
export const Time_kw = createToken({ name: "Time", pattern: /time/ });
export const To_kw = createToken({ name: "To", pattern: /to/ });
export const True_kw = createToken({ name: "True", pattern: /true/ });
export const Void_kw = createToken({ name: "Void", pattern: /void/ });
export const Write_kw = createToken({ name: "Write", pattern: /write/ });

// Identifier (must come AFTER keywords)
export const Identifier = createToken({
    name: "Identifier",
    pattern: /[a-zA-Z][a-zA-Z0-9_]*/,
});

// Set longer_alt on all keywords so "array_foo" matches Identifier, not Array
const allKeywords = [
    Array_kw, Assert_kw, Bool_kw, Else_kw, False_kw, Float_kw, Fn_kw,
    If_kw, Image_kw, Int_kw, Let_kw, Print_kw, Read_kw, Return_kw,
    Show_kw, Struct_kw, Sum_kw, Then_kw, Time_kw, To_kw, True_kw,
    Void_kw, Write_kw,
];
for (const kw of allKeywords) {
    kw.LONGER_ALT = Identifier;
}

// ---------------------------------------------------------------------------
// Literals
// ---------------------------------------------------------------------------

// Float must come before Integer so "3.14" isn't lexed as INT(3) DOT INT(14)
// JPL floats: digits.digits, digits., or .digits (at least one side non-empty)
export const FloatLiteral = createToken({
    name: "FloatLiteral",
    pattern: /(?:\d+\.\d*|\d*\.\d+)/,
});

export const IntegerLiteral = createToken({
    name: "IntegerLiteral",
    pattern: /\d+/,
});

// String: double-quoted, no escapes, no newlines inside
export const StringLiteral = createToken({
    name: "StringLiteral",
    pattern: /"[^\n"]*"/,
});

// ---------------------------------------------------------------------------
// Multi-character operators (must come before single-character)
// ---------------------------------------------------------------------------
export const AndAnd = createToken({ name: "AndAnd", pattern: /&&/ });
export const OrOr = createToken({ name: "OrOr", pattern: /\|\|/ });
export const LessEq = createToken({ name: "LessEq", pattern: /<=/ });
export const GreaterEq = createToken({ name: "GreaterEq", pattern: />=/ });
export const EqEq = createToken({ name: "EqEq", pattern: /==/ });
export const BangEq = createToken({ name: "BangEq", pattern: /!=/ });

// ---------------------------------------------------------------------------
// Single-character operators and punctuation
// ---------------------------------------------------------------------------
export const Plus = createToken({ name: "Plus", pattern: /\+/ });
export const Minus = createToken({ name: "Minus", pattern: /-/ });
export const Star = createToken({ name: "Star", pattern: /\*/ });
export const Slash = createToken({ name: "Slash", pattern: /\// });
export const Percent = createToken({ name: "Percent", pattern: /%/ });
export const Bang = createToken({ name: "Bang", pattern: /!/ });
export const Less = createToken({ name: "Less", pattern: /</ });
export const Greater = createToken({ name: "Greater", pattern: />/ });
export const Dot = createToken({ name: "Dot", pattern: /\./ });
export const LParen = createToken({ name: "LParen", pattern: /\(/ });
export const RParen = createToken({ name: "RParen", pattern: /\)/ });
export const LBracket = createToken({ name: "LBracket", pattern: /\[/ });
export const RBracket = createToken({ name: "RBracket", pattern: /\]/ });
export const LBrace = createToken({ name: "LBrace", pattern: /\{/ });
export const RBrace = createToken({ name: "RBrace", pattern: /\}/ });
export const Comma = createToken({ name: "Comma", pattern: /,/ });
export const Colon = createToken({ name: "Colon", pattern: /:/ });
export const Equals = createToken({ name: "Equals", pattern: /=/ });

// ---------------------------------------------------------------------------
// Token ordering matters! Chevrotain tries tokens in order.
// ---------------------------------------------------------------------------
export const allTokens = [
    // Whitespace & comments first
    WhiteSpace,
    NewlineEscape,
    BlockComment,
    LineComment,
    Newline,

    // Keywords before Identifier
    ...allKeywords,
    Identifier,

    // Float before Integer (so "3.14" matches float, not int+dot+int)
    FloatLiteral,
    IntegerLiteral,
    StringLiteral,

    // Multi-char operators before single-char
    AndAnd, OrOr, LessEq, GreaterEq, EqEq, BangEq,

    // Single-char
    Plus, Minus, Star, Slash, Percent, Bang,
    Less, Greater, Dot,
    LParen, RParen, LBracket, RBracket, LBrace, RBrace,
    Comma, Colon, Equals,
];

const lexerInstance = new Lexer(allTokens);

// ---------------------------------------------------------------------------
// Post-process: squash consecutive Newline tokens into one
// ---------------------------------------------------------------------------
function squashNewlines(tokens) {
    const result = [];
    let lastWasNewline = false;
    for (const tok of tokens) {
        if (tok.tokenType === Newline) {
            if (!lastWasNewline) {
                result.push(tok);
                lastWasNewline = true;
            }
        } else {
            result.push(tok);
            lastWasNewline = false;
        }
    }
    return result;
}

/**
 * Lex JPL source code into tokens.
 * @param {string} source
 * @returns {{ tokens: import("chevrotain").IToken[], errors: any[] }}
 */
export function lexJPL(source) {
    const result = lexerInstance.tokenize(source);
    result.tokens = squashNewlines(result.tokens);
    return result;
}
