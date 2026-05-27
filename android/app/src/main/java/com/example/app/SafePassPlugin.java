package com.example.app;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.security.SecureRandom;

@CapacitorPlugin(name = "SafePass")
public class SafePassPlugin extends Plugin {

    @PluginMethod
    public void generateSecurePassword(PluginCall call) {
        Integer length = call.getInt("length", 16);
        String charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
        
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();
        
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(charset.length());
            sb.append(charset.charAt(randomIndex));
        }
        
        JSObject ret = new JSObject();
        ret.put("password", sb.toString());
        call.resolve(ret);
    }
}
