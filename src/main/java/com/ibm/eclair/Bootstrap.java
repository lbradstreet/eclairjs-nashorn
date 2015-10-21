package com.ibm.eclair;

import java.io.FileReader;
import java.net.URL;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class Bootstrap {

    private ScriptEngine engine;

    public Bootstrap(ScriptEngine engine) {
        this.engine = engine;
    }

    private String getResourceAsURLStirng(String file) {

        String res = null;
        try {
            res = getClass().getResource(file).toURI().toString();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return res;
    }

    public ScriptEngine bootstrap() {
        try {
            engine.eval("load('" + getResourceAsURLStirng("/SparkContext.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/RDD.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/Utils.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/LinearRegressionWithSGD.js") + "');");
            engine.eval("load('" + getResourceAsURLStirng("/LabeledPoint.js") + "');");
        } catch(Exception e) {
            e.printStackTrace();
        }

        return engine;
    }
}