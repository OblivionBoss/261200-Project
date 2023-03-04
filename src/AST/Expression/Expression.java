package AST.Expression;

import AST.Node;
import ErrorExcep.EvalError;
import Model.Player;

public interface Expression extends Node {
    double eval(Player player) throws EvalError;
}
