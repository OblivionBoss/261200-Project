package AST.Statement;

import AST.ENUM.Command;
import AST.Expression.Expression;
import ErrorExcep.EvalError;
import Model.Player;

public class RegionCommand implements Statement {
    private Command action;
    private Expression expression;

    public RegionCommand(Command command, Expression expression){
        if(command.equals(Command.invest) || command.equals(Command.collect)){
            this.action = command;
            this.expression = expression;
        }
    }

    public void prettyPrint(StringBuilder s) {
        s.append(this.action);
        s.append(" ");
        this.expression.prettyPrint(s);
    }

    public boolean eval(Player player) throws EvalError {
        if(action.equals(Command.invest)){ // invest command
            if(player.getBudget()<1) return true;
            player.subBudget(1);

            double cost = this.expression.eval(player);
            if(player.getBudget()<cost) return true;
            player.cityCrew.owner = player;
            player.cityCrew.addDeposit(cost);
            player.subBudget(cost);
        }else{ // collect command
            if(player.getBudget()<1) return false;
            player.subBudget(1);

            double withdraw = this.expression.eval(player);
            if(player.cityCrew.getDeposit()<withdraw) return true;
            player.cityCrew.subDeposit(withdraw);
            if(player.cityCrew.getDeposit()==0) player.cityCrew.owner = null;
            player.addBudget(withdraw);
        }
        return true;
    }
}
