package com.example.OOPserver.AST.Statement;

import com.example.OOPserver.AST.Node;
import com.example.OOPserver.ErrorExcep.EvalError;
import com.example.OOPserver.GameState.Player;

public interface Statement extends Node {
    boolean eval(Player player) throws EvalError;
}
