package AST.Expression;

import ErrorExcep.EvalError;
import Global.Global;
import Model.Player;

import java.util.Map;

public class Identifier implements Expression {
    private String name;

    public Identifier(String name, Map<String, Double> map){
        this.name = name;
        if(!map.containsKey(name)) map.put(this.name, 0d);
    }

    public Identifier(String name){
        this.name = name;
    }

    public String getName(){
        return name;
    }

    public double eval(Player player) throws EvalError {
        if(name.equals("rows")) return Global.TERRITORY_ROW;
        else if(name.equals("cols")) return Global.TERRITORY_COL;
        else if(name.equals("currow")) return player.cityCrew.getRow();
        else if(name.equals("curcol")) return player.cityCrew.getCol();
        else if(name.equals("budget")) return player.getBudget();
        else if(name.equals("deposit")){
            double deposit = Math.floor(player.cityCrew.getDeposit());
            if(player.cityCrew.owner == player) return deposit;
            else return 0-deposit;
        }else if(name.equals("int")) return player.cityCrew.getInterestRate();
        else if(name.equals("maxdeposit")) return player.cityCrew.getMaxDeposit();
        else if(name.equals("random")) return Math.floor(Math.random()*1000);

        if(!player.variableSet.containsKey(name)) player.variableSet.put(this.name, 0d);
        return player.variableSet.get(name);
    }

    public void prettyPrint(StringBuilder s) {
        s.append(name);
    }
}
