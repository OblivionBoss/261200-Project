package AST.Statement;

import AST.Expression.Expression;
import ErrorExcep.EvalError;
import Model.Player;

public class WhileStatement implements Statement {
    private Expression condition;
    private Statement statement;

    public WhileStatement(Expression condition, Statement statement){
        this.condition = condition;
        this.statement = statement;
    }

    public void prettyPrint(StringBuilder s) {
        s.append("while ( ");
        this.condition.prettyPrint(s);
        s.append(" ) ");
        this.statement.prettyPrint(s);
    }

    public boolean eval(Player player) throws EvalError {
        double e = this.condition.eval(player);
        for (int counter = 0; counter < 10000 && e > 0; counter++) {
            if(!this.statement.eval(player)) return false;
            e = this.condition.eval(player);
        }
        return true;
    }
}
