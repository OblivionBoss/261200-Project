package com.example.OOPserver.AST.Statement;

import com.example.OOPserver.AST.ENUM.Direction;
import com.example.OOPserver.ErrorExcep.EvalError;
import com.example.OOPserver.GameState.Player;
import com.example.OOPserver.GameState.Region;

public class MoveCommand implements Statement {
    private Direction direction;

    public MoveCommand(Direction direction){
        this.direction = direction;
    }

    public void prettyPrint(StringBuilder s) {
        s.append("move ");
        s.append(this.direction);
    }

    public boolean eval(Player player) throws EvalError {
        if(player.getBudget() < player.territory().FEE_CHARGE()) return false;
        player.subBudget(player.territory().FEE_CHARGE());

        Region next = player.cityCrew.gotoDirection(this.direction);
        if (next != null && (next.owner == null || next.owner == player))
            player.cityCrew = next;
        return true;
    }
}
