package com.example.OOPserver.AST.Expression;

import com.example.OOPserver.AST.ENUM.Direction;
import com.example.OOPserver.ErrorExcep.EvalError;
import com.example.OOPserver.GameState.Player;
import com.example.OOPserver.GameState.Region;

public class NearbyInfo implements Expression{
    private Direction direction;

    public NearbyInfo(Direction direction){
        this.direction = direction;
    }

    public double eval(Player player) throws EvalError {
        Region current = player.cityCrew;
        double distance = 0;
        while (current.gotoDirection(this.direction) != null) {
            distance++;
            current = current.gotoDirection(this.direction);
            if(current.owner != null && current.owner != player)
                return 100*distance + Math.floor(Math.log10(current.getDeposit()));
        }
        return 0;
    }

    public void prettyPrint(StringBuilder s) {
        s.append("nearby ");
        s.append(this.direction);
    }
}
