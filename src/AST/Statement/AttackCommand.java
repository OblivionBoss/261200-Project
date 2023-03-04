package AST.Statement;

import AST.ENUM.Direction;
import AST.Expression.Expression;
import ErrorExcep.EvalError;
import Model.Player;
import Model.Region;

public class AttackCommand implements Statement {
    private Direction direction;
    private Expression expression;

    public AttackCommand(Direction direction, Expression expression){
        this.direction = direction;
        this.expression = expression;
    }

    public void prettyPrint(StringBuilder s) {
        s.append("shoot ");
        s.append(this.direction);
        s.append(" ");
        this.expression.prettyPrint(s);
    }

    public boolean eval(Player player) throws EvalError {
        if(player.getBudget()<1) return true;
        player.subBudget(1);

        double attackCost = this.expression.eval(player);
        if(player.getBudget()<attackCost) return true;

        Region target;
        int dir = this.direction.ordinal()+1;
        if (dir==1) target = player.cityCrew.up;
        else if (dir==2) target = player.cityCrew.upright;
        else if (dir==3) target = player.cityCrew.downright;
        else if (dir==4) target = player.cityCrew.down;
        else if (dir==5) target = player.cityCrew.downleft;
        else target = player.cityCrew.upleft;


        return true;
    }
}
