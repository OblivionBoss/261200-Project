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
        player.subBudget(attackCost);

        Region target = player.cityCrew.gotoDirection(this.direction);
        if(target.owner == null) return true;
        target.subDeposit(attackCost);
        if(target.getDeposit()<1) target.loseRegion(player);
        return true;
    }
}
