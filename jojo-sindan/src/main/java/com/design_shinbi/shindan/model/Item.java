package com.design_shinbi.shindan.model;

public class Item {
	private int id;
	private String text;
	
	public Item(int id, String text) {
		this.id = id;
		this.text = text;
	}

	public int getId() {
		return id;
	}

	public String getText() {
		return text;
	}
}
