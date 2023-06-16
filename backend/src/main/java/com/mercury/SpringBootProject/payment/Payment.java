package com.mercury.SpringBootProject.payment;

public class Payment {
    private String currency;
    private int amount;
    private String successUrl;
    private String cancelUrl;

    public Payment() {
    }

    public Payment(String currency, int amount, String successUrl, String cancelUrl) {
        this.currency = currency;
        this.amount = amount;
        this.successUrl = successUrl;
        this.cancelUrl = cancelUrl;
    }

    public String getSuccessUrl() {
        return successUrl;
    }

    public void setSuccessUrl(String successUrl) {
        this.successUrl = successUrl;
    }

    public String getCancelUrl() {
        return cancelUrl;
    }

    public void setCancelUrl(String cancelUrl) {
        this.cancelUrl = cancelUrl;
    }

    public Payment(String currency, int amount) {
        this.currency = currency;
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }


    @Override
    public String toString() {
        return "Payment{" +
                "currency='" + currency + '\'' +
                ", amount=" + amount +
                ", successUrl='" + successUrl + '\'' +
                ", cancelUrl='" + cancelUrl + '\'' +
                '}';
    }
}
