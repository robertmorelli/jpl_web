// ============================================================================
// JPL Parser — Chevrotain CstParser
//
// Implements the full JPL grammar from the spec. Key design decisions:
//
// 1. Expression precedence is handled by the standard recursive descent
//    technique of layering grammar rules from lowest to highest precedence:
//      ifExpr → orExpr → andExpr → compExpr → addExpr → mulExpr
//      → unaryExpr → postfixExpr → primaryExpr
//
// 2. Newlines are significant tokens that terminate commands/statements.
//    We consume them explicitly with NEWLINE tokens.
//
// 3. The `array[...]` and `sum[...]` loop constructs are disambiguated from
//    array indexing by context: they appear at the expression level (lowest
//    precedence prefix) and have `variable : expr` bindings inside brackets.
//
// 4. Struct constructor `Foo { ... }` vs bare variable `Foo` is resolved by
//    lookahead: if an Identifier is followed by `{`, it's a struct constructor.
//    Similarly, `foo(...)` is a function call.
// ============================================================================

import { CstParser } from "chevrotain";
import {
    allTokens,
    Newline,
    // Keywords
    Array_kw, Assert_kw, Bool_kw, Else_kw, False_kw, Float_kw, Fn_kw,
    If_kw, Image_kw, Int_kw, Let_kw, Print_kw, Read_kw, Return_kw,
    Show_kw, Struct_kw, Sum_kw, Then_kw, Time_kw, To_kw, True_kw,
    Void_kw, Write_kw,
    // Literals
    Identifier, FloatLiteral, IntegerLiteral, StringLiteral,
    // Operators
    AndAnd, OrOr, LessEq, GreaterEq, EqEq, BangEq,
    Plus, Minus, Star, Slash, Percent, Bang, Less, Greater, Dot,
    // Punctuation
    LParen, RParen, LBracket, RBracket, LBrace, RBrace,
    Comma, Colon, Equals,
} from "./lexer.mjs";

