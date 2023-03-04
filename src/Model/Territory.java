package Model;

import java.util.ArrayList;

public class Territory {
    protected long maxDeposit;
    protected double baseInterestRate;
    protected int turn = 1;
    public Region[][] territory;

    public Territory() {}

    public Territory(int m,int n,int interest_pct,int max_dep){
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
        maxDeposit = max_dep;
    }
}
