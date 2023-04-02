package com.example.OOPserver;

import com.example.OOPserver.GameState.Gameserver;
import com.example.OOPserver.GameState.Player;
import com.example.OOPserver.GameState.Territory;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;

@Controller
@Getter
public class GameServerController {
    @Autowired
    private Gameserver gameserver;

    @SubscribeMapping("/game")
    public String test(){
        return "hello";
    }

    @MessageMapping("/game/plan")
    @SendTo("/topic/game")
    public String[][] game(PlanMessage planMessage){
        return gameserver.sendConsPlan(planMessage.getHost(),
                Integer.parseInt(planMessage.getPlayerNum()),
                planMessage.getCons_plan(), planMessage.getIsRev());
    }

    @MessageMapping("/game/new")
    @SendTo("/topic/game")
    public String[][] newGame(WaitMessage waitMessage){
        gameserver.newGame(waitMessage.getHost());
        return gameserver.getGameData(waitMessage.getHost());
    }

    @MessageMapping("/wait")
    @SendTo("/topic/wait")
    public String[] wait(WaitMessage waitMessage){
        String[] roomMessage = new String[3];
        roomMessage[0] = waitMessage.getUser();
        roomMessage[1] = waitMessage.getHost();
        if(waitMessage.getIsClick().equals("false")){
            roomMessage[2] = ((Integer) gameserver.getRoom().get(waitMessage.getHost()).size()).toString();
            return roomMessage;
        }
        roomMessage[2] = "true"; // full ready to play
        return roomMessage;
    }

    @MessageMapping("/join")
    @SendTo("/topic/join")
    public String[] join(JoinMessage joinMessage){
        String[] roomMessage = new String[4];
        roomMessage[0] = joinMessage.getUser();
        roomMessage[1] = joinMessage.getHost();
        roomMessage[2] = "false"; // don't have
        if(!gameserver.getRoom().containsKey(joinMessage.getHost())) return roomMessage;
        roomMessage[2] = "true"; // have
        if(gameserver.getRoom().get(joinMessage.getHost()).size() >= gameserver.getConfig().get(joinMessage.getHost())[2]) {
            roomMessage[3] = "false"; // full room
            return roomMessage;
        }
        gameserver.getRoom().get(joinMessage.getHost()).add(joinMessage.getUser());
        gameserver.getNamePlayer().get(joinMessage.getHost()).add(joinMessage.getUsername());
        roomMessage[3] = gameserver.getConfig().get(joinMessage.getHost())[2].toString();
        return roomMessage;
    }

    @MessageMapping("/host")
    @SendTo("/topic/host")
    public String[] host(HostMessage hostMessage){
        String[] roomMessage = new String[4];
        roomMessage[0] = hostMessage.getUser();
        roomMessage[1] = hostMessage.getHost();
        roomMessage[2] = "true"; // used
        if(gameserver.getRoom().containsKey(hostMessage.getHost())) return roomMessage;
        Long[] configs = new Long[12];
        ArrayList<String> players = new ArrayList<>();
        ArrayList<String> playerNames = new ArrayList<>();
        players.add(hostMessage.getUser());
        playerNames.add(hostMessage.getUsername());
        gameserver.getRoom().put(hostMessage.getHost(),players);
        gameserver.getNamePlayer().put(hostMessage.getHost(),playerNames);
        roomMessage[2] = "false"; // isn't used
        configs[0] = Long.parseLong(hostMessage.getM());
        configs[1] = Long.parseLong(hostMessage.getN());
        configs[2] = Long.parseLong(hostMessage.getNum_player());
        configs[3] = Long.parseLong(hostMessage.getInit_plan_min());
        configs[4] = Long.parseLong(hostMessage.getInit_plan_sec());
        configs[5] = Long.parseLong(hostMessage.getInit_budget());
        configs[6] = Long.parseLong(hostMessage.getInit_center_dep());
        configs[7] = Long.parseLong(hostMessage.getPlan_rev_min());
        configs[8] = Long.parseLong(hostMessage.getPlan_rev_sec());
        configs[9] = Long.parseLong(hostMessage.getRev_cost());
        configs[10] = Long.parseLong(hostMessage.getMax_dep());
        configs[11] = Long.parseLong(hostMessage.getInterest_pct());
        gameserver.getConfig().put(hostMessage.getHost(),configs);
        roomMessage[3] = hostMessage.getNum_player();
        return roomMessage;
    }

    @MessageMapping("/game")
    @SendTo("/topic/game")
    public void game(HostMessage hostMessage){

    }
}
