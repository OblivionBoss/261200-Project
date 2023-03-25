package GameState;

import java.util.Random;

public class Territory {
    private long FEE_CHARGE = 1;
    private int TERRITORY_ROW = 1;
    private int TERRITORY_COL = 1;
    private long REVISION_COST;
    private long MAX_DEPOSIT;
    protected double baseInterestRate;
    protected int turn = 1;
    private int playerTurn = 0;
    public Region[][] territory;
    public Player[] playerSet;

    public Territory() {}

    public Territory(String[] players, int m, int n, long init_budget, long init_center_dep, long rev_cost, long interest_pct, long max_dep){
        TERRITORY_ROW = m;
        TERRITORY_COL = n;
        REVISION_COST = rev_cost;
        MAX_DEPOSIT = max_dep;
        baseInterestRate = interest_pct;
        territory = new Region[m][n];
        for (int i=1 ; i<=m ; i++){
            for (int j=1 ; j<=n ; j++){
                territory[i-1][j-1] = new Region(i,j);
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
        for(int i = 0 ; i < players.length ; i++){
            this.playerSet = new Player[players.length];
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
        playerTurn = (playerTurn + 1) % playerSet.length; // update next player turn
        if(playerTurn == 0) turn++;
        calculateInterest(playerSet[playerTurn]); // calculate next player
    }

    public void calculateInterest(Player player){
        for(Region region : player.regionSet){
            region.calculateInterest();
        }
    }

    public long TERRITORY_ROW(){
        return TERRITORY_ROW;
    }

    public long TERRITORY_COL(){
        return TERRITORY_COL;
    }

    public long FEE_CHARGE(){
        return FEE_CHARGE;
    }

    public long MAX_DEPOSIT(){
        return MAX_DEPOSIT;
    }
}
