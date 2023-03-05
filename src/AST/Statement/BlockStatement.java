package AST.Statement;

import ErrorExcep.EvalError;
import Model.Player;

import java.util.LinkedList;

public class BlockStatement implements Statement {
    private LinkedList<Statement> statementList;

    public BlockStatement(LinkedList<Statement> list){
        this.statementList = list;
    }

    public BlockStatement() {
        this.statementList = new LinkedList<>();
    }

    public void add(Statement statement){
        this.statementList.add(statement);
    }

    public void prettyPrint(StringBuilder s) {
        s.append("{");
        for (Statement statement : this.statementList){
            s.append("\n");
            statement.prettyPrint(s);
        }
        if(!this.statementList.isEmpty()) s.append("\n");
        s.append("}");
    }

    public boolean eval(Player player) throws EvalError {
        for (Statement statement : this.statementList){
            if(!statement.eval(player)) return false;
        }
        return true;
    }
}
