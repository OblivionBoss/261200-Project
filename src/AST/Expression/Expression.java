package AST.Expression;

import AST.Node;
import ErrorExcep.EvalError;
import GameState.Player;

public interface Expression extends Node {
    double eval(Player player) throws EvalError;
}