class JPLParser extends CstParser {
    constructor() {
        super(allTokens, {
            // Increase lookahead for disambiguating constructs like
            // identifier `{` (struct constructor) vs identifier `(` (function call)
            maxLookahead: 4,
        });

        const $ = this;

        // -----------------------------------------------------------------------
        // Program: sequence of commands separated/terminated by newlines.
        // The last command may omit the trailing newline (EOF is okay).
        // -----------------------------------------------------------------------
        $.RULE("program", () => {
            $.MANY(() => $.CONSUME(Newline)); // skip leading newlines
            $.OPTION(() => {
                $.SUBRULE($.command);
                $.MANY2(() => {
                    $.CONSUME2(Newline);
                    $.MANY3(() => $.CONSUME3(Newline)); // skip extra newlines
                    // Only parse another command if there are more tokens
                    $.OPTION2(() => {
                        $.SUBRULE2($.command);
                    });
                });
            });
        });

        // -----------------------------------------------------------------------
        // Commands
        // -----------------------------------------------------------------------
        $.RULE("command", () => {
            $.OR([
                { ALT: () => $.SUBRULE($.readCmd) },
                { ALT: () => $.SUBRULE($.writeCmd) },
                { ALT: () => $.SUBRULE($.printCmd) },
                { ALT: () => $.SUBRULE($.showCmd) },
                { ALT: () => $.SUBRULE($.timeCmd) },
                { ALT: () => $.SUBRULE($.structCmd) },
                { ALT: () => $.SUBRULE($.fnCmd) },
                { ALT: () => $.SUBRULE($.letCmd) },
                { ALT: () => $.SUBRULE($.assertCmd) },
            ]);
        });

        $.RULE("readCmd", () => {
            $.CONSUME(Read_kw);
            $.CONSUME(Image_kw);
            $.CONSUME(StringLiteral);
            $.CONSUME(To_kw);
            $.SUBRULE($.argument);
        });

        $.RULE("writeCmd", () => {
            $.CONSUME(Write_kw);
            $.CONSUME(Image_kw);
            $.SUBRULE($.expr);
            $.CONSUME(To_kw);
            $.CONSUME(StringLiteral);
        });

        $.RULE("printCmd", () => {
            $.CONSUME(Print_kw);
            $.CONSUME(StringLiteral);
        });

        $.RULE("showCmd", () => {
            $.CONSUME(Show_kw);
            $.SUBRULE($.expr);
        });

        $.RULE("timeCmd", () => {
            $.CONSUME(Time_kw);
            $.SUBRULE($.command);
        });

        $.RULE("structCmd", () => {
            $.CONSUME(Struct_kw);
            $.CONSUME(Identifier);
            $.CONSUME(LBrace);
            $.CONSUME(Newline);
            $.MANY(() => {
                $.SUBRULE($.structField);
                $.CONSUME2(Newline);
                $.MANY2(() => $.CONSUME3(Newline));
            });
            $.CONSUME(RBrace);
        });

        $.RULE("structField", () => {
            $.CONSUME(Identifier);
            $.CONSUME(Colon);
            $.SUBRULE($.type);
        });

        $.RULE("fnCmd", () => {
            $.CONSUME(Fn_kw);
            $.CONSUME(Identifier);
            $.CONSUME(LParen);
            $.OPTION(() => {
                $.SUBRULE($.binding);
                $.MANY(() => {
                    $.CONSUME(Comma);
                    $.SUBRULE2($.binding);
                });
            });
            $.CONSUME(RParen);
            $.CONSUME(Colon);
            $.SUBRULE($.type);
            $.CONSUME(LBrace);
            $.CONSUME(Newline);
            $.MANY2(() => {
                $.SUBRULE($.statement);
                $.CONSUME2(Newline);
                $.MANY3(() => $.CONSUME3(Newline));
            });
            $.CONSUME(RBrace);
        });

        // Let at top level (command) — same syntax as let statement
        $.RULE("letCmd", () => {
            $.CONSUME(Let_kw);
            $.SUBRULE($.lvalue);
            $.CONSUME(Equals);
            $.SUBRULE($.expr);
        });

        $.RULE("assertCmd", () => {
            $.CONSUME(Assert_kw);
            $.SUBRULE($.expr);
            $.CONSUME(Comma);
            $.CONSUME(StringLiteral);
        });

        // -----------------------------------------------------------------------
        // Statements (inside functions)
        // -----------------------------------------------------------------------
        $.RULE("statement", () => {
            $.OR([
                { ALT: () => $.SUBRULE($.letStmt) },
                { ALT: () => $.SUBRULE($.assertStmt) },
                { ALT: () => $.SUBRULE($.returnStmt) },
            ]);
        });

        $.RULE("letStmt", () => {
            $.CONSUME(Let_kw);
            $.SUBRULE($.lvalue);
            $.CONSUME(Equals);
            $.SUBRULE($.expr);
        });

        $.RULE("assertStmt", () => {
            $.CONSUME(Assert_kw);
            $.SUBRULE($.expr);
            $.CONSUME(Comma);
            $.CONSUME(StringLiteral);
        });

        $.RULE("returnStmt", () => {
            $.CONSUME(Return_kw);
            $.SUBRULE($.expr);
        });

        // -----------------------------------------------------------------------
        // Lvalues, Arguments, Bindings
        // -----------------------------------------------------------------------

        // argument : <variable> | <variable> [ <variable> , ... ]
        $.RULE("argument", () => {
            $.CONSUME(Identifier);
            $.OPTION(() => {
                $.CONSUME(LBracket);
                $.OPTION2(() => {
                    $.CONSUME2(Identifier);
                    $.MANY(() => {
                        $.CONSUME(Comma);
                        $.CONSUME3(Identifier);
                    });
                });
                $.CONSUME(RBracket);
            });
        });

        // lvalue : <argument>
        $.RULE("lvalue", () => {
            $.SUBRULE($.argument);
        });

        // binding : <argument> : <type>
        $.RULE("binding", () => {
            $.SUBRULE($.argument);
            $.CONSUME(Colon);
            $.SUBRULE($.type);
        });

        // -----------------------------------------------------------------------
        // Types
        // -----------------------------------------------------------------------
        $.RULE("type", () => {
            $.SUBRULE($.baseType);
            // Array suffix: [ , ... ]  (zero or more commas between brackets)
            $.MANY(() => {
                $.CONSUME(LBracket);
                $.MANY2(() => $.CONSUME(Comma));
                $.CONSUME(RBracket);
            });
        });

        $.RULE("baseType", () => {
            $.OR([
                { ALT: () => $.CONSUME(Int_kw) },
                { ALT: () => $.CONSUME(Bool_kw) },
                { ALT: () => $.CONSUME(Float_kw) },
                { ALT: () => $.CONSUME(Void_kw) },
                { ALT: () => $.CONSUME(Identifier) },  // struct type names
            ]);
        });

        // -----------------------------------------------------------------------
        // Expressions — precedence climbing via layered rules
        //
        // Lowest to highest precedence:
        //   expr         → prefix: if/array/sum, or fall through to orExpr
        //   orExpr       → andExpr (|| andExpr)*
        //   andExpr      → compExpr (&& compExpr)*
        //   compExpr     → addExpr (comp_op addExpr)*
        //   addExpr      → mulExpr ((+|-) mulExpr)*
        //   mulExpr      → unaryExpr ((*|/|%) unaryExpr)*
        //   unaryExpr    → (!|-) unaryExpr | postfixExpr
        //   postfixExpr  → primaryExpr ([...] | .field)*
        //   primaryExpr  → literal | variable | structCtor | fnCall | array | (expr)
        // -----------------------------------------------------------------------

        $.RULE("expr", () => {
            $.OR([
                { ALT: () => $.SUBRULE($.ifExpr) },
                { ALT: () => $.SUBRULE($.arrayExpr) },
                { ALT: () => $.SUBRULE($.sumExpr) },
                { ALT: () => $.SUBRULE($.orExpr) },
            ]);
        });

        $.RULE("ifExpr", () => {
            $.CONSUME(If_kw);
            $.SUBRULE($.expr, { LABEL: "condition" });
            $.CONSUME(Then_kw);
            $.SUBRULE2($.expr, { LABEL: "thenBranch" });
            $.CONSUME(Else_kw);
            $.SUBRULE3($.expr, { LABEL: "elseBranch" });
        });

        // Loop binding: variable : expr
        $.RULE("loopBinding", () => {
            $.CONSUME(Identifier);
            $.CONSUME(Colon);
            $.SUBRULE($.expr);
        });

        $.RULE("arrayExpr", () => {
            $.CONSUME(Array_kw);
            $.CONSUME(LBracket);
            $.OPTION(() => {
                $.SUBRULE($.loopBinding);
                $.MANY(() => {
                    $.CONSUME(Comma);
                    $.SUBRULE2($.loopBinding);
                });
            });
            $.CONSUME(RBracket);
            $.SUBRULE($.expr, { LABEL: "body" });
        });

        $.RULE("sumExpr", () => {
            $.CONSUME(Sum_kw);
            $.CONSUME(LBracket);
            $.OPTION(() => {
                $.SUBRULE($.loopBinding);
                $.MANY(() => {
                    $.CONSUME(Comma);
                    $.SUBRULE2($.loopBinding);
                });
            });
            $.CONSUME(RBracket);
            $.SUBRULE($.expr, { LABEL: "body" });
        });

        // || (left-associative)
        $.RULE("orExpr", () => {
            $.SUBRULE($.andExpr, { LABEL: "lhs" });
            $.MANY(() => {
                $.CONSUME(OrOr);
                $.SUBRULE2($.andExpr, { LABEL: "rhs" });
            });
        });

        // && (left-associative)
        $.RULE("andExpr", () => {
            $.SUBRULE($.compExpr, { LABEL: "lhs" });
            $.MANY(() => {
                $.CONSUME(AndAnd);
                $.SUBRULE2($.compExpr, { LABEL: "rhs" });
            });
        });

        // Comparisons: <, >, <=, >=, ==, != (left-associative)
        $.RULE("compExpr", () => {
            $.SUBRULE($.addExpr, { LABEL: "lhs" });
            $.MANY(() => {
                $.OR2([
                    { ALT: () => $.CONSUME(Less) },
                    { ALT: () => $.CONSUME(Greater) },
                    { ALT: () => $.CONSUME(LessEq) },
                    { ALT: () => $.CONSUME(GreaterEq) },
                    { ALT: () => $.CONSUME(EqEq) },
                    { ALT: () => $.CONSUME(BangEq) },
                ]);
                $.SUBRULE2($.addExpr, { LABEL: "rhs" });
            });
        });

        // + - (left-associative)
        $.RULE("addExpr", () => {
            $.SUBRULE($.mulExpr, { LABEL: "lhs" });
            $.MANY(() => {
                $.OR2([
                    { ALT: () => $.CONSUME(Plus) },
                    { ALT: () => $.CONSUME(Minus) },
                ]);
                $.SUBRULE2($.mulExpr, { LABEL: "rhs" });
            });
        });

        // * / % (left-associative)
        $.RULE("mulExpr", () => {
            $.SUBRULE($.unaryExpr, { LABEL: "lhs" });
            $.MANY(() => {
                $.OR2([
                    { ALT: () => $.CONSUME(Star) },
                    { ALT: () => $.CONSUME(Slash) },
                    { ALT: () => $.CONSUME(Percent) },
                ]);
                $.SUBRULE2($.unaryExpr, { LABEL: "rhs" });
            });
        });

        // Unary: - and !
        $.RULE("unaryExpr", () => {
            $.OR([
                {
                    ALT: () => {
                        $.CONSUME(Minus);
                        $.SUBRULE($.unaryExpr, { LABEL: "operand" });
                    },
                },
                {
                    ALT: () => {
                        $.CONSUME(Bang);
                        $.SUBRULE2($.unaryExpr, { LABEL: "operand" });
                    },
                },
                { ALT: () => $.SUBRULE($.postfixExpr) },
            ]);
        });

        // Postfix: array indexing [expr, ...] and field access .field
        $.RULE("postfixExpr", () => {
            $.SUBRULE($.primaryExpr);
            $.MANY(() => {
                $.OR2([
                    {
                        ALT: () => {
                            $.CONSUME(LBracket);
                            $.SUBRULE($.expr, { LABEL: "index" });
                            $.MANY2(() => {
                                $.CONSUME(Comma);
                                $.SUBRULE2($.expr, { LABEL: "index" });
                            });
                            $.CONSUME(RBracket);
                        },
                    },
                    {
                        ALT: () => {
                            $.CONSUME(Dot);
                            $.CONSUME(Identifier, { LABEL: "field" });
                        },
                    },
                ]);
            });
        });

        // Primary expressions
        $.RULE("primaryExpr", () => {
            $.OR([
                { ALT: () => $.CONSUME(IntegerLiteral) },
                { ALT: () => $.CONSUME(FloatLiteral) },
                { ALT: () => $.CONSUME(True_kw) },
                { ALT: () => $.CONSUME(False_kw) },
                { ALT: () => $.CONSUME(Void_kw) },
                { ALT: () => $.CONSUME(StringLiteral) },

                // Parenthesized expression
                {
                    ALT: () => {
                        $.CONSUME(LParen);
                        $.SUBRULE($.expr);
                        $.CONSUME(RParen);
                    },
                },

                // Array literal: [ expr, ... ]
                {
                    // Gate: bare `[` not preceded by array/sum keyword
                    // (those are handled at the expr level)
                    ALT: () => $.SUBRULE($.arrayLiteral),
                },

                // Identifier-led: could be variable, struct ctor, or function call
                { ALT: () => $.SUBRULE($.identExpr) },
            ]);
        });

        // [ expr, ... ]
        $.RULE("arrayLiteral", () => {
            $.CONSUME(LBracket);
            $.OPTION(() => {
                $.SUBRULE($.expr);
                $.MANY(() => {
                    $.CONSUME(Comma);
                    $.SUBRULE2($.expr);
                });
            });
            $.CONSUME(RBracket);
        });

        // Identifier-led expression: variable, struct constructor, or function call
        // We use BACKTRACK or lookahead to distinguish:
        //   ident { ... }  → struct constructor
        //   ident ( ... )  → function call
        //   ident          → variable reference
        $.RULE("identExpr", () => {
            $.CONSUME(Identifier);
            $.OPTION(() => {
                $.OR2([
                    // Struct constructor: Ident { expr, ... }
                    {
                        ALT: () => {
                            $.CONSUME(LBrace);
                            $.OPTION2(() => {
                                $.SUBRULE($.expr);
                                $.MANY(() => {
                                    $.CONSUME(Comma);
                                    $.SUBRULE2($.expr);
                                });
                            });
                            $.CONSUME(RBrace);
                        },
                    },
                    // Function call: Ident ( expr, ... )
                    {
                        ALT: () => {
                            $.CONSUME(LParen);
                            $.OPTION3(() => {
                                $.SUBRULE3($.expr);
                                $.MANY2(() => {
                                    $.CONSUME2(Comma);
                                    $.SUBRULE4($.expr);
                                });
                            });
                            $.CONSUME(RParen);
                        },
                    },
                ]);
            });
        });

        // -----------------------------------------------------------------------
        // Must be called after all rules are defined
        // -----------------------------------------------------------------------
        this.performSelfAnalysis();
    }
}

// Export a singleton parser instance (Chevrotain parsers are reusable)
export const parser = new JPLParser();
