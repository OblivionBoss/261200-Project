package com.example.OOPserver.AST.Expression;

import com.example.OOPserver.ErrorExcep.EvalError;
import com.example.OOPserver.GameState.Player;

public class BinaryArithExpr implements Expression {
    private Expression left,right;
    private String op;
    public BinaryArithExpr(Expression left, String op, Expression right){
        this.left = left;
        this.op = op;
        this.right = right;
    }

    public void prettyPrint(StringBuilder s) {
        s.append("(");
        this.left.prettyPrint(s);
        s.append(" ");
        s.append(this.op);
        s.append(" ");
        this.right.prettyPrint(s);
        s.append(")");
    }

    public double eval(Player player) throws EvalError {
        double leftValue = left.eval(player);
        double rightValue = right.eval(player);
        if(op.equals("+")) return leftValue + rightValue;
        else if(op.equals("-")) return leftValue - rightValue;
        else if(op.equals("*")) return leftValue * rightValue;
        else if(op.equals("/")){
            if (rightValue == 0) return 0;
                // throw new ArithmeticException("/ by zero");
            return Math.floor(leftValue/rightValue);
        }
        else if(op.equals("%")){
            if (rightValue == 0) return 0;
                // throw new ArithmeticException("% by zero");
            return leftValue % rightValue;
        }else if(op.equals("^")){
            if (rightValue == 0 && leftValue == 0) return 1;
                // throw new ArithmeticException("0^0 undefined");
            return Math.floor(Math.pow(leftValue,rightValue));
        }
        throw new EvalError("unknown op -> " + op);
    }
}
