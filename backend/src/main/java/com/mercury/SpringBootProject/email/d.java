package com.mercury.SpringBootProject.email;

public class d {
    public static void main(String[] args) {
        Integer a = 1;
        System.out.println(System.identityHashCode(a));
        //a = a+1;
        a=2;
        System.out.println(System.identityHashCode(a));


        final ThreadLocal<Integer> local = new ThreadLocal<Integer>() {
            @Override
            protected Integer initialValue() {return 10;}
        };
        Thread t1 = new Thread(new Runnable() {
            @Override
            public void run() {
                int x = local.get();  // get a shallow copy of local, initialValue = 10
                System.out.println("x in t1: " + x);
                x++;
                local.set(x);  // in the same thread,
                System.out.println("x in t1: " + local.get());
            }
        });
        Thread t2 = new Thread(new Runnable() {
            @Override
            public void run() {
                int x = local.get();  // get a shallow copy of local, initialValue = 10
                System.out.println("x in t2: " + x);
                x = x + 10;
                local.set(x);
                System.out.println("x in t2: " + local.get());
            }
        });
        t1.start();
        try {
            Thread.sleep(100);
        } catch (Exception e) {}
        t2.start();
}
}