package com.example.OOPserver.Parser;

import com.example.OOPserver.AST.Node;
import com.example.OOPserver.ErrorExcep.SyntaxError;

public interface Parser {
    Node parse() throws SyntaxError;
}
