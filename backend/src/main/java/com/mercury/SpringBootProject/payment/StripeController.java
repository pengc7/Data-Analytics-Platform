package com.mercury.SpringBootProject.payment;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.billingportal.SessionCreateParams;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/payment")
public class StripeController {
    private static Gson gson = new Gson();

    @PostMapping
    @PreAuthorize("hasAnyAuthority('admin','normal')")
    public String checkout(@RequestBody Long amount) throws StripeException {
        Stripe.apiKey = "sk_test_51Mss9PBEwoP8IxfUiZQh8MpWknVjBuzHS8gQMsltKIZCyj6BcmjuuF7LYP5QyHApX1xvXkJHk3V5AgpvH74azZFb00WIF08BlU";

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
               .setAmount(amount*100L)
               .setCurrency("usd")
               .setConfirm(true)
               .setPaymentMethod("pm_card_visa")
               .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);
        Map<String, String> map = new HashMap();
        Type gsonType = new TypeToken<Map<String, String>>(){}.getType();
        map.put("client_secret", paymentIntent.getClientSecret());
        return gson.toJson(map, gsonType);
    }
    }


