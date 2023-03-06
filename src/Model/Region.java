package Model;

import AST.ENUM.Direction;

public class Region extends Territory{
    private int row,col;
    public Player owner = null;
    public Region up = null, upright = null, downright = null, down = null, downleft = null, upleft = null;
    private double deposit;

    public Region(int x, int y) {
        this.row = x;
        this.col = y;
    }

    public double getDeposit(){
        return deposit;
    }

    public void addDeposit(double n){
        deposit = Math.min(super.maxDeposit,deposit+n);
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
        return super.baseInterestRate*Math.log10(deposit)*Math.log(super.turn);
    }

    public double getMaxDeposit(){
        return super.maxDeposit;
    }

    public Region gotoDirection(Direction dir){
        if (dir.equals(Direction.up)) return this.up;
        else if (dir.equals(Direction.upright)) return this.upright;
        else if (dir.equals(Direction.downright)) return this.downright;
        else if (dir.equals(Direction.down)) return this.down;
        else if (dir.equals(Direction.downleft))  return this.downleft;
        else  return this.upleft;
    }

    private void calculateInterest(){
        if(owner != null){
            deposit += deposit*this.getInterestRate()/100;
            if(deposit > super.maxDeposit) deposit = super.maxDeposit;
        }
    }
}
