package AST.Expression;

import AST.ENUM.Direction;
import ErrorExcep.EvalError;
import Model.Player;

public class NearbyInfo implements Expression{
    private Direction direction;

    public NearbyInfo(Direction direction){
        this.direction = direction;
    }

    public double eval(Player player) throws EvalError {
        return 0;
    }

    public void prettyPrint(StringBuilder s) {
        s.append("nearby ");
        s.append(this.direction);
    }
}
