package com.design_shinbi.shindan.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Question {
	   private String key;
	    private String question;
	    List<Item> items;

	    public Question(String key, String question) {
	        this.key = key;
	        this.question = question;
	        this.items = new ArrayList<Item>();
	    }

	    public String getKey() {
	        return key;
	    }

	    public String getQuestion() {
	        return question;
	    }

	    public List<Item> getItems() {
	        return items;
	    }

	    public void addItem(int id, String description) {
	        Item item = new Item(id, description);
	        this.items.add(item);
	    }

	    public void shuffle() {
	        Collections.shuffle(this.items);
	    }

}
