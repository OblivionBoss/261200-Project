package GameState;

import GameState.Region;

public class Territory {
    private long FEE_CHARGE = 1;
    private long TERRITORY_ROW = 1;
    private long TERRITORY_COL = 1;
    private long MAX_DEPOSIT;
    protected double baseInterestRate;
    protected int turn = 1;
    public Region[][] territory;

    public Territory() {}

    public Territory(int m,int n,int interest_pct,int max_dep){
        TERRITORY_ROW = m;
        TERRITORY_COL = n;
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
        baseInterestRate = interest_pct;
        MAX_DEPOSIT = max_dep;
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
