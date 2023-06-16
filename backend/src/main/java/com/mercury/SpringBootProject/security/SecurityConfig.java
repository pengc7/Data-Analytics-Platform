package com.mercury.SpringBootProject.security;


import com.mercury.SpringBootProject.security.handler.*;
import org.apache.tomcat.util.http.Rfc6265CookieProcessor;
import org.apache.tomcat.util.http.SameSiteCookies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.embedded.tomcat.TomcatContextCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;
    @Autowired
    private AuthenticationEntryPointImpl authenticationEntryPointImpl;

    @Autowired
    private AccessDeniedHandlerImpl accessDeniedHandlerImpl;

    @Autowired
    private AuthenticationSuccessHandlerImpl authenticationSuccessHandlerImpl;

    @Autowired
    private AuthenticationFailureHandlerImpl authenticationFailureHandlerImpl;

    @Autowired
    private LogoutSuccessHandlerImpl logoutSuccessHandlerImpl;
     @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.cors();

       http.authorizeRequests((requests) ->
                requests
                       /* .antMatchers(HttpMethod.GET, "/companies")
                        .hasAnyAuthority("normal","premium","admin")
                        .antMatchers(HttpMethod.GET, "/companies/*")
                        .hasAnyAuthority("normal", "premium","admin")*/
                   .anyRequest().permitAll());//authenticated());

         http.exceptionHandling()
                 .accessDeniedHandler(accessDeniedHandlerImpl)
                 .authenticationEntryPoint(authenticationEntryPointImpl);

         http.formLogin()
                 .usernameParameter("username")
                 .passwordParameter("password")
                 .successHandler(authenticationSuccessHandlerImpl)
                 .failureHandler(authenticationFailureHandlerImpl)
         ;


         http.logout()
                 .permitAll()
                 .logoutUrl("/logout")
                 .logoutSuccessHandler(logoutSuccessHandlerImpl)
         ;

        http.httpBasic();
        return http.build();
    }
    @Bean // put the return object into spring container, as a bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(11);
    }

    @Autowired // @Autowired on function will autowired the parameters
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsServiceImpl).passwordEncoder(new BCryptPasswordEncoder(11));
    }

/*
    @Bean
    public CookieCsrfTokenRepository csrfTokenRepository() {
        CookieCsrfTokenRepository repository = new CookieCsrfTokenRepository();
        repository.setCookieHttpOnly(false);
        repository.setCookieName("XSRF-TOKEN");
        repository.setCookiePath("/");
        repository.setHeaderName("X-XSRF-TOKEN");
        repository.setParameterName("_csrf");

        SameSiteCookieSerializer cookieSerializer = new SameSiteCookieSerializer();
        cookieSerializer.setSameSite("None");

        repository.setCookieSerializer(cookieSerializer);
        repository.setCookieHttpOnly(false);

        return repository;
    }
*/


    /*@Bean
    public TomcatContextCustomizer sameSiteCookiesConfig() {
        return context -> {
            final Rfc6265CookieProcessor cookieProcessor = new Rfc6265CookieProcessor();
            // SameSite
            cookieProcessor.setSameSiteCookies(SameSiteCookies.NONE.getValue());
            context.setCookieProcessor(cookieProcessor);
        };
    }*/

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        //configuration.addAllowedOrigin("http://localhost:4200/"); // You should only set trusted site here. e.g. http://localhost:4200/ means only this site can access.
        //configuration.addAllowedOrigin("http://project-bucket-a.s3-website-us-east-1.amazonaws.com/");
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200/", "http://project-bucket-a.s3-website-us-east-1.amazonaws.com/"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","HEAD","OPTIONS"));
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(Arrays.asList("Access-Control-Allow-Origin","Access-Control-Allow-Credentials"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
