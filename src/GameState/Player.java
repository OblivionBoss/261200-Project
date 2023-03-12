package GameState;

import AST.Plan;
import ErrorExcep.SyntaxError;
import Parser.StatementParser;
import Tokenizer.Tokenizer;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

public class Player {
    private Territory territory;
    private Plan construction_Plan;
    public final Map<String, Double> variableSet;
    public final HashSet<Region> regionSet;
    public Region cityCenter;
    public Region cityCrew;
    private double budget;

    public Player(Territory territory, Region cityCenter, double initBudget){
        this.variableSet = new HashMap<>();
        this.regionSet = new HashSet<>();
        this.territory = territory;
        this.cityCrew = this.cityCenter = cityCenter;
        this.budget = initBudget;
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
