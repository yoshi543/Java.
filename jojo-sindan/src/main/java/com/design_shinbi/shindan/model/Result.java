package com.design_shinbi.shindan.model;

public class Result {
    private String name;
    private String description;

    public Result(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}
