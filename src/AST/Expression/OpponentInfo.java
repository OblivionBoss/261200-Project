package AST.Expression;

import ErrorExcep.EvalError;
import Model.Player;

public class OpponentInfo implements Expression{
    public OpponentInfo() {};

    public double eval(Player player) throws EvalError {
        return 0;
    }

    public void prettyPrint(StringBuilder s) {
        s.append("opponent");
    }
}
