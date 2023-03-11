package AST.Statement;

import AST.Node;
import ErrorExcep.EvalError;
import GameState.Player;

public interface Statement extends Node {
    boolean eval(Player player) throws EvalError;
}
