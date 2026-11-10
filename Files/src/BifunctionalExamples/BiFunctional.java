package FunctionalInterface;

import java.util.function.BiFunction;

public class BiFunctional {
    public static void main(String[] args) {
        BiFunction<String, String, Integer> print=(str1,str2) -> str1.length()+str2.length();

        Integer result=print.apply("Udochi","Peace");
        System.out.println(result);


    }
}
