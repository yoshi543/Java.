package com.design_shinbi.shindan.model.test;

import java.io.IOException;

import org.junit.jupiter.api.Test;

import com.design_shinbi.shindan.model.Item;
import com.design_shinbi.shindan.model.Question;
import com.design_shinbi.shindan.model.Result;
import com.design_shinbi.shindan.model.Shindan;

class ShindanTest {

	@Test
	void test() throws IOException {
		Shindan shindan = new Shindan();

		System.out.println("■ 結果一覧");
		for (Result result : shindan.getResults()) {
			System.out.println("   ● " + result.getName());
			System.out.println("      " + result.getDescription());
		}

		System.out.println("■ 質問一覧");
		for (Question question : shindan.getQuestions()) {
			System.out.println(
					"   ● " + question.getKey() + ": " + question.getQuestion());
			for (Item item : question.getItems()) {
				System.out.println("      " + item.getId() + " - " + item.getText());
			}
		}

	}

}
