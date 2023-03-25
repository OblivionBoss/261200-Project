package GameState;

import AST.ENUM.Command;
import AST.Plan;
import AST.Statement.ActionCommand;
import AST.Statement.Statement;
import ErrorExcep.EvalError;
import ErrorExcep.SyntaxError;
import Parser.StatementParser;
import Tokenizer.Tokenizer;

import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Map;

public class Player {
    public String playerName;
    private Territory territory;
    private Plan construction_Plan;
    public final Map<String, Double> variableSet;
    public final HashSet<Region> regionSet;
    public Region cityCenter;
    public Region cityCrew;
    private double budget = 0;

    public Player(String name, Territory territory, Region cityCenter){
        this.variableSet = new HashMap<>();
        this.regionSet = new HashSet<>();
        this.playerName = name;
        this.territory = territory;
        this.cityCrew = this.cityCenter = cityCenter;
        this.cityCenter.owner = this;
        LinkedList<Statement> done = new LinkedList<>();
        done.add(new ActionCommand(Command.done));
        this.construction_Plan = new Plan(done);
    }

    public Territory territory(){
        return territory;
    }

    public Region getCityCenter(){
        return cityCenter;
    }

    public double getBudget(){
        return budget;
    }

    public void addBudget(double n){
        budget += n;
    }

    public void subBudget(double n){
        budget = Math.max(0,budget-n);
    }

    public String setConstruction_Plan(String plan){
        try {
            Tokenizer t = new Tokenizer(plan);
            StatementParser p = new StatementParser(t);
            this.construction_Plan = (Plan) p.parse();
        } catch (SyntaxError e){
            return e.getMessage();
        }
        return "1";
    }

    public void evaluatePlan(){
        try {
            this.construction_Plan.eval(this);
            this.cityCrew = this.cityCenter;
        } catch (EvalError e) {}
    }

    public void loseGame(){
        for(Region region : regionSet)
            region.owner = null;
        regionSet.clear();
    }

    public void calculateDeposit(){
        for(Region region : regionSet)
            region.calculateInterest();
    }
}
