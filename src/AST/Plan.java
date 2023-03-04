package AST;

import AST.Statement.Statement;
import ErrorExcep.EvalError;
import ErrorExcep.SyntaxError;
import Model.Player;

import java.util.LinkedList;
import java.util.Queue;

public class Plan implements Node{
    private Queue<Statement> statementQueue;

    public Plan(Queue<Statement> queue) throws SyntaxError {
        if(queue.isEmpty()) throw new SyntaxError("construction plan is empty");
        this.statementQueue = queue;
    }

    public Plan() {
        this.statementQueue = new LinkedList<>();
    }

    public void add(Statement statement){
        this.statementQueue.add(statement);
    }

    public void prettyPrint(StringBuilder s) {
        for (Statement statement : this.statementQueue){
            statement.prettyPrint(s);
            s.append("\n");
        }
    }

    public void eval(Player player) throws EvalError {
        while (!this.statementQueue.isEmpty()){
            if(!this.statementQueue.remove().eval(player)) return;
        }
    }
}
