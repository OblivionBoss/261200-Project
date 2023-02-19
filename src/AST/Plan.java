package AST;

import AST.Statement.*;
import ErrorExcep.*;
import java.util.LinkedList;
import java.util.Map;
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

    public void eval(Map<String, Double> bindings) throws EvalError {
        while (!this.statementQueue.isEmpty()){
            if(!this.statementQueue.remove().eval(bindings)) return;
        }
    }
}
