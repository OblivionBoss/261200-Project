package GameState;

import AST.Plan;

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

    public void loseGame(){
        for(Region region : regionSet)
            region.owner = null;
        regionSet.clear();
    }
}
