package AST.Statement;

import AST.Node;
import ErrorExcep.EvalError;
import Model.Player;

public interface Statement extends Node {
    boolean eval(Player player) throws EvalError;
}
