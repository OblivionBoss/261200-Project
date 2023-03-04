package AST.Statement;

import AST.ENUM.Command;
import Model.Player;

public class ActionCommand implements Statement {
    private Command action;

    public ActionCommand(Command command){
        if(command.equals(Command.done) || command.equals(Command.relocate)) this.action = command;
    }
    public void prettyPrint(StringBuilder s) {
        s.append(this.action);
    }

    public boolean eval(Player player){
        if(action.equals(Command.done)){ // done command
            return false;
        }else{ // relocate command
            int minDistance = 0;
            int ccx = player.getCityCenter().getRow(); //CityCenterX
            int ccy = player.getCityCenter().getCol(); //CityCenterY
            int newCCX = player.cityCrew.getRow();
            int newCCY = player.cityCrew.getCol();
            if(ccx == newCCX) minDistance = Math.abs(ccy-newCCY);
            else if(ccy == newCCY) minDistance = Math.abs(ccx-newCCX);
        }
        return false;
    }
}
