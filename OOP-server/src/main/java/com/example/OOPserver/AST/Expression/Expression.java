package com.example.OOPserver.AST.Expression;

import com.example.OOPserver.AST.Node;
import com.example.OOPserver.ErrorExcep.EvalError;
import com.example.OOPserver.GameState.Player;

public interface Expression extends Node {
    double eval(Player player) throws EvalError;
}
