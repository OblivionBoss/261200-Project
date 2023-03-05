package AST;

import AST.Statement.Statement;
import ErrorExcep.EvalError;
import ErrorExcep.SyntaxError;
import Model.Player;

import java.util.LinkedList;

public class Plan implements Node{
    private LinkedList<Statement> statementList;

    public Plan(LinkedList<Statement> list) throws SyntaxError {
        if(list.isEmpty()) throw new SyntaxError("construction plan is empty");
        this.statementList = list;
    }

    public Plan() {
        this.statementList = new LinkedList<>();
    }

    public void add(Statement statement){
        this.statementList.add(statement);
    }

    public void prettyPrint(StringBuilder s) {
        for (Statement statement : this.statementList){
            statement.prettyPrint(s);
            s.append("\n");
        }
    }

    public void eval(Player player) throws EvalError {
        for (Statement statement : this.statementList){
            if(!statement.eval(player)) return;
        }
    }
}
