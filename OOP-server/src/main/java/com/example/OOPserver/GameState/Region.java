package com.example.OOPserver.GameState;

import com.example.OOPserver.AST.ENUM.Direction;

public class Region extends Territory {
    private Territory territory;
    private int row,col;
    public Player owner = null;
    public Region up = null, upright = null, downright = null, down = null, downleft = null, upleft = null;
    private double deposit = 0;

    public Region(Territory territory, int x, int y) {
        this.territory = territory;
        this.row = x;
        this.col = y;
    }

    public double getDeposit(){
        return deposit;
    }

    public void addDeposit(double n){
        deposit = Math.min(territory.MAX_DEPOSIT(),deposit+n);
    }

    public void subDeposit(double n){
        deposit = Math.max(0,deposit-n);
    }

    public int getRow(){
        return row;
    }

    public int getCol(){
        return col;
    }

    public double getInterestRate(){
        return territory.baseInterestRate()*Math.log10(deposit)*Math.log(territory.turn);
    }

    public Region gotoDirection(Direction dir){
        if (dir.equals(Direction.up)) return this.up;
        else if (dir.equals(Direction.upright)) return this.upright;
        else if (dir.equals(Direction.downright)) return this.downright;
        else if (dir.equals(Direction.down)) return this.down;
        else if (dir.equals(Direction.downleft))  return this.downleft;
        else  return this.upleft;
    }

    public void loseRegion(Player player){
        if(!player.regionSet.contains(this)) return;
        this.owner = null;
        player.regionSet.remove(this);
        if(player.cityCenter.equals(this)) player.loseGame();
    }

    public void calculateInterest(){
        if(owner != null){
            deposit += deposit*this.getInterestRate()/100;
            if(deposit > territory.MAX_DEPOSIT()) deposit = territory.MAX_DEPOSIT();
        }
    }
}
