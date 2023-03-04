package Model;

import AST.Plan;

import java.util.HashMap;
import java.util.Map;

public class Player {
    private Plan construction_Plan;
    public Map<String, Double> variableSet = new HashMap<>();
    private Region cityCenter;
    public Region cityCrew;
    private double budget;

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
}
