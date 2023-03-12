import AST.ENUM.Direction;
import AST.Statement.*;
import ErrorExcep.EvalError;
import ErrorExcep.SyntaxError;
import GameState.Player;
import GameState.Region;
import GameState.Territory;

public class Main {
    public static void moveTest(Player player) throws EvalError{
        Region city = player.cityCrew;
        System.out.println("Current position : "+player.cityCrew.getRow()+","+player.cityCrew.getCol());
        for(Direction direction : Direction.values()){
            new MoveCommand(direction).eval(player);
            System.out.println(direction.name()+" position : "+player.cityCrew.getRow()+","+player.cityCrew.getCol());
            player.cityCrew = city;
        }
    }

    public static void relocateTest(Player player){
        int ccx = player.cityCenter.getRow(); //CityCenterX
        int ccy = player.cityCenter.getCol(); //CityCenterY
        int newCCX = player.cityCrew.getRow();
        int newCCY = player.cityCrew.getCol();
        int r = ccx - (ccy - ccy % 2) / 2;
        int newR = newCCX - (newCCY - newCCY % 2) / 2;
        int minDistance = (Math.abs(newCCY - ccy) + Math.abs(newR - r) + Math.abs((-newCCY-newR) + (ccy + r))) / 2;
        System.out.println("minDistance = "+minDistance);
    }

    public static void main(String[] args) throws EvalError, SyntaxError {
        Territory territory = new Territory(9,9,1,100);
        Player player = new Player(territory,territory.territory[1-1][1-1],10000);
        player.cityCrew = territory.territory[1-1][1-1];
        player.cityCenter = territory.territory[1-1][1-1];
        relocateTest(player);
        moveTest(player);
/*
        LinkedList<Statement> l = new LinkedList<>();
        Plan p = new Plan(l);
        Identifier v = new Identifier("t");
        Statement st1 = new AssignStatement(v,new BinaryArithExpr(v,"+",new Number(1)));
        Statement st2 = new AssignStatement(new Identifier("m"),new Number(0));
        BlockStatement sb1 = new BlockStatement();
        sb1.add(new ActionCommand(Command.done));
        sb1.add(new IfStatement(new Number(1),new BlockStatement(),new BlockStatement()));
        Statement st3 = new WhileStatement(new Identifier("deposit"),sb1);
        Statement st4 = new IfStatement(new BinaryArithExpr(new Identifier("budget"),"-",new Number(1)),new RegionCommand(Command.invest,new Number(1)),new MoveCommand(Direction.upright));
        l.add(st1);
        l.add(st2);
        l.add(st3);
        l.add(st4);
        StringBuilder s = new StringBuilder();
        p.prettyPrint(s);
        System.out.println(s);
        p.eval(player);
        System.out.println(player.variableSet.get("t"));

        Tokenizer t1 = new Tokenizer("t = t + 1  # keeping track of the turn number\n" +
                "m = 0  # number of random moves\n" +
                "while (deposit) { # still our region\n" +
                "  if (deposit - 100)\n" +
                "  then collect (deposit / 4)  # collect 1/4 of available deposit\n" +
                "  else if (budget - 25) then invest 25\n" +
                "  else {}\n" +
                "  if (budget - 100) then {} else done  # too poor to do anything else\n" +
                "  opponentLoc = opponent\n" +
                "  if (opponentLoc / 10 - 1)\n" +
                "  then  # opponent afar\n" +
                "    if (opponentLoc % 10 - 5) then move downleft\n" +
                "    else if (opponentLoc % 10 - 4) then move down\n" +
                "    else if (opponentLoc % 10 - 3) then move downright\n" +
                "    else if (opponentLoc % 10 - 2) then move upright\n" +
                "    else if (opponentLoc % 10 - 1) then move up\n" +
                "    else move upleft\n" +
                "  else if (opponentLoc)\n" +
                "  then  # opponent adjacent to city crew\n" +
                "    if (opponentLoc % 10 - 5) then {\n" +
                "      cost = 10 ^ (nearby upleft % 100 + 1)\n" +
                "      if (budget - cost) then shoot upleft cost else {}\n" +
                "    }\n" +
                "    else if (opponentLoc % 10 - 4) then {\n" +
                "      cost = 10 ^ (nearby downleft % 100 + 1)\n" +
                "      if (budget - cost) then shoot downleft cost else {}\n" +
                "    }\n" +
                "    else if (opponentLoc % 10 - 3) then {\n" +
                "      cost = 10 ^ (nearby down % 100 + 1)\n" +
                "      if (budget - cost) then shoot down cost else {}\n" +
                "    }\n" +
                "    else if (opponentLoc % 10 - 2) then {\n" +
                "      cost = 10 ^ (nearby downright % 100 + 1)\n" +
                "      if (budget - cost) then shoot downright cost else {}\n" +
                "    }\n" +
                "    else if (opponentLoc % 10 - 1) then {\n" +
                "      cost = 10 ^ (nearby upright % 100 + 1)\n" +
                "      if (budget - cost) then shoot upright cost else {}\n" +
                "    }\n" +
                "    else {\n" +
                "      cost = 10 ^ (nearby up % 100 + 1)\n" +
                "      if (budget - cost) then shoot up cost else {}\n" +
                "    }\n" +
                "  else {  # no visible opponent; move in a random direction\n" +
                "    dir = random % 6\n" +
                "    if (dir - 4) then move upleft\n" +
                "    else if (dir - 3) then move downleft\n" +
                "    else if (dir - 2) then move down\n" +
                "    else if (dir - 1) then move downright\n" +
                "    else if (dir) then move upright\n" +
                "    else move up\n" +
                "    m = m + 1\n" +
                "  }\n" +
                "}  # end while\n" +
                "# city crew on a region belonging to nobody, so claim it\n" +
                "if (budget - 1) then invest 1 else {}");
        Parser p1 = new StatementParser(t1);
        StringBuilder a1 = new StringBuilder();
        p1.parse().prettyPrint(a1);
        System.out.println(a1);

        Tokenizer t2 = new Tokenizer(a1.toString());
        Parser p2 = new StatementParser(t2);
        StringBuilder a2 = new StringBuilder();
        p2.parse().prettyPrint(a2);

        Tokenizer t3 = new Tokenizer(a2.toString());
        Parser p3 = new StatementParser(t3);
        StringBuilder a3 = new StringBuilder();
        p3.parse().prettyPrint(a3);
        System.out.println(a1.toString().hashCode()+" "+a2.toString().hashCode()+" "+a3.toString().hashCode());

        Tokenizer t4 = new Tokenizer("4^3^2");
        ExprParser p4 = new ExprParser(t4);
        StringBuilder a4 = new StringBuilder();
        p4.parse().prettyPrint(a4);
        System.out.println(a4);*/
    }
}