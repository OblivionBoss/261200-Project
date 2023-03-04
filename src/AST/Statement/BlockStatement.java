package AST.Statement;

import ErrorExcep.EvalError;
import Model.Player;

import java.util.LinkedList;
import java.util.Queue;

public class BlockStatement implements Statement {
    private Queue<Statement> statementQueue;

    public BlockStatement(Queue<Statement> queue){
        this.statementQueue = queue;
    }

    public BlockStatement() {
        this.statementQueue = new LinkedList<>();
    }

    public void add(Statement statement){
        this.statementQueue.add(statement);
    }

    public void prettyPrint(StringBuilder s) {
        s.append("{");
        for (Statement statement : this.statementQueue){
            s.append("\n");
            statement.prettyPrint(s);
        }
        if(!this.statementQueue.isEmpty()) s.append("\n");
        s.append("}");
    }

    public boolean eval(Player player) throws EvalError {
        while (!this.statementQueue.isEmpty()){
            if(!this.statementQueue.remove().eval(player)) return false;
        }
        return true;
    }
}
