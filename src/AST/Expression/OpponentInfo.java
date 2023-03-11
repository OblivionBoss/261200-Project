package AST.Expression;

import AST.ENUM.Direction;
import ErrorExcep.EvalError;
import GameState.Player;
import GameState.Region;

public class OpponentInfo implements Expression{
    public OpponentInfo() {};

    public double eval(Player player) throws EvalError {
        Region current = player.cityCrew;
        int minDistOpp = Integer.MAX_VALUE;
        Direction[] directions = Direction.values();
        for (int Dir = 0 ; Dir < 6 ; Dir++){
            for (int distance = 1 ; distance < minDistOpp/10 && current.gotoDirection(directions[Dir]) != null ; distance++){
                current = current.gotoDirection(directions[Dir]);
                if(current.owner != null && current.owner != player){
                    int distNum = 10*distance + Dir+1;
                    if(distNum < minDistOpp) minDistOpp = distNum;
                }
            }
            current = player.cityCrew;
        }
        return minDistOpp == Integer.MAX_VALUE ? 0 : minDistOpp;
    }

    public void prettyPrint(StringBuilder s) {
        s.append("opponent");
    }
}
