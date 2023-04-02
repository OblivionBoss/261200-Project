package com.example.OOPserver.AST.Statement;

import com.example.OOPserver.AST.ENUM.Command;
import com.example.OOPserver.AST.Expression.Expression;
import com.example.OOPserver.ErrorExcep.EvalError;
import com.example.OOPserver.GameState.Player;

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
            if(player.getBudget() < player.territory().FEE_CHARGE()) return false;
            player.subBudget(player.territory().FEE_CHARGE());

            double cost = this.expression.eval(player);
            if(player.getBudget() < cost) return true;
            player.cityCrew.owner = player;
            player.regionSet.add(player.cityCrew);
            player.cityCrew.addDeposit(cost);
            player.subBudget(cost);
        }else{ // collect command
            if(player.getBudget() < player.territory().FEE_CHARGE()) return false;
            player.subBudget(player.territory().FEE_CHARGE());

            double withdraw = this.expression.eval(player);
            if(player.cityCrew.getDeposit() < withdraw) return true;
            player.cityCrew.subDeposit(withdraw);
            if(player.cityCrew.getDeposit() < 1) player.cityCrew.loseRegion(player);
            player.addBudget(withdraw);
        }
        return true;
    }
}
