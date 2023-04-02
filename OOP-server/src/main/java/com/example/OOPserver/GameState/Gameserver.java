package com.example.OOPserver.GameState;

import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;

@Component
@Getter
public class Gameserver {
    private HashMap<String,Territory> Server;
    private HashMap<String, ArrayList<String>> Room;
    private HashMap<String, ArrayList<String>> NamePlayer;
    private HashMap<String, Long[]> Config;

    public Gameserver(){
        Server = new HashMap<>();
        Room = new HashMap<>();
        NamePlayer = new HashMap<>();
        Config = new HashMap<>();
    }

    public HashMap<String, Territory> getServer() {
        return Server;
    }

    public HashMap<String, ArrayList<String>> getRoom() {
        return Room;
    }

    public HashMap<String, ArrayList<String>> getNamePlayer() {
        return NamePlayer;
    }

    public HashMap<String, Long[]> getConfig() {
        return Config;
    }

    public void newGame(String host){
        Long[] config = this.Config.get(host);
        String[] players = new String[config[2].intValue()];
        for(int i=0 ; i<players.length ; i++){
            players[i] = this.Room.get(host).get(i);
        }
        Territory upbeat = new Territory(players,config[0].longValue(),config[1].longValue(),
                config[3].longValue(),config[4].longValue(),config[5].longValue(),
                config[6].longValue(),config[7].longValue(),config[8].longValue(),
                config[9].longValue(),config[10].longValue(),config[11].longValue());
        this.Server.put(host,upbeat);
    }

    public String[][] getGameData(String host){
        Territory upbeat = this.Server.get(host);
        String[][] data = new String[upbeat.playerSet.length+1][3];
        if(!upbeat.isGameOver()) {
            data[0][0] = host;
            data[0][1] = upbeat.turn + "/" + (upbeat.getPlayerTurn() + 1);
            if (upbeat.turn == 1 && upbeat.getPlayerTurn() == 0) data[0][1] += "/" + upbeat.TERRITORY_ROW()
                    + "/" + upbeat.TERRITORY_COL() + "/" + upbeat.INIT_PLAN_MIN()
                    + "/" + upbeat.INIT_PLAN_SEC() + "/" + upbeat.REVISION_COST();
            //data[0][2] = upbeat.playerSet[upbeat.getPlayerTurn()].PLAN_REV_MIN()+"/"+upbeat.playerSet[upbeat.getPlayerTurn()].PLAN_REV_SEC();
            for (int i = 0; i < upbeat.playerSet.length; i++) {
                data[i+1][0] = upbeat.playerSet[i].playerName;
                data[i+1][1] = this.NamePlayer.get(host).get(i);
                if (!upbeat.playerSet[i].GAMEOVER()) {
                    StringBuilder playerData = new StringBuilder();
                    playerData.append(Math.round(Math.floor(upbeat.playerSet[i].getBudget())));
                    playerData.append("/");
                    playerData.append(upbeat.playerSet[i].cityCenter.getRow());
                    playerData.append("/");
                    playerData.append(upbeat.playerSet[i].cityCenter.getCol());
                    for (Region region : upbeat.playerSet[i].regionSet) {
                        playerData.append("/");
                        playerData.append(region.getRow());
                        playerData.append("/");
                        playerData.append(region.getCol());
                        playerData.append("/");
                        playerData.append(Math.round(Math.floor(region.getDeposit())));
                    }
                    data[i+1][2] = playerData.toString();
                } else {
                    data[i+1][2] = "lost";
                }
            }
        }else{
            data[0][0] = host;
            data[0][1] = "GameOver";
            for (int i = 0; i < upbeat.playerSet.length; i++) {
                data[i+1][0] = upbeat.playerSet[i].playerName;
                data[i+1][1] = this.NamePlayer.get(host).get(i);
                if (upbeat.playerSet[i].GAMEOVER()) {
                    data[i+1][2] = "lost";
                } else {
                    data[i+1][2] = "win";
                }
            }
            this.Server.remove(host);
            this.Room.remove(host);
            this.NamePlayer.remove(host);
            this.Config.remove(host);
        }
        return data;
    }

    public String[][] sendConsPlan(String host, int playerNum, String plan, String isRev){
        Territory upbeat = this.Server.get(host);
        Player player = upbeat.playerSet[playerNum-1];
        String isError = player.setConstruction_Plan(plan);
        if(!isError.equals("1")){
            String[][] message = new String[2][2];
            message[0][0] = host;
            message[0][1] = "plan";
            message[1][0] = upbeat.playerSet[playerNum-1].playerName;
            message[1][1] = isError;
            return message;
        }
        if(isRev.equals("true")) player.subBudget(upbeat.REVISION_COST());
        upbeat.updatePlayerTurn();
        return getGameData(host);
    }
}
