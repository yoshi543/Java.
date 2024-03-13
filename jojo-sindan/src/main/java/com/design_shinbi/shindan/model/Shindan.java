package com.design_shinbi.shindan.model;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class Shindan {
	private List<Result> results;
	private List<Question> questions;

	public Shindan() throws IOException {
		init();
	}

	public List<Result> getResults() {
		return results;
	}

	public List<Question> getQuestions() {
		return questions;
	}

	private void init() throws IOException {
		InputStream stream = Shindan.class.getResourceAsStream("shindan.csv");
		Scanner scanner = new Scanner(stream);

		this.results = createResults(scanner);
		this.questions = createQuestions(scanner);
		shuffle();

		scanner.close();
		stream.close();
	}

	private List<Result> createResults(Scanner scanner) throws IOException {
		List<Result> results = new ArrayList<Result>();

		String line = scanner.nextLine();
		String[] names = line.split(",");

		line = scanner.nextLine();
		String[] descriptions = line.split(",");

		for (int i = 1; i < names.length && i < descriptions.length; i++) {
			Result result = new Result(names[i], descriptions[i]);
			results.add(result);
		}

		return results;
	}

	private List<Question> createQuestions(Scanner scanner) throws IOException {
		List<Question> questions = new ArrayList<Question>();

		int counter = 1;
		while (scanner.hasNext()) {
			String line = scanner.nextLine();
			String[] tokens = line.split(",");
			if (tokens.length >= this.results.size() + 1) {
				Question question = new Question("q" + counter, tokens[0]);
				for (int i = 1; i < tokens.length; i++) {
					question.addItem(i - 1, tokens[i]);
				}
				questions.add(question);
				counter++;
			}
		}

		return questions;
	}

	private void shuffle() {
		for (int i = 0; i < this.questions.size(); i++) {
			Question question = this.questions.get(i);
			question.shuffle();
		}
		Collections.shuffle(this.questions);
	}

	public Result check(List<Integer> answers) {
		int[] counters = new int[this.results.size()];
		Arrays.fill(counters, 0);

		for (Integer index : answers) {
			counters[index]++;
		}

		int index = 0;
		int maxCount = 0;
		for (int i = 0; i < counters.length; i++) {
			int counter = counters[i];
			if (counter > maxCount) {
				index = i;
				maxCount = counter;
			}
		}

		return this.results.get(index);
	}

}
