package AST.Statement;

import AST.ENUM.Direction;
import ErrorExcep.EvalError;
import Model.Player;
import Model.Region;

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
        if(player.getBudget()<1) return false;
        player.subBudget(1);

        Region next;
        int dir = this.direction.ordinal()+1;
        if (dir==1) next = player.cityCrew.up;
        else if (dir==2) next = player.cityCrew.upright;
        else if (dir==3) next = player.cityCrew.downright;
        else if (dir==4) next = player.cityCrew.down;
        else if (dir==5) next = player.cityCrew.downleft;
        else next = player.cityCrew.upleft;

        if (next != null && (next.owner == null || next.owner == player))
            player.cityCrew = next;
        return true;
    }
}
