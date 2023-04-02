package com.example.OOPserver.GameState;

import java.util.Random;

public class Territory {
    private long FEE_CHARGE = 1;
    private int TERRITORY_ROW = 1;
    private int TERRITORY_COL = 1;
    private long INIT_PLAN_MIN;
    private long INIT_PLAN_SEC;
    private long PLAN_REV_MIN;
    private long PLAN_REV_SEC;
    private long REVISION_COST;
    private long MAX_DEPOSIT;
    private double baseInterestRate;
    protected int turn = 1;
    private int playerTurn = 0;
    public Region[][] territory;
    public Player[] playerSet;

    public Territory() {}

    public Territory(String[] players, long m, long n, long init_plan_min, long init_plan_sec,
                     long init_budget, long init_center_dep, long plan_rev_min, long plan_rev_sec,
                     long rev_cost, long max_dep, long interest_pct){
        TERRITORY_ROW = (int) m;
        TERRITORY_COL = (int) n;
        INIT_PLAN_MIN = init_plan_min;
        INIT_PLAN_SEC = init_plan_sec;
        PLAN_REV_MIN = plan_rev_min;
        PLAN_REV_SEC = plan_rev_sec;
        REVISION_COST = rev_cost;
        MAX_DEPOSIT = max_dep;
        baseInterestRate = interest_pct;
        territory = new Region[TERRITORY_ROW][TERRITORY_COL];
        for (int i=1 ; i<=m ; i++){
            for (int j=1 ; j<=n ; j++){
                territory[i-1][j-1] = new Region(this,i,j);
            }
        }
        for (int i=1 ; i<=m ; i++){
            for (int j=1 ; j<=n ; j++){
                Region now = territory[i-1][j-1];
                if(i-1>=1) now.up = territory[i-2][j-1];
                if(i+1<=m) now.down = territory[i][j-1];
                if(j%2==0){
                    if(i-1>=1 && j-1>=1) now.upleft = territory[i-2][j-2];
                    if(i-1>=1 && j+1<=n) now.upright = territory[i-2][j];
                    if(j-1>=1) now.downleft = territory[i-1][j-2];
                    if(j+1<=n) now.downright = territory[i-1][j];

                }else{
                    if(j-1>=1) now.upleft = territory[i-1][j-2];
                    if(j+1<=n) now.upright = territory[i-1][j];
                    if(i+1<=m && j-1>=1) now.downleft = territory[i][j-2];
                    if(i+1<=m && j+1<=n) now.downright = territory[i][j];
                }
            }
        }
        this.playerSet = new Player[players.length];
        for(int i = 0 ; i < players.length ; i++){
            Region cityCenterRandom;
            while(true){
                int row = new Random().nextInt(TERRITORY_ROW);
                int col = new Random().nextInt(TERRITORY_COL);
                if(territory[row][col].owner == null){
                    cityCenterRandom = territory[row][col];
                    cityCenterRandom.addDeposit(init_center_dep);
                    break;
                }
            }
            playerSet[i] = new Player(players[i],this,cityCenterRandom);
            playerSet[i].addBudget(init_budget);
        }
    }

    public void updatePlayerTurn(){
        playerSet[playerTurn].evaluatePlan();
        while(true){
            if(isGameOver()) return;
            playerTurn = (playerTurn + 1) % playerSet.length; // update next player turn
            if (playerTurn == 0) turn++;
            if(!playerSet[playerTurn].GAMEOVER()) break;
        }
        calculateInterest(playerSet[playerTurn]); // calculate next player
    }

    public boolean isGameOver(){
        int numOfPlayer = playerSet.length;
        for(Player player : playerSet){
            if(player.GAMEOVER()) numOfPlayer--;
        }
        return numOfPlayer <= 1;
    }

    public void calculateInterest(Player player){
        for(Region region : player.regionSet){
            region.calculateInterest();
        }
    }

    public int getPlayerTurn(){
        return playerTurn;
    }

    public long TERRITORY_ROW(){
        return TERRITORY_ROW;
    }

    public long TERRITORY_COL(){
        return TERRITORY_COL;
    }

    public long INIT_PLAN_MIN(){
        return INIT_PLAN_MIN;
    }

    public long INIT_PLAN_SEC(){
        return INIT_PLAN_SEC;
    }

    public long REVISION_COST(){
        return REVISION_COST;
    }

    public long FEE_CHARGE(){
        return FEE_CHARGE;
    }

    public long MAX_DEPOSIT(){
        return MAX_DEPOSIT;
    }

    public double baseInterestRate(){
        return baseInterestRate;
    }
}
